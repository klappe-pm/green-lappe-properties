---
domain: brand
category: design-system
sub-category: audience-modes
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 01-positioning
  - 10-color-system
produces:
  - five-audience-modes
  - mode-characteristic-table
  - data-audience-attribute-spec
  - layout-routing-mapping
executor: design
aliases: []
tags: []
---

# 11-audience-modes

The five audience modes that govern surface, imagery, copy emphasis, and density across the site and product. Implemented via a `data-audience` attribute on the `<html>` or `<body>` element. Consumed by Astro layouts, component authors, and content authors.

## Dependencies

- `01-positioning` for the two-audience strategic model
- `10-color-system` for the surface tokens each mode overrides

## Outputs

1. The two-axis audience model (audience × stage)
2. Five mode characteristic table
3. `data-audience` attribute specification
4. Astro layout file naming map

## 7.1 The two-axis model

| | Pre-customer (acquisition) | Customer (operational) |
|---|---|---|
| Owner | Owner acquisition | Owner portal |
| Renter | Renter acquisition | Resident portal |

Plus `neutral-acquisition` for the landing page where both audiences arrive.

## 7.2 Mode characteristics

| Mode | Surface | Imagery | Copy emphasis | Density | Tone |
|---|---|---|---|---|---|
| neutral-acquisition | Cream | Operator portrait | Brand statement | Low | Welcoming, direct |
| owner-acquisition | Paper | Operational (statement, kitchen-table) | Numbers-forward | High | Procedural confidence |
| owner-product | Paper exclusive | None | Data-forward | High | Frictionless operation |
| renter-acquisition | Cream | Property photography, full-bleed | Property-forward | Low | Aspirational, direct |
| renter-product | Paper plus Cream accent | None | Action-forward | Medium | Reliable, human |

## 7.3 Data attribute spec

Each surface declares its mode at the document root:

```html
<html lang="en" data-audience="owner-acquisition">
  ...
</html>
```

The `modes.css` file uses this attribute to override surface tokens:

```css
[data-audience="neutral-acquisition"]  { --surface: var(--color-cream); --surface-alt: var(--color-paper); }
[data-audience="owner-acquisition"]    { --surface: var(--color-paper); --surface-alt: var(--color-cream); }
[data-audience="owner-product"]        { --surface: var(--color-paper); --surface-alt: var(--color-paper); }
[data-audience="renter-acquisition"]   { --surface: var(--color-cream); --surface-alt: var(--color-paper); }
[data-audience="renter-product"]       { --surface: var(--color-paper); --surface-alt: var(--color-cream); }
```

## 7.4 Astro layout map

Every page chooses a layout. The layout sets the audience mode.

| URL pattern | Audience mode | Astro layout |
|---|---|---|
| `/` | neutral-acquisition | `NeutralAcquisitionLayout.astro` |
| `/owners`, `/owners/*` | owner-acquisition | `OwnerAcquisitionLayout.astro` |
| `/portal/owner/*` | owner-product | `OwnerProductLayout.astro` |
| `/rentals`, `/rentals/*` | renter-acquisition | `RenterAcquisitionLayout.astro` |
| `/portal/resident/*` | renter-product | `RenterProductLayout.astro` |
| `/blog`, `/blog/*` | neutral-acquisition (default) or matches blog post audience | dynamic |
| `/about`, `/accessibility`, `/privacy`, `/terms` | neutral-acquisition | `NeutralAcquisitionLayout.astro` |

## 7.5 Mode transitions

When a user moves between modes (acquisition to product), the surface transition is intentional, not jarring:

- Acquisition modes: Cream-dominant, photography-rich, lower density
- Product modes: Paper-dominant, data-rich, higher density
- The transition signals "you are now a customer; this is your operational surface"

Visual cues during transition:

- Logo wordmark stays Cedar across both
- Megan's signature and photo persist (named operator)
- Color ratio shifts (less Cream, more Paper)
- Photography largely disappears in product modes

## 7.6 Mode application rules

- Every layout MUST declare a mode
- A page MUST NOT mix modes
- Components MUST work in every mode without redesign (token-driven)
- If a component looks wrong in a specific mode, fix the component, not the mode

## Acceptance

This doc is acceptable when:

- An Astro page author can determine which layout to use based on URL alone
- The CSS in `modes.css` overrides the right surface tokens
- A component built to spec works visually in all five modes
