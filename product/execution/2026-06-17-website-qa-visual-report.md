---
domain: green-property-management
category: execution
sub-category: website-qa
date-created: 2026-06-17
date-revised: 2026-06-17
doc-type: qa-report
version: 0.1
doc-status: active
aliases: []
tags: [website, qa, testing, accessibility, visual]
---

# Website QA & Visual Report

Scope: `src/green-pm-site/` (Astro marketing site + portal shells). This report
records the automated QA coverage, the bugs found and fixed, and how visual /
pixel review is performed.

## How testing is run

| Layer | Tooling | Where it runs | What it proves |
| --- | --- | --- | --- |
| Lint | Biome | local + CI (`build-test`) | Consistent, error-free TS/JS. |
| Types | `astro check` | local + CI | 0 type errors across all files. |
| Unit | Vitest | local + CI | Pure logic (formatting, nav, audience, listings, faqs, blog, portal data). |
| Static HTML | Vitest + cheerio over `dist/` | local + CI | Structure, links, routes, audience modes, color wiring, images, content quality, sitemap. |
| E2E | Playwright (Chromium + WebKit) | CI | Real rendering on desktop + Android (Pixel) + iOS (iPhone). |
| Performance / a11y | Lighthouse CI | CI | Budgets: accessibility ≥ 0.95 (hard), perf/best-practices (warn), contrast/title/lang/viewport. |
| Visual | Playwright full-page screenshots | CI artifact | Pixel-level human review per route per device. |

> Browser binaries cannot be downloaded in the dev sandbox (network policy blocks
> the CDN), so E2E, Lighthouse, and screenshots execute in GitHub Actions. Lint,
> types, unit, and static-HTML run everywhere.

## Coverage

- **Routes covered:** all 26 content routes + redirect stubs.
- **Devices:** desktop (1280), Android Pixel 7 (Chromium), iOS iPhone 14 (WebKit).
- **Breakpoints (overflow-checked):** 320, 375, 414, 768, 1024, 1280, 1440.
- **Links:** every internal link on every page is asserted to resolve (static),
  plus a runtime crawl (E2E).
- **Colors:** computed `body` background asserted per audience mode
  (cream/paper), Clay CTA color asserted; design-system token wiring verified in
  bundled CSS.
- **Accessibility:** single h1 per page, heading order, skip link, 44px touch
  targets, `lang`, viewport, and Lighthouse axe contrast.

## Bugs found and fixed (by the suite)

| # | Found by | Issue | Fix |
| --- | --- | --- | --- |
| 1 | Lighthouse | Footer copyright/legal links used `text-ink-40`, failing WCAG AA contrast | Use `ink-60`; added a static guard against `text-ink-40` as text. |
| 2 | Lighthouse | `text-warning` as small body text (draft notice, repair status) failed contrast | Ink label + colored dot (color no longer the only signal). |
| 3 | Lighthouse | `/rentals` jumped h1 → h3 (heading-order) | Listing card title is now `h2`. |
| 4 | E2E (iOS) | `/portal/owner/properties` overflowed 62px (4-col table) | `overflow-x-auto` + `min-w-0` on the grid column. |
| 5 | E2E (320px) | Home hero word "management" overflowed ~13px | Responsive hero sizes (36 → 44 → 80px); also fixed a latent `.text-display` class/utility collision that prevented desktop scaling. |
| 6 | Review (bot) | Lighthouse uploaded screenshots to public storage pre-launch | Upload target switched to local filesystem (private CI artifact). |

Regression guards were added to the static suite for the contrast issues so they
fail locally (fast) before Lighthouse catches them in CI.

## Pixel / visual inspection

Full-page screenshots are captured for every route on every device project and
uploaded as the `visual-screenshots` CI artifact (and `playwright-report` for
traces). Reviewers download that artifact to inspect pixels per breakpoint. The
automated suite already asserts the objective visual properties (surface colors,
CTA color, no overflow, heading structure, touch targets); the screenshots are
for subjective design review (spacing rhythm, imagery, hierarchy).

## Known limitations / not yet covered

- No raster images ship yet (listing/hero art uses brand gradients); the image
  test guards future `<img>` for alt + dimensions + lazy loading.
- Dynamic content is sample data until Sanity is wired; content-quality tests
  guard against placeholder/token leakage and thin pages.
- Real-device (physical iOS/Android) testing is approximated by Playwright device
  emulation; a BrowserStack/Sauce pass is a later option.
- Visual regression baselines (screenshot diffing) are not yet enforced; current
  screenshots are review artifacts, not pass/fail baselines.
