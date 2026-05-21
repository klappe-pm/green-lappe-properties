---
domain: brand
category: design-system
sub-category: component-states
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 52-component-grammar
  - 42-motion
  - 30-design-tokens
produces:
  - state-matrix
  - state-implementation-rules
  - focus-management-rules
  - keyboard-interaction-spec
executor: engineering
aliases:
tags:
---

# 53-component-states

The complete state matrix for every interactive component. Every component must implement default, hover, focus, active, and disabled states. Plus loading where applicable. This doc is the master reference for state specifications.

## Dependencies

- `52-component-grammar` for the components themselves
- `42-motion` for transition timing
- `30-design-tokens` for state colors

## Outputs

1. Master state matrix (component × state)
2. Implementation rules per state
3. Focus management rules
4. Keyboard interaction specifications

## State definitions

| State | Trigger | Visual cue |
|---|---|---|
| Default | None | Resting appearance |
| Hover | Mouse cursor enters element | Subtle visual change (color, border) |
| Focus | Keyboard navigation or programmatic focus | 2px Cedar outline, 2px offset |
| Active | Mouse button pressed or finger touched | `scale(0.98)` or color darkening |
| Disabled | Element cannot be interacted with | Reduced opacity or muted color, `cursor: not-allowed` |
| Loading | Async operation in progress | Spinner inline or replacing label |
| Selected | Currently chosen (radio, toggle) | Cedar accent |
| Read-only | View-only field | No border, default color |
| Error | Validation failure | Error color border and message |
| Success | Validation pass | Success color border (sparingly) |

## State matrix

| Component | Default | Hover | Focus | Active | Disabled | Loading | Selected | Error |
|---|---|---|---|---|---|---|---|---|
| Primary button | Clay bg, Cream text | Clay/90 | 2px Cedar outline | scale(0.98) | Stone bg, Ink-40 text | Spinner + label | n/a | n/a |
| Secondary button | Transparent bg, Ink text, Ink-20 border | Ink-60 border | 2px Cedar outline | scale(0.98) | 50% opacity | Spinner + label | n/a | n/a |
| Tertiary button | Cedar text, underline | No underline | 2px Cedar outline | n/a | 50% opacity | Spinner | n/a | n/a |
| Icon button | Inherit color | Ink/5 bg | 2px Cedar outline | Ink/10 bg | 50% opacity | n/a | n/a | n/a |
| Text input | Ink-20 border | Ink-60 border | 2px Cedar outline, Cedar border | n/a | Stone bg, Ink-40 text | n/a | n/a | Error border |
| Textarea | Ink-20 border | Ink-60 border | 2px Cedar outline, Cedar border | n/a | Stone bg, Ink-40 text | n/a | n/a | Error border |
| Select | Ink-20 border | Ink-60 border | 2px Cedar outline, Cedar border | n/a | Stone bg | n/a | n/a | Error border |
| Checkbox | Ink-20 border, Surface bg | Ink-60 border | 2px Cedar outline | n/a | Stone bg | n/a | Cedar bg, Cedar border, Cream check | n/a |
| Radio | Ink-20 border circle | Ink-60 border | 2px Cedar outline | n/a | Stone bg | n/a | Cedar border, Cedar dot | n/a |
| Card (link) | Ink-20 border, no shadow | shadow-1 | 2px Cedar outline | n/a | n/a | n/a | n/a | n/a |
| Nav link | Ink-60 text | Cedar text | 2px Cedar outline | n/a | n/a | n/a | Cedar text, aria-current | n/a |
| Tab | Ink-60 text, no underline | Ink text | 2px Cedar outline | n/a | 50% opacity | n/a | Ink text, Cedar bottom border | n/a |
| Tag (link) | Stone/50 bg, Ink text | Stone bg | 2px Cedar outline | n/a | n/a | n/a | n/a | n/a |
| Chip (removable) | Cedar/10 bg, Cedar text | n/a | 2px Cedar outline (close button only) | n/a | n/a | n/a | n/a | n/a |

## Implementation rules

### Default state

The baseline appearance. Every component MUST render correctly in default state without any class modifiers beyond the component name.

```html
<button class="btn-primary">Submit</button>
<input class="input" />
```

### Hover state

Triggered on mouse over. Touch devices do not trigger hover; never rely on hover for critical information.

```css
.btn-primary:hover {
  background: rgba(169, 92, 66, 0.9); /* clay/90 */
  transition: background-color var(--duration-default) var(--easing-default);
}

@media (hover: none) {
  .btn-primary:hover { background: var(--color-clay); }
}
```

