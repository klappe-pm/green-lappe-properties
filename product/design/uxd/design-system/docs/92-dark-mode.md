---
domain: brand
category: design-system
sub-category: dark-mode
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 10-color-system
  - 30-design-tokens
produces:
  - dark-mode-decision-and-rationale
  - phase-2-implementation-plan
  - token-mapping-strategy
  - audience-specific-dark-mode-policy
  - forbidden-patterns
executor: design
aliases: []
tags: []
---

# 92-dark-mode

The dark mode strategy. Documents the deliberate phase-1 decision to not ship dark mode at launch, the conditions that would trigger phase-2 implementation, the technical strategy that would be used when it does ship, and the audience-mode-specific considerations. Consumed by anyone questioning whether dark mode is missing.

## Dependencies

- `10-color-system` for the palette that dark mode would derive from
- `30-design-tokens` for the token architecture dark mode would extend

## Outputs

1. The phase-1 decision (no dark mode at launch) with rationale
2. Phase-2 trigger conditions
3. The dark-mode token strategy (semantic mapping, not duplicate primitives)
4. Audience-mode-specific dark mode policy
5. Forbidden dark-mode patterns

## 92.1 Phase 1 decision: no dark mode at launch

The brand does not ship dark mode at launch. This is a deliberate decision, not an oversight.

### 92.1.1 Why no dark mode at launch

Six reasons:

1. **The brand's identity is the warm Cream palette.** Cream + Cedar is the brand. A dark mode version weakens that identity by suggesting the cream is incidental rather than central. The brand should stand on its strongest visual at launch.
2. **Property management is a daytime, business-context use case.** Owners check statements during business hours, in office or kitchen lighting. Renters browse listings at any hour but most often on commute or at a desk. Neither audience is doing late-night-in-bed app browsing where dark mode pays back hardest.
3. **Implementation cost is real.** Dark mode is not a hue inversion; it requires color rebalancing, contrast re-verification, photography handling (most real estate photos are bright daylight), shadow rebalancing, illustration rework, document template revision, email template revision. The launch budget is better spent on operational features.
4. **Audience-mode complexity already exists.** The system has five audience modes (`11-audience-modes`). Adding a light/dark axis multiplies this to ten variants. The cognitive load on a small team is significant.
5. **Maintenance burden compounds.** Every new component must be designed in both modes. Every photograph must work in both. Every illustration. Every email. Every document. This burden grows linearly with component count and feature count.
6. **No customer or stakeholder has asked.** Phase-1 decisions are driven by evidence of demand. No owner or renter has asked for dark mode on competitor sites either; this is not a market-table-stakes feature.

### 92.1.2 What the brand does instead

The brand ships:

