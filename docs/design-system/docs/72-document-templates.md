---
domain: brand
category: design-system
sub-category: document-templates
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 22-typography-usage
  - 30-design-tokens
  - 40-spacing-layout
  - 52-component-grammar
  - 61-photography
  - 70-data-display
produces:
  - statement-template-spec
  - proposal-template-spec
  - lease-template-spec
  - notice-template-spec
  - letter-template-spec
  - document-architecture-rules
  - print-vs-pdf-vs-html-rules
executor: content
aliases:
tags:
---

# 72-document-templates

The owner-facing and resident-facing document templates: monthly statement, owner proposal, lease, formal notice, and owner letter. Each template specifies structure, typography, page setup, header and footer, signature block, and the three output formats (HTML for portal, PDF for archive, print for mail). Consumed by document generation pipelines, portal rendering, and template authors.

## Dependencies

- `22-typography-usage` for document typography
- `30-design-tokens` for color and spacing
- `40-spacing-layout` for prose measure and container width
- `52-component-grammar` for card and signature patterns
- `61-photography` for letterhead photography decisions
- `70-data-display` for the statement table structure

## Outputs

1. Document architecture rules (the elements every document shares)
2. Monthly statement template (full spec)
3. Owner proposal template (full spec)
4. Lease template (presentation only; legal language is out of scope here)
5. Formal notice template (HB 1217 compliance, Just Cause notices)
6. Owner letter template (cover letter, recurring correspondence)
7. Print vs PDF vs HTML rendering rules
8. Forbidden document patterns

## Design rationale

Documents are where the brand earns or loses trust at the highest stakes. An owner reads a statement once a month and judges the entire relationship by it. A renter signs a lease once and refers to it whenever a question arises. A notice arrives in a moment of stress. Each document must read as careful, specific, and humane.

Documents are the surface where the named-operator signature pattern (Fraunces italic Megan) lives. Three documented uses: owner letter signature, proposal cover signature, formal notice signature.

## Document architecture rules

Every document, regardless of type, contains these elements in this order:

1. **Letterhead** (top of first page; on subsequent pages, an abbreviated header)
2. **Document type label** (eyebrow, uppercase tracked)
3. **Document title** (specific to this instance)
4. **Recipient block** (when addressed to a specific person)
5. **Date** (always in long form: `November 14, 2026`)
6. **Body** (the actual content; varies by document type)
7. **Signature block** (Fraunces italic Megan first-name + credential line)
8. **Footer** (legal text, page number, contact)

### Letterhead

```html
<header class="mb-12 pb-6 border-b border-ink-20 flex items-baseline justify-between">
  <div>
    <p class="font-display font-semibold text-2xl text-cedar leading-none">
      Green Property Management
    </p>
    <p class="font-display font-regular text-sm text-ink-60 mt-2">
      Megan Green, Designated Broker · WA #XXXXXX
    </p>
  </div>
  <div class="text-right">
    <p class="font-display font-regular text-sm text-ink-60">
      greenpmpnw.com
    </p>
    <p class="font-display font-regular text-sm text-ink-60">
      (425) XXX-XXXX
    </p>
  </div>
</header>
```

### Document type label (eyebrow)

```html
<p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mb-2">
  Monthly statement
</p>
```

### Document title

```html
<h1 class="font-display font-medium text-3xl text-ink mb-2 leading-tight">
  November 2026
</h1>
<p class="font-display font-regular text-base text-ink-60">
  1823 NW 65th St, Ballard
</p>
```

### Recipient block (for addressed correspondence)

```html
<div class="mb-8">
  <p class="font-display font-regular text-base text-ink">
    To: John Smith
  </p>
  <p class="font-display font-regular text-base text-ink-60">
    1823 NW 65th St
  </p>
  <p class="font-display font-regular text-base text-ink-60">
    Seattle, WA 98107
  </p>
</div>
```

### Date

```html
<p class="font-display font-regular text-base text-ink-60 mb-8">
  November 14, 2026
</p>
```

### Signature block

The named-operator signature. This is one of the three documented uses of Fraunces italic.

```html
<footer class="mt-12 pt-6 border-t border-ink-20">
  <p class="font-accent italic font-semibold text-2xl text-cedar leading-none">
    Megan
  </p>
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mt-3">
    Megan Green, Designated Broker
  </p>
  <p class="font-display font-regular text-sm text-ink-60 mt-1">
    Green Property Management · WA #XXXXXX
  </p>
</footer>
```

