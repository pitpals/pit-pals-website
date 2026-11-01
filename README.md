# Pit Pals Website

Static public website for Pit Pals, a barbecue-first app for planning, tracking, journaling, and sharing smokes.

## What This Repository Contains

- A public Pit Pals homepage
- A complete Privacy Policy
- Complete Terms of Service
- Complete Community Guidelines
- A functional Support page
- A BBQ smoke time calculator at `/smoking-time-calculator/`
- A custom 404 response so unknown URLs are not served as homepage duplicates
- `robots.txt`, `sitemap.xml`, and Cloudflare Pages preview indexing headers
- A shared stylesheet at `assets/styles.css` and calculator-only styles at `assets/calculator.css`
- An `assets/images/` folder for brand assets, favicons, screenshots, app imagery, and future App Store assets
- No framework, build tool, analytics, or cookie banner; the calculator uses a small local JavaScript module

## App Store and Screenshots

Both homepage download links point to the published iOS app:
https://apps.apple.com/us/app/pit-pals/id6781048336

The homepage uses the October 24, 2026 promotional artwork supplied by Pit Pals.
The portrait images have 720px and 1080px-wide JPEG variants, with responsive
`srcset` selection and lazy loading below the hero. Images retain their full
proportions on desktop and mobile. `social-header.jpg` is the link-preview image.
The original full-resolution PNG artwork is kept outside this repository.
The calculator's animal and cut illustrations are resized copies of the
current iOS app asset catalog; the app repository was not changed.
The [calculator methodology](docs/smoke-time-methodology.md) lists every
supported cut, its assumptions, and source links.

Cloudflare Pages deploys the `main` branch automatically to https://pitpals.app.
There is no build step. For local preview, run `python3 -m http.server 8765`
from the repository root and visit http://localhost:8765.

## SEO and indexing

The six public pages are `/`, `/smoking-time-calculator/`, `/privacy/`, `/terms/`,
`/community-guidelines/`, and `/support/`. Each has its own canonical URL,
title, description, and social preview metadata. The homepage contains
`MobileApplication` JSON-LD based on the public App Store listing (free iOS
download, app ID `6781048336`), without ratings or reviews. Google may not
show an app rich result without verified rating or review data.

Cloudflare Pages serves the files in this directory directly. The production
domain should serve `robots.txt` as `text/plain` and `sitemap.xml` as XML; a
missing URL should return HTTP 404 using `404.html`. The `_headers` file keeps
Pages domain aliases and previews out of the index. Cloudflare Pages also
adds `X-Robots-Tag: noindex` to preview deployments by default; check the
actual response header on a preview after deployment. The custom domain
`pitpals.app` should not receive a `noindex` header.

Run the static checks before opening a pull request:

```bash
python3 -m unittest discover -s tests -v
node --test tests/test_smoke_time.mjs
git diff --check
```

After a production deployment, check `https://pitpals.app/robots.txt`,
`https://pitpals.app/sitemap.xml`, the canonical tags on all six pages,
`https://pitpals.app/does-not-exist` (HTTP 404), and one Pages preview
(`X-Robots-Tag: noindex`). Also review Cloudflare dashboard redirect, WAF,
bot, and Access rules; those settings are not stored in this repository.
At the time of this source audit, `www.pitpals.app` did not resolve. The apex
site is reachable; if the `www` hostname is added later, redirect it to the
apex HTTPS URL to avoid duplicate hosts.

### Google Search Console

1. In Search Console, add the **Domain** property `pitpals.app`.
2. Copy Google's DNS TXT verification value into a TXT record for the apex
   domain in Cloudflare DNS, then verify ownership in Search Console. Keep the
   TXT record in place.
3. Under **Sitemaps**, submit `https://pitpals.app/sitemap.xml` after the
   production deployment and check that Google can fetch its six URLs.
4. Use **URL Inspection** for the homepage and key pages to check the selected
   canonical, crawl access, and indexing status. Request indexing after the
   sitemap and page responses are correct. Monitor the **Pages** indexing
   report for crawl or canonical errors.

Search Console setup and Cloudflare DNS changes require account access and are
not performed by publishing this source branch.

## Folder Structure

```text
/
  index.html
  privacy/
    index.html
  terms/
    index.html
  community-guidelines/
    index.html
  support/
    index.html
  smoking-time-calculator/
    index.html
  404.html
  robots.txt
  sitemap.xml
  _headers
  assets/
    styles.css
    calculator.css
    smoke-time-model.mjs
    smoke-time-calculator.js
    images/
      calculator/
  tests/
    test_seo.py
    test_smoke_time.mjs
  docs/
    smoke-time-methodology.md
  README.md
```

