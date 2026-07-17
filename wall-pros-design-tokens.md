---
domain: design
category: design-systems
sub-category: design-tokens
date-created: 2026-07-17
date-revised: 2026-07-17
client: wall-pros
status: active
aliases:
  - Wall Pros Design Tokens
  - Wall Pros Token System
tags:
  - design-tokens
  - design-system
  - claude-design
  - wall-pros
  - brand
---

# wall-pros-design-tokens

A three-layer token system for the Wall Pros brand and bid-sheet templates: primitive values, semantic aliases, and bid-sheet component tokens. Values derive from [[wall-pros-design-system-research]] and the WP logo. Upload all three files to the Claude Design project. `wall-pros.tokens.json` is the source of truth; `wall-pros-tokens.css` is generated from it and is the file Claude Design lifts into HTML output.

## Files

- `wall-pros.tokens.json`: source of truth, W3C DTCG format. Primitive, semantic (light default), `theme.dark`, typography roles, and component tokens. Edit values here.
- `wall-pros-tokens.css`: derived custom properties plus typography role classes and helpers. Do not hand-edit; regenerate from the JSON when values change.
- `wall-pros-design-tokens.md`: this file.

## Derivation contract

The JSON owns every value. The CSS is a build artifact of it. One source, no duplication. When a value changes, change it once in the JSON and regenerate the CSS, so design and code stay at parity. Semantic tokens alias primitives, components alias semantics, and nothing is hardcoded.

## Using it in Claude Design

1. Attach all three files to the project.
2. Instruct generation to consume `wall-pros-tokens.css`: put the file in a `<style>` block or link it, add `class="wp"` to the document body, and style with the custom properties and role classes.
3. Type with the role classes: `wp-hero`, `wp-h1`, `wp-h2`, `wp-h3`, `wp-eyebrow`, `wp-body`, `wp-body-sm`, `wp-table`, `wp-fine`, `wp-price`, `wp-total`.
4. Color and spacing with the semantic properties: `var(--wp-bg-page)`, `var(--wp-text-primary)`, `var(--wp-text-secondary)`, `var(--wp-text-muted)`, `var(--wp-accent)`, `var(--wp-line)`, `var(--wp-metal)`, and the `--wp-space-*` scale.
5. For the Luxe Dark direction, add `data-theme="dark"` to a container. Only the semantic colors remap; nothing else changes.

## Theming

Light is the default. `theme.dark` in the JSON, and `[data-theme="dark"]` in the CSS, remap the semantic color names to the ink ground and ivory type of the logo. This is the single mechanism for the Luxe Dark direction. To swap the accent from dusty terracotta to the cooler olive alternate, repoint `semantic.color.accent` and `accent-strong` from `color.clay.*` to `color.olive.*` in the JSON, then regenerate.

## Fonts

Defaults are free and load from Google Fonts via the CSS import: Cormorant Garamond for display and Inter for body. These are stand-ins chosen to match the logo's thin high-contrast strokes and a clean humanist body. If the brand licenses premium faces, swap the `font.family` values (display alternates: Canela, Ivar Display, Freight Display; body alternates: Soehne, Founders Grotesk, Neue Haas Grotesk) and update the import.

## Accessibility notes

- `text-primary`, `text-secondary`, and `text-muted` all clear WCAG AA on the light and dark grounds.
- `accent` (clay) is for large text, marks, and rules only. Its contrast is insufficient for body or fine print. Never set conditions text in the accent color.
- Numbers use tabular figures in the `wp-table`, `wp-price`, and `wp-total` roles so columns align.

## Component to role mapping

Component color and dimension tokens are exposed as `--wp-*` properties (for example `--wp-room-card-bg`, `--wp-table-price-color`, `--wp-signature-line-color`). Component text uses the shared typography roles, applied by class:

- Bid-sheet hero title: `wp-hero`. Headline investment figure: `wp-total`.
- Eyebrow and section labels: `wp-eyebrow` in `var(--wp-accent)` or `var(--wp-text-muted)`.
- Room card title: `wp-h3`. Product brand line: `wp-eyebrow` in `var(--wp-room-card-product-brand-color)`. Product name: `wp-body`.
- Table headers: `wp-eyebrow` in `var(--wp-table-header-color)`. Cells: `wp-table`. Prices: `wp-price`.
- Conditions and fine print: `wp-fine` in `var(--wp-conditions-color)`.
- Signature labels: `wp-eyebrow`; rule uses `var(--wp-signature-line-color)`.