### Document footer (legal strip, every page)

```html
<div class="mt-16 pt-4 border-t border-ink-20 flex justify-between font-display font-regular text-xs text-ink-60">
  <span>Green Property Management · greenpmpnw.com · (425) XXX-XXXX</span>
  <span>Page 1 of 2</span>
</div>
```

## Monthly statement template

The most important document in the system. The owner reads this on the 10th of every month and judges the brand by it.

### Sections in order

1. Letterhead
2. Eyebrow: `Monthly statement`
3. Title: `November 2026` plus property address
4. Property summary (address, lease dates, current resident)
5. Income table
6. Expense table
7. Reserve activity (if any)
8. Net-to-owner figure (large, Cedar, tabular)
9. Notes from Megan (free-form text; optional)
10. Signature block
11. Footer

### Property summary block

```html
<section class="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-ink-20">
  <div>
    <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Property</p>
    <p class="font-display font-regular text-sm text-ink mt-1">1823 NW 65th St, Ballard</p>
  </div>
  <div>
    <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Resident</p>
    <p class="font-display font-regular text-sm text-ink mt-1">John Smith</p>
  </div>
  <div>
    <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Lease term</p>
    <p class="font-display font-regular text-sm text-ink mt-1">Jun 1, 2025 to May 31, 2027</p>
  </div>
</section>
```

### Income table

```html
<section class="mb-8">
  <h2 class="font-display font-medium text-lg text-ink mb-4">Income</h2>
  <table class="w-full">
    <thead>
      <tr class="border-b border-ink-20">
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-left py-3">Date</th>
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-left py-3">Item</th>
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-right py-3">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-ink-20">
        <td class="font-display font-regular text-sm text-ink-60 tabular py-3">Nov 1, 2026</td>
        <td class="font-display font-regular text-sm text-ink py-3">Rent received from John Smith</td>
        <td class="font-display font-regular text-sm text-ink tabular text-right py-3">$2,850.00</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2" class="font-display font-medium text-sm text-ink pt-4">Total income</td>
        <td class="font-display font-semibold text-base text-ink tabular text-right pt-4">$2,850.00</td>
      </tr>
    </tfoot>
  </table>
</section>
```

### Expense table

Each expense line includes the vendor name and the date the expense posted, not just a category label. The brand position depends on this transparency.

```html
<section class="mb-8">
  <h2 class="font-display font-medium text-lg text-ink mb-4">Expenses</h2>
  <table class="w-full">
    <thead>
      <tr class="border-b border-ink-20">
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-left py-3">Date</th>
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-left py-3">Item</th>
        <th scope="col" class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 text-right py-3">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-ink-20">
        <td class="font-display font-regular text-sm text-ink-60 tabular py-3">Nov 14, 2026</td>
        <td class="font-display font-regular text-sm text-ink py-3">Plumbing repair: Anderson Plumbing (kitchen sink leak)</td>
        <td class="font-display font-regular text-sm text-ink-60 tabular text-right py-3">−$185.00</td>
      </tr>
      <tr class="border-b border-ink-20">
        <td class="font-display font-regular text-sm text-ink-60 tabular py-3">Nov 22, 2026</td>
        <td class="font-display font-regular text-sm text-ink py-3">Gutter cleaning: North Seattle Gutters</td>
        <td class="font-display font-regular text-sm text-ink-60 tabular text-right py-3">−$140.00</td>
      </tr>
      <tr class="border-b border-ink-20">
        <td class="font-display font-regular text-sm text-ink-60 tabular py-3">Nov 30, 2026</td>
        <td class="font-display font-regular text-sm text-ink py-3">Management fee (9%)</td>
        <td class="font-display font-regular text-sm text-ink-60 tabular text-right py-3">−$256.50</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2" class="font-display font-medium text-sm text-ink pt-4">Total expenses</td>
        <td class="font-display font-semibold text-base text-ink tabular text-right pt-4">−$581.50</td>
      </tr>
    </tfoot>
  </table>
</section>
```

### Net to owner

```html
<section class="mb-8 bg-cream rounded-md p-6 flex items-baseline justify-between">
  <p class="font-display font-medium text-lg text-ink">Net to owner</p>
  <p class="font-display font-semibold text-3xl text-cedar tabular">$2,268.50</p>
</section>
```

### Notes from Megan (optional)

