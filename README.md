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

## App Store and Screenshots

Both homepage download links point to the published iOS app:
https://apps.apple.com/us/app/pit-pals/id6781048336

The homepage uses the October 24, 2026 promotional artwork supplied by Pit Pals.
The portrait images have 720px and 1080px-wide JPEG variants, with responsive
`srcset` selection and lazy loading below the hero. Images retain their full
proportions on desktop and mobile. `social-header.jpg` is the link-preview image.
The original full-resolution PNG artwork is kept outside this repository.

Cloudflare Pages deploys the `main` branch automatically to https://pitpals.app.
There is no build step. For local preview, run `python3 -m http.server 8765`
from the repository root and visit http://localhost:8765.

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

