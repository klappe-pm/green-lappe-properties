---
domain: brand
category: design-system
sub-category: pairings-forbidden
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 10-color-system
  - 22-typography-usage
  - 41-radius-shadow
  - 42-motion
produces:
  - approved-color-pairings
  - approved-type-pairings
  - approved-composition-patterns
  - forbidden-pairings-master-list
  - quick-decision-guide
executor: design
aliases:
tags:
---

# 93-pairings-forbidden

The pairings and forbidden combinations master reference. Documents every approved color pairing, type pairing, and composition pattern in the system, plus the comprehensive list of forbidden combinations across color, type, layout, and motion. The single doc to check when uncertain whether a design choice is on-brand. Consumed during design review and code review.

## Dependencies

- `10-color-system` for the color primitives and contrast matrix
- `22-typography-usage` for type pairings
- `41-radius-shadow` for shape pairings
- `42-motion` for motion forbidden patterns

## Outputs

1. Approved color pairings table (every "this on that" combination that works)
2. Approved type pairings (which faces and weights pair together)
3. Approved composition patterns (which components live well next to each other)
4. Comprehensive forbidden pairings (color, type, layout, motion, brand-identity)
5. Quick decision guide

## 93.1 Approved color pairings

The system's primary color pairings, in priority order. The first three are the brand's signature visual moves.

### 93.1.1 Tier 1: brand signatures

| Pairing | Use | Why it works |
|---|---|---|
| **Ink on Cream** | Body text on marketing surface | 13.8:1 contrast; the brand's primary reading combination |
| **Cedar wordmark on Cream** | The wordmark in marketing chrome | Distinctive, warm, contrast-passing |
| **Cream text on Cedar block** | Footer; quote callouts | High-contrast inverted; signals end-of-page or pull-quote |

### 93.1.2 Tier 2: operational pairings

| Pairing | Use | Why it works |
|---|---|---|
| Ink on Paper | Body text in product surfaces | 13.4:1 contrast; product-context warmth |
| Cedar text on Cream | Section headings; brand-color emphasis | 5.4:1; reads as "this matters" without being CTA |
| Cream on Clay | Primary CTA button | 4.5:1; Clay is the only CTA color |
| Ink-60 on Cream | Secondary text, metadata | ~6.5:1; calm hierarchy |
| Ink-80 on Cream | Body emphasis, secondary headings | ~10:1; soft emphasis without weight change |

### 93.1.3 Tier 3: occasional pairings

| Pairing | Use | Why it works |
|---|---|---|
| Stone surface (decorative) on Cream/Paper page | Sectional dividers, evidence-card backgrounds | Subtle separation without pulling attention |
| Sky (decorative) on Cream | Icon fills, decorative dots, illustration accents | Cool counterpoint to warm Cream; non-text only |
| Cedar border on Cream surface | Evidence cards (4px left), pull-quote left border | Establishes the "Green PM looked at this carefully" visual |
| Clay border (4px left) | Action-required callouts (rare) | Signals "do something" without becoming a button |

### 93.1.4 Tier 4: state communication

| Pairing | Use |
|---|---|
| Success text on Cream + success icon + label | Confirmation states |
| Warning text on Cream + warning icon + label | Caution states |
| Error text on Cream + error icon + label | Failure states |
| Info text on Cream + info icon + label | Neutral information |

State colors operate independently of brand colors. They communicate; they do not express.

## 93.2 Approved type pairings

The v3 type system has exactly three faces, used in exactly three combinations:

### 93.2.1 Primary type pairings

| Pairing | Use | Implementation |
|---|---|---|
| **Geist (display) + Newsreader (body)** | Blog posts, owner letters, long-form pages, marketing pages with significant prose | Heading uses Geist 500; body uses Newsreader 400 at 17px |
| **Geist alone** | UI surfaces with minimal prose: navigation, forms, tables, financial figures, statements, listing cards, dashboards | Single face throughout; weight varies (400 to 600) for hierarchy |
| **Geist + Fraunces italic signature** | Owner letters, proposals, formal notices | Body in Newsreader; signature first-name in Fraunces italic 600; credential line in Geist 500 |

### 93.2.2 Type weight pairings

Within Geist, the system uses four weights. Pairing rules:

| Weight pairing | Use |
|---|---|
| 600 (heading) + 400 (body) | Default pairing in UI |
| 500 (medium heading) + 400 (body) | Default pairing for editorial content |
| 500 (label) + 400 (input value) | Form field pairing |
| 700 (rare display) + 400 (body) | Hero treatment only, used sparingly |

Forbidden weight pairings:

- 600 next to 500 at the same level (reads as accidental inconsistency)
- Mixing weight 400 and 500 in the same heading hierarchy (pick one and stay)
- Weight 700 below display size (reads as inappropriately heavy)

### 93.2.3 Type size pairings

