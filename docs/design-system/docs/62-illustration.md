---
domain: brand
category: design-system
sub-category: illustration
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 01-positioning
  - 30-design-tokens
  - 61-photography
produces:
  - illustration-style-rules
  - subject-matter-rules
  - color-palette-application
  - illustration-implementation
  - forbidden-illustration
executor: brand
aliases:
tags:
---

# 62-illustration

The illustration direction. Photography is the default; illustration appears sparingly when photography can't represent the subject. This doc defines what illustration looks like when it does appear, and when it must not appear.

## Dependencies

- `01-positioning` for the anti-corporate, anti-startup positioning
- `30-design-tokens` for the brand palette
- `61-photography` for the photography-first principle illustration supplements

## Outputs

1. Style rules (hand-drawn, flat-color, limited palette)
2. Subject matter guidance
3. Color application
4. Use cases (when illustration is appropriate)
5. Reference style precedents
6. Implementation in components
7. Forbidden illustration patterns

## When to use illustration

Sparingly. Photography is the default. Illustration appears only when:

- Photography can't represent the concept (a fee structure diagram, a workflow)
- A blog post or evidence surface benefits from a hand-drawn diagram
- An editorial moment needs a visual break from text
- An empty-state needs a small accent (rare)

If a photo would work, use a photo.

## Style rules

| Attribute | Value |
|---|---|
| Line work | Hand-drawn ink texture, slightly imperfect |
| Color application | Flat fills, no gradients |
| Palette | Limited to brand colors (Cedar, Clay, Ink, Stone, Cream, Paper) |
| Texture | Subtle paper or ink-bleed texture acceptable |
| Lighting | None (flat, no shading) |
| Perspective | Frontal or three-quarter; no extreme angles |
| Subject matter | Pacific Northwest specific |

## Subject matter

Real, specific things that appear in property management work. The brand is not abstract.

### Approved subjects

- Cedar-shake duplex
- Wet sidewalk in November
- Basement with a sump pump
- Key on a kitchen counter
- A lease document on a desk
- A boiler in a utility room
- A roof with new shingles
- An owner's hand signing a document
- A vendor's truck parked in a driveway
- A maintenance toolbox
- A property's front porch with overgrown plants
- A specific Pacific Northwest tree (Douglas fir, western red cedar, big-leaf maple)
- A USGS-style topo map fragment
- A field-note sketch (architectural detail, property condition)

### Forbidden subjects

- Abstract houses (generic pitched-roof outline)
- Stylized cityscapes
- "Happy family" (mom dad two kids dog at front door)
- Geometric "home" icons (a roof outline filled with a heart)
- Cartoon characters
- Abstract data visualization mascots
- Anthropomorphized buildings
- Mountains as decorative backdrop
- Sunsets as decorative atmosphere

## Color application

Limit each composition to two or three brand colors plus Cream or Paper background.

### Recommended palettes for illustration

| Palette | Colors | Use |
|---|---|---|
| Cedar plus Clay on Cream | Cedar (line + accent), Clay (small fills), Cream (bg) | Workflow diagrams, process flows |
| Ink plus Stone on Paper | Ink (line), Stone (fills), Paper (bg) | Property condition sketches, technical drawings |
| Cedar plus Sky on Cream | Cedar (line + bg accent), Sky (small fills), Cream (bg) | Owner-facing process diagrams |

Avoid using all primitives in one illustration. Three colors maximum.

## Reference style precedents

Direction references (not for copying; for understanding the visual mode):

- Owen Davey (clean line, flat color, editorial)
- Christoph Niemann (idea-led, restrained, often single-color)
- Mid-century editorial illustration (Charley Harper, Paul Rand)
- USGS topographic map detail
- Pendleton-label woodblock style
- Forest service educational illustration (1950s to 1970s)

Direction reference AVOIDS:

- Corporate Memphis (oversized hands, geometric people, gradient pastels)
- Notion-style flat illustrations (round-faced human figures with no features)
- Material Design 3D playful illustration
- Apple Memoji-style figures
- Stock illustration libraries (unDraw, Storyset, OpenDoodles, Lottiefiles)

## Use cases

### 1. Owner acquisition workflow diagrams

Process flows showing how Megan works with owners:

```
[Inquiry received] → [Property review] → [Proposal sent] → [Agreement signed] → [Onboarding]
```

Use Cedar line work and Clay accent dots for state changes. Cream background. Geist labels.

### 2. Fee structure visuals

Show pricing breakdown visually:

```
[Rent collected $2,400] → split → [$216 management fee 9%] + [$2,184 to owner]
```

Use Cedar plus Clay. No gratuitous percentages-as-pie-charts; bar segments are clearer.

### 3. Blog field-note sketches

Hand-drawn architectural details that illustrate a written field note:

- A cross-section of a roof showing flashing
- A diagram of where to install a smoke detector
- A property layout sketch (loose, not precise)

Use Ink line on Paper, Stone fills sparingly.

### 4. Empty state accents (optional)

A small line-drawn icon-illustration above an empty state heading:

- "No open repairs" with a wrench-on-table sketch (24px)

Used sparingly. Most empty states use a Lucide icon (see `60-iconography.md`), not an illustration.

### 5. Compliance reference cards

Hand-drawn diagrams for compliance content (HB 1217 notice periods, Just Cause categories). Visual schematic plus Geist annotations.

## Implementation

### Hand-drawn SVG (preferred)

For illustrations that ship in the design system. Author in Affinity Designer, Figma, or equivalent. Export as optimized SVG. Inline in Astro components.

```html
<svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M..." stroke="var(--color-cedar)" stroke-width="2" stroke-linecap="round" />
  <circle cx="..." cy="..." r="..." fill="var(--color-clay)" />
</svg>
```

Use CSS variables for colors so illustrations recolor on theme change.

### Hand-drawn raster (acceptable for blog)

For one-off blog illustrations. Author in Procreate or equivalent. Export as PNG at 2x. Compress for web.

### Stock illustration

**Default: forbidden.** Only acceptable if heavily customized and recolored to match the brand palette and refused subjects list.

Approved sources (only if heavily customized): OpenDoodles, unDraw (recolor required).

## Sizing

| Use | Size |
|---|---|
| Hero illustration | Full-width or 2/3 width at desktop, full at mobile |
| Inline diagram | Max-width 480px |
| Empty state accent | 48px to 96px |
| Blog post inline | Max-width 600px |

## Captions

Every illustration in editorial context gets a caption in Geist regular 13px Ink-60. Format: italicized one-sentence description of what is shown.

```html
<figure>
  <svg>...</svg>
  <figcaption class="font-display font-regular text-[13px] text-ink-60 mt-2 italic">
    A cross-section of typical PNW four-plex roof flashing, where most leaks originate.
  </figcaption>
</figure>
```

## Forbidden illustration patterns

- Corporate Memphis aesthetic (oversized hands, ungrounded floating figures, geometric people)
- 3D illustrations
- Gradient fills
- Drop shadows on illustrations
- Photorealistic illustrations
- Cartoon characters
- Anthropomorphized objects (smiling sun, frowning house)
- Mascot characters
- Abstract data visualization mascots
- Pastel "tech-startup" palette (mint, lavender, peach)
- Generic stock-illustration libraries used unmodified
- Lottie or animated JSON illustrations
- Holiday-themed seasonal illustrations
- Memoji or emoji-style figures
- "Hero person at laptop" trope

## Acceptance

This doc is acceptable when:

- An illustrator can produce work from this brief
- A blog editor can decide whether to commission illustration or use a photo
- Forbidden styles are clear enough to refuse a stock illustration request
- Limited palette rule is enforceable in design review
