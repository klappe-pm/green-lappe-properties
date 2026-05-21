---
domain: brand
category: design-system
sub-category: radius-shadow
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 30-design-tokens
produces:
  - radius-scale-with-element-mapping
  - shadow-elevation-scale
  - border-rules
  - elevation-philosophy
  - forbidden-patterns
executor: design
aliases:
tags:
---

# 41-radius-shadow

The complete border radius and shadow elevation system. Defines the four-step radius scale with explicit element mapping, the three-step shadow scale with use rules, border conventions, the elevation philosophy that governs when shadow is appropriate, and forbidden patterns. Consumed by every component that has edges or floats above a surface.

## Dependencies

- `30-design-tokens` for the radius and shadow tokens this doc operationalizes
- `10-color-system` for surface color context (shadows behave differently on Cream vs Paper)

## Outputs

1. Four-step radius scale with element-by-element mapping
2. Three-step shadow scale with elevation philosophy
3. Border conventions (color, weight, when to use)
4. Single-side border patterns (Cedar left border for evidence cards)
5. Surface-aware shadow rules
6. Forbidden visual patterns

## 41.1 Radius scale

Four steps. Restrained on purpose. Aggressive rounding signals consumer app, fitness tracker, lifestyle brand. The system rounds with intent, not as a vibe.

| Token | Value | Tailwind class | Element mapping |
|---|---|---|---|
| `radius-sm` | 4px | `rounded-sm` | Inputs, tags, attribute chips, code blocks, callout boxes, table cells |
| `radius-md` | 8px | `rounded-md`, `rounded` | Buttons (all variants), cards (basic, listing, evidence), modal corners, dropdown menus, alerts, toast notifications |
| `radius-lg` | 16px | `rounded-lg` | Hero panels, full-screen modals, large feature blocks, the marketing CTA card |
| `radius-pill` | 999px | `rounded-pill`, `rounded-full` | Status chips (only), avatar containers, pagination current-page indicator |

### 41.1.1 The 4-8-16 progression

The scale doubles. 4 to 8 to 16. The pill is the discontinuity. This means three things:

1. **The eye can distinguish radius levels at a glance.** 4 and 6 read identical; 4 and 8 do not.
2. **Element nesting feels right.** A 4px-radius input inside an 8px-radius card inside a 16px-radius modal reads as nested levels of containment.
3. **The scale matches the spacing scale's doubling pattern** (4-8-16-24-32 etc.), giving the system internal coherence.

### 41.1.2 When to choose which radius

Default to `radius-md` (8px) for anything that's an interactive surface. Step down to `radius-sm` (4px) for elements smaller than a button (chips, tags, inputs nested inside cards). Step up to `radius-lg` (16px) only for surfaces that occupy a significant portion of viewport (heroes, full-screen modals, the proposal-request CTA card on the owner acquisition page).

### 41.1.3 Pill radius is special

`radius-pill` (999px) is reserved for two contexts:

1. **Status chips** that communicate state ("Available", "Paid", "Overdue"). The pill shape reads as a discrete, atomic status indicator.
2. **Avatar containers** which are typically circular by convention.

Never use `radius-pill` on buttons. Pill-shaped buttons signal consumer app, social media UI, dating app. The brand's anti-positioning rejects all three.

## 41.2 Border conventions

Borders are 1px by default. Color defaults to `ink-20` (light divider tone). Heavier borders use `ink-60` for emphasis or `cedar` for brand-tied accent.

| Border weight | Color | Tailwind | Use |
|---|---|---|---|
| 1px | `ink-20` | `border border-ink-20` | Default card border, input border (default state), divider |
| 1px | `cedar` | `border border-cedar` | Input border (focus state), button border (secondary variant focused), evidence card border (when full border used) |
| 1px | `ink-60` | `border border-ink-60` | Input border (filled state), button border (secondary hover) |
| 1px | `error` | `border border-error` | Input border (error state), error alert border |
| 1px | `success` | `border border-success` | Success alert border |
| 4px (left only) | `cedar` | `border-l-4 border-cedar` | Evidence card left rail, callout blockquote left rail |
| 4px (left only) | `clay` | `border-l-4 border-clay` | Action-required callout left rail (rare) |

