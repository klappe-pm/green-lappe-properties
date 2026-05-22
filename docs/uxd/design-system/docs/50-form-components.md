---
domain: brand
category: design-system
sub-category: form-components
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
  - input-spec
  - label-and-helper-spec
  - validation-spec
  - select-spec
  - checkbox-radio-spec
  - submit-button-spec
  - form-layout-spec
  - error-and-success-spec
executor: engineering
aliases: []
tags: []
---

# 50-form-components

The complete form component specification. Every input, label, validation message, button, and form layout pattern. Consumed by every author building a form: contact, owner-proposal-request, renter-inquiry, application, repair-request, payment.

## Dependencies

- `22-typography-usage` for form-element typography
- `30-design-tokens` for color, spacing, radius
- `40-spacing-layout` for form column widths and vertical gap
- `41-radius-shadow` for input and button radius
- `42-motion` for focus and hover transitions

## Outputs

1. Text input, textarea, select, checkbox, radio specs
2. Label and helper text rules
3. Validation patterns (error and success states)
4. Submit button patterns (primary, secondary, tertiary)
5. Form layout (vertical, horizontal, mixed)
6. Multi-step form pattern
7. Forbidden form patterns

## Design rationale

Forms are where trust gets earned or lost. The brand's voice principles (direct, specific, calm) apply to every form-element label, placeholder, and error message. Forms must work flawlessly on mobile, where most renters fill them out, and on desktop, where most owners do.

## Text input

### Default state

```css
.input {
  font-family: var(--font-display);
  font-size: 1rem;          /* 16px; prevents iOS auto-zoom on focus */
  font-weight: var(--weight-regular);
  color: var(--color-text);
  background: var(--surface);
  border: 1px solid var(--color-ink-20);
  border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-4);
  min-height: var(--touch-target);
  width: 100%;
  max-width: var(--measure-form);
  transition: border-color var(--duration-default) var(--easing-default);
}
```

### Placeholder

```css
.input::placeholder {
  color: var(--color-text-subtle);
  font-weight: var(--weight-regular);
}
```

### Hover state

```css
.input:hover {
  border-color: var(--color-ink-60);
}
```

### Focus state

```css
.input:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  border-color: var(--color-cedar);
}
```

### Disabled state

```css
.input:disabled {
  background: var(--color-stone);
  color: var(--color-text-subtle);
  cursor: not-allowed;
  border-color: var(--color-ink-20);
}
```

### Tailwind usage

```html
<input
  type="text"
  class="w-full max-w-form font-display font-regular text-base text-ink bg-surface border border-ink-20 rounded-sm px-4 py-3 min-h-touch hover:border-ink-60 focus-visible:outline-2 focus-visible:outline-cedar focus-visible:outline-offset-2 focus-visible:border-cedar transition-colors"
/>
```

## Textarea

Same styling as input. Always has `rows` attribute set explicitly. Default `rows="4"` for messages.

```html
<textarea
  rows="4"
  class="w-full max-w-form font-display font-regular text-base text-ink bg-surface border border-ink-20 rounded-sm px-4 py-3 hover:border-ink-60 focus-visible:outline-2 focus-visible:outline-cedar focus-visible:outline-offset-2 focus-visible:border-cedar transition-colors resize-y"
></textarea>
```

`resize-y` allows vertical resize only. `resize-none` for tight layouts where resize would break the design.

## Select

Use custom select for consistent appearance. Native `<select>` styled where possible.

```html
<select
  class="w-full max-w-form font-display font-regular text-base text-ink bg-surface border border-ink-20 rounded-sm px-4 py-3 min-h-touch appearance-none bg-no-repeat bg-right pr-10 hover:border-ink-60 focus-visible:outline-2 focus-visible:outline-cedar transition-colors"
  style="background-image: url('data:image/svg+xml,...')"
>
  <option>Choose one</option>
  ...
</select>
```

For complex selects with search or multi-select, use a custom combobox component (built on Radix UI or Headless UI). The combobox uses the same input styling for its trigger and `z-dropdown` for its panel.

## Checkbox and radio

