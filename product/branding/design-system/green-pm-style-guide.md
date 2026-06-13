---
domain: brand
category: design-system
sub-category: green-pm-style-guide
date-created: 2026-05-29
date-revised: 2026-05-29
type: reference
version: 1.0.0
status: DONE
aliases:
tags:
  - brand
  - claude-code
  - claude-design
  - design-system
  - tokens
---

# green-pm-style-guide

Brand and design system for **Green Property Management** (GPM), distilled for
direct reuse by coding agents and design tools. This is the relevant-aspects
extract of the full design handoff: palette, typography, spacing, audience
modes, component grammar, accessibility floors, and the hard rules.

Companion files in this bundle:

- `green-pm-tokens.css` — machine-readable token export. Import this; never copy hex values.
- `brand-book.html` — the full editorial brand book (the rendered reference).

## 1. How to Use This Guide

- **Claude Code** (building a real GPM surface): import `green-pm-tokens.css`,
  set `data-audience` on the page container (§6), and reach for tokens by name.
  Copy the component recipes in §8 verbatim. Never hardcode a hex value.
- **Claude Design** (mocking a new surface): pick the audience mode first (§6),
  then compose from the six components in §8. Keep the palette to the seven
  primitives and let the mode decide the surface.

The system is built so the brand reproduces without re-explaining it. If a
choice is not covered here, it defaults to the most boring, legible option.

## 2. Positioning Guardrails

GPM is a property manager for small landlords (1-to-20 doors) in King and
Snohomish counties, WA. Megan Green is the named, designated broker. The brand
converts two skeptical audiences and then serves them.

The brand IS: a high-trust regional operator with modern systems.
The brand is NOT: corporate, "luxury," a tech startup, a national franchise,
bigger than it is, or signaling institutional-asset gravitas.

These guardrails set the tone for every surface. When in doubt, choose calm
over urgent, specific over aspirational, and plain over clever.

## 3. Voice

Five principles, applied to acquisition copy, portal microcopy, statements, and
notices.

| Principle | Means | Does not mean |
| --- | --- | --- |
| Direct | Short sentences, plain words, answer first | Blunt or cold |
| Specific | Numbers, names, dates, addresses | Jargon or legalese |
| Accountable | First-person singular when Megan speaks | Self-deprecating |
| Local | Says "Bothell," not "the Puget Sound region" | Folksy or twee |
| Calm | No manufactured urgency | Slow or evasive |

### 3.1 Terminology

| State | Label |
| --- | --- |
| Pre-customer renter | `renter` |
| Authenticated tenant | `resident` |
| Owner (either state) | `owner` |

Never write "current renter portal," "tenant login," or "client portal."

### 3.2 Words to Step Around

`solutions`, `passionate`, `dedicated`, `trusted`, `boutique`, `concierge`,
`white-glove`, `journey`, `stakeholder`, `leverage`, `synergy`, `bespoke`,
`curated`, `unlock`, `empower`, `family of brands`, `world-class`,
`value-add`, `unbeatable`.

## 4. Color

Seven primitives. No additions without governance review. Production code
references token names from `green-pm-tokens.css`, never the raw hex.

| Token | Hex | Role |
| --- | --- | --- |
| `--color-cedar` | `#2D6A4F` | Primary brand: wordmark, focus ring, statement borders |
| `--color-ink` | `#1F2A2E` | Text, deep contrast, dark sections |
| `--color-cream` | `#FBF6EC` | Marketing surface (warm) |
| `--color-paper` | `#F7F5F0` | Product surface (cool) |
| `--color-stone` | `#D4D1CA` | Dividers, borders, decorative shapes (non-text) |
| `--color-clay` | `#A95C42` | Action accent. Clay = click |
| `--color-sky` | `#7BA7B8` | Secondary accent: sign-in, informational |

Derived neutrals (`--color-ink-80/60/40/20`) ramp from Ink for text hierarchy.
System colors (`--color-success/warning/error/info`) carry state and are scoped
outside the brand palette.

### 4.1 Token Layers

The token stack has three layers; production consumes the bottom two.

```text
primitives  →  semantic tokens  →  components
#2D6A4F        --color-brand        statement card border
#A95C42        --color-action       button background
```

Swap a semantic mapping once and every component shifts in lockstep. That is
the entire point: no surface references a hex value directly.

### 4.2 The One Action-Color Rule

Clay means click. Nowhere else. No decorative Clay, no Clay text in prose, no
Clay background for non-action content.

## 5. Typography

Three faces, three jobs. This supersedes the original Fraunces/Inter pairing.

| Face | Token | Job |
| --- | --- | --- |
| Geist | `--font-display` | Headlines, navigation, buttons, forms, statements, every tabular figure |
| Newsreader | `--font-prose` | Paragraphs, ledes, owner letters, long-form (use the `.prose` class) |
| Fraunces (italic) | `--font-accent` | The signature only — "Megan," once per document, in Cedar |

Type scale is base 16px, ratio 1.250: `--text-xs` (12) through `--text-display`
(80). Enable tabular numerals (`.tnum`) on any financial figure.

Do not mix italics and bold, and do not use italics anywhere except the Fraunces
signature. Use middle dots (·) over em dashes in display copy.

### 5.1 Two Signature Patterns

- **Tracked-out label over heading.** Small, uppercased, `--tracking-wide`, in
  `--color-text-muted`. Example: `MAINTENANCE` over `Boiler replacement, 18th Ave NE`.
- **Signature line.** Italic Fraunces first name in Cedar, then the operator
  line in tracked small caps: `Megan` over `MEGAN GREEN · DESIGNATED BROKER`.