```html
<section class="mb-8 max-w-prose">
  <h2 class="font-display font-medium text-lg text-ink mb-4">Notes</h2>
  <div class="prose">
    <p class="font-body text-prose text-ink leading-relaxed">
      The kitchen sink had a slow drip under the trap that the resident reported on the 11th. Anderson Plumbing replaced the P-trap and the supply lines while they were under the sink, since the original lines were the original galvanized from the early-1980s remodel. The total bill came in $40 under the estimate.
    </p>
  </div>
</section>
```

### Statement page sizing

| Output | Page | Container |
|---|---|---|
| HTML (portal) | n/a (single scrolling page) | max-w-prose center; sections separated by spacing |
| PDF | US Letter (8.5 × 11 in) | 0.75 in margins all sides |
| Print | US Letter | 0.75 in margins all sides; black-and-white safe |

## Owner proposal template

Sent to a prospective owner after Megan reviews their property and pricing. Combines an introduction, a fee structure, a service description, and a personal signature.

### Sections in order

1. Letterhead
2. Eyebrow: `Proposal`
3. Title: property address
4. Date
5. Cover paragraph (one paragraph, Newsreader prose; introduces Megan and the proposal)
6. Property summary block (address, beds/baths, square footage, current condition)
7. Recommended rent (Cedar figure, large)
8. Fee structure (visual breakdown)
9. Services included (bulleted list)
10. Services not included (bulleted list)
11. Next steps (numbered list)
12. Signature block
13. Footer

### Cover paragraph

```html
<section class="mb-8 max-w-prose">
  <div class="prose">
    <p class="font-body text-prose text-ink leading-relaxed">
      Thanks for reaching out about 1823 NW 65th St. I've reviewed the property details you sent and looked at recent comparable rentals in Ballard. Here's what I'd recommend for marketing rent and how I'd structure the management arrangement.
    </p>
  </div>
</section>
```

### Recommended rent

```html
<section class="mb-8 bg-cream rounded-md p-6">
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Recommended marketing rent</p>
  <p class="font-display font-semibold text-3xl text-cedar tabular mt-2">$2,400/month</p>
  <p class="font-body text-base text-ink mt-3 leading-relaxed">
    Based on three comparable rentals leased within the last 90 days in Ballard: 6112 17th Ave NW ($2,350), 1830 NW 64th St ($2,475), and 6204 22nd Ave NW ($2,425).
  </p>
</section>
```

### Fee structure visual

```html
<section class="mb-8">
  <h2 class="font-display font-medium text-lg text-ink mb-4">Fees</h2>
  <div class="space-y-3">
    <div class="flex items-baseline justify-between py-3 border-b border-ink-20">
      <span class="font-display font-regular text-base text-ink">Management fee</span>
      <span class="font-display font-semibold text-lg text-ink tabular">9% of collected rent</span>
    </div>
    <div class="flex items-baseline justify-between py-3 border-b border-ink-20">
      <span class="font-display font-regular text-base text-ink">Leasing fee (placement only)</span>
      <span class="font-display font-semibold text-lg text-ink tabular">60% of one month</span>
    </div>
    <div class="flex items-baseline justify-between py-3 border-b border-ink-20">
      <span class="font-display font-regular text-base text-ink">Setup fee</span>
      <span class="font-display font-semibold text-lg text-ink tabular">$0</span>
    </div>
    <div class="flex items-baseline justify-between py-3 border-b border-ink-20">
      <span class="font-display font-regular text-base text-ink">Maintenance markup</span>
      <span class="font-display font-semibold text-lg text-ink tabular">$0</span>
    </div>
  </div>
</section>
```

### Services included and excluded

```html
<section class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>
    <h2 class="font-display font-medium text-lg text-ink mb-4">Included</h2>
    <ul class="space-y-2 font-body text-prose text-ink">
      <li>Tenant screening, lease execution, and renewal handling</li>
      <li>Rent collection, late fee enforcement, and resident communication</li>
      <li>Coordinating routine maintenance with vetted vendors</li>
      <li>Monthly statements with itemized expenses</li>
      <li>Annual 1099 preparation for vendors</li>
      <li>Compliance with HB 1217, Seattle Just Cause, and any local notices</li>
    </ul>
  </div>
  <div>
    <h2 class="font-display font-medium text-lg text-ink mb-4">Not included</h2>
    <ul class="space-y-2 font-body text-prose text-ink-60">
      <li>Property tax filings (your CPA handles these)</li>
      <li>Major capital improvements (roof, foundation; coordinated, not project-managed)</li>
      <li>Eviction filings (handled by Megan with a separate flat fee)</li>
    </ul>
  </div>
</section>
```

