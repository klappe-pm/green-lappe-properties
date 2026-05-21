---
domain: brand
category: design-system
sub-category: print
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 22-typography-usage
  - 30-design-tokens
  - 61-photography
  - 72-document-templates
produces:
  - print-specifications
  - paper-stock-recommendations
  - black-and-white-rules
  - yard-sign-spec
  - business-card-spec
  - mailable-letterhead-spec
  - print-vendor-handoff-rules
executor: design
aliases:
tags:
---

# 74-print

The complete print specification. Letterhead, business cards, yard signs, mailable letters, and the rules for handing off to a print vendor. Consumed by the print-on-demand pipeline, by Megan when printing documents in the field, and by any vendor producing physical brand materials.

## Dependencies

- `22-typography-usage` for print-safe typography
- `30-design-tokens` for color values and their print equivalents
- `61-photography` for photo standards on printable surfaces
- `72-document-templates` for document structures that must print correctly

## Outputs

1. General print specifications (paper, color, resolution, bleed)
2. Letterhead and mailable letter spec
3. Business card spec
4. Yard sign spec (rental listings)
5. Folder and proposal package spec
6. Brand color CMYK conversion table
7. Black-and-white rendering rules
8. Print vendor handoff packet contents
9. Forbidden print patterns

## Design rationale

Print is the surface where the brand becomes physical. A yard sign on a Bothell lawn or a letter in an owner's mailbox carries the brand into homes and streets. Print must read as deliberate and professional without slipping into the four refused archetypes (legacy navy serif PM, REIT institutional, sage lifestyle boutique, SaaS proptech).

Print also has constraints that web does not: color profiles, paper weight, bleed and trim, and the fact that recipients will see physical artifacts side-by-side with competitors' printed materials.

## General print specifications

| Attribute | Value |
|---|---|
| Color mode | CMYK for vendor handoff; RGB for in-office laser print |
| Resolution | 300 DPI minimum at final size |
| Bleed | 0.125 in (3mm) on bleed edges for vendor-printed pieces |
| Safety margin | 0.25 in (6mm) inside trim for important content |
| Paper white | True paper white (not Cream); design accounts for the shift |
| Fonts | Embed or outline before handoff |
| File format | PDF/X-1a for vendor handoff; PNG/JPG for digital proof only |

## Brand color CMYK conversion

Print uses CMYK, not RGB or hex. The brand colors convert as follows. These are approximate; calibrate to the press profile in production.

| Color | Hex (RGB) | CMYK | Pantone (approximate) |
|---|---|---|---|
| Cedar | `#2D6A4F` | C76 M28 Y72 K15 | 7740 C |
| Ink | `#1F2A2E` | C77 M58 Y52 K56 | Black 7 C |
| Cream | `#FBF6EC` | C2 M3 Y10 K0 | 9220 C |
| Paper | `#F7F5F0` | C3 M3 Y6 K0 | n/a (very light neutral) |
| Stone | `#D4D1CA` | C16 M14 Y19 K0 | Warm Gray 1 C |
| Clay | `#A95C42` | C24 M71 Y79 K12 | 7585 C |
| Sky | `#7BA7B8` | C53 M22 Y20 K2 | 5435 C |
| Success | `#3E7A55` | C75 M28 Y75 K14 | 7740 C (matches Cedar family) |
| Warning | `#A8741A` | C28 M52 Y100 K12 | 110 C |
| Error | `#9C2D1F` | C30 M91 Y100 K27 | 7621 C |
| Info | `#3A6480` | C82 M51 Y28 K8 | 7700 C |

Always provide a printed proof check against this table during the first run with a new vendor. Slight CMYK drift is expected; lock the profile after one round of correction.

## Black-and-white rules

