---
domain: brand
category: design-system
sub-category: component-grammar
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 22-typography-usage
  - 30-design-tokens
  - 40-spacing-layout
  - 41-radius-shadow
  - 42-motion
produces:
  - button-variants
  - card-variants
  - badge-variants
  - tag-and-chip-variants
  - alert-banner-variants
  - avatar-spec
  - divider-spec
  - link-variants
executor: engineering
aliases:
tags:
---

# 52-component-grammar

The base set of components every page composes from: buttons, cards, badges, tags, chips, alerts, avatars, dividers, and links. Each component has full state specs (default, hover, focus, active, disabled) and Tailwind implementation.

## Dependencies

- `22-typography-usage` for type
- `30-design-tokens` for color, spacing
- `41-radius-shadow` for radius and shadow
- `42-motion` for transitions

## Outputs

1. Button variants (primary, secondary, tertiary, icon-only, destructive)
2. Card variants (basic, listing, evidence, statement, owner-letter)
3. Badge variants (state, attribute)
4. Tag and chip variants
5. Alert banner variants (info, warning, error, success)
6. Avatar spec
7. Divider spec
8. Link variants

## Buttons

### Primary button

Use: one per surface. The primary call to action. Clay only.

```html
<button class="inline-flex items-center justify-center bg-clay text-cream font-display font-semibold text-base px-6 py-3 rounded-md min-h-touch hover:bg-clay/90 active:scale-[0.98] disabled:bg-stone disabled:text-ink-40 disabled:cursor-not-allowed transition-all">
  Request a proposal
</button>
```

| State | Visual |
|---|---|
| Default | `bg-clay`, `text-cream` |
| Hover | `bg-clay/90` (10% darker via opacity) |
| Focus | 2px Cedar outline, 2px offset |
| Active | `scale(0.98)` for 100ms |
| Disabled | `bg-stone`, `text-ink-40`, `cursor: not-allowed` |
| Loading | Disabled appearance plus inline spinner |

### Secondary button

Use: secondary actions on the same surface as a primary button.

```html
<button class="inline-flex items-center justify-center bg-transparent text-ink font-display font-medium text-base px-6 py-3 rounded-md min-h-touch border border-ink-20 hover:border-ink-60 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
  View statement
</button>
```

### Tertiary (text) button

Use: low-emphasis actions, inline within paragraphs, "read more"-style links rendered as buttons.

```html
<button class="inline text-cedar font-display font-medium text-base underline underline-offset-2 hover:no-underline disabled:opacity-50">
  Continue reading
</button>
```

### Icon-only button

Use: close, menu trigger, expand. Must have `aria-label`.

```html
<button class="inline-flex items-center justify-center min-h-touch min-w-touch rounded-md hover:bg-ink/5 active:bg-ink/10 transition-colors" aria-label="Close">
  <svg class="w-5 h-5" aria-hidden="true">...</svg>
</button>
```

### Destructive button

Use: irreversible actions only (delete account, cancel application). Error color.

```html
<button class="inline-flex items-center justify-center bg-error text-cream font-display font-semibold text-base px-6 py-3 rounded-md min-h-touch hover:bg-error/90 active:scale-[0.98] transition-all">
  Cancel application
</button>
```

### Sizes

Buttons come in three sizes:

| Size | Padding | Font size | Min height |
|---|---|---|---|
| `sm` | `px-4 py-2` | 14px | 36px |
| `md` (default) | `px-6 py-3` | 16px | 44px |
| `lg` | `px-8 py-4` | 18px | 52px |

## Cards

### Basic card

The default card pattern. Used for any bounded content block.

```html
<article class="bg-[var(--surface-alt)] border border-ink-20 rounded-md p-6 transition-shadow hover:shadow-1">
  <h3 class="font-display font-medium text-lg text-ink mb-2">Card heading</h3>
  <p class="font-display font-regular text-base text-ink-80 leading-normal">
    Card body content.
  </p>
</article>
```

### Listing card

Used on `/rentals` index. Image-led, address-focused, rent prominent.

```html
<a href="/rentals/[slug]" class="block bg-[var(--surface-alt)] rounded-md overflow-hidden border border-ink-20 transition-shadow hover:shadow-1">
  <img src="..." alt="..." class="aspect-[4/3] object-cover w-full" loading="lazy" />
  <div class="p-4">
    <p class="font-display font-medium text-base text-ink leading-snug">1823 NW 65th St</p>
    <p class="font-display font-regular text-sm text-ink-60 mt-1">Ballard, Seattle</p>
    <p class="font-display font-regular text-sm text-ink-80 mt-3 tabular">
      2 bed · 1 bath · 950 sqft
    </p>
    <div class="flex items-baseline justify-between mt-3">
      <p class="font-display font-semibold text-xl text-cedar tabular">$2,400</p>
      <p class="font-display font-regular text-[13px] text-ink-60">Available Mar 1</p>
    </div>
  </div>
</a>
```

