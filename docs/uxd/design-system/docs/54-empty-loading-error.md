---
domain: brand
category: design-system
sub-category: empty-loading-error
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 04-microcopy
  - 22-typography-usage
  - 52-component-grammar
produces:
  - empty-state-patterns
  - loading-state-patterns
  - error-state-patterns
  - skeleton-patterns
executor: engineering
aliases: []
tags: []
---

# 54-empty-loading-error

The complete pattern set for empty states, loading states, error states, and skeleton placeholders. Consumed by every async surface (listings, blog, portals, dashboards).

## Dependencies

- `04-microcopy` for the approved copy
- `22-typography-usage` for state typography
- `52-component-grammar` for alert banner variants

## Outputs

1. Empty state patterns by surface
2. Loading state patterns (spinner, skeleton)
3. Error state patterns (page-level, inline)
4. 404 and 500 page specs
5. Forbidden patterns

## Empty state pattern

Structure: small heading, one body sentence, optional CTA. Centered vertically in available space. No illustrations beyond optional Tabler icon.

### Layout

```html
<div class="flex flex-col items-center justify-center text-center py-16 px-4 min-h-[320px]">
  <svg class="w-12 h-12 text-ink-40 mb-4" aria-hidden="true">
    <!-- icon, see 60-iconography.md -->
  </svg>
  <h3 class="font-display font-medium text-xl text-ink mb-2">
    No open repair requests
  </h3>
  <p class="font-body text-base text-ink-60 max-w-md leading-relaxed mb-6">
    Report a repair if something comes up.
  </p>
  <button class="bg-clay text-cream font-display font-semibold text-base px-6 py-3 rounded-md min-h-touch">
    Report a repair
  </button>
</div>
```

### Empty state catalog

| Surface | Heading | Body | CTA (if applicable) |
|---|---|---|---|
| Resident portal: no open repairs | `No open repair requests` | `Report a repair if something comes up.` | `Report a repair` |
| Resident portal: no notifications | `No new notifications` | `New messages and updates appear here.` | none |
| Owner portal: no statements | `Your first statement posts on the 10th of the month after your first collected rent.` | none | none |
| Owner portal: no properties | `No properties yet` | `Once your management agreement is signed, properties appear here.` | none |
| Listings: no available | `No listings available right now` | `New homes are posted as they come up. Get notified when something matches your search.` | `Get notified` |
| Listings: filtered to zero | `No homes match those filters` | `Try a wider area or fewer requirements.` | `Clear filters` |
| Blog: empty category | `No field notes in this category yet` | `Check the latest field notes for what's new.` | `View all field notes` |
| Search: no results | `No results for "[query]"` | `Try a different search term or browse field notes.` | `Browse all` |
| Owner portal: no documents | `No documents uploaded yet` | `Lease, agreement, and statement PDFs appear here once available.` | none |

## Loading state patterns

### Pattern 1: Inline spinner (for buttons)

```html
<button class="btn-primary" disabled aria-busy="true">
  <span class="spinner" aria-hidden="true"></span>
  Sending
</button>
```

### Pattern 2: Skeleton placeholders (for content)

Use for listing cards, blog post cards, statement rows. Match the shape of the content being loaded.

```html
<div class="bg-paper rounded-md overflow-hidden border border-ink-20" aria-busy="true" aria-label="Loading">
  <div class="aspect-[4/3] bg-stone animate-pulse"></div>
  <div class="p-4 space-y-2">
    <div class="h-4 bg-stone rounded-sm animate-pulse w-3/4"></div>
    <div class="h-3 bg-stone/70 rounded-sm animate-pulse w-1/2"></div>
    <div class="h-3 bg-stone/70 rounded-sm animate-pulse w-2/3 mt-3"></div>
    <div class="h-6 bg-stone rounded-sm animate-pulse w-1/3 mt-3"></div>
  </div>
</div>
```

Skeleton animation defined in `tokens.css`:

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Pattern 3: Full-page loading (rare)

For Astro page transitions: avoid. Pages should render instantly with skeletons in place of async content. If absolutely needed:

```html
<div class="fixed inset-0 z-modal bg-[var(--surface)] flex items-center justify-center">
  <div class="text-center">
    <div class="spinner w-8 h-8 mx-auto mb-4"></div>
    <p class="font-display font-medium text-sm text-ink-60">Loading</p>
  </div>
</div>
```

### Pattern 4: Inline progress (for multi-step submissions)

```html
<div class="flex items-center gap-3 text-ink-60">
  <span class="spinner w-4 h-4" aria-hidden="true"></span>
  <span class="font-display font-medium text-sm">Verifying payment</span>
</div>
```