```html
<label class="flex items-start gap-3 cursor-pointer">
  <input
    type="checkbox"
    class="mt-1 w-5 h-5 border border-ink-20 rounded-sm bg-surface checked:bg-cedar checked:border-cedar focus-visible:outline-2 focus-visible:outline-cedar focus-visible:outline-offset-2 transition-colors"
  />
  <span class="font-display font-regular text-base text-ink">
    I agree to the terms
  </span>
</label>
```

Radio uses identical styling with `type="radio"` and `rounded-full` instead of `rounded-sm`.

## Label

Position: always above the input. Required visibility for accessibility (no placeholder-only labels).

```html
<label class="block font-display font-medium text-sm text-ink mb-2">
  Property address
</label>
```

### Optional indicator

Use the word "optional" in the label, not "required" by default:

```html
<label class="block font-display font-medium text-sm text-ink mb-2">
  Phone <span class="text-ink-60 font-regular">(optional)</span>
</label>
```

Reverse only when most fields are optional and the few required need flagging.

## Helper text

Position: below the input, before any error message.

```html
<p class="font-display font-regular text-[13px] text-ink-60 mt-2">
  Street address, city, ZIP
</p>
```

## Error state

Border color changes to error. Error message replaces or supplements helper text.

```html
<input class="input border-error" aria-invalid="true" aria-describedby="address-error" />
<p id="address-error" class="font-display font-medium text-[13px] text-error mt-2">
  Property address is required
</p>
```

CSS:

```css
.input.error,
.input[aria-invalid="true"] {
  border-color: var(--color-error);
}

.error-message {
  font-family: var(--font-display);
  font-weight: var(--weight-medium);
  font-size: 13px;
  color: var(--color-error);
  margin-top: var(--space-2);
}
```

## Success state

Used sparingly. Only after successful field validation (typically after blur or on form submit).

```css
.input.success,
.input[data-validation="success"] {
  border-color: var(--color-success);
}
```

## Field group

Standard vertical group with `space-6` between fields:

```html
<form class="max-w-form flex flex-col gap-6">
  <div>
    <label class="block font-display font-medium text-sm text-ink mb-2">
      Property address
    </label>
    <input type="text" class="input w-full" />
    <p class="font-display font-regular text-[13px] text-ink-60 mt-2">
      Street address, city, ZIP
    </p>
  </div>

  <div>
    <label class="block font-display font-medium text-sm text-ink mb-2">
      Number of doors
    </label>
    <input type="number" min="1" max="20" class="input w-full" />
  </div>

  <div>
    <label class="block font-display font-medium text-sm text-ink mb-2">
      Message
    </label>
    <textarea rows="4" class="input w-full"></textarea>
  </div>

  <button type="submit" class="bg-clay text-cream font-display font-semibold text-base px-6 py-3 rounded-md min-h-touch hover:bg-clay/90 transition-colors">
    Request a proposal
  </button>
</form>
```

## Submit buttons

### Primary

Clay background, Cream text. One per form.

```html
<button
  type="submit"
  class="bg-clay text-cream font-display font-semibold text-base px-6 py-3 rounded-md min-h-touch hover:bg-clay/90 active:scale-[0.98] transition-all"
>
  Request a proposal
</button>
```

### Secondary

Transparent background, Ink text, hairline border.

```html
<button
  type="button"
  class="bg-transparent text-ink font-display font-medium text-base px-6 py-3 rounded-md min-h-touch border border-ink-20 hover:border-ink-60 active:scale-[0.98] transition-all"
>
  Cancel
</button>
```

### Tertiary

Text-only, Cedar color, underlined.

```html
<button
  type="button"
  class="bg-transparent text-cedar font-display font-medium text-base px-2 py-2 underline underline-offset-2 hover:no-underline"
>
  Save as draft
</button>
```

### Submit button states

| State | Visual |
|---|---|
| Default | Clay background, Cream text |
| Hover | Clay at 90% opacity |
| Active (pressed) | `scale(0.98)` |
| Focused | 2px Cedar outline, 2px offset |
| Disabled | Stone background, Ink-40 text, `cursor: not-allowed` |
| Loading | Disabled appearance plus inline spinner; text reads "Sending" |