### Evidence card

Used in owner acquisition surfaces. Left-edge Cedar accent. No card radius (per `41-radius-shadow.md`).

```html
<article class="bg-cream p-6 md:p-8 border-l-4 border-cedar">
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mb-2">
    Field note
  </p>
  <h3 class="font-display font-medium text-xl md:text-2xl text-ink mb-3">
    Boiler replacement, 18th Ave NE
  </h3>
  <p class="font-body text-prose text-ink leading-relaxed max-w-prose">
    The boiler at this 1924 four-plex is 22 years old. Replacing it now costs $3,500.
  </p>
  <div class="mt-6">
    <p class="font-accent italic font-semibold text-xl text-cedar leading-none">Megan</p>
    <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mt-2">
      Megan Green, Designated Broker
    </p>
  </div>
</article>
```

### Statement card

Used in owner portal. Paper background, tabular figures, monthly summary.

```html
<article class="bg-paper rounded-md border border-ink-20 p-6 md:p-8">
  <div class="flex items-baseline justify-between mb-6">
    <div>
      <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Statement</p>
      <h3 class="font-display font-medium text-xl text-ink mt-1">November 2026</h3>
    </div>
    <p class="font-display font-regular text-sm text-ink-60">1823 NW 65th St</p>
  </div>

  <dl class="space-y-2 tabular">
    <div class="flex justify-between py-2 border-b border-ink-20">
      <dt class="font-display font-regular text-sm text-ink">Rent collected</dt>
      <dd class="font-display font-medium text-sm text-ink">$2,850.00</dd>
    </div>
    <div class="flex justify-between py-2 border-b border-ink-20">
      <dt class="font-display font-regular text-sm text-ink">Management fee (9%)</dt>
      <dd class="font-display font-regular text-sm text-ink-60">−$256.50</dd>
    </div>
    <div class="flex justify-between py-2 border-b border-ink-20">
      <dt class="font-display font-regular text-sm text-ink">Plumbing repair</dt>
      <dd class="font-display font-regular text-sm text-ink-60">−$185.00</dd>
    </div>
  </dl>

  <div class="flex justify-between items-baseline pt-4 mt-2">
    <p class="font-display font-medium text-base text-ink">Net to owner</p>
    <p class="font-display font-semibold text-2xl text-cedar tabular">$2,408.50</p>
  </div>
</article>
```

### Owner letter card

Used on owner acquisition (proposal page). Hero document treatment, Newsreader body.

```html
<article class="bg-cream rounded-lg p-8 md:p-12 max-w-prose mx-auto">
  <header class="mb-8">
    <p class="font-display font-semibold text-lg text-cedar">Green Property Management</p>
    <p class="font-display font-regular text-sm text-ink-60 mt-1">
      Megan Green, Designated Broker, WA #XXXXXX
    </p>
  </header>

  <div class="prose">
    <p class="font-body text-prose text-ink leading-relaxed">
      I manage rentals in King and Snohomish counties...
    </p>
  </div>

  <footer class="mt-12 pt-6 border-t border-ink-20">
    <p class="font-accent italic font-semibold text-2xl text-cedar leading-none">Megan</p>
    <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mt-2">
      Megan Green, Designated Broker
    </p>
  </footer>
</article>
```

## Badges

### State badge

Conveys system state: paid, pending, overdue, available.

```html
<!-- Success -->
<span class="inline-flex items-center bg-success/10 text-success font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  Paid
</span>

<!-- Warning -->
<span class="inline-flex items-center bg-warning/10 text-warning font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  Pending
</span>

<!-- Error -->
<span class="inline-flex items-center bg-error/10 text-error font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  Overdue
</span>

<!-- Info -->
<span class="inline-flex items-center bg-info/10 text-info font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  New
</span>
```

### Attribute badge

Conveys property attribute: pet-friendly, in-unit laundry, off-street parking.

```html
<span class="inline-flex items-center bg-cream text-cedar border border-cedar/30 font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  Pet-friendly
</span>
```

### Badge sizes

| Size | Padding | Font size |
|---|---|---|
| `xs` | `px-1.5 py-0.5` | 11px |
| `sm` (default) | `px-2 py-1` | 12px |
| `md` | `px-3 py-1.5` | 13px |

## Tags and chips

Used in blog post tag lists and FAQ category filters. Differ from badges in that they are interactive (clickable, removable).

