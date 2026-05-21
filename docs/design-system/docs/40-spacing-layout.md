---
domain: brand
category: design-system
sub-category: spacing-layout
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 30-design-tokens
produces:
  - spacing-scale-with-use-cases
  - container-width-matrix
  - grid-system-spec
  - prose-and-form-measure-rules
  - vertical-rhythm-rules
  - safe-area-rules
  - mobile-first-breakpoint-strategy
executor: design
aliases:
tags:
---

# 40-spacing-layout

The complete spacing, layout, and container system. Defines the 4px-based spacing scale, container widths at every breakpoint, the grid system, vertical rhythm rules, prose and form measure caps, safe-area handling for iOS notches, and the mobile-first breakpoint strategy. Consumed by every layout, every component, and every page.

## Dependencies

- `30-design-tokens` for the spacing, container, and touch-target tokens this doc operationalizes
- `22-typography-usage` indirectly (vertical rhythm interacts with type sizes)

## Outputs

1. The 14-step spacing scale with per-step use cases
2. The container width matrix across all five breakpoints
3. The grid system specification (single-column default, 12-column at desktop)
4. The four measure caps (prose, form, card, modal)
5. Vertical rhythm rules
6. Safe-area inset handling for mobile
7. Touch target enforcement
8. The mobile-first breakpoint strategy

## 40.1 Spacing scale

The system uses a 4-pixel base. Every margin, padding, gap, and offset on the site reads from this scale. No arbitrary values, no inline 7px or 23px gaps, no `mt-[37px]` Tailwind escapes.

| Token | Value (rem) | Value (px) | Tailwind class | Primary use |
|---|---|---|---|---|
| `space-0` | 0 | 0px | `gap-0`, `p-0` | Reset, removal of inherited spacing |
| `space-1` | 0.25rem | 4px | `gap-1`, `p-1` | Icon padding, tight chip internal spacing, divider gaps |
| `space-2` | 0.5rem | 8px | `gap-2`, `p-2` | Inline content gap, badge padding y, tight pair spacing |
| `space-3` | 0.75rem | 12px | `gap-3`, `p-3` | Form input padding y, button padding y, label-to-input gap |
| `space-4` | 1rem | 16px | `gap-4`, `p-4` | Default paragraph margin-bottom, card padding (compact), list item gap |
| `space-5` | 1.25rem | 20px | `gap-5`, `p-5` | Card padding (default), section internal gap (mobile) |
| `space-6` | 1.5rem | 24px | `gap-6`, `p-6` | Card padding (loose), H2 to body gap, form field cluster gap |
| `space-8` | 2rem | 32px | `gap-8`, `p-8` | Section padding y (mobile), card grid gap, hero internal gap |
| `space-10` | 2.5rem | 40px | `gap-10`, `p-10` | Large section internal gap, hero CTA cluster spacing |
| `space-12` | 3rem | 48px | `gap-12`, `p-12` | H2 margin-top, section padding y (tablet), major content break |
| `space-16` | 4rem | 64px | `gap-16`, `p-16` | Section padding y (desktop), hero internal padding |
| `space-20` | 5rem | 80px | `gap-20`, `p-20` | Hero padding y (desktop), page-level section gap |
| `space-24` | 6rem | 96px | `gap-24`, `p-24` | Page section breaks, large hero margins |
| `space-32` | 8rem | 128px | `gap-32`, `p-32` | Hero padding y (large desktop only), document-level breaks |

### 40.1.1 Use case rules

**Inside a component**: use `space-1` through `space-6`. A button's internal padding never exceeds `space-6`.

**Between components within a section**: use `space-4` through `space-8`. A card grid gap is `space-6`. A form field cluster gap is `space-6`.

**Between sections on a page**: use `space-12` through `space-24` depending on viewport. Section padding y is responsive: `space-8` mobile, `space-12` tablet, `space-16` desktop.

**Between hero and first content section**: use `space-16` mobile, `space-24` desktop.

**At page extremes (top of hero to nav, bottom of last section to footer)**: use `space-20` mobile, `space-32` desktop.

### 40.1.2 The single-step rule

When adjusting an element's spacing, move one step in the scale. Do not jump from `space-4` to `space-16`. Designers and engineers should compose layouts by stepping along the scale, not by inventing values.

### 40.1.3 Negative spacing

The scale supports negative values for selective overlap (e.g., a profile photo bleeding into the section above). Tailwind classes: `-mt-4`, `-mb-2`, etc. Use sparingly. Overlap is intentional, not accidental.

## 40.2 Container widths

The site uses a single `Container` component with responsive max-width and side padding. Content never spans more than 1280px regardless of viewport.

