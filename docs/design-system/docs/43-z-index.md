---
domain: brand
category: design-system
sub-category: z-index
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 30-design-tokens
produces:
  - z-index-scale
  - stacking-context-rules
  - per-element-z-mapping
  - forbidden-z-patterns
executor: engineering
aliases:
tags:
---

# 43-z-index

The complete z-index system. Defines the eight-step z-index scale, the stacking context rules every component must respect, the per-element z mapping, and forbidden patterns. Consumed by every layered or floating component.

## Dependencies

- `30-design-tokens` for the z tokens this doc operationalizes

## Outputs

1. Eight-step z-index scale
2. Stacking context primer (what creates a new stacking context and why it matters)
3. Per-element z mapping
4. Custom z-index governance rules
5. Forbidden patterns

## 43.1 Z-index scale

Eight steps. Every layered element uses one of these tokens. Custom z values outside this scale require governance approval and a written exception in `94-governance`.

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `z-base` | 1 | `z-base` | Default in-flow content; explicit `z: 1` to establish stacking context where needed |
| `z-dropdown` | 10 | `z-dropdown` | Dropdown menus, autocomplete suggestion lists, combobox option lists, command palette results |
| `z-sticky` | 20 | `z-sticky` | Sticky top navigation, sticky table headers, sticky page section headers, sticky form action bars |
| `z-skip` | 25 | `z-skip` | Skip-to-content link when focused (must appear above sticky nav) |
| `z-modal` | 30 | `z-modal` | Modal dialogs, full-screen overlays, drawer panels, alert dialogs, confirmation prompts |
| `z-popover` | 40 | `z-popover` | Popovers that must appear above modals (e.g., a date picker inside a modal form) |
| `z-toast` | 50 | `z-toast` | Toast notifications (must appear above everything except tooltips) |
| `z-tooltip` | 60 | `z-tooltip` | Tooltips (must always be on top regardless of trigger context) |

### 43.1.1 The 10-step gaps

The scale uses gaps of 10 between most tokens (skip is the exception at 25). The gaps exist so future inserts don't require renumbering the entire scale. If a new layer is needed (e.g., a "command palette" layer between dropdown and sticky), it can sit at 15 without disturbing existing assignments.

### 43.1.2 Why skip is at 25 (not 30)

The skip link must appear above the sticky nav (z 20) but below any modal (z 30) that might be open. Z 25 places it correctly between them. A skip link that appeared above an open modal would itself be the focus trap problem.

## 43.2 Stacking context primer

Z-index alone is not enough. Stacking contexts determine which z values can compete.

### 43.2.1 What creates a stacking context

Any of these on an element creates a new stacking context:

- `position: fixed` or `position: sticky`
- `position: relative` plus a `z-index` value other than `auto`
- `position: absolute` plus a `z-index` value other than `auto`
- `transform` property (any value other than `none`)
- `opacity` less than 1
- `will-change` declared
- `isolation: isolate`
- `mix-blend-mode` other than `normal`
- `filter` other than `none`
- `backdrop-filter` other than `none`
- A child of a flex or grid container with `z-index` value other than `auto`

### 43.2.2 Why this matters

A `z-tooltip` (60) inside a `position: relative` container with `z-base` (1) cannot exceed the parent's stacking position relative to other siblings of the parent. The tooltip "60" is only 60 within its parent's local context.

### 43.2.3 Practical implication

Floating elements (modals, toasts, tooltips) must be rendered at the document root (via portal pattern), not nested inside the page's content tree. This avoids parent stacking-context traps.

### 43.2.4 Portal pattern

Floating UI must mount at `<body>` level:

```jsx
// React pattern: portal pulls the floating element to body root
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="fixed inset-0 z-modal">...</div>,
    document.body
  );
}
```

Astro pattern: render floating UI in a layout slot at the body level, not deeply nested in page content. The layout file (`BaseLayout.astro`) has dedicated portal slots:

```astro
---
// BaseLayout.astro
---
<html>
  <body>
    <main><slot /></main>
    <!-- Portal targets, rendered last so they stack above content -->
    <div id="modal-root"></div>
    <div id="toast-root"></div>
    <div id="tooltip-root"></div>
  </body>
</html>
```