Suppress hover on touch devices using `@media (hover: none)`.

### Focus state

Triggered by keyboard navigation or programmatic focus. MUST be visually distinct. Uses `:focus-visible` to avoid showing focus rings on mouse click (only on keyboard).

```css
.btn-primary:focus-visible {
  outline: 2px solid var(--color-cedar);
  outline-offset: 2px;
}
```

Never remove focus styles. Removing them is an accessibility failure.

### Active state

Triggered on mouse press or finger touch. Always brief.

```css
.btn-primary:active {
  transform: scale(0.98);
  transition: transform var(--duration-fast) var(--easing-default);
}
```

### Disabled state

Element cannot be interacted with. Set `disabled` attribute (for native) or `aria-disabled="true"` for custom components.

```css
.btn-primary:disabled,
.btn-primary[aria-disabled="true"] {
  background: var(--color-stone);
  color: var(--color-ink-40);
  cursor: not-allowed;
  pointer-events: none;
}
```

### Loading state

Replace label with spinner plus single-word indicator. Set `aria-busy="true"`.

```html
<button class="btn-primary" disabled aria-busy="true">
  <span class="spinner" aria-hidden="true"></span>
  Sending
</button>
```

```css
.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(251, 246, 236, 0.4); /* cream/40 */
  border-top-color: var(--color-cream);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Selected state

For checkboxes, radios, toggle buttons, tabs, nav-current. Always uses Cedar accent.

```html
<input type="checkbox" checked />
<button role="tab" aria-selected="true">Tab 1</button>
<a href="/owners" aria-current="page">For owners</a>
```

### Error state

Border color changes to error. Error message appears below.

```html
<input type="text" aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" class="error-message">Email is required</p>
```

## Focus management rules

### Rule 1: Focus visible

Every interactive element must show a visible focus indicator. Use `:focus-visible` to avoid showing on mouse click. Token: `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset`.

### Rule 2: Focus order

DOM order matches visual order. No `tabindex > 0` (which jumps to specific positions).

### Rule 3: Skip link

Every page has a skip-to-main-content link as the first focusable element. Hidden until focused.

```html
<a href="#main" class="skip-link">Skip to main content</a>
```

### Rule 4: Modal focus trap

When a modal opens:

1. Move focus to the first focusable element inside the modal
2. Trap focus inside the modal (Tab cycles within)
3. On close, return focus to the trigger element

### Rule 5: Drawer focus trap

Same as modal. Mobile menu drawer follows this pattern.

### Rule 6: Dropdown focus

Open dropdown via Enter or Space on trigger. Arrow keys navigate options. Enter selects. Escape closes and returns focus to trigger.

## Keyboard interactions

### Buttons

- `Tab` to focus
- `Enter` or `Space` to activate

### Inputs

- `Tab` to focus
- `Tab` to next field

### Checkboxes and radios

- `Tab` to focus group
- `Arrow keys` to move between radios in a group
- `Space` to toggle

### Selects (native)

- `Tab` to focus
- `Space` or `Enter` to open
- `Arrow keys` to navigate
- `Enter` to select
- `Escape` to close

### Selects (custom combobox)

- `Tab` to focus
- `Down arrow` or `Space` to open
- `Up/Down arrows` to navigate options
- `Enter` to select
- `Escape` to close
- Type-ahead to filter

### Tabs

- `Tab` to focus active tab
- `Arrow keys` (Left/Right) to switch tabs
- `Home` to first tab
- `End` to last tab

### Modals and drawers

- `Escape` to close
- `Tab` cycles within
- `Shift+Tab` cycles backward

### Tooltips

- `Tab` to focus trigger, tooltip shows
- `Escape` dismisses

## Forbidden patterns

- Removing focus styles (`outline: none` without `:focus-visible` replacement)
- `tabindex > 0`
- Click-only interactions (must work with keyboard)
- Hover-only menus
- Modal without focus trap
- Modal without focus return on close
- Async actions without `aria-busy` indicator
- Disabled state via opacity only (must also set `disabled` or `aria-disabled`)
- Loading state without screen-reader announcement

## Acceptance

This doc is acceptable when:

- Every component listed in `52-component-grammar.md` has a row in the state matrix
- Every state has CSS implementation
- Every keyboard interaction pattern is testable
- Focus management rules can be verified with a screen reader
