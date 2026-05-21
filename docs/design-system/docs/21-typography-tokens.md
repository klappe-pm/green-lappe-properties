---
domain: brand
category: design-system
sub-category: typography-tokens
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 20-typography-strategy
produces:
  - font-family-tokens
  - weight-tokens
  - size-tokens
  - leading-tokens
  - tracking-tokens
  - composite-role-tokens
  - tailwind-config-snippet
executor: engineering
aliases:
tags:
---

# 21-typography-tokens

The full token specification for the v3 type system. Every variable, primitive and composite, with inline comments. Consumed by `30-design-tokens.md` (the CSS file), `tailwind.config.js`, and every component that references type.

## Dependencies

- `20-typography-strategy` for the three locked face choices

## Outputs

1. Font family primitives (3 families)
2. Weight tokens (4 weights)
3. Size tokens (9 mobile sizes, 9 desktop sizes)
4. Leading tokens (3 values)
5. Tracking tokens (3 values)
6. Composite role tokens (12+ semantic shortcuts)
7. Tailwind config extension snippet

## 12.1 Font family primitives

```css
--font-display:   'Geist', system-ui, -apple-system, sans-serif;
--font-body:      'Newsreader', Georgia, 'Times New Roman', serif;
--font-accent:    'Fraunces', Georgia, 'Times New Roman', serif;
```

Notes:

- `--font-display` covers wordmark, headings, navigation, buttons, forms, tables, financial figures, statements, eyebrow labels. Default UI face.
- `--font-body` covers prose paragraphs in blog posts, owner letters, document body, lease text, long-form explainers. Anywhere a reader reads.
- `--font-accent` covers the italicized signature line only. Three documented uses.

## 12.2 Weight tokens

```css
--weight-regular:  400;   /* body default, table cells, form values */
--weight-medium:   500;   /* form labels, nav links, light emphasis */
--weight-semibold: 600;   /* headings, buttons, wordmark, signature accent */
--weight-bold:     700;   /* rare; only at display sizes for very high emphasis */
```

Forbidden weights:

- 100, 200, 300 (Light, Thin, ExtraLight): never used; reads luxury-thin-sans
- 800, 900 (ExtraBold, Black): never used; reads display-only and clumsy at body sizes

## 12.3 Mobile-first size scale

Mobile is the default. Desktop sizes apply at the `md` breakpoint (768px+).

```css
/* Mobile (default) */
--text-xs:      0.75rem;    /* 12px - captions, legal, tag chips */
--text-sm:      0.875rem;   /* 14px - metadata, table cells, eyebrows */
--text-base:    1rem;       /* 16px - body, default */
--text-md:      1.125rem;   /* 18px - lead paragraphs */
--text-lg:      1.25rem;    /* 20px - H4, card titles */
--text-xl:      1.5rem;     /* 24px - H3 */
--text-2xl:     1.875rem;   /* 30px - H2 */
--text-3xl:     2.25rem;    /* 36px - H1 */
--text-display: 2.75rem;    /* 44px - hero */
```

Desktop overrides (applied via media query in `base.css`):

```css
@media (min-width: 768px) {
  --text-md:      1.25rem;    /* 20px */
  --text-lg:      1.5rem;     /* 24px */
  --text-xl:      1.875rem;   /* 30px */
  --text-2xl:     2.5rem;     /* 40px */
  --text-3xl:     3.5rem;     /* 56px */
  --text-display: 5rem;       /* 80px */
}
```

`xs`, `sm`, and `base` do not scale with viewport. They are the screen-reading floor.

## 12.4 Leading tokens

```css
--leading-tight:  1.15;   /* display, hero headlines */
--leading-snug:   1.35;   /* headings H1 to H4 */
--leading-normal: 1.55;   /* body prose */
--leading-relaxed: 1.6;   /* long-form Newsreader body, lease text */
```

## 12.5 Tracking tokens

```css
--tracking-tight:  -0.02em;   /* display, large headings (negative for tightening) */
--tracking-normal: 0;         /* body, default */
--tracking-wide:   0.08em;    /* eyebrow labels, status chips, all-caps */
```

## 12.6 Composite role tokens

Semantic shortcuts that bundle family, weight, size, leading, and tracking for the most common roles. Components prefer these over primitives.

