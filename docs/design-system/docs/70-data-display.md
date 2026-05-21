---
domain: brand
category: design-system
sub-category: data-display
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 22-typography-usage
  - 30-design-tokens
  - 40-spacing-layout
  - 41-radius-shadow
produces:
  - table-spec
  - financial-table-spec
  - dashboard-metric-spec
  - chart-spec
  - data-visualization-rules
executor: engineering
aliases:
tags:
---

# 70-data-display

Tables, financial tables, dashboard metrics, and charts. The owner portal and statements depend on this doc. Consumed by every surface that displays structured data.

## Dependencies

- `22-typography-usage` for tabular figures and table cell typography
- `30-design-tokens` for color and spacing
- `40-spacing-layout` for table column rhythm
- `41-radius-shadow` for table card containers

## Outputs

1. Standard table spec
2. Financial table spec (tabular figures, alignment, totals)
3. Dashboard metric card spec
4. Chart specifications (line, bar, ratio)
5. Empty data state
6. Forbidden data display patterns

## Standard table

Used for property lists, lease lists, FAQ category groupings, anything tabular.

### Structure

```html
<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-ink-20">
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-left py-3 px-4">
          Property
        </th>
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-left py-3 px-4">
          Rent
        </th>
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-left py-3 px-4">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-ink-20">
        <td class="font-display font-regular text-sm text-ink py-4 px-4">1823 NW 65th St</td>
        <td class="font-display font-regular text-sm text-ink tabular py-4 px-4">$2,400</td>
        <td class="py-4 px-4">
          <span class="bg-success/10 text-success font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">Leased</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Specifications

| Element | Property | Value |
|---|---|---|
| Container | Overflow x | auto (horizontal scroll on narrow viewports) |
| Header row | Border bottom | 1px solid Ink-20 |
| Header cell | Font | Geist 500 12px uppercase tracking-wide Ink-60 |
| Header cell | Padding | 12px y, 16px x |
| Header cell | Text align | left (left for labels, right for numbers) |
| Body row | Border bottom | 1px solid Ink-20 |
| Body row | Hover | bg-stone/30 |
| Body cell | Font | Geist 400 14px Ink |
| Body cell | Padding | 16px y, 16px x |
| Numeric cell | Class | `tabular`, `text-right` |

### Mobile behavior

On viewports below 640px, tables either:

1. Horizontal scroll within an overflow container (default for data tables)
2. Restructure as a card list (preferred for owner-facing tables)

#### Card-list mobile restructure

```html
<div class="md:hidden space-y-3">
  <article class="bg-paper rounded-md border border-ink-20 p-4">
    <p class="font-display font-medium text-base text-ink">1823 NW 65th St</p>
    <dl class="mt-3 grid grid-cols-2 gap-2">
      <div>
        <dt class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Rent</dt>
        <dd class="font-display font-regular text-sm text-ink tabular mt-1">$2,400</dd>
      </div>
      <div>
        <dt class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Status</dt>
        <dd class="mt-1">
          <span class="bg-success/10 text-success font-display font-medium text-xs uppercase tracking-wide px-2 py-1 rounded-pill">Leased</span>
        </dd>
      </div>
    </dl>
  </article>
</div>
```

## Financial table

The owner statement. Tabular figures, right-aligned numbers, total row distinct.

### Structure

```html
<table class="w-full">
  <caption class="sr-only">November 2026 statement for 1823 NW 65th St</caption>
  <thead>
    <tr class="border-b border-ink-20">
      <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-left py-3">Item</th>
      <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-right py-3">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-ink-20">
      <td class="font-display font-regular text-sm text-ink py-3">Rent collected</td>
      <td class="font-display font-regular text-sm text-ink tabular text-right py-3">$2,850.00</td>
    </tr>
    <tr class="border-b border-ink-20">
      <td class="font-display font-regular text-sm text-ink py-3">Management fee (9%)</td>
      <td class="font-display font-regular text-sm text-ink-60 tabular text-right py-3">−$256.50</td>
    </tr>
    <tr class="border-b border-ink-20">
      <td class="font-display font-regular text-sm text-ink py-3">Plumbing repair, Anderson Plumbing, 11/14</td>
      <td class="font-display font-regular text-sm text-ink-60 tabular text-right py-3">−$185.00</td>
    </tr>
    <tr class="border-b border-ink-20">
      <td class="font-display font-regular text-sm text-ink py-3">Gutter cleaning, 11/22</td>
      <td class="font-display font-regular text-sm text-ink-60 tabular text-right py-3">−$140.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td class="font-display font-medium text-base text-ink pt-4">Net to owner</td>
      <td class="font-display font-semibold text-2xl text-cedar tabular text-right pt-4">$2,268.50</td>
    </tr>
  </tfoot>