The size scale (`text-xs`, `text-sm`, `text-base`, `text-md`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-display`) is designed so adjacent sizes contrast clearly. Pairing rule: skip at least one step between contrasted sizes.

| Right | Wrong |
|---|---|
| `text-2xl` heading + `text-base` body | `text-2xl` heading + `text-xl` body (too close, reads as accidental) |
| `text-lg` heading + `text-base` body | `text-base` heading + `text-base` body (no contrast) |
| `text-display` hero + `text-md` subhead + `text-base` body | `text-display` hero + `text-base` everything else (jumps too far) |

## 93.3 Approved composition patterns

### 93.3.1 The brand-signature compositions

These compositions appear in every audience mode and create the brand's visual signature:

1. **Eyebrow + heading + body** (marketing sections)
   ```
   MAINTENANCE                    ← Geist 500 12px uppercase tracking-wide Ink-60
   Boiler replacement, 18th Ave NE ← Geist 500 24px Ink
   The boiler at this 1924 four-plex... ← Newsreader 400 17px Ink
   ```

2. **Number + label + context** (financial / dashboard)
   ```
   $2,400              ← Geist 600 30px tabular Cedar
   Monthly rent         ← Geist 500 12px uppercase tracking-wide Ink-60
   Available March 1   ← Geist 400 13px Ink-60
   ```

3. **Signature block** (owner letter close)
   ```
   [Body in Newsreader]

   Megan                                ← Fraunces italic 600 28px Cedar
   MEGAN GREEN · DESIGNATED BROKER       ← Geist 500 12px uppercase Ink-60
   ```

### 93.3.2 Card composition

```
[Image: aspect 4:3, full bleed to card edges]
[Padding: space-4 mobile, space-5 desktop]
  Address                  ← Geist 500 16px Ink
  Neighborhood             ← Geist 400 14px Ink-60
  2 bed · 1 bath · 950 sqft ← Geist 400 (tabular) 14px Ink-80
  $2,400                    ← Geist 600 (tabular) 20px Cedar
  Available Mar 1           ← Geist 400 13px Ink-60
```

### 93.3.3 Section composition

Sections on marketing pages follow this rhythm:

```
[Section padding: space-16 desktop top + bottom]
  [Eyebrow]
  [H2 heading]
  [Optional subhead in Newsreader]
  [Content: two-column or single-column based on content type]
```

### 93.3.4 Form composition

Forms compose vertically only on mobile, vertically on all viewports below `lg`:

```
[Form container: max-w-form]
  [Label]
  [Input or select or textarea]
  [Helper text]
  [space-6 gap]
  [Label]
  [Input]
  [Helper text]
  [space-6 gap]
  ...
  [Submit button: full-width mobile, auto-width desktop]
```

### 93.3.5 Document composition

```
[Letterhead band, Cream, full-bleed]
  [Wordmark: Cedar, Geist 600 24px]

[Document title, space-12 from letterhead]
  [Title: Geist 500 30px Ink]

[Document body, space-8 from title]
  [Body paragraphs: Newsreader 400 16px Ink, max-w-prose]

[Signature, space-12 from body]
  [Fraunces italic 600 28px Cedar: first name only]
  [Geist 500 12px uppercase Ink-60: full credential]

[Footer band, Cream, full-bleed at bottom]
  [Contact info: Geist 400 12px Ink-60]
```

## 93.4 Forbidden pairings: master list

The exhaustive list of forbidden combinations across every system axis.

### 93.4.1 Forbidden color pairings

| Pairing | Why forbidden |
|---|---|
| Sky text on Cream background | 2.6:1 contrast; fails AA |
| Sky text on Paper background | Similar contrast failure |
| Stone text anywhere | Stone is neutral mid-tone; fails AA against every background |
| Ink-40 body text on Cream | 3.5:1; fails AA for body |
| Cream text on Sky background | Same hue family; muddy |
| Clay text on Sky background | Two saturated colors; reads chaotic |
| Cedar text on Stone background | Insufficient contrast |
| Cedar text on Sky background | Hue conflict |
| Cedar on Success | Cedar and Success are near-identical hues; reads as same color |
| Clay on Error | Similar hue; confuses brand action with error state |
| Pure black (`#000`) anywhere | Forbidden; use Ink |
| Pure white (`#FFF`) anywhere | Forbidden; use Cream |

### 93.4.2 Forbidden type pairings

| Pairing | Why forbidden |
|---|---|
| Fraunces anywhere outside the signature line | Three documented uses only |
| Newsreader for nav, buttons, forms, tables, labels | Newsreader is reading-only |
| Geist italic in body emphasis | Use weight (500) or color (Cedar links) for emphasis |
| Newsreader italic in body emphasis | The italic exists for typography variation; use weight for emphasis |
| Two display faces in the same composition | Pick one |
| Mono font anywhere | v3 removed mono; brand does not display code |
| Weight 100, 200, 300 (Light, Thin, ExtraLight) | Forbidden weights |
| Weight 800, 900 (ExtraBold, Black) | Forbidden weights |
| All caps in body or headings (eyebrows only) | Eyebrow pattern only |
| Title Case anywhere outside proper nouns | Sentence case throughout |
| Underline on non-link text | Underline reserved for links |
| Letter-spacing wider than 0.08em | Outside system range |
| Letter-spacing tighter than -0.03em | Outside system range |

### 93.4.3 Forbidden layout pairings

| Pairing | Why forbidden |
|---|---|
| Five or more columns on any breakpoint | Outside scale; use horizontal scroller |
| Different card sizes in the same row | Reads as broken design |
| Prose width above 65ch | Reading fatigue |
| Form column width above 40ch | Loses scanning rhythm |
| Mixed card grid types in same section | Visual confusion |
| Hero section without container constraint | Edge-to-edge text reads as runaway |
| Two primary CTAs on the same surface | Hierarchy collapse |

### 93.4.4 Forbidden shape pairings

| Pairing | Why forbidden |
|---|---|
| Pill-shaped buttons | Reads consumer app |
| Square-cornered cards (no radius) | Reads brutal |
| Radius above 16px on UI | Reads cartoon |
| Heavy borders (above 4px) | Reads trade show |
| Shadow plus heavy border on the same element | Visually busy |
| Pure black shadows | Clashes with warm surfaces |
| Layered shadows on one element | Ambiguous depth |
| Inset shadows | Reads skeuomorphic |
| Glow effects | Reads gaming UI |

### 93.4.5 Forbidden motion pairings

| Pairing | Why forbidden |
|---|---|
| Spring physics | Outside system tone |
| Bouncing transitions | Outside system tone |
| Multiple easing curves | System uses one |
| Animations longer than 250ms | Crosses wait threshold |
| Animations shorter than 100ms (except `transition-none`) | Reads as glitch |
| Parallax scrolling | Manipulates scroll |
| Auto-advancing carousels | No carousels in system |
| Scroll-triggered fade-ins | Manipulates scroll |
| Hover-triggered translate-up on cards | Reads gaming |
| Auto-play video | Forbidden everywhere |
| Cursor-following effects | Reads novelty |
| Confetti or celebration animations | Reads consumer marketing |

### 93.4.6 Forbidden brand-identity pairings

| Pairing | Why forbidden |
|---|---|
| Wordmark in a face other than Geist | Brand mark only in display face |
| Wordmark on Sky or Clay background | Approved surfaces only: Cream, Paper, Cedar, Ink |
| Wordmark with separate logo mark | Wordmark IS the mark until separate mark commissioned |
| "GPM" acronym in customer-facing copy | Internal use only |
| Legacy name forms (Green Lappe, Green Lappe Properties) | Superseded |
| Megan's full name in Fraunces | First-name italic only |
| Megan's signature without credential line | Always paired |
| Marketing copy referring to "the company" or "Green Property Management" as a subject | Use "I" (Megan) or rewrite |
| Stock photos of generic suburban houses | Real properties only |
| Lifestyle stock photos (family on couch, etc.) | Operational photography only |

## 93.5 Quick decision guide

When uncertain whether a design choice is on-brand, work through this checklist:

### 93.5.1 Color check

1. Is the color from the seven primitives, four derived neutrals, or four system colors? → If no, stop.
2. Does the pairing meet AA contrast (4.5:1 body, 3:1 large)? → If no, change.
3. Is Clay being used for anything other than a CTA? → If yes, change.
4. Are two saturated colors competing? → If yes, simplify.

### 93.5.2 Type check

1. Is the face Geist, Newsreader, or Fraunces italic (in signature only)? → If no, change.
2. Is the weight 400, 500, 600, or 700? → If no, change.
3. Is body text in Newsreader, UI text in Geist? → If reversed, change.
4. Is Fraunces used anywhere outside the signature line? → If yes, change.

### 93.5.3 Shape check

1. Is the radius from the four-step scale? → If no, change.
2. Is the radius `pill` on a button? → If yes, change.
3. Is the shadow ink-tinted? → If no, change.
4. Are border and shadow both heavy? → If yes, pick one.

### 93.5.4 Motion check

1. Is the duration 100, 150, 200, or 250ms? → If no, change.
2. Is the easing `cubic-bezier(0.4, 0, 0.2, 1)`? → If no, change.
3. Does the motion respect `prefers-reduced-motion`? → If no, fix.

### 93.5.5 Brand-identity check

1. Is the wordmark in Geist 600 Cedar? → If no, fix.
2. Is "I" used instead of "the company"? → If reversed, fix.
3. Is Megan's signature pattern intact (Fraunces first name + Geist credential)? → If broken, fix.
4. Is photography real (not stock)? → If stock, replace.

## 93.6 When to override

The system has rules. Rules sometimes have exceptions. Overrides are permitted when:

1. **Accessibility demands it.** If a documented pairing fails for a specific user (e.g., a colorblind user reports an issue with Cedar/Success similarity in a specific UI), the override exists to serve the user.
2. **Legal demands it.** Required notices in specific formats (e.g., HUD fair housing language, state lease disclosures) may require deviation.
3. **Print constraints demand it.** A printer's CMYK profile may not match Cedar exactly; the closest approximation is acceptable.

When overriding, document the override in `94-governance` with reason, context, and review date.

## 93.7 Acceptance

This doc is acceptable when:

- Every approved pairing is documented with use case
- Every forbidden pairing is documented with reason
- A design reviewer can identify any violation by consulting only this doc
- The quick decision guide resolves common uncertainty in under 30 seconds
- Override exceptions have a documented escalation path