### Next steps

```html
<section class="mb-8">
  <h2 class="font-display font-medium text-lg text-ink mb-4">Next steps</h2>
  <ol class="space-y-3 font-body text-prose text-ink">
    <li><span class="font-display font-semibold text-ink">1.</span> Reply to this email with any questions or changes.</li>
    <li><span class="font-display font-semibold text-ink">2.</span> I'll send a management agreement for review.</li>
    <li><span class="font-display font-semibold text-ink">3.</span> Once signed, I'll prepare the listing and begin marketing.</li>
    <li><span class="font-display font-semibold text-ink">4.</span> First showings typically begin within 7 days.</li>
  </ol>
</section>
```

## Lease template

Presentation only. Legal language is governed by an attorney and is out of scope for this design doc; this spec covers the visual rendering.

### Sections in order

1. Letterhead
2. Eyebrow: `Residential lease agreement`
3. Title: property address
4. Parties block (landlord, manager, resident)
5. Property block (address, unit, parking, included items)
6. Term and rent block (start date, end date, monthly rent, security deposit)
7. Numbered articles (legal terms; one heading per article)
8. Addenda (state-required disclosures: lead paint, mold, etc.)
9. Signature page (resident signature line, manager signature, date)
10. Footer

### Page setup

Lease must be printable and signable on US Letter paper. Margins of 0.75 in. Page numbers in footer.

### Article heading style

```html
<h2 class="font-display font-medium text-base text-ink mt-8 mb-3 uppercase tracking-wide text-xs">
  <span class="text-ink-60 mr-2">Article 5.</span>Use and occupancy
</h2>
```

### Body text style

Lease body is Newsreader 16px on screen, 11pt in print. Long lines, generous line height, justified to the prose measure.

### Signature page

```html
<section class="mt-12 pt-6 border-t border-ink-20">
  <h2 class="font-display font-medium text-lg text-ink mb-6">Signatures</h2>
  <div class="space-y-12">
    <div>
      <p class="font-display font-regular text-base text-ink mb-1">Resident</p>
      <div class="border-b border-ink h-10 w-full max-w-md"></div>
      <div class="flex justify-between mt-2">
        <span class="font-display font-regular text-sm text-ink-60">Signature</span>
        <span class="font-display font-regular text-sm text-ink-60">Date</span>
      </div>
    </div>
    <div>
      <p class="font-display font-regular text-base text-ink mb-1">Manager, on behalf of owner</p>
      <div class="border-b border-ink h-10 w-full max-w-md"></div>
      <div class="flex justify-between mt-2">
        <span class="font-display font-regular text-sm text-ink-60">Megan Green, Designated Broker</span>
        <span class="font-display font-regular text-sm text-ink-60">Date</span>
      </div>
    </div>
  </div>
</section>
```

## Formal notice template

Used for HB 1217 rent-increase notices, Just Cause termination notices, lease violation notices, and other legally-required correspondence.

### Sections in order

1. Letterhead
2. Eyebrow: notice type (e.g., `Notice of rent increase`)
3. Title: short specific descriptor (e.g., `90-day notice: 1823 NW 65th St`)
4. Recipient block (full legal name and address)
5. Date
6. Body (legally required language; varies by notice type)
7. Effective date (large, distinct)
8. Signature block (Fraunces italic Megan; one of three documented uses)
9. Service of process block (how the notice was delivered)
10. Footer with applicable statute reference

### Effective date block

```html
<section class="mb-8 bg-warning/10 border-l-4 border-warning rounded-md p-6">
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60">Effective</p>
  <p class="font-display font-semibold text-2xl text-ink tabular mt-2">February 1, 2027</p>
  <p class="font-display font-regular text-sm text-ink mt-2">
    This notice is delivered 90 days in advance, per RCW 59.18.140 and HB 1217.
  </p>
</section>
```

### Service of process

```html
<section class="mt-12 pt-6 border-t border-ink-20">
  <h2 class="font-display font-medium text-base text-ink mb-3">Service of notice</h2>
  <p class="font-body text-base text-ink leading-relaxed">
    This notice was delivered to the resident at the property address by certified mail on November 14, 2026, and electronically to the resident's portal account on the same date. A copy is retained in the property file.
  </p>
</section>
```

### Notice color and tone

