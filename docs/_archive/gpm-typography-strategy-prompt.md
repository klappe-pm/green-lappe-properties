```## gpm-typography-strategy-prompt

markdown

```markdown
# Prompt: Green Property Management Typography Strategy Deliverable

## Role and context

You are a senior brand and design systems strategist with deep expertise in editorial typography, design tokens, and small-business brand identity. You are producing a complete typography strategy package for Green Property Management (Green PM), a residential property management company serving small landlords (1 to 20 doors) and renters in King and Snohomish counties, Washington.

The named operator is Megan Green, designated broker. The brand explicitly refuses these category cliches:

- Corporate navy-serif legacy property management (Bell-Anderson, Cornell, Brink archetype)
- Apartment REIT institutional sterility (Greystar archetype)
- Boutique-lifestyle sage-and-beige property management
- SaaS proptech gradient-and-AI startup aesthetics

The brand positions as: small operator with current taste, Pacific Northwest grounded, named human accountability, editorial warmth without preciousness, professional without corporate stiffness.

## The typography decision (locked, do not re-evaluate)

| Role | Typeface | Source | Cost |
|---|---|---|---|
| Display, UI, financial figures, navigation, buttons, forms | Geist | Google Fonts, OFL | Free |
| Body prose, long-form, blog, owner letters, documents | Newsreader | Google Fonts, OFL | Free |
| Signature line accent only | Fraunces (Italic, display weights) | Google Fonts, OFL | Free |

These three faces are the final answer. Your job is not to recommend alternatives. Your job is to produce the strategy and system documentation that lets the team implement these three faces correctly across every brand surface.

## The locked color palette (do not deviate)
```

Cedar `#2D6A4F` Primary brand color (logo, headings, links, primary buttons) Ink `#1F2A2E` Body text, deep contrast Cream `#FBF6EC` Marketing surface background Paper `#F7F5F0` Product and document surface background Stone `#D4D1CA` Neutral mid-tone, dividers Clay `#A95C42` Action accent (CTA buttons only) Sky `#7BA7B8` Secondary accent (limited use)

Derived neutrals: Ink-80 `#3D4A4E` Ink-60 `#5C6A6E` Ink-40 `#8A9498` Ink-20 `#C2C8CA`

System colors: Success `#3E7A55` Warning `#A8741A` Error `#9C2D1F` Info `#3A6480`

````

Never use pure black or pure white. Use Ink and Cream. Clay is reserved for click-actions only, never decorative.

## The five audience modes

Each surface declares its audience mode via `data-audience` attribute. Typography behavior may shift slightly by mode.

| Mode | Surface | Tone | Density |
|---|---|---|---|
| neutral-acquisition | Cream-led | Welcoming, direct | Low |
| owner-acquisition | Paper-led | Procedural confidence, numbers-forward | High |
| owner-product | Paper exclusive | Frictionless operation, data-forward | High |
| renter-acquisition | Cream-led | Aspirational, direct, property-forward | Low |
| renter-product | Paper plus Cream accent | Reliable, action-forward | Medium |

## Deliverables required

You must produce all of the following. Each is a distinct artifact. Do not combine.

### Deliverable 1: Written strategy document (Obsidian-flavored Markdown)

Filename: `gpm-typography-strategy.md`

H1 must match the filename. Use the frontmatter pattern below exactly:

```yaml
---
domain: brand
category: design-system
sub-category: typography
date-created: [today]
date-revised: [today]
aliases:
tags:
---
```

Required sections, in order:

