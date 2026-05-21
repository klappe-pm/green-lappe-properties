---
domain: brand
category: design-system
sub-category: motion
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 30-design-tokens
produces:
  - motion-principles
  - duration-tokens
  - easing-tokens
  - per-element-motion-mapping
  - reduced-motion-enforcement
  - forbidden-motion-patterns
executor: design
aliases:
tags:
---

# 42-motion

The complete motion system. Defines the four duration tokens, the single easing curve, the per-element motion mapping (what animates and how), the reduced-motion enforcement strategy, and forbidden motion patterns. Consumed by every interactive element.

## Dependencies

- `30-design-tokens` for the motion tokens this doc operationalizes
- `91-accessibility` for the prefers-reduced-motion enforcement

## Outputs

1. Motion principles (the why)
2. Four duration tokens with use-case mapping
3. Single easing curve and rationale
4. Per-element animation map (buttons, links, cards, modals, dropdowns, drawers, tooltips, toasts, page transitions)
5. Reduced-motion enforcement
6. Forbidden motion patterns

## 42.1 Motion principles

The brand's calm voice (defined in `03-voice`) extends to interactions. Motion supports comprehension, not decoration. It signals state change, draws attention to feedback, and helps the user track elements across position changes. It does not perform.

Five principles:

1. **Functional.** Motion has a job (confirm an action, transition between states, indicate progress). Decorative motion is forbidden.
2. **Fast.** Nothing animates longer than 250ms. If an animation feels like it needs longer, the animation is wrong; rethink the interaction.
3. **Calm.** No spring physics, no bouncing, no theatrical curves. One easing curve, ever.
4. **Respectful.** Reduced-motion preference is honored globally and immediately.
5. **Consistent.** The same gesture (hover, focus, expand, close) animates the same way everywhere.

## 42.2 Duration tokens

Four durations. Every motion in the system uses exactly one of these.

| Token | Value | Tailwind | Use cases |
|---|---|---|---|
| `duration-fast` | 100ms | `duration-fast` | Tooltips appearing on hover, micro-feedback (text input value change confirmation), iconography state changes (filled to outline) |
| `duration-quick` | 150ms | `duration-quick` | Link underline thickness change on hover, small text color shifts, focus ring fade-in |
| `duration-default` | 200ms | `duration` (default) | Standard transitions: button hover, card hover shadow, color shifts, opacity changes, border color changes |
| `duration-slow` | 250ms | `duration-slow` | Modal entry and exit, drawer slide-in, toast notifications entering and exiting, accordion expand and collapse |

### 42.2.1 Why 200ms is default

200ms is the threshold at which animation reads as deliberate but not slow. Below 150ms, transitions feel snappy but can read as visual glitches. Above 250ms, the user starts to perceive waiting. 200ms is the calibrated middle.

### 42.2.2 Why 250ms is the ceiling

Above 250ms, users notice they're waiting. The interaction starts to feel sluggish. If something seems to require longer (a complex modal transition, a multi-step animation), the design needs to be simplified, not the animation extended.

### 42.2.3 No duration below 100ms

Below 100ms, animations read as flickers, not transitions. The user perceives the end state arriving rather than the transition happening. If an animation must feel "instant", use `transition-none` instead of a very short duration.

## 42.3 Easing curve

One curve, used for every transition in the system:

```css
--easing-default: cubic-bezier(0.4, 0, 0.2, 1);
```

This is the Material Design "standard" easing, also known as ease-out-cubic adjacent. It starts at full velocity and decelerates to a stop. Reads as natural, intentional, calm.

### 42.3.1 Why one easing curve

Multiple easing curves introduce visual inconsistency. The user's eye picks up that "this animation moves differently from that one." A single curve creates a unified motion vocabulary across the brand.

### 42.3.2 Forbidden easing curves

- `cubic-bezier(0.68, -0.55, 0.265, 1.55)` and similar overshoot curves (bouncy, springy)
- `ease-in` alone (anticipation curves that delay action)
- `ease-in-out` for short durations (under 200ms; creates "wait then arrive" feel)
- `linear` (mechanical, robotic; only acceptable for continuous loading spinners)
- Custom one-off curves per component

