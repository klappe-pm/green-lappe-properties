---
domain: brand
category: design-system
sub-category: typography-usage
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 21-typography-tokens
  - 11-audience-modes
produces:
  - per-element-usage-spec
  - mobile-desktop-size-matrix
  - forbidden-typography-patterns
  - eyebrow-and-signature-implementations
executor: engineering
aliases: []
tags: []
---

# 22-typography-usage

Operational rulebook. For every interface element on every surface: which font, which weight, which size at mobile, which size at desktop, which color, in which mode, with one explicit anti-pattern. Consumed by every component author.

## Dependencies

- `21-typography-tokens` for the tokens this doc applies
- `11-audience-modes` for the surface contexts each element appears in

## Outputs

1. Navigation and chrome specs (top nav, mobile menu, footer, breadcrumbs)
2. Hero and marketing specs (headlines, subheads, CTAs, eyebrows)
3. Blog and editorial specs (article title, metadata, body, headings, quotes, captions)
4. Listing specs (cards, detail views, amenity badges)
5. Form specs (labels, inputs, helpers, errors, buttons)
6. Document specs (letterhead, body, statement, signature)
7. Portal specs (resident and owner)
8. System message specs (success, warning, error, info)
9. Data display specs (tables, dashboards, charts)
10. Forbidden patterns

## Navigation and chrome

| Element | Font | Weight | Mobile | Desktop | Tracking | Color | Mode |
|---|---|---|---|---|---|---|---|
| Top nav logo | Geist | 600 | 18px | 22px | -0.02em | Cedar | all |
| Top nav link | Geist | 500 | n/a (in menu) | 14px | 0 | Ink-60 → Cedar hover | all |
| Top nav CTA | Geist | 600 | n/a | 14px | 0 | Cream on Clay | all |
| Mobile hamburger label | Geist | 500 | 14px | n/a | 0 | Ink | all |
| Mobile menu link | Geist | 500 | 18px | n/a | 0 | Ink → Cedar pressed | all |
| Footer link | Geist | 400 | 14px | 14px | 0 | Ink-60 → underline hover | all |
| Footer legal | Geist | 400 | 12px | 12px | 0 | Ink-60 | all |
| Breadcrumb | Geist | 400 | 13px | 13px | 0 | Ink-60, current item Ink | all |

**Anti-pattern:** Newsreader for any nav element. Newsreader is for reading, not for chrome.

## Hero and marketing

| Element | Font | Weight | Mobile | Desktop | Tracking | Color | Mode |
|---|---|---|---|---|---|---|---|
| Hero headline | Geist | 500 | 36px | 56px | -0.02em | Ink | neutral, owner-acq, renter-acq |
| Hero subhead | Geist | 400 | 18px | 20px | 0 | Ink-80 | all acquisition |
| Hero CTA | Geist | 600 | 16px | 16px | 0 | Cream on Clay | all |
| Eyebrow label (above section heading) | Geist | 500 | 12px | 12px | 0.08em uppercase | Ink-60 | all |
| Section heading H2 | Geist | 500 | 30px | 40px | -0.02em | Ink | all |
| Section body paragraph | Newsreader | 400 | 17px | 17px | 0 | Ink | all |
| Pull quote | Newsreader | 500 | 20px | 24px | 0 | Ink with Cedar border-left | all |
| Inline link | inherits | inherits | inherits | inherits | inherits | Cedar underline | all |

**Anti-pattern:** Italic Newsreader for emphasis in body. Use a different weight (500) or a different color (Cedar for links) instead.

## Blog and editorial