1. **Strategic rationale** — Why typography matters for this brand specifically. Reference the named-operator promise, the small-portfolio focus, and the anti-positioning against the four refused archetypes.
2. **Why a grotesque display lead** — Why Geist over a serif display, why a sans dominant system, why Inter was rejected, why Bricolage was rejected as cartoonish.
3. **Why Newsreader for prose** — Why a serif handles body text, why editorial warmth matters in owner letters and blog posts, why Newsreader over Source Serif, Literata, Spectral.
4. **Why Fraunces survives as accent** — The signature line pattern, the named-operator promise, why a third family is justified.
5. **Type pairing logic** — How the three faces share DNA (humanist proportions, generous apertures, contemporary construction) despite being in different classifications.
6. **Cost and licensing** — All three free, OFL, Google Fonts and self-hostable. Total brand cost: zero.
7. **Migration path from current state** — The current v2 style guide names Fraunces as display lead and Inter as body. The migration replaces Fraunces (display) with Geist, replaces Inter with Newsreader for body and Geist for UI, and demotes Fraunces to italic-only accent.
8. **Risks and mitigations** — At least three honest risks with named mitigations.

Use the user's documented writing rules: lead with the answer, no opening filler, no em dashes, third person, Obsidian-flavored Markdown, inline code for filenames and repos, sentence case throughout, no italics in body prose (the brand has explicit rules against this), active voice, minimize adverbs.

### Deliverable 2: Tokenized design system inputs

Filename: `gpm-typography-tokens.css`

Required token layers:

1. **Font family primitives**
```css
   --gpm-font-sans: 'Geist', system-ui, sans-serif;
   --gpm-font-serif: 'Newsreader', Georgia, serif;
   --gpm-font-accent: 'Fraunces', Georgia, serif;
```
2. **Weight tokens** (regular, medium, semibold, bold)
3. **Tracking tokens** (tight, normal, wide for tracked-out eyebrows)
4. **Leading tokens** (tight, snug, normal, relaxed)
5. **Size tokens** — separate scales for mobile (default) and desktop (md: 768px+). Use the existing scale from the v2 style guide as the starting point but tune sizes for Geist's slightly smaller x-height versus Inter:
````

xs 0.75rem / 0.75rem sm 0.875rem / 0.875rem base 1rem / 1rem md 1.125rem / 1.25rem lg 1.25rem / 1.5rem xl 1.5rem / 1.875rem 2xl 1.875rem / 2.5rem 3xl 2.25rem / 3.5rem display 2.75rem / 5rem

```
6. **Role-based composite tokens** — semantic shortcuts that bundle family, weight, size, leading, and tracking for the most common roles:
   - `--gpm-type-display-hero`
   - `--gpm-type-h1` through `--gpm-type-h4`
   - `--gpm-type-eyebrow`
   - `--gpm-type-body-prose` (Newsreader)
   - `--gpm-type-body-ui` (Geist)
   - `--gpm-type-button`
   - `--gpm-type-nav`
   - `--gpm-type-table-cell`
   - `--gpm-type-table-figure` (tabular tnum)
   - `--gpm-type-signature` (Fraunces italic)
   - `--gpm-type-caption`
   - `--gpm-type-legal`

7. **Tailwind config snippet** — `tailwind.config.js` extension showing how the tokens map to Tailwind's `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, and `lineHeight` keys.

Every token must have an inline comment explaining its use.

### Deliverable 3: Usage guidelines and guardrails

Filename: `gpm-typography-usage.md`

This is the operational rulebook. It must include, for every interface element:

- **Which font** (Geist, Newsreader, or Fraunces)
- **Which weight** (specify exact numeric weight: 400, 500, 600, 700)
- **Mobile size and line-height**
- **Desktop size and line-height**
- **Letter-spacing**
- **Color token** (must reference the locked palette)
- **Surface context** (which audience mode it applies to)
- **What not to do** (one explicit anti-pattern per element)

Cover at minimum these interface elements:

**Navigation and chrome:**
- Top navigation links
- Mobile hamburger menu items
- Footer links
- Breadcrumbs

**Hero and marketing surfaces:**
- Hero headline
- Hero subhead
- Hero CTA button
- Section eyebrow label (tracked-out, uppercased)
- Section heading H2
- Section body paragraph
- Pull quote
- Inline link

**Blog and editorial:**
- Article title
- Article metadata (author, date, read time)
- Article body paragraph
- Article subheadings H2 through H4
- Block quote
- Image caption
- Tags