## 43.3 Per-element z mapping

The complete catalog of layered elements and their z assignments.

### 43.3.1 In-flow elements

| Element | Z value | Notes |
|---|---|---|
| Default content | `auto` (no z-index) | No z-index needed; document flow handles stacking |
| Card with `position: relative` for inner absolute positioning | `z-base` (1) | Only when needed to establish stacking context for children |
| Hero with overlapping image and text | `z-base` (1) on text overlay | The image sits at flow level; text needs z to overlap |

### 43.3.2 Sticky elements

| Element | Z value | Notes |
|---|---|---|
| Top navigation (sticky scroll) | `z-sticky` (20) | Stays above content as user scrolls |
| Sticky table header (long tables) | `z-sticky` (20) | Inside scrollable container; isolated stacking context |
| Sticky form action bar (mobile) | `z-sticky` (20) | "Save" button bar at bottom of long forms |
| Sticky owner statement page header | `z-sticky` (20) | Property address + date stay visible during scroll |
| Sticky listing detail bottom CTA (mobile) | `z-sticky` (20) | "Inquire" button stays in view as user scrolls |

### 43.3.3 Dropdowns and menus

| Element | Z value | Notes |
|---|---|---|
| Navigation dropdown (desktop hover menu) | `z-dropdown` (10) | Below sticky nav itself; nav establishes parent stacking |
| Autocomplete suggestions | `z-dropdown` (10) | Triggered by form input |
| Select element option list | `z-dropdown` (10) | Custom select component |
| Combobox / multi-select option list | `z-dropdown` (10) | |
| Search command palette | `z-dropdown` (10) | If implemented |
| Avatar menu dropdown (portal user menu) | `z-dropdown` (10) | |

### 43.3.4 Modals and overlays

| Element | Z value | Notes |
|---|---|---|
| Modal backdrop | `z-modal` (30) | Ink at 40% opacity |
| Modal dialog content | `z-modal` (30) | Same z as backdrop; renders later in DOM so stacks above |
| Mobile menu drawer | `z-modal` (30) | Slides from right edge |
| Mobile menu backdrop | `z-modal` (30) | Behind drawer |
| Confirmation prompt | `z-modal` (30) | "Are you sure?" before destructive actions |
| Full-screen photo gallery overlay | `z-modal` (30) | Listing detail photo expansion |
| Cookie banner | `z-modal` (30) | If implemented; treated as modal-level |
| Authentication required overlay | `z-modal` (30) | Portal expired sessions |

### 43.3.5 Popovers above modals

| Element | Z value | Notes |
|---|---|---|
| Date picker inside form inside modal | `z-popover` (40) | Must exceed modal's z |
| Color picker inside admin modal | `z-popover` (40) | Sanity admin context |
| Confirmation tooltip on modal button | `z-popover` (40) | Rare |

### 43.3.6 Notifications

| Element | Z value | Notes |
|---|---|---|
| Toast notification (success, warning, error, info) | `z-toast` (50) | Bottom-right or top-right placement; never blocks UI |
| System banner (rare; for downtime announcements) | `z-toast` (50) | If displayed |

### 43.3.7 Tooltips

| Element | Z value | Notes |
|---|---|---|
| Hover tooltip (informational) | `z-tooltip` (60) | Always on top |
| Form helper text tooltip | `z-tooltip` (60) | |
| Icon button tooltip (button purpose label) | `z-tooltip` (60) | |

### 43.3.8 Skip link