```html
<a href="/blog?tag=compliance" class="inline-flex items-center bg-stone/50 text-ink font-display font-regular text-xs uppercase tracking-wide px-3 py-1 rounded-pill hover:bg-stone transition-colors">
  Compliance
</a>
```

Removable chip (used in active filters):

```html
<span class="inline-flex items-center gap-2 bg-cedar/10 text-cedar font-display font-medium text-xs px-3 py-1 rounded-pill">
  Compliance
  <button type="button" class="-mr-1 hover:text-cedar/70" aria-label="Remove compliance filter">
    <svg class="w-3 h-3" aria-hidden="true">...</svg>
  </button>
</span>
```

## Alert banners

Full-width banners at the top of a section. Used sparingly.

### Info

```html
<div role="alert" class="bg-info/10 border-l-4 border-info p-4 rounded-md">
  <p class="font-display font-medium text-sm text-info">
    New rental available in Ballard
  </p>
  <p class="font-display font-regular text-sm text-ink mt-1">
    1823 NW 65th St; 2 bed, 1 bath; $2,400. Available March 1.
  </p>
</div>
```

### Warning

```html
<div role="alert" class="bg-warning/10 border-l-4 border-warning p-4 rounded-md">
  <p class="font-display font-medium text-sm text-warning">
    Rent due in 4 days
  </p>
</div>
```

### Error

```html
<div role="alert" class="bg-error/10 border-l-4 border-error p-4 rounded-md">
  <p class="font-display font-medium text-sm text-error">
    Rent is overdue
  </p>
  <p class="font-display font-regular text-sm text-ink mt-1">
    A late fee posted on the 6th. Pay through the resident portal.
  </p>
</div>
```

### Success

```html
<div role="alert" class="bg-success/10 border-l-4 border-success p-4 rounded-md">
  <p class="font-display font-medium text-sm text-success">
    Application received
  </p>
  <p class="font-display font-regular text-sm text-ink mt-1">
    You'll hear back within three business days.
  </p>
</div>
```

## Avatar

Used for Megan in author bylines and signature blocks.

```html
<!-- Photo avatar -->
<img
  src="/megan-portrait.jpg"
  alt="Megan Green"
  class="w-12 h-12 rounded-full object-cover"
/>

<!-- Initial fallback -->
<div class="w-12 h-12 rounded-full bg-cedar/10 text-cedar flex items-center justify-center font-display font-semibold text-base">
  MG
</div>
```

### Sizes

| Size | Class | Pixel |
|---|---|---|
| `xs` | `w-6 h-6` | 24px |
| `sm` | `w-8 h-8` | 32px |
| `md` (default) | `w-12 h-12` | 48px |
| `lg` | `w-16 h-16` | 64px |
| `xl` | `w-24 h-24` | 96px |

## Divider

Hairline horizontal rule between sections.

```html
<hr class="border-0 border-t border-ink-20 my-12" />
```

For a more substantial section break with Cedar accent:

```html
<div class="flex items-center gap-4 my-16">
  <span class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Next</span>
  <hr class="flex-1 border-0 border-t border-ink-20" />
</div>
```

## Links

### Body prose link

```html
<a href="/owners/pricing" class="text-cedar underline underline-offset-2 hover:decoration-2 transition-all">
  pricing page
</a>
```

### Standalone link with arrow

```html
<a href="/owners" class="inline-flex items-center gap-2 text-cedar font-display font-medium text-base hover:gap-3 transition-all">
  Learn more about owner services
  <svg class="w-4 h-4" aria-hidden="true">...</svg>
</a>
```

### External link

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer" class="text-cedar underline underline-offset-2 hover:decoration-2">
  External resource
  <svg class="w-3 h-3 inline-block ml-1" aria-hidden="true">...</svg>
</a>
```

## Forbidden patterns

- Buttons in Newsreader (always Geist)
- Cards with both visible border and `shadow-1` plus (choose one)
- Cards with `border-left` accent plus `rounded-md` (sharp corners required, see `41-radius-shadow.md`)
- Badges with sentences (badges hold one to three words)
- Badges in body color text (must use state color)
- Tags clickable and chips removable in the same row (choose one pattern)
- Alert banners without `role="alert"` (accessibility)
- Avatars without `alt` text
- Dividers with shadows
- Links without underlines in body prose
- Two primary buttons in the same surface
- Buttons without `min-height: 44px` on mobile

## Acceptance

This doc is acceptable when:

- A developer can build any standard component from the snippets here
- Every component has all five states (default, hover, focus, active, disabled) documented or marked not-applicable
- Every component uses tokens, not hard-coded values
- Every interactive component meets the 44px touch target floor
- Forbidden patterns can be flagged in code review
