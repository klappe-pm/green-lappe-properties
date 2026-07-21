---
domain: green-lappe-properties
category: backlog
sub-category: security-maintenance
date-created: 2026-07-21
date-revised: 2026-07-21
status: NEW
blocked: true
blocked-on: npm access (project settings deny npm install; needs a session or host that can update the lockfile and build)
priority: medium
aliases:
  - astro vite js-yaml CVE upgrade
tags:
  - security
  - dependencies
  - astro
  - vite
  - maintenance
---

# 2026-07-21-dependency-security-upgrade

## What

Remediate five dependency CVEs in the tree, not just their scanner disposition. They are currently marked not-affected (VEX) in `.trivyignore` (PR #77) because the site is `output: 'static'`, Linux-built, and served on GitHub Pages, so none are exposed in production. That suppression clears CI honestly but does not update the vulnerable packages. This item is the real fix.

| CVE | Package | Installed | Fixed in | Class |
|---|---|---|---|---|
| CVE-2025-64764 | astro | 4.16.19 | 5.15.8 | server islands XSS |
| CVE-2026-50146 | astro | 4.16.19 | 6.3.3 | slot-name XSS |
| CVE-2026-54299 | astro | 4.16.19 | 6.4.6 | prerendered error-page SSRF |
| CVE-2026-53571 | vite | 5.4.21 | 6.4.3 / 7.3.5 / 8.0.16 | Windows dev-server fs.deny bypass |
| CVE-2026-59869 | js-yaml | 3.14.2 | 3.15.0 / 4.3.0 | build-time YAML DoS |

## Why it is blocked

Two reasons, both real:

- The project settings deny `npm install` / `npm i`, so the lockfile cannot be updated and the result cannot be built or verified in the current agent environment.
- The upgrade is a breaking major migration, not a version bump. Astro 4 to 5 removes the `@astrojs/tailwind` integration, which this repo uses (`astro.config.mjs` imports `@astrojs/tailwind`); Astro 5+ expects the Vite Tailwind plugin instead. Vite 5 to 6/7/8 and the js-yaml bump ride along.

## The work

1. Migrate Tailwind off `@astrojs/tailwind` to the Vite Tailwind plugin (`@tailwindcss/vite` for Tailwind 4, or the documented Astro 5+ Tailwind setup), and update `astro.config.mjs`, `tailwind.config.js`, and the token CSS imports accordingly.
2. Upgrade `astro` to 6.4.6 or later, `vite` to a fixed line, and `js-yaml` to 3.15.0 or 4.3.0; regenerate `package-lock.json`.
3. Run the full local gates: `npm run build`, `npm run check`, unit and component tests, Playwright e2e, and Lighthouse. Fix Astro 5/6 breaking-change fallout (config, content collections, image, and any deprecated APIs).
4. Remove the five lines from `.trivyignore` (keep the header explaining the static-site posture) and confirm trivy passes on the upgraded tree with no suppression.
5. Verify the deployed static output is byte-comparable in structure to the current site (no visual or route regressions) before merge.

## Acceptance

- `astro`, `vite`, and `js-yaml` at or above their fixed versions in `package-lock.json`.
- `.trivyignore` no longer suppresses these five CVEs and trivy is green without them.
- Build, check, unit, component, e2e, and Lighthouse all green.
- No visual or route regression versus the current site.

## References

- Disposition PR that suppressed these as not-affected: #77 (`.trivyignore`, `biome.json` docs/tooling scope).
- `astro.config.mjs` (`output: 'static'`, `@astrojs/tailwind` import), `package.json` (`astro ^4.16.18`, `@astrojs/tailwind ^5.1.4`, `@astrojs/check ^0.9.4`).