**Listings:**
- Listing card address
- Listing card neighborhood
- Listing card metadata (beds, baths, sqft)
- Listing card rent figure
- Listing card availability date
- Listing detail hero address
- Listing detail rent
- Listing detail feature list
- Listing detail amenity badges

**Forms:**
- Form label
- Input placeholder
- Input value
- Helper text
- Error text
- Success confirmation
- Submit button

**Owner-facing documents:**
- Document letterhead (Green Property Management)
- Document title
- Document body paragraph
- Statement table column headers
- Statement table line items (tabular figures)
- Statement net-to-owner figure
- Document signature block (Fraunces italic for "Megan")

**Renter-facing operational surfaces:**
- Repair status header
- Repair status timeline
- Rent due notice
- Late notice (Error color)
- Lease document body

**System messages and states:**
- Success toast
- Warning banner
- Error message
- Info hint
- Empty state heading
- Empty state body
- Loading state

**Data display:**
- Dashboard metric label
- Dashboard metric value (tabular)
- Chart axis labels
- Table headers
- Table cells

Every spec must include a "Mobile" and "Desktop" row. No exceptions.

Forbidden patterns to enumerate explicitly:

- Italic Newsreader for headings or UI (italic is for signatures and pull quotes only)
- Geist below 13px on screens
- Newsreader for any UI element (buttons, navigation, form labels)
- Fraunces anywhere outside the signature pattern
- All-caps in body or headings (eyebrows only)
- Decorative font weights (300 light, 800 black)
- Mixing weight 500 and 600 in the same hierarchy
- Title Case (sentence case only)
- Pure black or pure white text

### Deliverable 4: Slide deck (rich, presentation-grade)

Output as HTML slides (one slide per section, viewport-sized) or PowerPoint via the pptx skill, whichever the executing LLM is better positioned to produce. Default to PowerPoint.

Filename: `gpm-typography-strategy-deck.pptx`

Slide-by-slide spec:

**Explainer block (slides 1 to 6)**
1. **Title slide** — `Typography for Green Property Management`. Subtitle: `A grotesque-led system for a named-operator brand`. Cedar wordmark, Cream surface.
2. **Why typography matters here** — Three points: named operator, financial trust, anti-positioning. No more than 30 words on the slide.
3. **The competitive landscape, typographically** — Four-quadrant grid showing the four refused archetypes (legacy navy serif, REIT geometric, lifestyle sage, proptech gradient) and where Green PM sits.
4. **Why a grotesque display lead** — Geist specimen at 96px. Three reasons it works.
5. **Why a serif body** — Newsreader specimen at 32px. Three reasons it works.
6. **Why Fraunces stays** — Single signature specimen: `Megan` in Fraunces Italic at 80px, Cedar. One sentence on the named-operator promise.

**System block (slides 7 to 14)**
7. **The full type scale** — visual ladder from display 80px to legal 12px, both mobile and desktop columns shown side by side.
8. **Weights and when to use each** — 400, 500, 600, 700 each shown at 48px with usage notes.
9. **The eyebrow pattern** — Geist 11px / 500 / tracked 0.12em / uppercase, color Ink-60. Specimen plus rule.
10. **The signature pattern** — Fraunces Italic 600 / Cedar / size 1.5x body. Specimen plus rule.
11. **Tabular figures** — Statement excerpt showing Geist with `font-feature-settings: tnum` enabled, numbers aligned in column.
12. **Letter-spacing rules** — Display: -0.02em. Body: 0. Eyebrow: 0.12em. Visual examples.
13. **Line-height rules** — Display 1.05 to 1.15. Headings 1.2 to 1.35. Body 1.55 to 1.6. Visual examples.
14. **Mobile vs desktop scale comparison** — Same heading shown at mobile and desktop sizes side by side, with breakpoint annotation.

**Application block (slides 15 to 30)**

Each slide shows one interface surface as a mockup, with annotations calling out the typography decisions:

15. **Top navigation (desktop)** — Logo wordmark, nav links, primary CTA. Geist 500, 14px. Cedar wordmark.
16. **Top navigation (mobile)** — Hamburger menu open state, vertical link stack.
17. **Hero (owner acquisition)** — Headline, subhead, CTA, eyebrow. Paper surface. Geist 3xl headline.
18. **Hero (renter acquisition)** — Different copy, Cream surface, property photography placeholder.
19. **Section block with eyebrow plus heading plus body** — The brand's signature typographic pattern in context.
20. **Pull quote** — Newsreader 500, large, Cedar accent rule on left.
21. **Blog post header** — Article title in Geist 2xl, metadata row in Geist sm Ink-60, featured image placeholder.
22. **Blog post body** — Newsreader 18px body, H2 in Geist xl, link styling, in-flow image with caption.
23. **Listing card** — Address in Geist 500 base, neighborhood in Geist sm Ink-60, beds/baths/sqft in Geist sm tabular, rent figure in Geist 500 lg Cedar.
24. **Listing detail page** — Full property view, hero address, rent, feature list, amenity badges.
25. **Owner statement** — Letterhead, period, line items in Geist tabular, net-to-owner in Geist 600 lg Cedar, signature in Fraunces italic.
26. **Owner proposal cover** — Document title, recipient block, signature line.
27. **Form (renter inquiry)** — Labels in Geist 500 sm, inputs in Geist 16px (prevents iOS zoom), helper text Ink-60, submit button Clay.
28. **Resident portal home** — Welcome line, rent due card, repair status card.
29. **System messages** — Success, warning, error, info banners with proper color and weight pairings.
30. **Empty state** — Empty repair queue, "No open requests" in Geist 500 xl, body in Newsreader Ink-60.

**Reference block (slides 31 to 35)**

31. **Token reference card** — Visual cheat-sheet of the role-based composite tokens.
32. **Tailwind class quick reference** — Common patterns shown as Tailwind class strings.
33. **Forbidden patterns** — Six examples of what not to do, with each crossed out.
34. **Migration checklist** — What changes from the current v2 style guide.
35. **Links and resources** — Google Fonts links to Geist, Newsreader, Fraunces. Link to the gpm-typography-tokens.css file. Link to the Astro repo when ready.

Every application slide must:
- Use only colors from the locked palette
- Use the correct surface color for its audience mode
- Show realistic Green PM content, never lorem ipsum
- Annotate the type decisions (callout arrows or marginal notes showing which font, weight, size)
- Match desktop or mobile viewport proportions, labeled

## Voice and tone for all written outputs

Direct. Specific. Plain. Calm. Numbers and proper nouns over jargon. First person singular when Megan speaks. Third person otherwise. No marketing fluff, no engagement bait, no manufactured urgency, no "let's," no "we believe," no exclamation marks.

Use the brand's example sales copy as reference voice:

> I manage rentals in King and Snohomish counties. I work with owners of 1 to 20 doors. The fee is 9% of collected rent. The leasing fee is 60% of one month, billed only on placement. No setup fee, no maintenance markup. Megan Green, designated broker.

## Output ordering

Produce deliverables in this order:

1. The written strategy document
2. The usage guidelines document
3. The token CSS file

The written documents support implementation by engineers and content authors.

## What to assume vs ask

Assume:
- Astro plus Tailwind plus Sanity stack is locked
- All four written and code deliverables are needed in full, not as outlines
- Mobile viewport is 375px reference; desktop is 1280px reference
- Google Fonts self-hosting is the deployment plan (no external font CDN dependencies for production)

Ask only if:
- A specific brand surface is mentioned in this prompt that you do not have enough context to mock realistically
- A color token appears to conflict with WCAG AA requirements at a given size

Otherwise, proceed.

## Quality bar

Every spec is reviewable by a senior designer and a senior engineer. Every example is production-grade, not placeholder. Every recommendation cites the brand's positioning or operational requirement that drives it. No generic typography advice. Everything is Green PM-specific.

```
