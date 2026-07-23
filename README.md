# Green Property Solutions

Standalone Astro + Tailwind site for Green Property Solutions marketing,
owner/renter acquisition flows, portal shells, blog routes, legal pages, and
static brand-book HTML.

This project was extracted from a prior site project so the website can live as its own repository. Generated dependencies and build artifacts are intentionally excluded; install from `package-lock.json`.

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

The default production URL remains `https://greenpmpnw.com`. The GitHub Pages repository slug has not been renamed, so deployment keeps the legacy repository path until that external rename occurs.

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
