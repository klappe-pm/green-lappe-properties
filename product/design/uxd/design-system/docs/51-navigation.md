---
domain: brand
category: design-system
sub-category: navigation
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 22-typography-usage
  - 30-design-tokens
  - 40-spacing-layout
  - 42-motion
  - 43-z-index
produces:
  - top-nav-desktop-spec
  - top-nav-mobile-spec
  - footer-spec
  - breadcrumb-spec
  - in-page-nav-spec
  - portal-side-nav-spec
  - sticky-behavior-rules
  - active-state-rules
executor: engineering
aliases: []
tags: []
---

# 51-navigation

Navigation patterns across the marketing site and product portals: top nav (desktop), top nav (mobile, hamburger), footer, breadcrumbs, in-page anchor nav, and portal side nav. Consumed by every Astro layout.

## Dependencies

- `22-typography-usage` for nav typography
- `30-design-tokens` for colors and spacing
- `40-spacing-layout` for container widths
- `42-motion` for hover and open transitions
- `43-z-index` for sticky and drawer layering

## Outputs

1. Top nav (desktop) spec
2. Top nav (mobile) spec with hamburger drawer
3. Footer spec
4. Breadcrumb spec
5. In-page anchor navigation (table of contents)
6. Portal side nav (owner and resident)
7. Sticky behavior rules
8. Active state rules

## Top nav (desktop)

64px tall, sticky to viewport top, `--surface` background, hairline bottom border.

### Structure

```html
<nav class="hidden md:flex sticky top-0 z-sticky bg-[var(--surface)] border-b border-ink-20 h-16 items-center px-8 lg:px-12 xl:px-16">
  <a href="/" class="font-display font-semibold text-xl tracking-tight text-cedar leading-none">
    Green PM
  </a>

  <ul class="ml-12 flex items-center gap-8 font-display font-medium text-sm">
    <li><a href="/owners" class="text-ink-60 hover:text-cedar transition-colors">For owners</a></li>
    <li><a href="/rentals" class="text-ink-60 hover:text-cedar transition-colors">Rentals</a></li>
    <li><a href="/blog" class="text-ink-60 hover:text-cedar transition-colors">Field notes</a></li>
    <li><a href="/about" class="text-ink-60 hover:text-cedar transition-colors">About</a></li>
  </ul>

  <a href="/owners/proposal" class="ml-auto bg-clay text-cream font-display font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-clay/90 transition-colors">
    Request a proposal
  </a>
</nav>
```

### Specifications

| Element | Property | Value |
|---|---|---|
| Container | Height | 64px |
| Container | Background | `var(--surface)` (mode-dependent) |
| Container | Border-bottom | 1px solid `--color-ink-20` |
| Container | Sticky | `position: sticky; top: 0; z-index: var(--z-sticky)` |
| Wordmark | Font | Geist 600, 20px, `--color-cedar`, tracking-tight |
| Wordmark | Position | Far left |
| Nav links | Font | Geist 500, 14px, `--color-ink-60` |
| Nav links | Hover | `--color-cedar`, 200ms transition |
| Nav links | Spacing | `gap-8` (32px) between siblings |
| Nav links | Position | Left of CTA, after wordmark |
| CTA button | Font | Geist 600, 14px, `--color-cream` |
| CTA button | Background | `--color-clay`, 8px radius |
| CTA button | Padding | 10px y, 20px x |
| CTA button | Position | Far right, pushed by `ml-auto` |

### Sticky behavior

On scroll, the nav remains at the top of the viewport. Add subtle separation when content has scrolled below it:

```css
.nav-sticky {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  transition: box-shadow var(--duration-default) var(--easing-default);
}

.nav-sticky.scrolled {
  box-shadow: var(--shadow-1);
}
```

Toggle `.scrolled` class via JavaScript when `window.scrollY > 8`.

## Top nav (mobile)

56px tall, hamburger trigger on right opens a drawer from the right covering the viewport.

### Closed state (header bar)

```html
<nav class="md:hidden sticky top-0 z-sticky bg-[var(--surface)] border-b border-ink-20 h-14 flex items-center px-4">
  <a href="/" class="font-display font-semibold text-lg tracking-tight text-cedar leading-none">
    Green PM
  </a>

  <button
    type="button"
    class="ml-auto min-h-touch min-w-touch flex items-center justify-center"
    aria-label="Open menu"
    aria-expanded="false"
    aria-controls="mobile-menu"
  >
    <!-- Hamburger icon, see 60-iconography.md -->
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
</nav>
```

### Open state (drawer)