| Breakpoint | Viewport range | Container max-width | Side padding | Touch target floor |
|---|---|---|---|---|
| default (mobile) | 0 to 639px | 100% | 16px (`space-4`) | 44px |
| `sm` | 640px to 767px | 100% | 24px (`space-6`) | 44px |
| `md` | 768px to 1023px | 100% | 32px (`space-8`) | 44px |
| `lg` | 1024px to 1279px | 1024px | 48px (`space-12`) | 44px |
| `xl` | 1280px to 1535px | 1280px | 64px (`space-16`) | 44px |
| `2xl` | 1536px and above | 1280px | 64px (`space-16`) | 44px |

### 40.2.1 Container implementation

```html
<div class="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-xl">
  <!-- page content -->
</div>
```

Component form (recommended):

```astro
---
// src/components/Container.astro
const { wide = false, narrow = false } = Astro.props;
const maxWidth = narrow ? 'max-w-screen-md' : wide ? 'max-w-screen-2xl' : 'max-w-screen-xl';
---
<div class={`mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${maxWidth}`}>
  <slot />
</div>
```

### 40.2.2 Full-bleed exceptions

Three surface types break out of the container to span viewport edge-to-edge:

1. **Hero photography backgrounds**: image is full-bleed; text content inside the hero stays inside the container
2. **Cedar footer**: footer background is full-bleed; footer content stays inside the container
3. **Listing detail photo galleries**: gallery container can extend beyond 1280px max-width up to viewport width (capped at 1920px)

Implementation:

```html
<section class="bg-cedar"> <!-- full-bleed background -->
  <div class="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-xl py-16">
    <!-- contained content -->
  </div>
</section>
```

## 40.3 Grid system

Mobile-first. Default state is single-column stacked. Multi-column layouts emerge at `md` (768px) and become more divided at `lg` (1024px) and `xl` (1280px).

### 40.3.1 Grid patterns

| Pattern | Mobile | `md` (768px+) | `lg` (1024px+) | `xl` (1280px+) | Tailwind |
|---|---|---|---|---|---|
| Marketing two-column | stacked | 2 col | 2 col | 2 col | `grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12` |
| Listing card grid | 1 col | 2 col | 3 col | 4 col | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` |
| Owner dashboard data | 1 col | 2 col | 3 col | 3 col | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |
| Three-up feature row | stacked | 3 col | 3 col | 3 col | `grid grid-cols-1 md:grid-cols-3 gap-8` |
| Blog index | 1 col | 2 col | 3 col | 3 col | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| Form (single column) | 1 col | 1 col | 1 col | 1 col | `flex flex-col gap-6 max-w-form` |
| Statement table | scroll-x | full | full | full | `overflow-x-auto md:overflow-visible` |
| Sidebar plus content | stacked | stacked | sidebar 1/4, content 3/4 | sidebar 1/4, content 3/4 | `grid grid-cols-1 lg:grid-cols-4 gap-12; sidebar lg:col-span-1; content lg:col-span-3` |

### 40.3.2 Grid gap defaults

| Context | Mobile gap | Tablet gap | Desktop gap |
|---|---|---|---|
| Card grids | `space-6` (24px) | `space-6` | `space-8` (32px) |
| Marketing two-column | `space-8` | `space-10` | `space-12` (48px) |
| Form field cluster | `space-6` | `space-6` | `space-6` |
| Data dashboard tiles | `space-4` (16px) | `space-6` | `space-6` |
| Footer columns | `space-8` | `space-8` | `space-12` |

### 40.3.3 Forbidden grid patterns

- Five or more columns on any breakpoint (use a horizontal scroller for galleries instead)
- Uneven column widths without a documented reason (e.g., 30/70 split needs a rationale tied to content emphasis)
- Different row heights without intent (use `auto-rows-fr` or set explicit min-height)
- Card grids with mixed card sizes inside the same row (this signals broken design)

## 40.4 Measure caps

Reading and form completion both fatigue when content spans the full viewport. Four content measures cap reading width regardless of container.

| Token | Max-width | Use |
|---|---|---|
| `measure-prose` | 65ch (~750px at 17px font) | Blog body, owner letters, lease body, document body, long-form explainers, FAQ answers |
| `measure-form` | 40ch (~460px) | Form columns, contact forms, proposal request form, application form |
| `measure-card` | 40ch (~460px) | Listing card content area, evidence card content |
| `measure-modal` | 480px | Modal dialog content |

Tailwind:

```html
<article class="prose max-w-prose mx-auto"> <!-- 65ch -->
  ...
</article>

<form class="flex flex-col gap-6 max-w-form"> <!-- 40ch -->
  ...
