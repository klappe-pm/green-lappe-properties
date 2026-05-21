---
domain: brand
category: design-system
sub-category: status-indicators
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 30-design-tokens
  - 52-component-grammar
produces:
  - status-chip-spec
  - state-color-mapping
  - icon-pairing-rules
  - status-aria-rules
executor: engineering
aliases:
tags:
---

# 71-status-indicators

The complete status indicator system: chips, dots, badges, and how each state maps to color and icon. Consumed by the owner portal, resident portal, listings, statements, and repair queues.

## Dependencies

- `30-design-tokens` for state colors
- `52-component-grammar` for badge structure

## Outputs

1. Five universal states (paid, pending, overdue, available, archived)
2. Color and icon mapping per state
3. Three indicator variants (chip, dot, badge)
4. Audience-specific status vocabularies (owner, resident, listing, repair)
5. Accessibility (aria) rules

## Universal states

Every status across the system maps to one of these five semantic states:

| Semantic state | Color token | Icon | Used for |
|---|---|---|---|
| Success | `--color-success` | `check-circle-2` | Completed, paid, leased, confirmed |
| Warning | `--color-warning` | `clock` or `alert-triangle` | Pending, awaiting action, expiring |
| Error | `--color-error` | `alert-circle` | Overdue, failed, rejected, requires action |
| Info | `--color-info` | `info` | New, available, neutral |
| Neutral | `--color-ink-60` | `archive` | Archived, completed-historical, inactive |

## Indicator variants

### Chip (default)

Pill-shaped, colored background at 10% opacity, colored text, uppercase tracked.

```html
<span class="inline-flex items-center bg-success/10 text-success font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  Paid
</span>
```

| Size | Padding | Font |
|---|---|---|
| xs | 4px y, 6px x | 11px |
| sm (default) | 4px y, 8px x | 12px |
| md | 6px y, 12px x | 13px |

### Chip with icon

```html
<span class="inline-flex items-center gap-1.5 bg-success/10 text-success font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  <svg class="w-3 h-3" aria-hidden="true">...</svg>
  Paid
</span>
```

### Dot indicator

For very tight spaces (table rows, nav indicators):

```html
<span class="inline-flex items-center gap-2">
  <span class="w-2 h-2 rounded-full bg-success" aria-hidden="true"></span>
  <span class="font-display font-regular text-sm text-ink">Paid</span>
</span>
```

### Outlined badge

When the chip background reads too heavy:

```html
<span class="inline-flex items-center bg-transparent text-success border border-success/30 font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">
  Paid
</span>
```

## Owner-facing status vocabulary

| Status | Semantic | Label | Where used |
|---|---|---|---|
| Lease active | Success | `Leased` | Property list, dashboard |
| Vacant, available | Info | `Available` | Property list |
| Vacant, off-market | Neutral | `Off market` | Property list |
| Statement available | Success | `New` | Statement list |
| Statement viewed | Neutral | `Viewed` | Statement list |
| Repair pending approval | Warning | `Awaiting approval` | Repair list |
| Repair in progress | Info | `In progress` | Repair list |
| Repair complete | Success | `Complete` | Repair list |
| Lease ending in <60 days | Warning | `Renewal soon` | Property list |
| Owner approval pending | Warning | `Action needed` | Dashboard alert |

## Resident-facing status vocabulary

| Status | Semantic | Label | Where used |
|---|---|---|---|
| Rent paid | Success | `Paid` | Payment history |
| Rent due (current month) | Info | `Due [date]` | Dashboard |
| Rent overdue | Error | `Overdue` | Dashboard, payment history |
| Application submitted | Info | `Submitted` | Application status |
| Application under review | Warning | `In review` | Application status |
| Application approved | Success | `Approved` | Application status |
| Application declined | Neutral | `Closed` | Application status |
| Repair reported | Info | `Logged` | Repair list |
| Repair scheduled | Warning | `Scheduled [date]` | Repair list |
| Repair complete | Success | `Complete` | Repair list |
| Maintenance request needs info | Warning | `Needs detail` | Repair list |

## Listing-facing status vocabulary

| Status | Semantic | Label | Where used |
|---|---|---|---|
| Available now | Info | `Available now` | Listing card |
| Available future date | Info | `Available [date]` | Listing card |
| Application pending | Warning | `Application pending` | Listing card |
| Leased | Neutral | `Leased` | Listing card (rarely shown; usually delisted) |
| New listing (within 7 days) | Success | `New` | Listing card top-corner badge |

## Icon-color pairings

Status chips that include icons must use a consistent icon per state. Never mix icons within one state.

| State | Icon |
|---|---|
| Success | `lucide:check-circle-2` |
| Warning (time-based) | `lucide:clock` |
| Warning (alert-based) | `lucide:alert-triangle` |
| Error | `lucide:alert-circle` |
| Info (new) | `lucide:sparkles` |
| Info (default) | `lucide:info` |
| Neutral | `lucide:archive` |

Choose the right warning icon by context: `clock` for time-based ("ends in 5 days"), `alert-triangle` for action-needed ("review required").

## Status accessibility

### Rule 1: Color is never the only signal

Color carries meaning, but not alone. Pair color with:

- Text label (`Paid`)
- Or icon
- Or both

Color-only status indicators fail for color-blind users.

### Rule 2: Status changes announced

When a status changes asynchronously (a payment posts, a repair completes), announce the change via `role="status"` or `aria-live="polite"`:

```html
<div role="status" aria-live="polite" class="sr-only">
  Payment posted. Status updated to Paid.
</div>
```

### Rule 3: Aria semantics

For action-required states, use `role="alert"`:

```html
<div role="alert" class="...">
  Rent is overdue. A late fee posted on the 6th.
</div>
```

For passive states, use `role="status"` or the natural element semantics.

## Forbidden patterns

- Status indicator without text label
- Status indicator without color or border (must be visually distinct)
- Inconsistent labels for the same state (always `Paid`, never `Payment posted`)
- Multiple semantic states for the same business state
- Chip colors outside the five state colors
- Sky color used for status (not in the state palette)
- Clay color used for status (Clay is for clicks)
- Cedar color used for status (Cedar is brand, not state)
- Status without `aria-live` when changing asynchronously
- Status that flashes or pulses (motion is forbidden on static states)

## Acceptance

This doc is acceptable when:

- Every business state in the owner, resident, and listing surfaces maps to a documented status
- Every status uses the correct semantic color and icon
- Accessibility rules are testable with a screen reader
- Forbidden patterns are flaggable in code review
