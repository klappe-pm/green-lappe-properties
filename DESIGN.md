# Green Property Solutions Design System

This file is the enforceable style guide for the Green PS site. Code, copy,
tokens, and future components must follow this contract before merge.

## Source Files

- `DESIGN.md` - governance, usage rules, and review checklist.
- `src/design-system/green-property-solutions-design-tokens.js` - JavaScript token contract for future components.
- `src/styles/green-property-solutions-tokens.css` - CSS custom properties used by Astro output.
- `src/styles/modes.css` - audience-mode surface mapping.
- `tailwind.config.js` - utility mirror of the CSS token layer.
- `scripts/check-design-system.mjs` - CI/local enforcement gate.

## Token Layers

### Layer 1: Primitives

The brand has seven color primitives. They are the only brand primitive colors:

| Token | Hex | Job |
| --- | --- | --- |
| Cedar | `#2D6A4F` | Brand identity, focus rings, borders |
| Ink | `#1F2A2E` | Deep contrast text |
| Cream | `#FBF6EC` | Warm marketing surface |
| Paper | `#F7F5F0` | Cool product surface |
| Stone | `#D4D1CA` | Dividers and borders, never body text |
| Clay | `#A95C42` | Action accent, CTAs only |
| Sky | `#7BA7B8` | Secondary accent and information affordances |

### Layer 2: Semantic Tokens

Production code references token jobs, not raw hex. Use `--color-brand`,
`--color-action`, `--color-text`, `--surface`, and component-specific classes
instead of inventing color values in components.

### Layer 3: Component Grammar

Components are fixed patterns with variable content. Current stubs:

- Button: primary Clay action, secondary Cedar outline, quiet text link.
- Card: white or surface panel, Cedar data border when it represents a statement or work-order surface.
- Input: 4px radius, Cedar focus ring, paired helper text for invalid states.
- Callout: success/warning/error/info state with icon plus label. Never color-only.
- Signature: "Megan" in Fraunces italic, once per document or letter surface.

## Governance Rules

1. Clay = click. Clay is only for actionable controls and CTA states.
2. Seven primitives. Additions require design-system review and a token update.
3. Use semantic tokens. Raw hex is allowed only in token files and Tailwind token mirrors.
4. Renter before lease, resident after authentication. Owner remains owner.
5. Megan signs the work. Every major mode should expose named operator accountability.
6. State color is not brand color. State colors need icon plus text labels.
7. Radius ceiling is 16px, except pill chips.
8. No pure black or pure white in authored UI.

## Typography

- Work/UI: Geist for navigation, controls, headings, statements, labels, financials.
- Prose: Newsreader for articles, letters, owner notes, and long-form copy.
- Accent: Fraunces italic for the Megan signature only.

Forbidden font weights: 100, 200, 300, 800, 900.

## Voice

- Direct: short sentences, plain verbs, answer first.
- Specific: use numbers, names, dates, addresses.
- Accountable: first-person singular when Megan speaks.
- Local: name places like Bothell, Bellevue, Seattle, King County, Snohomish County.
- Calm: no manufactured urgency.

Avoid these category defaults in visible copy: solutions, passionate, dedicated,
trusted, boutique, concierge, white-glove, journey, stakeholder, leverage,
synergy, bespoke, curated, unlock, empower, family of brands, world-class,
value-add, unbeatable.

## Audience Modes

Every route goes through `BaseLayout`, which writes `data-audience` to `<html>`.
Allowed values:

- `neutral-acquisition`
- `owner-acquisition`
- `owner-product`
- `renter-acquisition`
- `renter-product`

The `renter-product` value is retained for compatibility with existing routes,
but visible authenticated copy should say "resident."

## Stub Pointers

- Component registry: `src/design-system/components.ts` (stub; add when components are formalized).
- Content examples: `src/design-system/examples/` (stub; add after owner portal components land).
- Accessibility matrix: `docs/design-system/accessibility.md` (stub; add when contrast snapshots are generated).
- Change log: `docs/design-system/changes.md` (stub; add when token changes begin).

## Review Checklist

- Run `npm run design:check`.
- Run `npm run lint`.
- Run `npm run check`.
- Confirm every page declares an audience mode through `BaseLayout`.
- Confirm Clay appears only on controls.
- Confirm state colors include icon plus text label.
- Confirm copy avoids blocked category language.