## 6. Audience Modes

Set `data-audience` on the page container. Modes remap surface tokens only; the
palette, components, and voice are constant.

| Mode | Surface | Density | Imagery | Primary CTA |
| --- | --- | --- | --- | --- |
| `neutral-acquisition` | Cream | Low | Operator portrait | Two equal Clay CTAs |
| `owner-acquisition` | Paper | High | Statements, kitchen-table meeting | Clay "Request a proposal" |
| `owner-product` | Paper | High | None | Clay "Approve repair" |
| `renter-acquisition` | Cream | Low | Full-bleed property photos | Clay "Schedule a tour" |
| `renter-product` | Paper + Cream accent | Medium | None | Clay "Pay rent" |

Secondary actions are Cedar-outlined (acquisition) or Sky links (portals).

## 7. Spacing, Radius, Elevation

- **Spacing**: 4px base. `--space-1` (4) through `--space-24` (96). Everything is a multiple of 4.
- **Radius**: `--radius-sm` 4 (inputs), `--radius-md` 8 (buttons, cards), `--radius-lg` 16 (hero, modals), `--radius-pill` (status chips only). Nothing above 16px on UI elements.
- **Elevation**: only `--shadow-1/2/3` (soft, cool-tinted, low opacity). No gradients, no custom shadows.

## 8. Component Grammar

Six components carry most of the brand. Form is constant across modes; surface
and content shift. Copy these recipes verbatim.

### 8.1 Button

```css
.button {
  background: var(--color-action);
  color: var(--on-action);
  font-family: var(--font-display);
  font-weight: var(--weight-semibold);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  border: none;
}
.button--secondary { background: transparent; color: var(--color-brand); border: 1px solid var(--color-brand); }
.button--quiet { background: transparent; color: var(--color-brand); padding: var(--space-2) var(--space-3); text-decoration: underline; }
```

### 8.2 Statement Card

```css
.statement-card {
  background: var(--surface-primary);
  border: 1px solid var(--color-divider);
  border-left: 4px solid var(--color-brand); /* Cedar = the brand signature on data surfaces */
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-1);
}
```

### 8.3 Listing Card

```css
.listing-card { background: var(--color-cream); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-1); }
.listing-card__photo { aspect-ratio: 4 / 3; object-fit: cover; }  /* photo is the hero */
.listing-card__cta { background: var(--color-action); color: var(--on-action); } /* the only action on the card */
```

### 8.4 Form Input

```css
.input {
  background: var(--surface-primary);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-display);
  color: var(--color-text);
}
.input:focus-visible { border-color: var(--color-brand); outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset); }
```

### 8.5 Callout

State callouts use system colors, never Clay (Clay is reserved for action).

```css
.callout { background: var(--color-cream); border-left: 4px solid var(--color-brand); border-radius: var(--radius-sm); padding: var(--space-4) var(--space-6); }
.callout--success { border-left-color: var(--color-success); }
.callout--warning { border-left-color: var(--color-warning); }
.callout--error   { border-left-color: var(--color-error); }
.callout--info    { border-left-color: var(--color-info); }
```

### 8.6 Signature Block

```css
.signature__name { font-family: var(--font-accent); font-style: italic; font-size: var(--text-lg); color: var(--color-brand); }
.signature__role { font-family: var(--font-display); font-size: var(--text-sm); color: var(--color-text-muted); letter-spacing: var(--tracking-wide); text-transform: uppercase; }
```

## 9. Accessibility Floors

- Body text clears WCAG AA (4.5:1) on Cream and Paper for Ink, Cedar, Clay, and all four system colors. Clay at `#A95C42` is accessible at any size; the old 16px-minimum constraint is gone.
- Stone, Sky-on-light, `ink-40`, and `ink-20` are non-text tokens. They must clear 3:1 against adjacent UI per WCAG 1.4.11 but never carry body text.
- Focus ring: Cedar, 2px width, 2px offset (`:focus-visible`). 5.4:1 on Cream.
- State is never color-only (WCAG 1.4.1). Every state surface pairs color with an icon and a text label.

| State | Color | Icon | Label |
| --- | --- | --- | --- |
| Success | `--color-success` | check | "Paid" / "Approved" |
| Warning | `--color-warning` | exclamation | "Pending" / "Due soon" |
| Error | `--color-error` | alert | "Failed" / "Overdue" |
| Info | `--color-info` | i-in-circle | "Note" / "Hint" |

## 10. The Five Rules

1. **Clay = click.** Nowhere else.
2. **Seven primitives. No more.** Additions require governance review.
3. **`renter` → `resident`.** Pre-customer is "renter," authenticated tenant is "resident," owner stays "owner." Never "tenant portal."
4. **Megan signs the work.** A named operator appears in every mode.
5. **State colors are scoped outside the brand.** Brand colors express identity; system colors carry information. Never overload Cedar with success or Clay with error.

## 11. Iconography and Photography

- **Icons**: single-weight line, 1.5px stroke, square caps, rounded joins, 24px grid. Color inherits `--color-text`. No fills, no two-tone, no gradients. Reference family: `lucide` with customized stroke weight.
- **Photography first.** Real PNW homes (wide, level, daylight, no HDR, no fisheye) and the real operator (Megan outdoors at a managed property, natural light, working clothes).
- **Never**: stock handshakes, suited-couple-with-keys, Seattle skyline, drone-over-Rainier, diverse-team-at-laptop, sunbeam-perfect-lawn. The category is saturated with these; refusing them is the brand.
