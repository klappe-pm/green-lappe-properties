# Green Lappe Properties

Standalone Astro + Tailwind site for Green Property Management marketing,
owner/renter acquisition flows, portal shells, blog routes, legal pages, and
static brand-book HTML.

This project was extracted from
`/Users/kevinlappe/Projects/ppi-platform/green-lappe-properties/src/green-pm-site`
so the website can live as its own repository. Generated dependencies and build
artifacts are intentionally excluded; install from `package-lock.json`.

## What is included

- Astro 4 static site source under `src/`
- Tailwind and design-token CSS
- Unit, component, static HTML, Playwright, and Lighthouse checks
- GitHub Actions workflows for site CI and GitHub Pages deploy
- Brand-book HTML under `brand-book/`, copied into `dist/brand-book/` by the
  deploy workflow

## Scripts

```bash
npm ci
npm run dev
npm run build
npm run check
npm test
```

The default production URL remains `https://greenpmpnw.com`. For GitHub Pages,
the deploy workflow sets:

```bash
SITE_URL=https://klappe-pm.github.io/green-lappe-properties
BASE_PATH=/green-lappe-properties
```

## Project Layout

```text
src/
  components/
  config/
  features/
  layouts/
  lib/
  pages/
  styles/
tests/
e2e/
brand-book/
public/
```
