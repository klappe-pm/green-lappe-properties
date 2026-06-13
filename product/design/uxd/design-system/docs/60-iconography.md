---
domain: brand
category: design-system
sub-category: iconography
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 30-design-tokens
produces:
  - icon-set-spec
  - icon-sizing-rules
  - icon-color-rules
  - icon-implementation-pattern
  - forbidden-icon-patterns
executor: design
aliases: []
tags: []
---

# 60-iconography

The icon system. Single-weight line icons drawn on a 24px grid, sourced from the Lucide icon set with selective customization. Consumed by every component that uses iconography.

## Dependencies

- `30-design-tokens` for color tokens
- `22-typography-usage` for label sizing alongside icons

## Outputs

1. Icon style specifications
2. Icon sizing scale
3. Icon color rules
4. Implementation pattern (SVG inline, Lucide React, or Tabler webfont)
5. Approved icon list for common UI patterns
6. Forbidden icon patterns

## Style specifications

| Attribute | Value |
|---|---|
| Stroke width | 1.5px |
| Stroke linecap | round |
| Stroke linejoin | round |
| Stroke color | `currentColor` (inherits from parent) |
| Fill | none (line icons only; no filled icons) |
| Grid | 24px artboard |
| Default size | 16px or 20px inline; 24px standalone |

## Icon source

**Primary library**: Lucide (https://lucide.dev). Open-source, MIT-licensed, 1000+ icons. Available as React components, SVG sprite, or webfont.

**Implementation in Astro**: use `astro-icon` with the Lucide pack:

```astro
---
import { Icon } from 'astro-icon/components';
---
<Icon name="lucide:home" class="w-5 h-5 text-ink-60" />
```

**Inline SVG fallback** (for components that need direct SVG):

```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <polyline points="9 22 9 12 15 12 15 22" />
</svg>
```

## Sizing scale

| Token | Size | Use cases |
|---|---|---|
| `icon-xs` | 12px (`w-3 h-3`) | Inline within sm text; badge icons |
| `icon-sm` | 16px (`w-4 h-4`) | Buttons, links, inline within base text |
| `icon-md` (default) | 20px (`w-5 h-5`) | Standalone in UI; nav, alerts |
| `icon-lg` | 24px (`w-6 h-6`) | Empty states, feature lists, large standalone |
| `icon-xl` | 32px (`w-8 h-8`) | Hero illustration moments (rare) |

## Color rules

| Context | Color |
|---|---|
| Inline with text | inherits `currentColor` |
| Default standalone | `--color-ink-60` |
| Active state | `--color-cedar` |
| Error icon | `--color-error` |
| Warning icon | `--color-warning` |
| Success icon | `--color-success` |
| Info icon | `--color-info` |
| Disabled | `--color-ink-40` |

Never use Clay for icons unless the icon is part of a click action (button icon).

## Approved icons by use case

### Navigation

| Use | Lucide name |
|---|---|
| Home | `home` |
| Menu open | `menu` |
| Menu close | `x` |
| Back arrow | `arrow-left` |
| Forward arrow | `arrow-right` |
| External link | `arrow-up-right` |
| Breadcrumb separator | `chevron-right` |
| Settings | `settings` |
| Sign out | `log-out` |

### Properties

| Use | Lucide name |
|---|---|
| Bedroom | `bed` |
| Bathroom | `bath` |
| Square footage | `ruler` |
| Pet-friendly | `paw-print` |
| Parking | `car` |
| Laundry | `washing-machine` |
| Heat | `flame` |
| Available date | `calendar` |

### Actions

| Use | Lucide name |
|---|---|
| Email | `mail` |
| Phone | `phone` |
| Map | `map-pin` |
| Download | `download` |
| Upload | `upload` |
| Edit | `pencil` |
| Trash / delete | `trash-2` |
| Add | `plus` |
| Subtract / remove | `minus` |
| Search | `search` |
| Filter | `filter` |
| Share | `share-2` |
| Copy | `copy` |

### Status and state

| Use | Lucide name |
|---|---|
| Check / success | `check-circle-2` |
| Warning | `alert-triangle` |
| Error | `alert-circle` |
| Info | `info` |
| Pending | `clock` |
| Loading | `loader-2` (with spin animation) |
| New | `sparkles` (rare) |

### Documents and records

| Use | Lucide name |
|---|---|
| Document | `file-text` |
| Statement | `receipt` |
| Lease | `file-signature` |
| Contract | `file-check` |
| Image | `image` |

### Maintenance

| Use | Lucide name |
|---|---|
| Repair | `wrench` |
| Heat / HVAC | `thermometer` |
| Plumbing | `droplets` |
| Electrical | `zap` |
| Roof | `home` |

## Implementation patterns

### Inline with text (no extra spacing needed; flex handles)

```html
<span class="inline-flex items-center gap-2">
  <Icon name="lucide:check-circle-2" class="w-4 h-4 text-success" />
  Application received
</span>
```

### Button icon (leading)

```html
<button class="inline-flex items-center gap-2 ...">
  <Icon name="lucide:download" class="w-4 h-4" aria-hidden="true" />
  Download statement
</button>
```

### Button icon (trailing arrow)

```html
<a href="/owners" class="inline-flex items-center gap-2 text-cedar font-medium">
  Learn more
  <Icon name="lucide:arrow-right" class="w-4 h-4" aria-hidden="true" />
</a>
```

### Icon-only button

Must include `aria-label`:

```html
<button class="min-h-touch min-w-touch ..." aria-label="Close">
  <Icon name="lucide:x" class="w-5 h-5" aria-hidden="true" />
</button>
```

### Property card metadata

```html
<div class="flex items-center gap-4 text-sm text-ink-80">
  <span class="inline-flex items-center gap-1.5">
    <Icon name="lucide:bed" class="w-4 h-4 text-ink-60" aria-hidden="true" />
    2 bed
  </span>
  <span class="inline-flex items-center gap-1.5">
    <Icon name="lucide:bath" class="w-4 h-4 text-ink-60" aria-hidden="true" />
    1 bath
  </span>
  <span class="inline-flex items-center gap-1.5">
    <Icon name="lucide:ruler" class="w-4 h-4 text-ink-60" aria-hidden="true" />
    950 sqft
  </span>
</div>
```

### Empty state icon

```html
<Icon name="lucide:inbox" class="w-12 h-12 text-ink-40 mb-4" aria-hidden="true" />
```

## Accessibility

- Decorative icons: `aria-hidden="true"`
- Meaningful icons (icon-only buttons, status indicators): include `aria-label` on the parent
- Status icons accompanying text: text carries meaning; icon is decorative (`aria-hidden`)

## Forbidden patterns

- Filled icons (`lucide:home` not `lucide:home-filled`)
- Multi-color or two-tone icons
- Gradient icons
- Drop shadows on icons
- Icons larger than 32px (use illustration instead)
- Custom-drawn icons (use Lucide; commission new icons only via governance review)
- Emoji as icon replacements
- Skeuomorphic icons (3D representations, photorealistic)
- Icons without `aria-hidden` or `aria-label` (must have one)
- Different stroke widths in the same composition

## Acceptance

This doc is acceptable when:

- Every UI surface in the system has access to the approved icon list
- Implementation pattern works in Astro with `astro-icon` and inline SVG
- Sizing and color rules are token-based, not arbitrary
- Forbidden patterns are flaggable in code review