</form>
```

The `ch` unit is content-relative. At 17px Newsreader (`text-prose`), 65ch falls at approximately 750px. At 16px Geist (`text-base`), 65ch falls at approximately 670px. The unit auto-adjusts when font size changes.

### 40.4.1 Why 65ch for prose

Empirical reading research consistently identifies 50-75 characters per line as the optimal range for sustained reading. The brand's commitment to long-form (blog field notes, owner letters, lease summaries) makes this critical. Below 50ch reading fragments; above 75ch eyes lose the next line on saccade.

### 40.4.2 Why 40ch for forms

Forms scan vertically, not horizontally. A 40ch column keeps each input contained to a comfortable scanning width, prevents inputs from looking visually loose on wide viewports, and reads as intentional rather than auto-stretched.

## 40.5 Vertical rhythm

The system uses rem for major vertical spacing (section padding, paragraph margins, heading margins) and px for component-internal gaps under 16px.

### 40.5.1 Rhythm rules

**Heading-to-content gaps** (set in `base.css`):

| Element | Margin top | Margin bottom |
|---|---|---|
| H1 | 0 | `space-6` (24px) |
| H2 | `space-12` (48px) | `space-4` (16px) |
| H3 | `space-8` (32px) | `space-3` (12px) |
| H4 | `space-6` (24px) | `space-2` (8px) |

**Paragraph-to-paragraph gap** in prose: `space-4` (16px), set via `margin-bottom` on `<p>`.

**Section-to-section gap** between major page sections: `space-16` (64px) mobile, `space-24` (96px) desktop, set via `padding-y` on the section.

### 40.5.2 First child margin reset

The first child element inside any container has no top margin. Set in `base.css`:

```css
.prose > :first-child {
  margin-top: 0;
}

.prose > :last-child {
  margin-bottom: 0;
}
```

This prevents unwanted whitespace at the top and bottom of cards, sections, and articles.

## 40.6 Safe-area inset handling

iOS devices with notches, dynamic islands, and home indicators expose CSS environment variables for safe-area handling. The system respects them on bottom-anchored elements (sticky CTAs, mobile menus, toast notifications).

```css
.sticky-bottom-cta {
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
}

.mobile-menu-drawer {
  padding-top: calc(var(--space-4) + env(safe-area-inset-top));
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
}
```

Side insets matter on landscape iPhone:

```css
.full-bleed-content {
  padding-left: max(var(--space-4), env(safe-area-inset-left));
  padding-right: max(var(--space-4), env(safe-area-inset-right));
}
```

## 40.7 Touch targets

The 44x44px floor is non-negotiable. It applies to:

- Buttons (including icon-only buttons)
- Anchor tags used as buttons (`role="button"`)
- Form submit elements
- Checkboxes and radio buttons (the clickable target, even if the visual control is smaller)
- Navigation links in mobile menus
- Tab triggers
- Disclosure triggers (accordion headers)

Implementation defaults are set in `base.css`:

```css
button,
a[role="button"],
input[type="submit"],
input[type="button"] {
  min-height: var(--touch-target);   /* 44px */
}
```

For small visual elements (e.g., a 16x16 icon button), expand the click area with padding:

```html
<button class="p-3" aria-label="Close">
  <Icon name="x" size="16" />
</button>
<!-- 16px icon plus 24px padding = 40px minimum; bump to p-[14px] for 44px -->
```

### 40.7.1 Spacing between adjacent touch targets

Two touch targets adjacent to each other (e.g., two buttons in a button group) maintain at least 8px (`space-2`) of separation. This prevents fat-finger mistapping.

## 40.8 Mobile-first breakpoint strategy

Every CSS rule and every Tailwind class targets mobile by default. Larger breakpoints add or override only what changes.

```html
<!-- Right -->
<h2 class="text-2xl md:text-3xl lg:text-4xl">

<!-- Wrong (desktop-first; never used in this system) -->
<h2 class="text-4xl lg:text-3xl md:text-2xl">
```

### 40.8.1 Breakpoint thresholds

| Breakpoint | Threshold | Tailwind prefix | Reasoning |
|---|---|---|---|
| default | 0px and up | (none) | Single-column, large touch targets, max readability |
| `sm` | 640px | `sm:` | Larger mobile, small tablets in portrait |
| `md` | 768px | `md:` | iPad portrait, the threshold where multi-column becomes safe |
| `lg` | 1024px | `lg:` | iPad landscape, the threshold where dense data display becomes safe |
| `xl` | 1280px | `xl:` | Standard laptop, the container cap |
| `2xl` | 1536px | `2xl:` | Large monitor; treated identically to `xl` for layout, used only for art direction |

### 40.8.2 Why no breakpoint above 1536px

The container is capped at 1280px. Beyond 1280px, the design is identical; viewport just gains gutter. There is no design decision keyed to "large monitor"; readers don't pull a property listing onto a 4k panel and demand five columns.

## 40.9 Acceptance

This doc is acceptable when:

- A designer can produce a complete page layout (hero, three sections, footer) using only this doc plus `30-design-tokens.md` and the component grammar docs
- Every spacing value in shipping code maps to a token from `space-1` through `space-32`
- No arbitrary spacing values (`mt-[13px]`, `gap-[27px]`) appear in shipping code
- Every interactive element meets the 44px touch target floor
- Every prose context caps at `max-w-prose`
- Every form caps at `max-w-form`
- The container component handles all five breakpoints in a single implementation
