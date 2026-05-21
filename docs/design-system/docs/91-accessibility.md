---
domain: brand
category: design-system
sub-category: accessibility
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 30-design-tokens
  - 52-component-grammar
  - 22-typography-usage
  - 42-motion
produces:
  - wcag-compliance-target
  - keyboard-navigation-spec
  - screen-reader-spec
  - focus-management-spec
  - color-contrast-spec
  - form-accessibility-spec
  - accessibility-statement
executor: engineering
aliases:
tags:
---

# 91-accessibility

The accessibility specification. Defines the WCAG compliance target, keyboard navigation requirements, screen reader compatibility rules, focus management, color contrast, form accessibility, motion accessibility, and the public accessibility statement. Consumed by every component author and verified at every shipping milestone.

## Dependencies

- `30-design-tokens` for the focus ring tokens
- `52-component-grammar` for the component-level patterns this doc augments
- `22-typography-usage` for the typographic contrast rules
- `42-motion` for the reduced-motion enforcement

## Outputs

1. WCAG 2.1 AA compliance commitment
2. Keyboard navigation specification (every interactive element reachable via keyboard)
3. Screen reader specification (semantic HTML, ARIA, name/role/value)
4. Focus management rules
5. Color contrast verification
6. Form accessibility (labels, errors, helper text)
7. Motion accessibility (reduced-motion enforcement)
8. Media accessibility (alt text, captions, transcripts)
9. Public accessibility statement template

## 91.1 Compliance target

The brand commits to **WCAG 2.1 Level AA** compliance across:

- The marketing site (`greenpmpnw.com`)
- The PMS portal entry points (the marketing site's portal-login links)

The PMS itself (Rentvine, AppFolio) is third-party software. The brand commits to documenting any known accessibility gaps in third-party tools and to advocating for fixes with the vendor.

### 91.1.1 Why AA, not AAA

WCAG AA is the realistic, enforceable baseline. AAA includes requirements (7:1 text contrast, no time limits anywhere, sign-language interpretation for all video) that are either impractical for a small operator or genuinely conflict with brand expression (e.g., Cedar on Cream is 5.4:1, AAA-failing but AA-passing). The brand commits to AA across the board, exceeds AA where practical, and documents any known AA gap rather than hiding it.

### 91.1.2 Quarterly audit

Every quarter:

- Run axe DevTools on the top 10 pages
- Test keyboard navigation through the proposal request form, the listing inquire form, and the resident portal entry
- Test with VoiceOver on macOS and iOS, and with NVDA on Windows
- Test in high-contrast mode and with `prefers-reduced-motion: reduce`
- Update the accessibility statement (section 91.10) with current known issues

## 91.2 Keyboard navigation

Every interactive element on the site must be reachable and operable via keyboard alone. Mouse and touch are layered on top, never required.

### 91.2.1 Required keyboard interactions

| Element | Keys | Action |
|---|---|---|
| Link | `Tab`, `Enter` | Focus, activate |
| Button | `Tab`, `Enter`, `Space` | Focus, activate |
| Text input | `Tab`, type | Focus, enter text |
| Textarea | `Tab`, type, `Shift+Enter` for new line | Focus, enter multi-line text |
| Select | `Tab`, `Space` or `Enter` to open, `Arrow` keys, `Enter` to choose | Focus, navigate options |
| Checkbox | `Tab`, `Space` | Focus, toggle |
| Radio (within group) | `Tab` to group, `Arrow` within group, `Space` | Focus group, choose option |
| Dropdown menu | `Tab` to trigger, `Enter` or `Space` to open, `Arrow` to navigate, `Enter` to choose, `Esc` to close | Standard menu pattern |
| Modal dialog | `Tab` cycles within modal (focus trap), `Esc` closes | Standard dialog pattern |
| Accordion | `Tab` to header, `Enter` or `Space` to expand/collapse | Standard disclosure pattern |
| Tab list | `Tab` to active tab, `Arrow` keys to navigate tabs, `Enter` or `Space` to activate | Tablist pattern (if used) |
| Mobile menu drawer | `Tab` cycles within drawer when open, `Esc` closes | Same as modal |
| Image gallery overlay | `Arrow Left/Right` to navigate, `Esc` to close | Custom but documented |

### 91.2.2 Tab order

Tab order follows visual reading order: top-to-bottom, left-to-right. Custom tab indexes (`tabindex="1"`, `tabindex="5"`) are forbidden. The natural document order is the tab order.

The only permitted `tabindex` values:

- `tabindex="0"`: makes a non-interactive element focusable (rare)
- `tabindex="-1"`: removes an element from tab order (programmatic focus only; modal focus management)

### 91.2.3 Skip link

A skip-to-content link is the first focusable element on every page:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

It is visually hidden until focused, then appears at top-left. Implementation in `base.css`:

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

### 91.2.4 Keyboard shortcuts

No custom keyboard shortcuts on the marketing site. The PMS may have its own; that is the PMS's concern.

## 91.3 Focus management

### 91.3.1 Focus visible

Every focusable element shows a visible focus ring when focused via keyboard:

```css
:focus {
  outline: none;
}
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);  /* 2px Cedar */
  outline-offset: var(--focus-ring-offset);                          /* 2px */
  border-radius: var(--radius-sm);
}
```

The `:focus-visible` selector ensures the ring shows on keyboard focus but not on mouse click (which would clutter the visual UI). All modern browsers support `:focus-visible`.

### 91.3.2 Focus contrast

The focus ring is Cedar 2px on every background. Contrast verification:

| Background | Focus ring (Cedar 2px) | Visible? |
|---|---|---|
| Cream | Yes, 5.4:1 | Strong |
| Paper | Yes, 5.3:1 | Strong |
| Ink (dark sections) | Cream 2px instead, 13.8:1 | Strong |

For dark sections (Ink background, Cedar footer), the focus ring is Cream:

```css
.bg-cedar :focus-visible,
.bg-ink :focus-visible {
  outline-color: var(--color-cream);
}
```

### 91.3.3 Focus trap in modals

When a modal opens, focus is moved into the modal. Tab and Shift+Tab cycle within the modal. Esc closes the modal and returns focus to the trigger element.

Implementation: use Radix UI Dialog or implement focus trap manually:

1. On modal open: save the currently focused element; move focus to the first focusable element inside the modal
2. On Tab from the last focusable element: cycle back to the first
3. On Shift+Tab from the first focusable element: cycle to the last
4. On Esc: close the modal, restore focus to the saved trigger

### 91.3.4 Focus restoration

After any modal, drawer, dropdown, or overlay closes, focus returns to the element that opened it. Never to body or to the page top.

### 91.3.5 Focus on page load

The page does not auto-focus any element on initial load. The user's reading begins at the top; auto-focus would move scroll position or focus to an arbitrary element.

Exceptions:

- Error pages (404, 500): focus the H1 so screen reader users hear the error first
- Form submission success page: focus the success heading

## 91.4 Screen reader specification

The system uses semantic HTML first; ARIA only when semantic HTML cannot express the relationship.

### 91.4.1 Semantic HTML requirements

| Element | Use |
|---|---|
| `<header>` | Page header (top nav region) |
| `<nav>` | Navigation menus; one per region; label each (`aria-label="Main"`, `aria-label="Footer"`) |
| `<main>` | Primary content (one per page; the skip link jumps here) |
| `<article>` | Self-contained content (blog post, listing, evidence card) |
| `<section>` | Page section with a heading |
| `<aside>` | Sidebar, related content |
| `<footer>` | Page footer |
| `<h1>` to `<h6>` | Headings, in semantic order; one `<h1>` per page; never skip levels |
| `<a>` | Link |
| `<button>` | Action (form submit, modal open, accordion expand) |
| `<form>` | Form |
| `<label>` | Form field label |
| `<input>`, `<textarea>`, `<select>` | Form fields |
| `<fieldset>` + `<legend>` | Grouped form fields (e.g., radio group) |
| `<ul>`, `<ol>`, `<li>` | Lists |
| `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` | Tabular data only |
| `<dialog>` or `<div role="dialog">` | Modal |
| `<img>` with `alt` | Images |
| `<picture>`, `<source>` | Responsive images |
| `<figure>`, `<figcaption>` | Image with caption |
| `<blockquote>` | Long quote |
| `<time datetime="...">` | Dates and times |

### 91.4.2 The `<a>` versus `<button>` rule

Use `<a>` when:

- The action navigates to a URL
- The destination has a URL that could be bookmarked or shared
- Right-click "Open in new tab" should work

Use `<button>` when:

- The action triggers an in-page change (open modal, expand accordion, submit form)
- There is no URL destination

Never style a `<div>` as a button. Never use a `<button>` to navigate. Never use `<a href="#">` with a JavaScript click handler.

### 91.4.3 ARIA usage

ARIA augments semantic HTML; it does not replace it. First rule of ARIA: don't use ARIA. Use semantic HTML first; reach for ARIA only when there's a genuine gap.

Required ARIA patterns:

| Pattern | Implementation |
|---|---|
| Modal dialog | `role="dialog"` + `aria-modal="true"` + `aria-labelledby="[dialog title id]"` |
| Active page in nav | `aria-current="page"` |
| Sort direction in tables | `aria-sort="ascending"` or `aria-sort="descending"` |
| Expand/collapse state | `aria-expanded="true"` or `aria-expanded="false"` on the trigger |
| Live region (toast notifications) | `aria-live="polite"` for non-urgent, `aria-live="assertive"` for errors |
| Decorative icon | `aria-hidden="true"` on the icon, label on the parent button |
| Required field | `aria-required="true"` on the input (helper text also says "required") |
| Invalid field | `aria-invalid="true"` + `aria-describedby="[error id]"` |
| Tab list | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls` |

### 91.4.4 Icon-only buttons

Every icon-only button has an `aria-label`:

```html
<button aria-label="Close menu" class="...">
  <Icon name="x" aria-hidden="true" />
</button>

<button aria-label="Open menu" class="...">
  <Icon name="menu" aria-hidden="true" />
</button>
```

The icon itself is `aria-hidden="true"` so the screen reader doesn't double-read it.

### 91.4.5 Landmark regions

Every page has:

- One `<header>` (top nav)
- One `<main>` (primary content)
- One `<footer>` (footer)
- One or more `<nav>` (each with `aria-label`)

These create landmark regions for screen reader users to navigate.

### 91.4.6 Page titles

Every page has a unique `<title>` that describes the page:

```html
<!-- Right -->
<title>Owner services — Green Property Management</title>
<title>1823 NW 65th St — Available March 1 — Green PM</title>
<title>Why I replaced this boiler now — Field notes — Green PM</title>

<!-- Wrong -->
<title>Home</title>
<title>Green PM</title>
```

The pattern: page-specific descriptor, em-separated brand name. Em dash in `<title>` only (UI prose uses commas per `userPreferences`, but `<title>` is title-cased machine context where em dash separator reads cleanest in browser tabs).

## 91.5 Color contrast

The color system in `10-color-system` documents the contrast matrix. All text-on-background pairs meet AA at the size and weight they are used.

### 91.5.1 Body text contrast (AA: 4.5:1 minimum)

| Foreground | Background | Ratio | Pass |
|---|---|---|---|
| Ink | Cream | 13.8:1 | ✓ |
| Ink | Paper | 13.4:1 | ✓ |
| Ink-80 | Cream | ~10:1 | ✓ |
| Ink-60 | Cream | ~6.5:1 | ✓ |
| Cedar | Cream | 5.4:1 | ✓ |
| Cream | Cedar | 5.4:1 | ✓ |
| Cream | Ink | 13.8:1 | ✓ |
| Ink-40 | Cream | ~3.5:1 | ✗ (large text only) |

### 91.5.2 Large text contrast (AA: 3:1 minimum)

Large text (18pt+ or 14pt bold+) has a lower contrast bar. Cedar headlines on Cream (5.4:1) easily clear this.

### 91.5.3 Non-text contrast (AA: 3:1 minimum for UI components and graphics)

| Element | Foreground | Background | Ratio | Pass |
|---|---|---|---|---|
| Focus ring | Cedar | Cream | 5.4:1 | ✓ |
| Border (active input) | Cedar | Cream | 5.4:1 | ✓ |
| Border (default input) | Ink-20 | Cream | 1.5:1 | ✗ (decorative; not state-critical) |
| Icon (Lucide outline) | Ink-60 | Cream | ~6.5:1 | ✓ |

The default input border at Ink-20 falls below 3:1. This is acceptable because:

- The input has other visual cues (the input shape, the placeholder, the label above)
- The focused state uses Cedar (5.4:1) which clearly meets the bar
- Non-text contrast is required for elements that convey information; an undecorated default border conveys "input exists here" which the input's overall shape already conveys

### 91.5.4 Information conveyed by color alone

Forbidden. Status communication (success/warning/error) must include:

- Color (the state color)
- An icon (check, warning triangle, x)
- A text label

```html
<!-- Right -->
<div class="alert alert-success">
  <Icon name="check-circle" aria-hidden="true" />
  <span class="font-medium">Paid</span>
  <p>Your November rent payment was received on October 31.</p>
</div>

<!-- Wrong: color-only state communication -->
<div class="text-success">November rent received.</div>
```

## 91.6 Form accessibility

### 91.6.1 Labels

Every form field has a visible `<label>` associated via `for`/`id`:

```html
<label for="property-address" class="font-display font-medium text-sm">
  Property address
</label>
<input id="property-address" name="property-address" type="text" />
```

Placeholder-only labels are forbidden.

### 91.6.2 Required fields

Required fields are marked in the visible label and with `aria-required="true"`:

```html
<label for="email">
  Email
  <span class="text-ink-60 text-xs font-regular">(required)</span>
</label>
<input id="email" type="email" required aria-required="true" />
```

Asterisks alone are not enough; screen readers may not announce them, and visually they are unclear.

### 91.6.3 Helper text

Helper text is associated via `aria-describedby`:

```html
<label for="phone">Phone</label>
<input id="phone" type="tel" aria-describedby="phone-help" />
<p id="phone-help" class="text-xs text-ink-60">
  Optional. Used only for urgent follow-up.
</p>
```

### 91.6.4 Error messages

Error messages are associated via `aria-describedby` and the field is marked `aria-invalid`:

```html
<label for="email">Email</label>
<input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" class="text-error text-xs font-medium" role="alert">
  That email format doesn't look right. Check for typos.
</p>
```

`role="alert"` causes screen readers to announce the error immediately when it appears.

### 91.6.5 Form submission feedback

After form submission, feedback appears in a live region:

```html
<div aria-live="polite" aria-atomic="true">
  <p>Got it. Megan will email you within one business day.</p>
</div>
```

For form errors (e.g., network failure on submit), use `aria-live="assertive"` so the user is interrupted with the error.

## 91.7 Motion accessibility

The `prefers-reduced-motion` enforcement is documented in `42-motion`. The implementation lives in `tokens.css`:

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

Auto-play video and auto-advancing carousels are forbidden everywhere (not just under reduced motion).

## 91.8 Media accessibility

### 91.8.1 Image alt text

Every `<img>` has an `alt` attribute:

- **Informative images**: descriptive alt text
  ```html
  <img src="..." alt="Front exterior of 1823 NW 65th St; two-story 1924 craftsman with cedar shake siding and a covered porch" />
  ```
- **Decorative images**: empty alt
  ```html
  <img src="..." alt="" />
  ```
- **Functional images (image as link or button)**: alt describes the action
  ```html
  <a href="/owners/proposal">
    <img src="megan-portrait.jpg" alt="Schedule a call with Megan" />
  </a>
  ```

### 91.8.2 Alt text rules

- 125 characters or fewer when possible
- Do not start with "Image of" or "Picture of" (screen readers announce "image")
- Describe what the image conveys, not what the image is
- For listing photos, describe room and key features (e.g., "Kitchen with white shaker cabinets, gas range, and pendant lighting")
- For Megan's portrait, describe the person and setting briefly ("Megan Green, smiling, standing in front of a managed property")
- For maintenance photos in blog posts, describe what's relevant ("Boiler tag showing 2003 manufacture date")

### 91.8.3 Video accessibility

If video is added later:

- Captions (closed) required for any spoken content
- Transcript provided as text alternative
- No auto-play
- Controls keyboard-accessible

### 91.8.4 Audio accessibility

If audio is added later (e.g., a podcast):

- Transcript provided as text alternative

## 91.9 Document accessibility

### 91.9.1 PDF statements and proposals

PDF documents (owner statements, proposals) generated by the system or by AppFolio must be tagged PDFs (accessible PDF structure) so screen readers can navigate them.

Statement PDFs include:

- Document title in PDF metadata
- Tagged structure (headings, paragraphs, tables)
- Logical reading order
- Alt text on any embedded images or logos

If the PMS does not generate accessible PDFs, the brand provides HTML-rendered versions of statements as an alternative (rendered from the Sanity data; same information, fully accessible).

## 91.10 Public accessibility statement

The brand publishes an accessibility statement at `/accessibility`. Template:

```markdown
# Accessibility at Green Property Management

Green PM is committed to making greenpmpnw.com usable for everyone. The site is designed and built to meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

## What we do

We build with semantic HTML, meet color contrast requirements, support keyboard-only navigation, label every form field, and honor reduced-motion preferences.

## Known limitations

- The third-party tenant and owner portals (Rentvine, AppFolio) are not fully under our control. We document their accessibility commitments and advocate for improvements.
- Some PDF documents generated by our PMS are not fully tagged. If you need an accessible version of any document, email megan@greenpmpnw.com.

## Feedback

If you encounter an accessibility barrier, please email megan@greenpmpnw.com or call (425) XXX-XXXX. We aim to respond within one business day.

Last reviewed: [date]
```

The statement is reviewed quarterly. Date updated each review.

## 91.11 Acceptance

This doc is acceptable when:

- A component author can ship an accessible component using only this doc plus the component-specific docs
- Every interactive element in the codebase is reachable and operable via keyboard
- Every focus state is visually distinct and meets 3:1 contrast against its background
- Every image has an `alt` attribute (informative, decorative, or functional, as appropriate)
- Every form field has an associated visible `<label>`
- The skip-to-content link is the first focusable element on every page
- The site passes axe DevTools with zero critical or serious issues
- The accessibility statement at `/accessibility` is live and dated within the last quarter