```html
<div
  id="mobile-menu"
  class="fixed inset-0 z-modal bg-[var(--surface)] flex flex-col"
  role="dialog"
  aria-modal="true"
>
  <div class="flex items-center px-4 h-14 border-b border-ink-20">
    <span class="font-display font-semibold text-lg text-cedar">Green PM</span>
    <button type="button" class="ml-auto min-h-touch min-w-touch" aria-label="Close menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>

  <ul class="flex flex-col p-6 gap-6 font-display font-medium text-lg">
    <li><a href="/owners" class="text-ink hover:text-cedar block py-2">For owners</a></li>
    <li><a href="/rentals" class="text-ink hover:text-cedar block py-2">Rentals</a></li>
    <li><a href="/blog" class="text-ink hover:text-cedar block py-2">Field notes</a></li>
    <li><a href="/about" class="text-ink hover:text-cedar block py-2">About</a></li>
  </ul>

  <div class="mt-auto p-6 border-t border-ink-20">
    <a href="/owners/proposal" class="block w-full bg-clay text-cream text-center font-display font-semibold text-base px-6 py-3 rounded-md">
      Request a proposal
    </a>
  </div>
</div>
```

### Drawer behavior

- Opens from the right with `transform: translateX(100% → 0)` over 250ms
- Closes with reverse animation over 200ms
- Body has `overflow: hidden` while drawer is open
- Focus traps inside the drawer; first focusable element receives focus on open
- Escape key closes the drawer
- Backdrop tap closes the drawer (when not full-screen variant)

## Footer

Cedar background, Cream text, three-column grid at desktop, single column on mobile.

### Structure

```html
<footer class="bg-cedar text-cream py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
  <div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

    <!-- Column 1: Brand block -->
    <div>
      <p class="font-display font-semibold text-xl mb-3">Green Property Management</p>
      <p class="font-display font-regular text-sm text-cream/80 leading-relaxed">
        King and Snohomish counties. Megan Green, designated broker, WA #XXXXXX.
      </p>
      <p class="font-display font-regular text-sm text-cream/80 mt-3">
        <a href="tel:425XXXXXXX" class="hover:underline">(425) XXX-XXXX</a>
        <br />
        <a href="mailto:megan@greenpmpnw.com" class="hover:underline">megan@greenpmpnw.com</a>
      </p>
    </div>

    <!-- Column 2: Owners -->
    <div>
      <p class="font-display font-medium text-xs uppercase tracking-wide text-cream/60 mb-4">Owners</p>
      <ul class="space-y-3 font-display font-regular text-sm">
        <li><a href="/owners" class="hover:underline">Services</a></li>
        <li><a href="/owners/pricing" class="hover:underline">Pricing</a></li>
        <li><a href="/owners/proposal" class="hover:underline">Request a proposal</a></li>
        <li><a href="/portal/owner" class="hover:underline">Owner portal</a></li>
      </ul>
    </div>

    <!-- Column 3: Renters -->
    <div>
      <p class="font-display font-medium text-xs uppercase tracking-wide text-cream/60 mb-4">Renters</p>
      <ul class="space-y-3 font-display font-regular text-sm">
        <li><a href="/rentals" class="hover:underline">Available homes</a></li>
        <li><a href="/rentals/apply" class="hover:underline">Apply</a></li>
        <li><a href="/portal/resident" class="hover:underline">Resident portal</a></li>
        <li><a href="/blog" class="hover:underline">Field notes</a></li>
      </ul>
    </div>
  </div>

  <!-- Legal bottom strip -->
  <div class="max-w-screen-xl mx-auto mt-12 pt-8 border-t border-cream/20 flex flex-col md:flex-row gap-4 md:justify-between">
    <p class="font-display font-regular text-xs text-cream/60">
      © 2026 Green Property Management. All rights reserved.
    </p>
    <ul class="flex gap-6 font-display font-regular text-xs text-cream/60">
      <li><a href="/accessibility" class="hover:underline">Accessibility</a></li>
      <li><a href="/privacy" class="hover:underline">Privacy</a></li>
      <li><a href="/terms" class="hover:underline">Terms</a></li>
    </ul>
  </div>
</footer>
```

### Specifications

| Element | Property | Value |
|---|---|---|
| Container | Background | `--color-cedar` |
| Container | Text color | `--color-cream` |
| Container | Padding y | 64px mobile, 80px desktop |
| Brand block heading | Font | Geist 600, 20px, Cream |
| Brand block body | Font | Geist 400, 14px, Cream at 80% opacity |
| Column heading (eyebrow) | Font | Geist 500, 12px, uppercase, tracking-wide, Cream at 60% |
| Column links | Font | Geist 400, 14px, Cream |
| Column link hover | Decoration | underline appears on hover |
| Bottom strip | Font | Geist 400, 12px, Cream at 60% |

## Breadcrumb

For deep pages (single listing, single blog post, portal sub-pages).