### Loading state copy bank

| Context | Copy |
|---|---|
| Form submission | `Sending` |
| Payment processing | `Processing your payment` |
| File upload | `Uploading [filename]` |
| Statement generation | `Generating your statement` |
| Search | `Finding homes` |
| Initial page load | (skeleton, no text) |
| Background sync | (silent, no indicator) |

## Error state patterns

### Pattern 1: Inline field error

See `50-form-components.md`.

### Pattern 2: Form-level error banner

Top of form, before fields:

```html
<div role="alert" class="bg-error/10 border-l-4 border-error p-4 rounded-md mb-6">
  <p class="font-display font-medium text-sm text-error">
    Couldn't send your message
  </p>
  <p class="font-display font-regular text-sm text-ink mt-1">
    Try again, or email <a href="mailto:megan@greenpmpnw.com" class="text-cedar underline">megan@greenpmpnw.com</a> directly.
  </p>
</div>
```

### Pattern 3: Page-level error

When a page fails to load data:

```html
<div class="flex flex-col items-center justify-center text-center py-16 px-4">
  <svg class="w-12 h-12 text-error mb-4" aria-hidden="true"><!-- icon --></svg>
  <h3 class="font-display font-medium text-xl text-ink mb-2">
    Something went wrong loading this page
  </h3>
  <p class="font-body text-base text-ink-60 max-w-md leading-relaxed mb-6">
    Try refreshing. If the problem continues, email megan@greenpmpnw.com.
  </p>
  <button class="bg-clay text-cream font-display font-semibold text-base px-6 py-3 rounded-md min-h-touch" onclick="window.location.reload()">
    Refresh
  </button>
</div>
```

### Pattern 4: 404 page

Full page, centered, branded:

```html
<main class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mb-4">
    404
  </p>
  <h1 class="font-display font-medium text-3xl md:text-3xl text-ink mb-4 max-w-xl">
    That page doesn't exist
  </h1>
  <p class="font-body text-prose text-ink-60 max-w-md leading-relaxed mb-8">
    Maybe you typed the URL, or maybe a link is out of date. Try the home page, or get in touch with Megan.
  </p>
  <div class="flex flex-col sm:flex-row gap-4">
    <a href="/" class="bg-clay text-cream font-display font-semibold text-base px-6 py-3 rounded-md">
      Home page
    </a>
    <a href="/about" class="bg-transparent text-ink font-display font-medium text-base px-6 py-3 rounded-md border border-ink-20">
      Contact
    </a>
  </div>
</main>
```

### Pattern 5: 500 page

```html
<main class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mb-4">
    500
  </p>
  <h1 class="font-display font-medium text-3xl md:text-3xl text-ink mb-4 max-w-xl">
    Something went wrong on our end
  </h1>
  <p class="font-body text-prose text-ink-60 max-w-md leading-relaxed mb-8">
    Try again in a minute. If the problem continues, email megan@greenpmpnw.com.
  </p>
  <a href="/" class="bg-clay text-cream font-display font-semibold text-base px-6 py-3 rounded-md">
    Home page
  </a>
</main>
```

## Skeleton patterns by component

| Component | Skeleton structure |
|---|---|
| Listing card | 4:3 image bar + 2 lines of metadata + 1 figure |
| Blog post card | 16:9 image bar + 2-line title + 1 line of metadata |
| Statement row | Single horizontal bar with two cells (label, amount) |
| Owner dashboard metric | 12px tall label bar + 32px tall figure bar |
| Detail page hero | Image bar + 2-line address + figure + 3 lines of body |

Skeleton color: `--color-stone` for primary surfaces, `--color-stone` at 70% opacity for secondary lines.

## Forbidden patterns

- "Loading..." with literal ellipsis (use `Loading` or skeleton)
- Spinners larger than 32px
- Spinners on every state change (only on async operations >300ms)
- Empty states without an explanatory body sentence
- Empty states with apologetic copy ("Sorry, nothing here yet!")
- Error states without next-step instruction
- Error states that blame the user
- 404 page without home link
- Skeletons that don't match the eventual content shape
- Skeletons longer than 3 seconds (timeout to error state if exceeded)
- Auto-retry without user awareness (show retry status)

## Acceptance

This doc is acceptable when:

- Every async surface in the system has documented empty, loading, and error states
- Every state has approved copy from `04-microcopy.md`
- 404 and 500 pages are buildable from these specs
- Skeletons match content shape for every primitive card type