### 41.2.1 The single-side border rule

Heavy borders (above 1px) are restricted to single-side application. The 4px-Cedar-left-border on evidence cards and pull quotes is the only documented heavy-border pattern. All-around 2px or 4px borders signal trade-show booth or sale flyer, not professional services.

### 41.2.2 Border with radius

When applying both border and radius, ensure the border weight does not overwhelm the radius. The 1px-default works at all four radius levels. Heavier borders (4px) only work with `radius-md` and below; at `radius-lg` they distort visually.

### 41.2.3 Border color matching shadow

When an element has both a border and a shadow, the border can be omitted in favor of the shadow's perceived edge. Both together can read busy. Choose one:

```html
<!-- Recommended: shadow only on Paper surface -->
<div class="bg-surface shadow-1 rounded-md p-6">...</div>

<!-- Recommended: border only on Cream surface -->
<div class="bg-surface border border-ink-20 rounded-md p-6">...</div>

<!-- Avoid: both -->
<div class="bg-surface border border-ink-20 shadow-1 rounded-md p-6">...</div>
```

## 41.3 Shadow elevation system

Three steps. Cool ink-tinted shadows, never pure black. Shadow encodes elevation; an element is at exactly one elevation step at a time.

| Token | Value | Tailwind class | Elevation level | Use |
|---|---|---|---|---|
| `shadow-1` | `0 1px 2px rgba(31, 42, 46, 0.06)` | `shadow-1`, `shadow-sm` | Hairline | Cards floating on a same-color surface (Paper-on-Paper), default for cards on white surfaces |
| `shadow-2` | `0 4px 12px rgba(31, 42, 46, 0.08)` | `shadow-2`, `shadow` | Floating | Dropdown menus, popovers, sticky nav drop shadow, hovered cards |
| `shadow-3` | `0 12px 32px rgba(31, 42, 46, 0.12)` | `shadow-3`, `shadow-lg` | Lifted | Modal dialogs, full-screen takeovers, toast notifications |

### 41.3.1 Why ink-tinted shadows

Pure black shadows (`rgba(0, 0, 0, 0.x)`) look harsh against the warm Cream and Paper surfaces. Tinting with Ink (`rgba(31, 42, 46, 0.x)`) produces a shadow that reads as the brand's own dark tone fading into the surface, not as a generic universal black. The effect is subtle but the system reads more cohesive.

### 41.3.2 Surface-aware shadow behavior

Shadows behave differently on Cream versus Paper:

| Surface | Recommended shadow |
|---|---|
| Cream (`#FBF6EC`) | Borders preferred over shadows; use `shadow-1` only when elevation is critical |
| Paper (`#F7F5F0`) | Shadows read more cleanly; `shadow-1` is appropriate for default card elevation |
| Ink (`#1F2A2E`) (dark sections) | Avoid shadow entirely; use a subtle Cedar or Cream border for definition instead |

### 41.3.3 Shadow plus background

Always pair shadow with an explicit background. Shadows on transparent elements produce visual artifacts:

```html
<!-- Right -->
<div class="bg-surface-alt shadow-1 rounded-md p-6">...</div>

<!-- Wrong -->
<div class="shadow-1 rounded-md p-6">...</div>
```

### 41.3.4 Hover-state shadow

Cards that elevate on hover step up by one level:

```html
<a href="/rentals/[slug]"
   class="block bg-surface-alt rounded-md p-6 shadow-1 hover:shadow-2 transition-shadow duration-default">
  <!-- Listing card content -->
</a>
```

The transition uses `duration-default` (200ms) and `easing-default` from the motion system. Hovering never exceeds `shadow-2`; `shadow-3` is reserved for modals.

### 41.3.5 No-shadow defaults

Many surfaces should not have shadow at all:

