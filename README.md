# Pit Pals Website

Static public website for Pit Pals, a barbecue-first app for planning, tracking, journaling, and sharing smokes.

## What This Repository Contains

- A public Pit Pals homepage
- A complete Privacy Policy
- Complete Terms of Service
- Complete Community Guidelines
- A functional Support page
- One shared stylesheet at `assets/styles.css`
- An `assets/images/` folder for brand assets, favicons, screenshots, app imagery, and future App Store assets
- No JavaScript, frameworks, build tools, analytics, or cookie banners

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
  assets/
    styles.css
    images/
  README.md
```

## Preview Locally

Open `index.html` directly in a browser. The site uses relative links and has no build step.

## Deploy Through Cloudflare Pages

1. Connect this repository to Cloudflare Pages.
2. Set the project type to static HTML.
3. Leave the build command empty.
4. Set the output directory to `/` or leave it as the repository root.
5. Deploy.

## No Build Step

This site is plain HTML and CSS. Do not run `npm install`, `npm run build`, or any framework tooling.

## Policy Review

Review the Privacy Policy, Terms of Service, Community Guidelines, and Support content whenever Pit Pals’ features, service providers, data practices, monetization, or geographic availability change.

## Future Screenshots and App Store Links

- Add app screenshots, preview images, and App Store badge assets to `assets/images/`.
- Update the homepage app preview in `index.html` when real screenshots are available.
- Replace the "COMING SOON ON iOS" buttons with real App Store links once the app is live.