```css
/* Display, hero, marketing */
--type-display-hero: {
  font-family: var(--font-display);
  font-weight: var(--weight-semibold);
  font-size: var(--text-display);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

/* Headings */
--type-h1: { font-family: var(--font-display); font-weight: 500; font-size: var(--text-3xl); line-height: var(--leading-tight); letter-spacing: var(--tracking-tight); }
--type-h2: { font-family: var(--font-display); font-weight: 500; font-size: var(--text-2xl); line-height: var(--leading-snug); letter-spacing: var(--tracking-tight); }
--type-h3: { font-family: var(--font-display); font-weight: 500; font-size: var(--text-xl); line-height: var(--leading-snug); }
--type-h4: { font-family: var(--font-display); font-weight: 500; font-size: var(--text-lg); line-height: var(--leading-snug); }

/* Eyebrow label (signature pattern 1) */
--type-eyebrow: {
  font-family: var(--font-display);
  font-weight: var(--weight-medium);
  font-size: var(--text-xs);
  line-height: 1;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* Signature line (signature pattern 2) */
--type-signature: {
  font-family: var(--font-accent);
  font-weight: var(--weight-semibold);
  font-style: italic;
  font-size: var(--text-2xl);  /* roughly 1.5x body */
  color: var(--color-brand);
}

/* Body prose (Newsreader) */
--type-body-prose: {
  font-family: var(--font-body);
  font-weight: var(--weight-regular);
  font-size: 1.0625rem;        /* 17px optimal for Newsreader on screen */
  line-height: var(--leading-relaxed);
}

/* Body UI (Geist) */
--type-body-ui: {
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

/* Button */
--type-button: {
  font-family: var(--font-display);
  font-weight: var(--weight-semibold);
  font-size: var(--text-base);
  line-height: 1;
  letter-spacing: 0;
}

/* Nav link */
--type-nav: {
  font-family: var(--font-display);
  font-weight: var(--weight-medium);
  font-size: var(--text-sm);
  line-height: 1;
}

/* Table cell */
--type-table-cell: {
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-sm);
  line-height: 1.4;
}

/* Table figure (tabular numerals) */
--type-table-figure: {
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-sm);
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
}

/* Caption */
--type-caption: {
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-xs);
  line-height: 1.4;
  color: var(--color-text-muted);
}

/* Legal */
--type-legal: {
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--color-text-muted);
}
```

Note: CSS variables cannot bundle multiple properties natively. The above is a specification; implementation uses CSS classes or Sass mixins. The Tailwind config in section 12.8 expresses these as utility-class compositions.

## 12.7 Optical sizing

Newsreader and Fraunces are variable fonts with `opsz` axes.

```css
body, .prose {
  font-optical-sizing: auto;
}

.prose-Fraunces-italic {
  font-optical-sizing: auto;
  font-variation-settings: 'opsz' 36;  /* signature-size optimization */
}
```

Geist is variable but does not have an optical-size axis. No optical sizing applies.

## 12.8 Tailwind config extension

```js
// tailwind.config.js extension
fontFamily: {
  display: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
  body:    ['Newsreader', 'Georgia', '"Times New Roman"', 'serif'],
  accent:  ['Fraunces', 'Georgia', '"Times New Roman"', 'serif'],
},
fontSize: {
  xs:      ['0.75rem',   { lineHeight: '1.5' }],
  sm:      ['0.875rem',  { lineHeight: '1.5' }],
  base:    ['1rem',      { lineHeight: '1.55' }],
  md:      ['1.125rem',  { lineHeight: '1.5' }],
  lg:      ['1.25rem',   { lineHeight: '1.4' }],
  xl:      ['1.5rem',    { lineHeight: '1.35' }],
  '2xl':   ['1.875rem',  { lineHeight: '1.3' }],
  '3xl':   ['2.25rem',   { lineHeight: '1.2' }],
  display: ['2.75rem',   { lineHeight: '1.05' }],
  prose:   ['1.0625rem', { lineHeight: '1.6' }],   /* 17px body prose */
},
fontWeight: {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
},
letterSpacing: {
  tight:  '-0.02em',
  normal: '0',
  wide:   '0.08em',
},
lineHeight: {
  tight:   '1.15',
  snug:    '1.35',
  normal:  '1.55',
  relaxed: '1.6',
},
```

## 12.9 Font loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Fraunces:ital,opsz,wght@1,9..144,600&display=swap" rel="stylesheet">
```

Production deployment: self-host woff2 files in `/public/fonts/` and use `@font-face` declarations to avoid external CDN dependencies.

## Acceptance

This doc is acceptable when:

- Every token has a name, a value, an inline comment explaining its purpose
- Forbidden weights (100, 200, 300, 800, 900) are explicitly named
- The Tailwind config snippet is copy-pasteable into `tailwind.config.js`
- An engineer can configure font loading from this doc alone