| Element | Z value | Notes |
|---|---|---|
| Skip-to-content link (when focused) | `z-skip` (25) | Above sticky nav; below modal (so it doesn't appear over an open modal) |

## 43.4 Implementation patterns

### 43.4.1 Modal pattern

```html
<!-- Rendered at body root via portal -->
<div class="fixed inset-0 z-modal flex items-center justify-center p-4">
  <!-- Backdrop -->
  <div class="absolute inset-0 bg-ink/40" aria-hidden="true"></div>
  <!-- Dialog -->
  <div role="dialog" aria-modal="true" class="relative z-base bg-surface-alt rounded-lg shadow-3 p-8 max-w-modal w-full">
    <!-- Dialog content -->
  </div>
</div>
```

The outer container is `z-modal`. The backdrop and dialog use `z-base` within that container's local stacking context. The dialog renders after the backdrop in the DOM, so it stacks above it. No explicit z-index war is needed.

### 43.4.2 Sticky nav pattern

```html
<header class="sticky top-0 z-sticky bg-surface border-b border-ink-20">
  <!-- Nav content -->
</header>
```

The sticky nav also establishes a stacking context (because of `position: sticky`). Dropdowns inside the nav use `z-dropdown` (10) which is correct within the nav's local context.

### 43.4.3 Tooltip pattern

Tooltips render at the body root via portal. The trigger element does not nest the tooltip:

```jsx
// Radix UI Tooltip pattern
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <button>Approve</button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content className="z-tooltip">
        Owner-only action
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

### 43.4.4 Skip link pattern

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: var(--z-skip);
  padding: var(--space-3) var(--space-4);
  background: var(--color-cedar);
  color: var(--color-cream);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  border-radius: var(--radius-md);
}
.skip-link:focus {
  left: var(--space-4);
  top: var(--space-4);
}
```

### 43.4.5 Drawer pattern

```html
<!-- Mobile menu drawer -->
<div class="fixed inset-0 z-modal lg:hidden">
  <div class="absolute inset-0 bg-ink/40" aria-hidden="true"></div>
  <div class="absolute right-0 top-0 bottom-0 w-80 max-w-[80vw] bg-surface shadow-3 transform translate-x-0 transition-transform duration-slow">
    <!-- Drawer content -->
  </div>
</div>
```

## 43.5 Stacking context debugging

When a layered element does not appear in the expected position:

1. **Check the parent chain for stacking-context creators.** Walk up the DOM tree. Find any ancestor with `position: relative` + `z-index`, `transform`, `opacity < 1`, `filter`, etc.
2. **The first parent stacking context constrains all child z-values.** If a parent has `z-base` (1), child `z-tooltip` (60) only equals 60 within that parent's local context, not relative to siblings of the parent.
3. **Solution**: render the floating element at body root via portal.
4. **Verify in DevTools.** The Layers panel in Chrome DevTools visualizes stacking contexts.

## 43.6 Custom z-index governance

If a layered element does not fit any of the eight z tokens, follow these steps:

1. **Reconsider the design.** Most z conflicts indicate a design problem, not a missing token.
2. **Identify the closest existing token.** Use the existing token if the element can be re-positioned to fit.
3. **Document the exception.** Add an entry to `94-governance` describing the new z value, why existing tokens don't fit, and which layers it must sit between.
4. **Add a new token to `tokens.css`.** Place it at a multiple-of-10 value between two existing tokens (e.g., 15 for "below sticky, above dropdown").
5. **Update this doc.** Add the new element to section 43.3.

## 43.7 Forbidden patterns

| Pattern | Why forbidden |
|---|---|
| Arbitrary z-index values (`z-[9999]`, `z-[100000]`) | Bypasses the system; creates stacking wars |
| Negative z-index (`z-[-1]`) | Pushes elements behind their parent; creates rendering surprises |
| Z-index without `position` set | No effect in CSS; suggests confusion about how z works |
| Setting z-index on every element "just in case" | Establishes unnecessary stacking contexts; degrades performance |
| Using `transform`, `opacity`, or `filter` without recognizing the stacking-context implication | Creates accidental stacking contexts that trap floating UI |
| Mounting modals inside page content trees | Inevitable parent stacking-context conflicts |
| Z-index values that don't match a token | Breaks the system |
| Increasing z-index until something works | Cargo-cult fix; the underlying stacking context is wrong |

## 43.8 Acceptance

This doc is acceptable when:

- Every layered element uses a token from the eight-step scale
- Floating UI (modals, toasts, tooltips) is rendered at body root via portal pattern
- No arbitrary z-index values appear in shipping code
- Sticky nav stays at `z-sticky` (20); modals overlay it at `z-modal` (30); the skip link appears above sticky nav at `z-skip` (25) and below modals
- An engineer can debug a stacking issue using only this doc and browser DevTools
- The eight z-index portal targets (`modal-root`, `toast-root`, `tooltip-root`) are wired into the base layout