| Element | Font | Weight | Mobile | Desktop | Tracking | Color | Mode |
|---|---|---|---|---|---|---|---|
| Article title | Geist | 500 | 30px | 40px | -0.02em | Ink | neutral-acq |
| Article eyebrow (category) | Geist | 500 | 12px | 12px | 0.08em uppercase | Ink-60 | neutral-acq |
| Article metadata (author, date, read time) | Geist | 400 | 14px | 14px | 0 | Ink-60 | neutral-acq |
| Article body paragraph | Newsreader | 400 | 17px | 17px | 0 | Ink, max 65ch | neutral-acq |
| Article H2 | Geist | 500 | 24px | 30px | -0.01em | Ink | neutral-acq |
| Article H3 | Geist | 500 | 20px | 24px | 0 | Ink | neutral-acq |
| Article H4 | Geist | 500 | 18px | 20px | 0 | Ink | neutral-acq |
| Block quote | Newsreader | 500 | 18px | 20px | 0 | Ink-80, Cedar border-left 3px | neutral-acq |
| Image caption | Geist | 400 | 13px | 13px | 0 | Ink-60 | neutral-acq |
| Article tags | Geist | 500 | 12px | 12px | 0.04em uppercase | Ink-60 on Stone chip | neutral-acq |
| Author byline | Newsreader | 500 | 14px | 14px | 0 | Ink | neutral-acq |

**Anti-pattern:** Article body in Geist. Body prose belongs in Newsreader. The brand earns its editorial credibility through this choice.

## Listings

| Element | Font | Weight | Mobile | Desktop | Tracking | Color | Mode |
|---|---|---|---|---|---|---|---|
| Card address | Geist | 500 | 16px | 16px | 0 | Ink | renter-acq |
| Card neighborhood | Geist | 400 | 14px | 14px | 0 | Ink-60 | renter-acq |
| Card metadata (beds/baths/sqft) | Geist | 400 (tabular) | 14px | 14px | 0 | Ink-80 | renter-acq |
| Card rent figure | Geist | 600 (tabular) | 20px | 20px | 0 | Cedar | renter-acq |
| Card availability date | Geist | 400 | 13px | 13px | 0 | Ink-60 | renter-acq |
| Detail hero address | Geist | 500 | 30px | 40px | -0.02em | Ink | renter-acq |
| Detail rent | Geist | 600 (tabular) | 30px | 40px | -0.02em | Cedar | renter-acq |
| Detail feature list item | Geist | 400 | 16px | 16px | 0 | Ink | renter-acq |
| Detail description (long-form) | Newsreader | 400 | 17px | 17px | 0 | Ink, max 65ch | renter-acq |
| Amenity badge | Geist | 500 | 12px | 12px | 0.04em uppercase | Cedar on Cream chip | renter-acq |

**Anti-pattern:** Rent figure in regular weight. The number is the headline; it gets semibold and tabular.

## Forms

