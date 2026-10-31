"""Checks for the static files Cloudflare Pages serves without a build step."""

import json
import unittest
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
PAGES = {
    "/": ROOT / "index.html",
    "/privacy/": ROOT / "privacy/index.html",
    "/terms/": ROOT / "terms/index.html",
    "/community-guidelines/": ROOT / "community-guidelines/index.html",
    "/support/": ROOT / "support/index.html",
    "/smoking-time-calculator/": ROOT / "smoking-time-calculator/index.html",
}
APP_STORE_URL = "https://apps.apple.com/us/app/pit-pals/id6781048336"


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = []
        self.links = []
        self.anchors = []
        self.scripts = []
        self.images = []
        self.h1_count = 0
        self.text = []
        self._json_script = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            self.meta.append(attrs)
        elif tag == "link":
            self.links.append(attrs)
        elif tag == "a":
            self.anchors.append(attrs.get("href", ""))
        elif tag == "img":
            self.images.append(attrs)
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "script":
            self.scripts.append({"type": attrs.get("type"), "src": attrs.get("src"), "content": ""})
            self._json_script = attrs.get("type") == "application/ld+json"

    def handle_endtag(self, tag):
        if tag == "script":
            self._json_script = False

    def handle_data(self, data):
        self.text.append(data)
        if self._json_script:
            self.scripts[-1]["content"] += data

    def value(self, key, name):
        return [meta.get("content") for meta in self.meta if meta.get(key) == name]


def parse_page(path):
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


class SEOTests(unittest.TestCase):
    def test_each_public_page_has_unique_indexable_metadata_and_crawlable_content(self):
        titles = set()
        descriptions = set()
        for route, path in PAGES.items():
            with self.subTest(route=route):
                page = parse_page(path)
                html = path.read_text(encoding="utf-8")
                title = html.split("<title>", 1)[1].split("</title>", 1)[0]
                self.assertTrue(title)
                self.assertNotIn(title, titles)
                titles.add(title)
                description = page.value("name", "description")
                self.assertEqual(len(description), 1)
                self.assertNotIn(description[0], descriptions)
                descriptions.add(description[0])
                canonical = [link["href"] for link in page.links if link.get("rel") == "canonical"]
                expected = "https://pitpals.app" + route
                self.assertEqual(canonical, [expected])
                self.assertEqual(page.value("property", "og:url"), [expected])
                self.assertEqual(page.value("property", "og:title"), [title.replace("&amp;", "&")])
                self.assertEqual(page.value("property", "og:description"), description)
                self.assertEqual(page.value("name", "twitter:description"), description)
                self.assertEqual(page.value("name", "twitter:card"), ["summary_large_image"])
                self.assertEqual(page.h1_count, 1)
                self.assertGreater(len(" ".join(page.text).strip()), 300)
                self.assertFalse(any("noindex" in (item or "").lower() for item in page.value("name", "robots")))
                self.assertTrue(all(script["type"] in ("application/ld+json", "module") for script in page.scripts))
                if route == "/smoking-time-calculator/":
                    self.assertEqual([script["src"] for script in page.scripts if script["type"] == "module"], ["../assets/smoke-time-calculator.js"])
                else:
                    self.assertFalse(any(script["type"] == "module" for script in page.scripts))
                for anchor in page.anchors:
                    self.assertFalse(anchor.endswith("index.html"), anchor)
                    if anchor.startswith("/"):
                        self.assertIn(anchor, PAGES)
                for image in page.images:
                    self.assertTrue(image.get("width") and image.get("height"), image)

    def test_sitemap_lists_exactly_the_canonical_public_pages(self):
        tree = ET.parse(ROOT / "sitemap.xml")
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = [node.text for node in tree.findall("s:url/s:loc", ns)]
        self.assertEqual(set(urls), {"https://pitpals.app" + path for path in PAGES})
        self.assertEqual(len(urls), len(PAGES))
        self.assertEqual(len(urls), len(set(urls)))
        self.assertTrue(all(urlparse(url).scheme == "https" for url in urls))

    def test_robots_and_preview_indexing_rules(self):
        robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        self.assertIn("User-agent: *", robots)
        self.assertIn("Allow: /", robots)
        self.assertIn("Sitemap: https://pitpals.app/sitemap.xml", robots)
        self.assertNotIn("Disallow: /", robots)
        headers = (ROOT / "_headers").read_text(encoding="utf-8")
        self.assertIn("https://:project.pages.dev/*\n  X-Robots-Tag: noindex", headers)
        self.assertIn("https://:version.:project.pages.dev/*\n  X-Robots-Tag: noindex", headers)
        self.assertNotIn("https://pitpals.app/*", headers)
        self.assertEqual(parse_page(ROOT / "404.html").value("name", "robots"), ["noindex"])

    def test_app_identity_and_store_links(self):
        home = parse_page(ROOT / "index.html")
        self.assertEqual(home.anchors.count(APP_STORE_URL), 2)
        self.assertIn("BBQ smoking", " ".join(home.text))
        self.assertIn("timers", " ".join(home.text))
        schema = json.loads(home.scripts[0]["content"])
        self.assertEqual(schema["@type"], "MobileApplication")
        self.assertEqual(schema["operatingSystem"], "iOS")
        self.assertEqual(schema["downloadUrl"], APP_STORE_URL)
        self.assertEqual(schema["offers"]["price"], "0")
        self.assertNotIn("aggregateRating", schema)
        self.assertNotIn("review", schema)

    def test_calculator_is_findable_and_mobile_ready(self):
        home = parse_page(ROOT / "index.html")
        tool = parse_page(ROOT / "smoking-time-calculator/index.html")
        tool_html = (ROOT / "smoking-time-calculator/index.html").read_text()
        css = (ROOT / "assets/calculator.css").read_text()
        self.assertIn("/smoking-time-calculator/", home.anchors)
        self.assertIn(APP_STORE_URL, tool.anchors)
        self.assertIn("FoodSafety.gov", " ".join(tool.text))
        self.assertIn("id=\"animal-carousel\"", tool_html)
        self.assertIn("id=\"cut-carousel\"", tool_html)
        self.assertNotIn("Game", tool_html)
        self.assertIn("@media (max-width: 600px)", css)
        self.assertTrue((ROOT / "assets/images/calculator/PP_Cut_Other.png").is_file())
        self.assertEqual(len(list((ROOT / "assets/images/calculator").glob("PP_Animal_*.png"))), 5)
        for route, path in PAGES.items():
            html = path.read_text()
            menu = html.split('<nav class="site-nav"', 1)[1].split('</nav>', 1)[0]
            self.assertNotIn('href="/privacy/"', menu, route)
            self.assertIn('href="/smoking-time-calculator/"', menu, route)


if __name__ == "__main__":
    unittest.main()