Some prints are black-and-white only (mailable letters from Megan's office laser printer, archival statement copies). Every brand asset must read correctly in B&W.

| Asset | B&W rendering |
|---|---|
| Cedar text | Renders as dark gray (35-40% K); legible |
| Clay (CTAs in body) | Renders as medium gray; loses meaning. Add an underline for B&W output. |
| Photos | Convert to grayscale before printing in B&W; preserve contrast |
| Status colors | Always pair with text labels; B&W loses color-only meaning |
| Cedar gradients (image placeholders) | Render as solid gray; acceptable |

### Print stylesheet for B&W

Documents intended for B&W output use a print-specific stylesheet:

```css
@media print and (monochrome) {
  body { color: black; background: white; }
  .text-cedar { color: black; }
  .bg-clay { background: #4d4d4d; color: white; }
  a { color: black; text-decoration: underline; }
  .signature {
    color: black;
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-weight: 600;
  }
}
```

The Fraunces signature renders as Georgia italic in B&W (since Fraunces won't be loaded in the print-driver context). Georgia italic preserves the signature pattern's intent.

## Letterhead

Used for: owner proposals, owner letters, formal notices.

### Page setup

| Attribute | Value |
|---|---|
| Paper | US Letter (8.5 × 11 in) |
| Margins | 0.75 in all sides |
| Header height | 1.5 in from top edge |
| Footer height | 0.5 in above bottom edge |
| Body area | ~6.5 × ~9 in usable |

### Header

```
Top edge
  ▼
  ┌──────────────────────────────────────────────────┐
  │  0.75 in margin                                  │
  │                                                  │
  │  Green Property Management         greenpmpnw.com│
  │  Megan Green, Designated Broker    (425) XXX-XXXX│
  │  WA #XXXXXX                                      │
  │  ────────────────────────────────────────────────│
  │                                                  │
  │  [body begins]                                   │
```

| Element | Font | Size | Color |
|---|---|---|---|
| Company name | Geist Semibold | 18pt | Cedar |
| Operator line | Geist Regular | 10pt | Ink-60 |
| Contact lines | Geist Regular | 10pt | Ink-60 |
| Divider | 0.5pt hairline | n/a | Ink-20 |

Letterhead is set in the document template (`72-document-templates.md`); this doc covers the print-specific specifications.

### Paper

- **In-office (Megan's printer)**: 24lb (90 gsm) bright white office paper
- **Vendor-printed (proposals, formal correspondence)**: 80lb (120 gsm) Mohawk Superfine Eggshell or equivalent uncoated stock

## Business cards

Used for: in-person meetings, owner pitches, vendor relationships, property showings.

### Specifications

| Attribute | Value |
|---|---|
| Trim size | 3.5 × 2 in (US standard) |
| Bleed | 3.625 × 2.125 in |
| Paper | 16pt (350 gsm) uncoated cover |
| Finish | Matte; no UV coating; no gloss |
| Print | Full color front; one color (Cedar) back; or two-color front, blank back |

### Front layout

```
┌─────────────────────────────────────┐
│                                     │
│  Megan Green                        │
│  Designated Broker · WA #XXXXXX     │
│                                     │
│                                     │
│                                     │
│  Green Property Management          │
│  greenpmpnw.com                     │
│                                     │
│  (425) XXX-XXXX                     │
│  megan@greenpmpnw.com               │
│                                     │
└─────────────────────────────────────┘
```

| Element | Font | Size | Color |
|---|---|---|---|
| Megan Green | Geist Semibold | 12pt | Ink |
| Title line | Geist Regular | 8pt, tracked +50 | Ink-60 |
| Company name | Geist Semibold | 8pt | Cedar |
| URL | Geist Regular | 8pt | Cedar |
| Contact lines | Geist Regular | 8pt | Ink |

Card background: Cream. White space generous. Layout: top half holds name and credential; bottom half holds company and contact.

### Back layout

Option A (recommended): solid Cedar background with `Green PM` wordmark centered in Cream at 14pt Geist Semibold.

Option B: leave blank for note-taking.

## Yard signs (rental listings)

Used at vacant rentals to attract drive-by attention.

### Specifications

| Attribute | Value |
|---|---|
| Size | 18 × 24 in (vertical) |
| Material | Coroplast (4mm corrugated plastic), double-sided print |
| Mounting | H-stake, included |
| Print | Two color: Cedar + Ink on Cream background |

### Layout

```
┌────────────────────────────────┐
│                                │
│         FOR RENT               │
│                                │
│   ────────────────────         │
│                                │
│   2 bed · 1 bath               │
│   $2,400/month                 │
│                                │
│   ────────────────────         │
│                                │
│   greenpmpnw.com               │
│   (425) XXX-XXXX               │
│                                │
│   Green PM                     │
│                                │
└────────────────────────────────┘
```

| Element | Font | Size | Color |
|---|---|---|---|
| "FOR RENT" | Geist Semibold | 72pt, tracked 0.08em | Cedar |
| Property summary | Geist Medium | 24pt | Ink |
| Rent | Geist Semibold | 36pt, tabular | Cedar |
| URL | Geist Medium | 18pt | Ink |
| Phone | Geist Regular | 16pt | Ink |
| Wordmark | Geist Semibold | 24pt | Cedar |

Yard sign is uncluttered. Most signs in the category are crowded; the restraint signals operator confidence.

## Folder and proposal package

For owner pitches delivered in person (rare; most go by email PDF).

### Folder

- 9 × 12 in standard pocket folder
- Cream stock, 100lb (270 gsm)
- Single color print: Cedar wordmark on front cover, lower right
- Inside: pockets to hold proposal document, business card, sample statement

### Proposal package contents

1. Cover letter (one page, Newsreader prose, hand-signed)
2. Proposal document (per `72-document-templates.md`)
3. Sample statement (anonymized example month)
4. Sample lease cover page (first page only; full lease provided at agreement)
5. Business card

## Print vendor handoff

When sending a print job to a vendor (business cards, yard signs, folders), include this packet:

### Files

1. **Print-ready PDF** at trim size with bleed (file: `[asset]-print-ready.pdf`)
2. **Proof PDF** at trim size, no bleed, for digital review (`[asset]-proof.pdf`)
3. **Source file** (Affinity Designer `.afdesign`, Adobe Illustrator `.ai`, or Figma URL with version-locked link)

### Specification sheet

A one-page PDF specifying:

- Trim size
- Bleed
- Color mode (CMYK)
- Required Pantones (if any)
- Paper stock
- Finish
- Quantity
- Turnaround
- Shipping address

### Color proof check

Request a hard proof for any first run with a new vendor. Verify against the CMYK conversion table on Cream paper stock under daylight viewing conditions.

## File naming conventions

For print files:

```
gpm-businesscard-megan-2026-v1-print.pdf
gpm-yardsign-18x24-cream-2026-v1-print.pdf
gpm-letterhead-2026-v1-print.pdf
gpm-folder-9x12-cream-2026-v1-print.pdf
gpm-proposal-1823nw65th-2026-11-final.pdf
```

Format: `gpm-[asset]-[size or descriptor]-[year]-[version]-[purpose].pdf`

## In-office printing

Megan's office uses a color laser printer (Brother or HP recommended; not inkjet) for letterhead, statements, and ad-hoc documents. Settings:

- Paper: 24lb bright white
- Quality: High (1200 DPI when supported)
- Color mode: Match printer profile (sRGB acceptable; do not select "draft" or "toner save")
- Bleed: none (in-office output has standard margins)

For batches that exceed in-office capacity (more than 50 documents in a single mailing), route to a local print vendor.

## Forbidden print patterns

- Glossy or coated paper for any letterhead or proposal
- UV-coated business cards (matte only)
- Holographic or foil-stamped finishes
- Embossing or debossing
- Edge-painted business cards
- Pre-cut die shapes (rectangular standard only)
- Stock photography on yard signs
- QR codes on letterhead (clutter)
- QR codes on yard signs (acceptable if specifically tracked; verify ROI before adding)
- Photos on business cards
- Tagline or slogan ("Your trusted property manager") on any printed asset
- Multiple Pantones beyond Cedar and Ink (cost discipline)
- Bleed extending into safety margin
- Tiny print below 7pt
- Pure white background on letterhead (use Cream when vendor-printed)
- Pure black ink for body text when Cedar is available (Ink, not 100% K, for richer appearance)

## Acceptance

This doc is acceptable when:

- A print vendor can produce business cards, yard signs, and a folder from these specs without back-and-forth
- The CMYK conversion table works for the chosen vendor's press profile
- B&W rendering of every printed asset is verified
- File naming is consistent across the print archive
- Forbidden patterns are flaggable in vendor proofs