- Sections embedded inline in the page (these are not floating; they are part of the page flow)
- Statement tables (the data is the focus; shadows would distract)
- Footer (full-bleed; nothing to elevate above)
- Hero panels at full viewport width
- Listing detail content area (interior content; the card pattern doesn't apply)

## 41.4 Elevation philosophy

Elevation in this system communicates one thing: temporary floating. An element is shadowed because it has lifted away from the page surface to demand attention (a modal), because it is floating above other content (a dropdown), or because it represents a discrete object the user could pick up (a card).

Elevation does not communicate:

- Importance (use color, weight, or position)
- Hierarchy of content (use type scale and spacing)
- Brand expression (use color)
- Decoration (decorative shadow is forbidden)

### 41.4.1 The "would I pick this up" test

When deciding whether an element should have shadow, ask: does this element feel like a discrete object I could pick up and move? Cards yes. Modals yes. Page sections no. Headlines no. Statement tables no.

### 41.4.2 The "is it floating above other content" test

Dropdowns, popovers, tooltips, toasts: all float above other content and have shadow. Inline elements: no.

## 41.5 Combined patterns

The most common surface compositions:

### 41.5.1 Default card (on Paper surface)

```html
<article class="bg-surface-alt shadow-1 rounded-md p-6">
  ...
</article>
```

### 41.5.2 Default card (on Cream surface)

```html
<article class="bg-surface-alt border border-ink-20 rounded-md p-6">
  ...
</article>
```

### 41.5.3 Evidence card (Cedar left rail)

```html
<article class="bg-cream border-l-4 border-cedar rounded-r-md rounded-l-none p-6">
  ...
</article>
```

The right side carries `rounded-r-md` (8px); the left side is squared (`rounded-l-none`) so the 4px Cedar rail meets a flat edge.

### 41.5.4 Hovered listing card

```html
<a class="block bg-surface-alt rounded-md overflow-hidden shadow-1 hover:shadow-2 transition-shadow duration-default border border-ink-20">
  <img class="aspect-[4/3] object-cover w-full" />
  <div class="p-4">...</div>
</a>
```

### 41.5.5 Modal dialog

```html
<div class="fixed inset-0 bg-ink/40 z-modal flex items-center justify-center p-4">
  <div role="dialog" class="bg-surface-alt rounded-lg shadow-3 p-8 max-w-modal w-full">
    ...
  </div>
</div>
```

The overlay backdrop uses `bg-ink/40` (40% opacity Ink), not pure black. The dialog uses `radius-lg` (16px) and `shadow-3`.

### 41.5.6 Dropdown menu

```html
<div class="absolute top-full right-0 mt-2 bg-surface-alt rounded-md shadow-2 border border-ink-20 min-w-[200px] py-2 z-dropdown">
  <a class="block px-4 py-2 hover:bg-cream">Menu item</a>
</div>
```

The dropdown uses both border (definition against any background) and shadow (elevation cue).

### 41.5.7 Status chip (pill)

```html
<span class="bg-success/10 text-success font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  Paid
</span>
```

## 41.6 Forbidden patterns

| Pattern | Why forbidden |
|---|---|
| Radius above 16px on UI elements | Reads as consumer app; outside the system's restrained range |
| Pure black shadows (`rgba(0, 0, 0, x)`) | Reads as universal generic; clashes with warm Cream surface |
| Layered shadows on the same element | Elevation should be one step; layering creates ambiguous depth |
| Inset shadows | Reads as skeuomorphic; outside the system's flat-but-warm aesthetic |
| Glow effects (large blur, colored shadow) | Reads as gaming UI, neon, club flyer |
| Drop shadows on text | Reads as 2003 web design |
| Borders thicker than 4px | Reads as trade show booth; outside system's restraint |
| Two-color borders or border-images | Reads as gradient frame; outside system's flat aesthetic |
| Dotted or dashed borders for non-state purposes | Reserved for "drop zone" file upload UI only |
| Rainbow gradient borders | Forbidden everywhere |
| Pill-shaped buttons (`rounded-full` on `<button>`) | Reads consumer app, not professional services |
| Squared (`rounded-none`) on cards or buttons | Reads brutal or austere; outside system's warmth |

## 41.7 Acceptance

This doc is acceptable when:

- A component author can choose radius and shadow for any element by consulting only this doc
- Every shipping component uses a token from this scale; no arbitrary radius or shadow values
- Pure black shadows are absent from the codebase
- The evidence card pattern (4px Cedar left border) is the only documented heavy-border pattern
- The "single elevation step" rule is verifiable: no element layers multiple shadow tokens