```html
<nav aria-label="Breadcrumb" class="font-display font-regular text-[13px] text-ink-60 mb-6">
  <ol class="flex flex-wrap items-center">
    <li>
      <a href="/" class="hover:text-cedar">Home</a>
    </li>
    <li class="px-2" aria-hidden="true">/</li>
    <li>
      <a href="/rentals" class="hover:text-cedar">Rentals</a>
    </li>
    <li class="px-2" aria-hidden="true">/</li>
    <li>
      <span class="text-ink" aria-current="page">1823 NW 65th St</span>
    </li>
  </ol>
</nav>
```

Mobile: same component, wraps with `flex-wrap`. Truncate intermediate items if needed; never truncate the current page label.

## In-page anchor navigation (table of contents)

For long-form content (blog posts longer than 1,200 words; FAQ pages). Sticky on desktop, collapsed at top on mobile.

```html
<aside class="hidden lg:block sticky top-24 self-start max-w-[240px]">
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mb-4">
    On this page
  </p>
  <ul class="space-y-2 font-display font-regular text-sm">
    <li><a href="#what-i-charge" class="text-ink-60 hover:text-cedar block py-1">What I charge</a></li>
    <li><a href="#what-i-do" class="text-ink-60 hover:text-cedar block py-1">What I do</a></li>
    <li><a href="#what-i-don't" class="text-ink-60 hover:text-cedar block py-1">What I don't do</a></li>
  </ul>
</aside>
```

Active section highlighted in Cedar via scroll-spy (IntersectionObserver):

```html
<li><a href="#what-i-charge" class="text-cedar font-medium" aria-current="location">What I charge</a></li>
```

## Portal side nav (owner and resident)

Authenticated portals use a left-side nav at desktop, collapses to top hamburger at mobile.

### Desktop

```html
<aside class="hidden lg:flex flex-col w-64 bg-paper border-r border-ink-20 p-6 sticky top-0 h-screen">
  <a href="/" class="font-display font-semibold text-xl text-cedar mb-12">Green PM</a>

  <nav>
    <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mb-3">Account</p>
    <ul class="space-y-1 font-display font-medium text-sm mb-8">
      <li><a href="/portal/owner" class="block py-2 px-3 rounded-sm text-ink hover:bg-cream">Dashboard</a></li>
      <li><a href="/portal/owner/properties" class="block py-2 px-3 rounded-sm text-ink hover:bg-cream">Properties</a></li>
      <li><a href="/portal/owner/statements" class="block py-2 px-3 rounded-sm text-ink hover:bg-cream">Statements</a></li>
      <li><a href="/portal/owner/documents" class="block py-2 px-3 rounded-sm text-ink hover:bg-cream">Documents</a></li>
    </ul>

    <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mb-3">Settings</p>
    <ul class="space-y-1 font-display font-medium text-sm">
      <li><a href="/portal/owner/profile" class="block py-2 px-3 rounded-sm text-ink hover:bg-cream">Profile</a></li>
      <li><a href="/portal/owner/preferences" class="block py-2 px-3 rounded-sm text-ink hover:bg-cream">Preferences</a></li>
    </ul>
  </nav>

  <div class="mt-auto pt-8 border-t border-ink-20">
    <a href="/logout" class="block py-2 px-3 rounded-sm font-display font-medium text-sm text-ink-60 hover:text-ink">
      Sign out
    </a>
  </div>
</aside>
```

### Active state

```html
<li>
  <a href="/portal/owner/statements" class="block py-2 px-3 rounded-sm bg-cedar/10 text-cedar font-medium" aria-current="page">
    Statements
  </a>
</li>
```

### Mobile portal nav

Falls back to top hamburger. Drawer content matches desktop side nav structure.

## Active state rules

### Nav link active (current page)

| Context | Visual |
|---|---|
| Top nav (desktop, marketing) | Color: Cedar; no underline; weight unchanged |
| Top nav (mobile drawer) | Color: Cedar; no underline; weight unchanged |
| Portal side nav | Background: `cedar/10`; text: Cedar; weight unchanged |
| Footer | No active state needed |
| Breadcrumb (current page) | Color: Ink; no link, no underline |

### Aria

Every active link uses `aria-current="page"` or `aria-current="location"`.

## Forbidden patterns

- Nav links in Newsreader (nav is always Geist)
- Dropdown menus deeper than one level (no submenus of submenus)
- Mega-menus (the brand has too few pages to warrant)
- Hover-only menus (must work with focus)
- Mobile menus that auto-close on selection without explicit indication
- Sticky nav heights above 64px (desktop) or 56px (mobile)
- Multiple CTA buttons in the top nav
- Footer columns with more than five links each
- Portal nav without active-state indication
- Breadcrumbs without `aria-label="Breadcrumb"`
- Nav links without minimum 44px tap target on mobile

## Acceptance

This doc is acceptable when:

- A developer can implement top nav, mobile nav, footer, breadcrumb, and portal nav from these specs alone
- Every nav variant has a documented active state
- Every nav variant works at both mobile and desktop sizes
- Accessibility rules (aria, focus, escape) are testable
