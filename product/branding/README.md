---
domain: brand
category: design-system
sub-category: green-pm-design-system
date-created: 2026-05-21
date-revised: 2026-06-12
status: REVIEW
aliases:
tags:
---

# README

Production brand and design system for Green Property Management (Green PM).
This folder is the single source of truth for designers, engineers, vendors,
and content authors. Canonical token set is **v3.0.0**.

## Layout

The folder is grouped by function so an agent can route directly to the
artifact it needs.

| Folder | Contents | Reach for it when |
|---|---|---|
| `design-system/` | The written system: comprehensive reference + distilled guide. | You need the rules, voice, color, type, components, accessibility. |
| `styles/` | CSS token export, mode overrides, base styles, Tailwind config. | You are building a real surface and need machine-readable tokens. |
| `sanity/` | Sanity Studio config and content schemas. | You are modeling or editing CMS content types. |
| `brand-book/` | Rendered editorial brand book (self-contained HTML). | A human or vendor needs the visual reference. |
| `_superseded/` | Retired earlier downloads, kept for provenance only. | Never — do not build against these. |

## design-system/

| File | Purpose |
|---|---|
| `green-pm-design-system.md` | Comprehensive design system. 38 sections. Read this first. |
| `green-pm-style-guide.md` | Distilled implementation guide: voice, color, type, modes, component recipes, the five rules. |

## styles/

Machine-readable design tokens and CSS. In an Astro layout, import in this
order (paths are the deployed app's public paths, not this folder):

```html
<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/modes.css">
<link rel="stylesheet" href="/styles/base.css">
<!-- Tailwind utilities last -->
```

| File | Purpose |
|---|---|
| `green-pm-tokens.css` | Machine-readable design tokens (v3.0.0). Import; never copy hex values. |
| `modes.css` | Audience-mode surface overrides via the `data-audience` attribute. |
| `base.css` | Element resets, mobile-first type scale, focus styles, prose. |
| `tailwind.config.js` | Tailwind configuration. Mirrors `green-pm-tokens.css`. |

## sanity/

`sanity.config.ts` is the Studio entry point; it imports each schema from
`./schemas/`. Keep the config and its `schemas/` subfolder together so those
imports resolve.

| File | Content type |
|---|---|
| `schemas/listing.ts` | Rental listings (synced from Rentvine) |
| `schemas/blog-post.ts` | Field notes blog |
| `schemas/lead.ts` | Inbound leads (proposals, inquiries, contact) |
| `schemas/page.ts` | Editorial pages (about, accessibility, privacy) |
| `schemas/faq.ts` | FAQ entries by audience |
| `schemas/team.ts` | Team members (Megan today) |
| `schemas/settings.ts` | Site-wide singleton (contact info, social, footer) |

## brand-book/

| File | Purpose |
|---|---|
| `gpm-brand-book.html` | Full editorial brand book. Self-contained; open in any browser. |
| `gpm-brand-book-print.html` | Print-optimized variant. |

## TODOs

- `# TODO: Kevin to provide` — Sanity projectId in `sanity/sanity.config.ts`
- `# TODO: Kevin to provide` — WA broker license number (placeholder `#XXXXXX` in style guide)
- `# TODO: Kevin to provide` — office address (placeholder)
- `# TODO: Kevin to provide` — primary phone number (placeholder `(425) XXX-XXXX`)

## Versioning

Token set is v3.0.0. See `design-system/green-pm-design-system.md` §37 for
governance and evolution policy.