## Loading state

Replace button content with spinner plus single-word label:

```html
<button type="submit" disabled class="... opacity-60 cursor-not-allowed">
  <span class="inline-block w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin mr-2"></span>
  Sending
</button>
```

## Form layout patterns

### Single column (default)

Mobile and desktop. Most acquisition forms.

```html
<form class="max-w-form flex flex-col gap-6">
  <!-- fields stack vertically -->
</form>
```

### Two-column at desktop

For dense forms (owner proposal with property details). Single column on mobile, two columns at `md` breakpoint.

```html
<form class="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label>First name</label>
    <input class="input w-full" />
  </div>
  <div>
    <label>Last name</label>
    <input class="input w-full" />
  </div>
  <!-- full-width field spans both columns -->
  <div class="md:col-span-2">
    <label>Property address</label>
    <input class="input w-full" />
  </div>
</form>
```

### Inline (rare; search forms)

```html
<form class="flex gap-2">
  <input class="input flex-1" placeholder="Search rentals" />
  <button type="submit" class="bg-clay text-cream font-display font-semibold text-base px-6 py-3 rounded-md">
    Search
  </button>
</form>
```

## Multi-step forms

For application forms and owner onboarding. Steps shown as progress at top:

```html
<div class="flex items-center justify-between mb-8">
  <div class="flex-1">
    <div class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Step 1 of 3</div>
    <div class="font-display font-medium text-base text-ink mt-1">Contact information</div>
  </div>
</div>

<form>
  <!-- step 1 fields -->
  <div class="flex justify-between mt-8">
    <button type="button" class="...">Back</button>
    <button type="submit" class="...">Continue</button>
  </div>
</form>
```

Progress indicator uses:

- Geist 500 12px uppercase tracked for "Step X of Y" label
- Geist 500 16px Ink for the step name
- Spacing `space-8` between progress and form
- Back and Continue buttons in a flex row, justified between

## Form-level error

Top of form, before fields, for general errors:

```html
<div class="bg-error/10 border border-error rounded-md p-4 mb-6">
  <p class="font-display font-medium text-sm text-error">
    Couldn't send your message. Try again, or email megan@greenpmpnw.com directly.
  </p>
</div>
```

## Form-level success

Replaces the form after successful submission:

```html
<div class="bg-success/10 border border-success rounded-md p-6">
  <h3 class="font-display font-medium text-lg text-success mb-2">
    Got it.
  </h3>
  <p class="font-body text-prose text-ink leading-relaxed">
    Megan will email you within one business day.
  </p>
</div>
```

## Forbidden patterns

- Placeholder-only labels (accessibility failure)
- Asterisks for required marking (use the word "required" or default to required-with-optional-marked)
- Input font-size below 16px (triggers iOS auto-zoom)
- Multi-column forms on mobile (always stack on mobile)
- Native select styling on iOS (always custom-style or use combobox)
- "Oops!", "Whoops!", or apologetic error messages
- Error messages that blame the user ("You did this wrong")
- Submit buttons without explicit `type="submit"`
- Form fields without explicit `<label>` (label-by-aria or label-by-placeholder are forbidden)
- Inline form layouts on mobile (search exception only)
- Validating on every keystroke (validate on blur or submit)
- Toast-only success messages (also replace the form)
- Two primary buttons in one form (one Clay button per form)

## Accessibility requirements

- Every input has a visible `<label>` linked by `for` and `id`
- Required fields use `required` attribute and the label says "required" or the optional fields say "optional"
- Error states set `aria-invalid="true"` and link error message via `aria-describedby`
- Helper text linked via `aria-describedby` even when not in error state
- Form submission focuses the first error field on validation failure
- Submit button visible focus ring meets contrast requirements

## Acceptance

This doc is acceptable when:

- A developer can build any form on the site from these specs without ad-hoc CSS
- Every input state (default, hover, focus, disabled, error, success) is specified with CSS and Tailwind
- Multi-step forms have a documented progress pattern
- Every accessibility requirement is testable
- Forbidden patterns can be caught in code review by referencing this doc