- A high-contrast, warm light palette that performs well in daylight, indoor lighting, and most low-light conditions
- Full `prefers-reduced-motion` support
- AA contrast across the system
- Native OS dark mode is honored at the platform level (Safari's reader view, OS-level inversion accessibility features); the brand does not interfere

### 92.1.3 What the brand will not say

The brand does not market the absence of dark mode. There is no "dark mode coming soon" badge. The brand's confidence in its warm palette is not undermined by qualifying it.

## 92.2 Phase 2 trigger conditions

Dark mode moves from "not shipping" to "designing" when any of the following trigger:

1. **Three or more direct user requests** from owners or residents within a 90-day window, including specific use-case context (e.g., "I check the portal at 11pm and the bright screen wakes my partner")
2. **A measurable accessibility need** identified during the quarterly audit (e.g., user with photosensitivity reports difficulty)
3. **Competitor benchmark shift**: if AppFolio, Buildium, or comparable PMS adds dark mode and customer expectations meaningfully change
4. **The brand reaches 100+ doors** and has dedicated engineering bandwidth that previously did not exist

Until trigger conditions fire, dark mode is deferred. The decision is reviewed annually in `94-governance`.

## 92.3 Phase 2 technical strategy

When dark mode is implemented, the strategy is **semantic token remapping**, not duplicate primitive colors.

### 92.3.1 The bad approach (not used)

```css
/* Don't do this */
:root {
  --color-bg: #FBF6EC;
  --color-text: #1F2A2E;
}
[data-theme="dark"] {
  --color-bg: #1F2A2E;
  --color-text: #FBF6EC;
}
```

This requires every component to use the indirection layer and inverts the visual identity. Cedar becomes a dark-mode primary that has no relationship to the brand.

### 92.3.2 The good approach (will be used)

```css
/* Three layers: primitives, semantic aliases, theme-aware tokens */

/* Layer 1: primitives are immutable */
:root {
  --color-cedar: #2D6A4F;
  --color-ink:   #1F2A2E;
  --color-cream: #FBF6EC;
  --color-paper: #F7F5F0;
  /* etc. */
}

/* Layer 2: semantic aliases map to primitives */
:root {
  --surface-bg:     var(--color-cream);
  --surface-text:   var(--color-ink);
  --surface-border: var(--color-ink-20);
  --brand-primary:  var(--color-cedar);
}

/* Layer 3: dark mode remaps the semantic aliases, not the primitives */
[data-theme="dark"] {
  --surface-bg:     var(--color-ink);
  --surface-text:   var(--color-cream);
  --surface-border: rgba(251, 246, 236, 0.12);
  --brand-primary:  #5FAE8C;  /* a lighter Cedar variant for dark backgrounds */
}
```

This preserves:

- Primitive color identity (Cedar is always Cedar; Cream is always Cream)
- Semantic intent (`--surface-bg` means "the default surface for the current theme")
- Component-level stability (components reference `--surface-bg`, not `--color-cream` directly)

### 92.3.3 New dark-mode-only primitives

Some primitives needed in dark mode do not exist in light mode and must be added:

| Token | Purpose | Likely value |
|---|---|---|
| `--color-cedar-light` | Cedar variant for dark backgrounds (Cedar 5.4:1 fails AA on Ink; lighter variant restores contrast) | `#5FAE8C` (target: 4.5:1 on Ink) |
| `--color-cream-dim` | Slightly dimmed Cream for dark mode body text (full Cream can read harshly) | `#E8E4DA` |
| `--color-ink-light` | Lighter Ink variant for dark mode borders and dividers | `#3D4A4E` (already exists as Ink-80) |

### 92.3.4 Photography in dark mode

Property photography is generally bright daylight. In dark mode, photo backgrounds in cards will stand out as bright rectangles. Two approaches:

1. **Subtle desaturation overlay** (preferred): apply a `mix-blend-mode: multiply` overlay at low opacity to slightly mute photo brightness
2. **Photo-level border**: add a 1px Ink-light border on photos to define the edge

Operator portrait of Megan: photograph in dark mode mode (a separate photo with a darker, more atmospheric setting). Or, photograph in front of a backdrop that works in both modes.

### 92.3.5 Email and document templates in dark mode

Email clients with dark mode (Gmail, Apple Mail, Outlook) apply their own color inversion to incoming emails. The brand's email templates are designed to render acceptably under those inversions but not designed specifically for dark mode.

Documents (PDFs, owner statements) are always light-mode (Cream background, Ink text). Documents are typically printed or downloaded, not viewed in dark contexts.

## 92.4 Audience-mode-specific dark mode policy

Different audience modes have different dark-mode appropriateness:

| Audience mode | Dark mode appropriate? | Reasoning |
|---|---|---|
| neutral-acquisition (landing) | Limited | The hero photography and brand expression are tuned for warm cream; dark mode here weakens identity |
| owner-acquisition | Limited | Same reasoning |
| owner-product (portal) | Yes when implemented | Owners check statements; some prefer dark mode for screen reading |
| renter-acquisition | Limited | Listing photos are bright; dark mode card grids would be visually jarring |
| renter-product (portal) | Yes when implemented | Same as owner-product |

When dark mode ships, it will be available in the two product modes first, marketing modes second.

## 92.5 OS-level dark mode handling at launch

At launch (without explicit dark mode), the system does not respond to `prefers-color-scheme: dark`. This is intentional:

```css
/* The system intentionally does NOT include this at launch */
@media (prefers-color-scheme: dark) {
  /* nothing */
}
```

Rationale: a half-implementation (`prefers-color-scheme: dark` triggering partial dark theming) reads as worse than no dark mode. When the OS reports dark mode preference, the brand displays its light palette anyway. The brand's confidence in its palette is the design statement.

A user whose OS is in dark mode encounters the cream brand and is not visually confused. The contrast and readability remain strong.

## 92.6 Forbidden dark-mode patterns

| Pattern | Why forbidden |
|---|---|
| Inverting primitive colors (Cedar becomes a different hue) | Destroys brand identity |
| Using `filter: invert()` on photographs | Reads as glitch; photos look broken |
| Auto-switching based on time of day | Surprises the user; loses agency |
| A dark-mode toggle without remembering the preference | Friction; user toggles repeatedly |
| Naming dark mode "night mode" | Suggests time-of-day; "dark mode" is the established term |
| Dark mode that disables animations or features | Should be feature-parity |
| Marketing dark mode as the "real" experience and light as "compatibility" | Reverses the brand's intentional choice |
| Shipping dark mode without re-verifying all contrast pairs | Hidden AA failures |
| Shipping dark mode without dark-mode photography or illustration | Inconsistent visual treatment |

## 92.7 Acceptance

This doc is acceptable when:

- A stakeholder asking "why no dark mode" gets a documented answer
- The phase-2 trigger conditions are unambiguous
- The implementation strategy is documented in enough detail that phase-2 work can begin from this doc plus `10-color-system`
- The forbidden patterns prevent a future engineer from shipping a degraded dark mode under time pressure
- Annual governance review includes dark mode as a standing item