</table>
```

### Specifications

| Element | Property | Value |
|---|---|---|
| Number column | Text align | right |
| Number column | Font | Geist with `tabular-nums` |
| Negative figures (deductions) | Format | minus sign prefix (Unicode `\u2212`), not parens |
| Negative figures | Color | Ink-60 (de-emphasized vs revenue) |
| Total row | Border | Heavier top divider (2px) |
| Total row label | Font | Geist 500 16px Ink |
| Total row figure | Font | Geist 600 24px Cedar |
| Currency | Format | `$2,400.00` (always two decimals in statements) |
| Currency in listings | Format | `$2,400` (no decimals in summary contexts) |

### Number formatting rules

| Context | Format | Example |
|---|---|---|
| Statement line item | `$X,XXX.XX` with sign | `$2,850.00`, `−$256.50` |
| Listing rent | `$X,XXX` | `$2,400` |
| Dashboard metric | `$X,XXX` or `$X,XXXk` | `$2,400`, `$45k` |
| Percentage | `X%` | `9%` |
| Date in table | `MMM D, YYYY` | `Nov 14, 2026` |
| Date in narrow table | `M/D/YY` | `11/14/26` |
| Phone | `(XXX) XXX-XXXX` | `(425) 555-0100` |

## Dashboard metric card

```html
<div class="bg-paper rounded-md border border-ink-20 p-6">
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">
    Rent collected (November)
  </p>
  <p class="font-display font-semibold text-3xl md:text-3xl text-ink tabular mt-2">
    $14,250
  </p>
  <p class="font-display font-regular text-sm text-success mt-2 flex items-center gap-1">
    <svg class="w-3 h-3" aria-hidden="true">...</svg>
    Up $400 from October
  </p>
</div>
```

### Specifications

| Element | Property | Value |
|---|---|---|
| Container | Padding | 24px |
| Container | Background | `--color-paper` |
| Container | Radius | 8px |
| Label | Font | Geist 500 12px uppercase tracking-wide Ink-60 |
| Value | Font | Geist 600 30px (mobile) / 36px (desktop) Ink |
| Value | Variant | `tabular-nums` |
| Change indicator | Font | Geist 400 14px |
| Change indicator | Color | Success (up), Error (down), Ink-60 (flat) |

### Grid layout for multiple metrics

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="metric-card">...</div>
  <div class="metric-card">...</div>
  <div class="metric-card">...</div>
  <div class="metric-card">...</div>
</div>
```

Maximum four metrics per row. If more metrics exist, group into sections.

## Charts

### Library

Use Recharts (React) or Chart.js (vanilla JS). All charts respect:

- Brand color palette (Cedar primary, Clay accent, Sky secondary)
- No gradient fills
- No 3D effects
- Tabular figures in tooltips and axis labels
- High-contrast axis text (Ink-60 or darker)

### Line chart (rent trends, time series)

| Attribute | Value |
|---|---|
| Line color | Cedar |
| Line width | 2px |
| Point markers | None except hovered |
| Hovered point | 6px Cedar circle |
| Grid lines | Horizontal only, 1px Ink-20 |
| Axis labels | Geist 400 12px Ink-60 |
| Y-axis tick labels | Geist 400 12px Ink-60, tabular |
| Tooltip | Paper bg, Ink-20 border, shadow-2, Geist text |

### Bar chart (categorical comparisons)

| Attribute | Value |
|---|---|
| Bar color | Cedar |
| Bar width | Roughly 60% of available column |
| Bar radius | Top corners 4px |
| Bar gap | 4px |
| Hovered bar | Lighten 10% |
| Grid lines | Horizontal only, 1px Ink-20 |
| Axis labels | Geist 400 12px Ink-60 |

### Stacked bar (revenue breakdown)

| Attribute | Value |
|---|---|
| Primary segment color | Cedar |
| Secondary segment color | Clay |
| Tertiary segment color | Sky |
| Segment border | 1px Cream (separator) |
| Legend | Geist 400 13px Ink-60, swatch + label |

### Ratio chart (pie chart equivalent)

The brand prefers horizontal stacked bars over pie charts. Pies are forbidden because:

- They are hard to read precisely
- They imply playfulness
- A single horizontal bar with labels is more legible

```html
<div class="space-y-2">
  <p class="font-display font-medium text-sm text-ink">Fee structure</p>
  <div class="h-8 rounded-md overflow-hidden flex">
    <div style="width: 91%" class="bg-cedar flex items-center pl-3">
      <span class="font-display font-medium text-xs text-cream">Net to owner 91%</span>
    </div>
    <div style="width: 9%" class="bg-clay flex items-center justify-center">
      <span class="font-display font-medium text-xs text-cream">9%</span>
    </div>
  </div>
</div>
```

## Empty data state

Tables and charts with no data show a small inline empty state, not a full-page empty state.

```html
<div class="border border-dashed border-ink-20 rounded-md py-12 text-center">
  <p class="font-display font-medium text-sm text-ink-60">
    No data for this period
  </p>
</div>
```

## Forbidden patterns

- Tables without `<thead>` and `<tbody>`
- Tables without `scope="col"` on header cells
- Numeric columns left-aligned
- Currency without `tabular-nums`
- Negative numbers in parentheses (use minus sign)
- Pie charts (use stacked bar)
- 3D charts
- Gradient fills in charts
- Chart axis labels below 12px
- Chart tooltips without container background
- Tables without horizontal scroll on mobile (or card-list restructure)
- Dashboard metric values without `tabular-nums`
- More than four metrics in one row at desktop
- Dollar amounts shown without `$` symbol
- Inconsistent decimal places within the same statement

## Acceptance

This doc is acceptable when:

- An engineer can implement the owner statement table from these specs
- Every dashboard metric card uses the same structure
- Number formatting is consistent across all surfaces
- Charts use only brand colors
- Mobile behavior is documented for every data display type
