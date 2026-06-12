# green-pm-site (work in progress)

Feature-organized Astro + Tailwind scaffold for the Green Property Management
marketing site and portals. Canonical brand/domain/stack come from the locked
design system in `../docs/uxd/design-system/`.

**Status: partial scaffold, not yet buildable.** Build config, the canonical
design tokens, and the Tailwind config are in place, but no `src/pages/` routes,
layouts, or feature slices exist yet, so `astro build` will not succeed until a
homepage and base layout are added. See the newest passoff in
`../docs/passoffs/` for the planned next actions.

## Canonical decisions baked in here

- **Brand / domain:** Green Property Management ("Green PM"), `greenpmpnw.com`
  (design system v3 is canonical; the older `greenlappe.com` launch note is
  superseded).
- **Stack:** Astro 4.x + Tailwind 3.x + Sanity v3 + Cloudflare Pages, per
  `../docs/uxd/design-system/docs/80-system-architecture.md`.
- **Design tokens:** `src/styles/{green-pm-tokens.css,modes.css,base.css}` are
  copied from the design system, which remains the single source of truth.
  Tailwind preflight is disabled so `base.css` is the only reset.

## Intended layout

```
site/
  astro.config.mjs
  tailwind.config.js          # mirrors green-pm-tokens.css
  src/
    styles/                   # canonical tokens copied from the design system
    layouts/                  # BaseLayout sets data-audience per audience mode
    pages/                    # thin Astro routes -> delegate to features
    features/<feature>/       # feature-owned components, queries, copy
    config/                   # site.ts, brand.ts
  tests/                      # vitest unit/component tests
```

## Scripts (once dependencies are installed)

`npm install`, then `npm run dev` / `npm run build` / `npm run check` /
`npm test`.
