---
domain: brand
category: design-system
sub-category: color
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 01-positioning
produces:
  - seven-primitive-palette
  - derived-neutrals
  - system-state-colors
  - contrast-matrix
  - color-ratios-per-audience-mode
executor: design
aliases: []
tags: []
---

# 10-color-system

The complete color system. Seven primitives, four derived neutrals, four system colors, semantic aliases, an accessibility contrast matrix, and per-audience-mode color ratio guidance. Consumed by every visual surface.

## Dependencies

- `01-positioning` to validate that the palette stays inside the brand's anti-positioning (no navy, no startup mint, no luxury beige)

## Outputs

1. Seven primitive colors with hex values and use roles
2. Four derived neutrals (Ink at four opacities)
3. Four system state colors
4. Contrast matrix proving WCAG compliance
5. Per-audience-mode color ratio guidance

## 5.1 Seven primitives

```
Cedar    #2D6A4F    primary brand color
Ink      #1F2A2E    text, deep contrast
Cream    #FBF6EC    marketing surface (warm)
Paper    #F7F5F0    product surface (cooler)
Stone    #D4D1CA    neutral mid-tone
Clay     #A95C42    action accent (CTAs only)
Sky      #7BA7B8    secondary accent
```

Pure black `#000000` and pure white `#FFFFFF` are forbidden in brand surfaces. Use Ink and Cream.

## 5.2 Derived neutrals

Ink at four perceived opacities, used for text emphasis, dividers, and decorative borders.

| Token | Hex | Use |
|---|---|---|
| Ink-80 | `#3D4A4E` | Body emphasis, secondary headings |
| Ink-60 | `#5C6A6E` | Metadata, captions, muted text |
| Ink-40 | `#8A9498` | Disabled state (large text only), decorative |
| Ink-20 | `#C2C8CA` | Dividers, borders (non-text) |

Ink-40 fails AA for body text. Use only for elements at 18pt+ or 14pt bold+.

## 5.3 System state colors

Brand colors are for brand expression. State colors are for information.

| Token | Hex | On Cream | Use |
|---|---|---|---|
| Success | `#3E7A55` | 5.0:1 | Confirmation, paid, completed |
| Warning | `#A8741A` | 4.6:1 | Caution, expiring, pending review |
| Error | `#9C2D1F` | 6.2:1 | Failed, overdue, requires action |
| Info | `#3A6480` | 5.7:1 | Neutral information, hints |

## 5.4 Contrast matrix

| Foreground | Background | Ratio | Body AA | Body AAA | Large AA |
|---|---|---|---|---|---|
| Ink | Cream | 13.8:1 | pass | pass | pass |
| Ink | Paper | 13.4:1 | pass | pass | pass |
| Cedar | Cream | 5.4:1 | pass | fail | pass |
| Cedar | Paper | 5.3:1 | pass | fail | pass |
| Cream | Cedar | 5.4:1 | pass | fail | pass |
| Cream | Ink | 13.8:1 | pass | pass | pass |
| Cream | Clay | 4.5:1 | pass | fail | pass |
| Clay | Cream | 4.5:1 | pass | fail | pass |
| Clay | Ink | 4.6:1 | pass | fail | pass |
| Sky | Ink | 5.2:1 | pass | fail | pass |
| Sky | Cream | 2.6:1 | fail | fail | fail |

Sky on Cream is not text-safe. Use Sky for decorative elements, icon fills, or large display moments only.

## 5.5 Semantic aliases

Component-level tokens reference these. Changing a primitive flows through; changing a semantic alias is a deliberate remapping.

```
--color-brand:        var(--color-cedar)
--color-brand-deep:   var(--color-ink)
--color-action:       var(--color-clay)
--color-accent-cool:  var(--color-sky)
--color-neutral:      var(--color-stone)
--color-text:         var(--color-ink)
--color-text-muted:   var(--color-ink-60)
--color-text-subtle:  var(--color-ink-40)
--color-divider:      var(--color-ink-20)
--color-divider-bold: var(--color-ink)
```

## 5.6 Per-audience-mode color ratios

Approximate surface area share by mode. Targets, not hard caps.

| Color | Marketing-neutral | Owner acquisition | Owner portal | Renter acquisition | Resident portal |
|---|---|---|---|---|---|
| Cream | 45-55% | 15-20% | 0% | 50-60% | 5-10% |
| Paper | 15-20% | 50-60% | 70-80% | 10-15% | 60-70% |
| Cedar | 15-20% | 10-15% | 5-10% | 10-15% | 5-10% |
| Ink | 10-15% | 15-20% | 15-20% | 8-12% | 15-20% |
| Stone | 3-5% | 3-5% | 5-8% | 2-4% | 5-8% |
| Clay | 3-5% | 3-5% | 2-4% | 4-6% | 2-4% |
| Sky | 1-2% | 1-2% | 2-3% | 1-2% | 2-3% |

## 5.7 The one action color rule

Clay equals click. Nowhere else.

- Clay is for primary CTAs only
- Never use Clay for decorative purposes
- Never use Clay for prose text
- Never use Clay for backgrounds of non-action content
- Never use Clay for icons unrelated to actions

If something is Clay, the user can click it.

## 5.8 Forbidden color combinations

- Clay text on Sky background (contrast fail and competing accents)
- Two saturated colors competing in one composition (Clay + Sky + saturated illustration)
- Cedar and Success in close proximity (similar hue, confuses brand with state)
- Clay and Error adjacent without icons (color-only state risk)
- Gradients between tokens (the Cedar gradient on photo placeholders is the only allowed exception)
- Stone for any text (fails contrast)
- Sky for body text on Cream or Paper

## Acceptance

This doc is acceptable when:

- Every primitive has a hex value, a use role, and contrast data against its likely backgrounds
- A designer can choose a color for any element by consulting only this doc
- Every WCAG AA failure case is documented and given a workaround