| Element | Font | Weight | Mobile | Desktop | Tracking | Color | Mode |
|---|---|---|---|---|---|---|---|
| Form label | Geist | 500 | 14px | 14px | 0 | Ink | all |
| Input value | Geist | 400 | 16px | 16px | 0 | Ink | all |
| Input placeholder | Geist | 400 | 16px | 16px | 0 | Ink-40 | all |
| Helper text | Geist | 400 | 13px | 13px | 0 | Ink-60 | all |
| Error text | Geist | 500 | 13px | 13px | 0 | Error (#9C2D1F) | all |
| Success confirmation | Geist | 500 | 13px | 13px | 0 | Success (#3E7A55) | all |
| Required indicator | Geist | 400 | 14px | 14px | 0 | Error | all |
| Fieldset legend | Geist | 600 | 16px | 16px | -0.01em | Ink | all |
| Submit button | Geist | 600 | 16px | 16px | 0 | Cream on Clay | all |
| Secondary button | Geist | 500 | 16px | 16px | 0 | Ink, border Ink-20 | all |

**Anti-pattern:** Input font-size below 16px. On iOS, anything below 16px triggers automatic zoom on focus.

## Owner-facing documents

| Element | Font | Weight | Mobile | Desktop | Tracking | Color |
|---|---|---|---|---|---|---|
| Document letterhead (Green Property Management) | Geist | 600 | 20px | 24px | -0.01em | Cedar |
| Document title | Geist | 500 | 24px | 30px | -0.02em | Ink |
| Document body paragraph | Newsreader | 400 | 16px | 16px | 0 | Ink |
| Section heading inside doc | Geist | 500 | 18px | 20px | 0 | Ink |
| Statement column header | Geist | 500 | 12px | 12px | 0.08em uppercase | Ink-60 |
| Statement line item label | Geist | 400 | 14px | 14px | 0 | Ink |
| Statement line item figure (tabular) | Geist | 400 (tabular) | 14px | 14px | 0 | Ink-80 |
| Statement net-to-owner figure | Geist | 600 (tabular) | 20px | 24px | 0 | Cedar |
| Document signature first name | Fraunces | 600 italic | 24px | 28px | 0 | Cedar |
| Document signature credential | Geist | 500 | 12px | 12px | 0.08em uppercase | Ink-60 |

**Anti-pattern:** Fraunces anywhere outside the signature first-name line. Three documented uses, no more.

## Resident-facing operational

| Element | Font | Weight | Mobile | Desktop | Tracking | Color |
|---|---|---|---|---|---|---|
| Portal welcome heading | Geist | 500 | 24px | 30px | -0.02em | Ink |
| Rent due card title | Geist | 500 | 18px | 20px | 0 | Ink |
| Rent due amount | Geist | 600 (tabular) | 30px | 40px | -0.02em | Cedar |
| Rent due date | Geist | 400 | 14px | 14px | 0 | Ink-60 |
| Repair status header | Geist | 500 | 18px | 20px | 0 | Ink |
| Repair status timeline label | Geist | 500 | 13px | 13px | 0.08em uppercase | Ink-60 |
| Late notice headline | Geist | 600 | 20px | 24px | -0.01em | Error |
| Lease document body | Newsreader | 400 | 16px | 17px | 0 | Ink |

## System messages

| State | Font | Weight | Mobile | Desktop | Color |
|---|---|---|---|---|---|
| Success toast | Geist | 500 | 14px | 14px | Success |
| Warning banner | Geist | 500 | 14px | 14px | Warning |
| Error message | Geist | 500 | 14px | 14px | Error |
| Info hint | Geist | 400 | 13px | 13px | Info |
| Empty state heading | Geist | 500 | 20px | 24px | Ink |
| Empty state body | Newsreader | 400 | 16px | 17px | Ink-60 |
| Loading state | Geist | 500 | 14px | 14px | Ink-60 |

## Data display

| Element | Font | Weight | Mobile | Desktop | Color |
|---|---|---|---|---|---|
| Dashboard metric label | Geist | 500 | 12px | 12px | 0.08em uppercase Ink-60 |
| Dashboard metric value (tabular) | Geist | 600 (tabular) | 30px | 40px | Ink |
| Chart axis label | Geist | 400 | 12px | 12px | Ink-60 |
| Chart data label (tabular) | Geist | 500 (tabular) | 12px | 12px | Ink |
| Table header | Geist | 500 | 12px | 12px | 0.08em uppercase Ink-60 |
| Table cell | Geist | 400 | 14px | 14px | Ink-80 |
| Table cell numeric (tabular) | Geist | 400 (tabular) | 14px | 14px | Ink-80 |

## Two recurring signatures

The brand has two typographic patterns that mark a Green PM artifact at a glance.

### Pattern 1: Eyebrow plus heading

```html
<div class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mb-2">
  Maintenance
</div>
<h3 class="font-display font-medium text-xl text-ink">
  Boiler replacement, 18th Ave NE
</h3>
```

### Pattern 2: Signature line

```html
<div class="mt-8">
  <p class="font-accent italic font-semibold text-2xl text-cedar leading-none">Megan</p>
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mt-2">
    Megan Green, Designated Broker
  </p>
</div>
```

## Forbidden typography patterns

- Italic Newsreader in body (use weight or color for emphasis)
- Italic Geist anywhere
- Geist below 13px on screens
- Newsreader for buttons, navigation, form labels, table cells, or any UI element
- Fraunces anywhere outside the signature pattern
- All-caps in body or in headings (eyebrows only)
- Decorative font weights (100, 200, 300, 800, 900)
- Mixing weight 500 and 600 in the same hierarchy
- Title Case (sentence case only, except proper nouns)
- Pure black or pure white text
- Letter-spacing wider than 0.08em
- Letter-spacing tighter than -0.03em
- Underlined text that is not a link

## Acceptance

This doc is acceptable when:

- A component author can find the font, weight, mobile size, desktop size, and color for any element by consulting only this doc
- Every element has a documented anti-pattern
- Mobile and desktop sizes are explicitly different where the size scale requires it
- The two recurring brand-signature patterns are implementable from the code snippets here alone