## 42.4 Per-element motion map

The complete catalog of what animates in the system and how.

### 42.4.1 Buttons

| Property | Transition |
|---|---|
| `background-color` | `duration-default` (200ms) |
| `color` | `duration-default` |
| `border-color` | `duration-default` |
| `transform: translateY` on press | `duration-fast` (100ms) |

```css
.button {
  transition: background-color var(--duration-default) var(--easing-default),
              color var(--duration-default) var(--easing-default),
              border-color var(--duration-default) var(--easing-default);
}

.button:active {
  transition: transform var(--duration-fast) var(--easing-default);
  transform: translateY(1px);
}
```

### 42.4.2 Links

| Property | Transition |
|---|---|
| `text-decoration-thickness` | `duration-quick` (150ms) |
| `color` | `duration-default` |

```css
.prose a {
  transition: text-decoration-thickness var(--duration-quick) var(--easing-default),
              color var(--duration-default) var(--easing-default);
}
```

### 42.4.3 Cards (hover-elevation)

| Property | Transition |
|---|---|
| `box-shadow` | `duration-default` |
| `border-color` | `duration-default` |

```css
.listing-card {
  transition: box-shadow var(--duration-default) var(--easing-default),
              border-color var(--duration-default) var(--easing-default);
}
.listing-card:hover {
  box-shadow: var(--shadow-2);
}
```

Cards never `translateY` on hover. That motion reads as game UI.

### 42.4.4 Form inputs

| Property | Transition |
|---|---|
| `border-color` | `duration-default` |
| `box-shadow` (for focus ring) | `duration-quick` |

```css
.input {
  transition: border-color var(--duration-default) var(--easing-default);
}
.input:focus-visible {
  transition: border-color var(--duration-quick) var(--easing-default),
              box-shadow var(--duration-quick) var(--easing-default);
}
```

### 42.4.5 Modals

Entry: 250ms fade-in plus scale from 0.95 to 1.

```css
@keyframes modal-enter {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-content {
  animation: modal-enter var(--duration-slow) var(--easing-default) forwards;
}

@keyframes modal-exit {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}

.modal-content[data-state="closed"] {
  animation: modal-exit var(--duration-slow) var(--easing-default) forwards;
}
```

Backdrop fades independently at the same duration:

```css
.modal-backdrop {
  animation: fade-in var(--duration-slow) var(--easing-default) forwards;
}
```

### 42.4.6 Dropdown menus

Entry: 200ms slide-down from -4px plus fade-in.

```css
@keyframes dropdown-enter {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown {
  animation: dropdown-enter var(--duration-default) var(--easing-default) forwards;
}
```

### 42.4.7 Drawers (mobile menu)

Slide from the right edge: 250ms slide plus backdrop fade.

```css
@keyframes drawer-enter {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.drawer {
  animation: drawer-enter var(--duration-slow) var(--easing-default) forwards;
}
```

### 42.4.8 Tooltips

Entry: 100ms fade-in. Tooltips trigger on hover after a brief delay (300ms) to prevent accidental triggers, then fade in instantly.

```css
.tooltip {
  opacity: 0;
  transition-delay: 300ms;
}

.tooltip[data-state="visible"] {
  opacity: 1;
  transition: opacity var(--duration-fast) var(--easing-default);
  transition-delay: 300ms;
}
```

### 42.4.9 Toast notifications

Entry: 250ms slide-up plus fade-in. Exit: 250ms slide-down plus fade-out.

```css
@keyframes toast-enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.toast {
  animation: toast-enter var(--duration-slow) var(--easing-default) forwards;
}
```

Toasts auto-dismiss after 5 seconds (3 seconds for success, 7 seconds for warning, 0 seconds for error which requires user dismiss).

### 42.4.10 Accordions / Disclosures

Expand and collapse: 250ms height transition plus content fade.

```css
.accordion-content {
  overflow: hidden;
  transition: height var(--duration-slow) var(--easing-default);
}
```

