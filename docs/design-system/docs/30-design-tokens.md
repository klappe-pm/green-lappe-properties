---
domain: brand
category: design-system
sub-category: design-tokens
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 10-color-system
  - 11-audience-modes
  - 21-typography-tokens
produces:
  - tokens-css-file
  - modes-css-file
  - tailwind-config-js
  - token-layer-architecture
executor: engineering
aliases:
tags:
---

# 30-design-tokens

The unified design token spec. Three CSS files (`tokens.css`, `modes.css`, `base.css`) plus `tailwind.config.js`, all reading from a single source of truth. Consumed by every component, layout, and page.

## Dependencies

- `10-color-system` for color tokens
- `11-audience-modes` for surface override behavior
- `21-typography-tokens` for type tokens

## Outputs

1. `green-pm-tokens.css` (primitives, derived neutrals, system colors, semantic aliases, typography, spacing, radius, shadow, focus, motion, layout, z-index)
2. `modes.css` (audience-mode surface overrides)
3. `tailwind.config.js` (mirrors tokens.css for utility class generation)
4. Token layer architecture diagram

## Token layer architecture

Three layers, consumed in this order:

```
1. Primitives    Raw values (--color-cedar, --text-base, --space-4)
2. Semantics     Intent-mapped (--color-brand, --color-text, --surface)
3. Components    Component-specific (--button-bg, --card-border)
```

Change a primitive: every surface using that color or size updates.
Change a semantic: every component using that role updates.
Change a component token: only that component updates.

## File 1: `green-pm-tokens.css`

Location: `src/styles/tokens.css`

Full content specified in the companion file at `green-pm-tokens.css` in this repo. Key sections:

### Color primitives

```css
--color-cedar:  #2D6A4F;  /* primary brand */
--color-ink:    #1F2A2E;  /* text, deep contrast */
--color-cream:  #FBF6EC;  /* marketing surface (warm) */
--color-paper:  #F7F5F0;  /* product surface (cooler) */
--color-stone:  #D4D1CA;  /* neutral mid-tone */
--color-clay:   #A95C42;  /* action accent (AA on cream) */
--color-sky:    #7BA7B8;  /* secondary accent */
```

### Derived neutrals

```css
--color-ink-80: #3D4A4E;  /* body emphasis, secondary headings */
--color-ink-60: #5C6A6E;  /* metadata, captions */
--color-ink-40: #8A9498;  /* disabled (large only), decorative */
--color-ink-20: #C2C8CA;  /* dividers, borders (non-text) */
```

### System colors

```css
--color-success: #3E7A55;
--color-warning: #A8741A;
--color-error:   #9C2D1F;
--color-info:    #3A6480;
```

### Typography (v3 update)

```css
--font-display: 'Geist', system-ui, -apple-system, sans-serif;
--font-body:    'Newsreader', Georgia, 'Times New Roman', serif;
--font-accent:  'Fraunces', Georgia, 'Times New Roman', serif;
/* --font-mono removed in v3 */

--weight-regular:  400;
--weight-medium:   500;
--weight-semibold: 600;
--weight-bold:     700;

--tracking-tight:  -0.02em;
--tracking-normal: 0;
--tracking-wide:   0.08em;

--leading-tight:   1.15;
--leading-snug:    1.35;
--leading-normal:  1.55;
--leading-relaxed: 1.6;

--text-xs:       0.75rem;     /* 12px */
--text-sm:       0.875rem;    /* 14px */
--text-base:     1rem;        /* 16px */
--text-md:       1.125rem;    /* 18px mobile, 20px desktop */
--text-lg:       1.25rem;     /* 20px mobile, 24px desktop */
--text-xl:       1.5rem;      /* 24px mobile, 30px desktop */
--text-2xl:      1.875rem;    /* 30px mobile, 40px desktop */
--text-3xl:      2.25rem;     /* 36px mobile, 56px desktop */
--text-display:  2.75rem;     /* 44px mobile, 80px desktop */
--text-prose:    1.0625rem;   /* 17px Newsreader body */
```

### Spacing

```css
--space-1:  0.25rem;   /*  4px */
--space-2:  0.5rem;    /*  8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### Radius

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   16px;
--radius-pill: 999px;
```

### Shadow

```css
--shadow-1: 0 1px 2px rgba(31, 42, 46, 0.06);
--shadow-2: 0 4px 12px rgba(31, 42, 46, 0.08);
--shadow-3: 0 12px 32px rgba(31, 42, 46, 0.12);
```

### Focus

```css
--focus-ring-color:  var(--color-cedar);
--focus-ring-width:  2px;
--focus-ring-offset: 2px;
--focus-ring-soft:   rgba(45, 106, 79, 0.3);
```

### Motion

```css
--duration-fast:    100ms;
--duration-quick:   150ms;
--duration-default: 200ms;
--duration-slow:    250ms;
--easing-default:   cubic-bezier(0.4, 0, 0.2, 1);
```

### Layout

```css
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1536px;

--measure-prose: 65ch;
--measure-form:  40ch;
--measure-card:  40ch;

--touch-target: 44px;
```

### Z-index

```css
--z-base:     1;
--z-dropdown: 10;
--z-sticky:   20;
--z-skip:     25;
--z-modal:    30;
--z-popover:  40;
--z-toast:    50;
--z-tooltip:  60;
```

## File 2: `modes.css`

Location: `src/styles/modes.css`. Audience-mode surface overrides only. See `11-audience-modes.md` for the spec; the file is small enough to live in this doc:

```css
[data-audience="neutral-acquisition"]  { --surface: var(--color-cream); --surface-alt: var(--color-paper); }
[data-audience="owner-acquisition"]    { --surface: var(--color-paper); --surface-alt: var(--color-cream); }
[data-audience="owner-product"]        { --surface: var(--color-paper); --surface-alt: var(--color-paper); }
[data-audience="renter-acquisition"]   { --surface: var(--color-cream); --surface-alt: var(--color-paper); }
[data-audience="renter-product"]       { --surface: var(--color-paper); --surface-alt: var(--color-cream); }
```

## File 3: `tailwind.config.js`

Location: project root. Mirrors `tokens.css` values for utility class generation. The full config file is provided as a companion artifact. Key changes from v2:

- `fontFamily.display` is now Geist (was Fraunces)
- `fontFamily.body` is now Newsreader (was Inter)
- `fontFamily.accent` added for Fraunces (was not present)
- `fontFamily.mono` removed
- `fontSize.prose` added at 17px / 1.6

## Import order

In Astro layouts:

```html
<link rel="stylesheet" href="/styles/tokens.css">    <!-- 1: primitives, semantics -->
<link rel="stylesheet" href="/styles/modes.css">     <!-- 2: surface overrides -->
<link rel="stylesheet" href="/styles/base.css">      <!-- 3: element resets -->
<!-- 4: Tailwind utilities (built from tailwind.config.js) -->
```

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Acceptance

This doc is acceptable when:

- All three CSS files are produced and copy-pasteable
- The Tailwind config is copy-pasteable
- Every token has an inline comment explaining its use
- The import order is unambiguous
- The v3 typography pivot (Geist, Newsreader, Fraunces) is reflected in every token reference