Despite the formal subject matter, the notice keeps the brand's calm tone. No red alarm bars, no all-caps warnings, no exclamation marks. Warning color is reserved for the effective-date block; the body uses the standard Ink palette.

## Owner letter template

Used for non-statement correspondence: lease renewal recommendations, capital improvement proposals, annual operating reviews, and general updates.

### Sections in order

1. Letterhead
2. Salutation: `Dear [Owner first name],`
3. Body (Newsreader prose, max-w-prose)
4. Signature block (Fraunces italic Megan; one of three documented uses)
5. Footer

### Salutation style

```html
<p class="font-body text-prose text-ink leading-relaxed mb-6">
  Dear John,
</p>
```

### Body example

```html
<div class="prose max-w-prose">
  <p class="font-body text-prose text-ink leading-relaxed">
    A few notes from this quarter on 1823 NW 65th St.
  </p>
  <p class="font-body text-prose text-ink leading-relaxed">
    The lease renews on May 31, 2027. The resident has been on time every month since move-in, has reported maintenance issues responsibly, and has kept the property in good condition. I'd recommend offering a renewal at $2,475, a 3.1% increase, which sits below the HB 1217 cap (5.1% this year) and below recent comps for the neighborhood. If you agree, I'll send the renewal offer by February 14, which gives the resident the 90-day window to accept or decline.
  </p>
  <p class="font-body text-prose text-ink leading-relaxed">
    Separately, the gutters are due for cleaning before the winter rains intensify. North Seattle Gutters is available the week of December 8 for $140. I'll proceed unless you'd prefer a different vendor.
  </p>
  <p class="font-body text-prose text-ink leading-relaxed">
    Let me know.
  </p>
</div>
```

### Signature block (recurring; same pattern as document architecture)

```html
<footer class="mt-12 pt-6 border-t border-ink-20">
  <p class="font-accent italic font-semibold text-2xl text-cedar leading-none">Megan</p>
  <p class="font-display font-medium text-xs uppercase tracking-wide text-ink-60 mt-3">
    Megan Green, Designated Broker
  </p>
</footer>
```

## Print vs PDF vs HTML rendering rules

| Output | Use | Rendering |
|---|---|---|
| HTML (portal) | Day-to-day owner and resident access | Astro page, dynamic data, audience mode set |
| PDF (download) | Archive copy, owner email attachment, year-end records | Server-side rendered via Playwright or Puppeteer with print CSS; or a dedicated PDF library (PDFKit, pdf-lib) for complex documents |
| Print (mail) | Physical mail (lease at signing, formal notice when required) | Same as PDF; printed at 100% scale on US Letter; black-and-white safe |

### Print CSS rules

Print stylesheet (`@media print`) overrides:

```css
@media print {
  body { background: white; color: black; }
  .no-print { display: none !important; }
  header, footer { page-break-inside: avoid; }
  h2 { page-break-after: avoid; }
  table { page-break-inside: avoid; }
  a { color: black; text-decoration: underline; }
  a[href]::after { content: " (" attr(href) ")"; font-size: 0.85em; color: #555; }
}
```

### Black-and-white safety

Every document must read correctly when printed in black and white:

- Cedar headers print as black or dark gray
- Status indicators include text labels, not color alone
- Tables use row borders, not row background colors
- The signature block (Fraunces italic Megan) prints as italic black serif

## Forbidden document patterns

- Documents without letterhead on the first page
- Documents without a signature block (no anonymous documents)
- Statements without itemized expenses (no "Total expenses: $581.50" without breakdown)
- Statements with negative numbers in parentheses (use minus sign)
- Notices in red alarm-bar styling
- Notices with exclamation marks in body
- Lease body in Geist (must be Newsreader)
- Document headings without eyebrow + title pattern
- Documents that exceed prose measure (lines too long to read comfortably)
- Color-only status communication on printable surfaces
- Signature blocks using a typed name in Geist alone (must include Fraunces italic)
- Documents without page numbers when multi-page
- Email-only delivery of statutorily-required notices (must be physical or certified)

## Acceptance

This doc is acceptable when:

- A content author can produce every document type from these templates
- The statement template covers income, expenses, net-to-owner, and notes
- The proposal template covers cover, rent, fees, services, and next steps
- The notice template handles HB 1217 and Just Cause rendering
- All documents print correctly in black and white
- All documents have the named-operator signature block
- The three documented uses of Fraunces italic (owner letter, proposal, notice) are explicit