The actual height value is calculated and set via JavaScript (CSS does not animate `height: auto`). Use a Radix UI Accordion or similar that handles this calculation.

### 42.4.11 Page transitions

No page-level animation. Astro page navigation is a full document load by default. The system avoids View Transitions API for now (browser support inconsistent, complexity does not pay back).

Within the SPA portal context (if any client-side routing is added), keep page transitions minimal: 150ms fade between routes.

### 42.4.12 Loading states

Skeleton placeholders pulse:

```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.skeleton {
  background: var(--color-ink-20);
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
```

Spinners rotate:

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

Spinners are the only context where `linear` easing is permitted.

### 42.4.13 Iconography state changes

When an icon shifts state (a heart filling on favorite, a chevron rotating on expand):

```css
.chevron {
  transition: transform var(--duration-default) var(--easing-default);
}
.chevron[aria-expanded="true"] {
  transform: rotate(180deg);
}
```

## 42.5 Reduced motion enforcement

The system globally honors `prefers-reduced-motion: reduce`. The enforcement lives in `tokens.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The `0.01ms` rather than `0` ensures animations still fire (so state-tracking JavaScript continues to work) but complete imperceptibly.

### 42.5.1 What persists under reduced motion

Two motion types remain functional regardless of preference:

1. **Loading spinners and skeleton pulses.** They communicate state; removing them entirely confuses the user.
2. **Focus ring appearance.** Focus must remain visible; removing the transition makes the ring appear instantly, which is correct.

### 42.5.2 What is removed under reduced motion

Everything else:

- Modal scale-in
- Drawer slide-in
- Dropdown slide-down
- Card hover shadow shift
- Button hover color transition
- Link underline thickness transition
- Tooltip fade-in
- Toast slide-up
- Accordion expand height transition
- Chevron rotation

### 42.5.3 Testing reduced motion

On macOS: System Settings → Accessibility → Display → Reduce motion.
On iOS: Settings → Accessibility → Motion → Reduce Motion.
In browser DevTools: emulate `prefers-reduced-motion: reduce` via the Rendering panel.

Every feature must be tested in both states before ship.

## 42.6 Scroll behavior

`scroll-behavior: smooth` is set on `<html>` by default for in-page anchor links. Under reduced motion this becomes `auto`.

No scroll-triggered animations. No parallax. No scroll-jacking. No fade-in-on-scroll. The user's scroll position belongs to the user.

## 42.7 Forbidden motion patterns

| Pattern | Why forbidden |
|---|---|
| Spring physics, bouncing, overshoot | Reads as game UI or consumer app; outside the brand's calm voice |
| Animations longer than 250ms | Crosses user-perceptible-wait threshold |
| Animations shorter than 100ms (except `transition-none`) | Reads as glitch, not intentional motion |
| Parallax scrolling | Reads as marketing-heavy site; outside the brand's restraint |
| Auto-advancing carousels | The system has no carousels |
| Scroll-triggered fade-ins | Manipulates user's scroll position perception |
| Hover-triggered translate-up on cards | Reads as game UI |
| Auto-play video on page load | Forbidden everywhere |
| Looping animations except spinners and skeleton | Distracts from content |
| Easing curves other than `cubic-bezier(0.4, 0, 0.2, 1)` | Breaks system consistency |
| Custom durations outside the four-token scale | Breaks system consistency |
| Click-triggered confetti, celebration animations | Reads as consumer marketing |
| Cursor-following effects (cursor trails, hover halos) | Reads as 2010-era novelty |
| Theatrical entrance animations (slide from miles away, rotation on entry) | Performs rather than communicates |

## 42.8 Acceptance

This doc is acceptable when:

- Every motion in the codebase uses one of the four duration tokens
- Every motion uses `easing-default` or `linear` (spinners only)
- Reduced motion is honored on every animated element
- No animation exceeds 250ms
- Spring physics, parallax, and auto-advancing carousels are absent from the codebase
- A reviewer can verify each forbidden pattern is not present
