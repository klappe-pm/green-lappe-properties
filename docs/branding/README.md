---
domain: brand
category: design-system
sub-category: green-pm-design-system
date-created: 2026-05-21
date-revised: 2026-06-12
status: spec-v2-comprehensive
aliases:
tags:
---

# readme

Production-ready brand and design system for Green Property Management. This folder is the single source of truth for designers, engineers, vendors, and content authors.

## Files

| File | Purpose |
|---|---|
| `green-pm-design-system.md` | Comprehensive design system and style guide. 38 sections. Read this first. |
| `green-pm-tokens.css` | Machine-readable design tokens. Imported at document root. |
| `modes.css` | Audience-mode surface overrides via `data-audience` attribute. |
| `base.css` | Element resets, mobile-first type scale, focus styles, prose. |
| `tailwind.config.js` | Tailwind configuration. Mirrors `green-pm-tokens.css`. |
| `sanity-schemas/` | Sanity Studio content schemas. |

## Sanity schemas

| File | Content type |
|---|---|
| `sanity.config.ts` | Studio entry point |
| `listing.ts` | Rental listings (synced from Rentvine) |
| `blog-post.ts` | Field notes blog |
| `lead.ts` | Inbound leads (proposals, inquiries, contact) |
| `page.ts` | Editorial pages (about, accessibility, privacy) |
| `faq.ts` | FAQ entries by audience |
| `team.ts` | Team members (Megan today) |
| `settings.ts` | Site-wide singleton (contact info, social, footer) |

## Import order

In Astro layouts, import CSS in this order:

```html
<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/modes.css">
<link rel="stylesheet" href="/styles/base.css">
<!-- Tailwind utilities last -->
```

## TODOs

- `# TODO: Kevin to provide` — Sanity projectId in `sanity.config.ts`
- `# TODO: Kevin to provide` — WA broker license number (currently `#XXXXXX` placeholder in style guide)
- `# TODO: Kevin to provide` — office address (currently placeholder)
- `# TODO: Kevin to provide` — primary phone number (currently `(425) XXX-XXXX` placeholder)

## Related artifacts (separate folders)

- Mockups: HTML + PNG at `/mnt/user-data/outputs/green-lappe-mockups/` (folder name predates rename to Green PM; contents updated)

## Versioning

This is v2.0. See `green-pm-design-system.md` §37 for governance and evolution policy.
