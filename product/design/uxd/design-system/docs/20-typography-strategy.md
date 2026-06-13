---
domain: brand
category: design-system
sub-category: typography-strategy
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 01-positioning
  - 03-voice
produces:
  - typography-rationale
  - face-selection-reasoning
  - rejected-alternatives
  - cost-and-licensing
executor: design
aliases: []
tags: []
---

# 20-typography-strategy

The strategic rationale for the three faces in the v3 system: Geist (display, UI, financial), Newsreader (body prose), Fraunces (italic signature accent only). The "why" document. Consumed by every typography-adjacent doc and by anyone reviewing whether a type decision aligns with the brand.

## Dependencies

- `01-positioning` for the four-archetype anti-positioning the type system must refuse
- `03-voice` for the named-operator, calm, specific tone the type system must support

## Outputs

1. Why a grotesque display lead (Geist, not a serif)
2. Why a serif body (Newsreader, not Inter)
3. Why Fraunces survives as accent only
4. Why Inter, Bricolage, GT Standard, and other candidates were rejected
5. The three-faces total cost and licensing

## Why typography matters for this brand specifically

Three reasons:

1. **Named operator.** The brand is Megan, not a logo. Type carries her voice in writing where she cannot be physically present. The wrong face makes a personal brand read corporate. The right face holds her presence.
2. **Financial trust.** The brand collects rent, pays vendors, and reports back. Owners read statements monthly. Numbers must align, columns must read cleanly, and the face must feel competent without feeling cold.
3. **Anti-positioning.** Four refused archetypes (legacy navy serif, REIT geometric, lifestyle sage, proptech gradient) all have type signatures. The brand must refuse them all without falling into a fifth cliche.

## Why a grotesque display lead

The v2 system led with Fraunces, a serif. The pivot to a sans-serif display face is the central v3 change.

Three reasons:

1. **Editorial-serif display reads small-publication or law-firm.** Fraunces at hero scale signaled "boutique editorial brand" or "fine print legal." Neither is the brand. A grotesque at hero scale signals "operator with current taste."
2. **Density compatibility.** A single sans handles wordmark, navigation, buttons, forms, tables, and statements without needing a font switch. Reduces cognitive load and visual jitter.
3. **Refuses the legacy-PM serif cliche.** Every refused archetype except SaaS proptech uses a serif somewhere. Going sans-led is the most efficient anti-positioning move available.

### Why Geist specifically

| Attribute | Geist's answer |
|---|---|
| Personality | Confident, engineered, restrained. Not generic Helvetica. Not playful Bricolage. |
| Tabular figures | Yes, via `font-feature-settings: "tnum"` |
| Weight range | 100 to 900, full variable |
| Mono sibling | Geist Mono exists if ever needed; not used in v3 |
| Origin | Designed by Basement Studio for Vercel, OFL on Google Fonts |
| Cost | Free, OFL |

The "Vercel association" was considered and rejected as not relevant. Property landlords and renters will never make that association. The typeface is a typeface.

## Why a serif body

The v2 system used Inter for body. The pivot to Newsreader for long-form prose is the second v3 change.

Three reasons:

1. **Newsreader carries the editorial-warmth role Fraunces previously held**, in the right contexts (body, long-form, owner letters, blog posts) instead of hero display where it read overdone.
2. **Inter all-the-way reads tech-product.** Pairing a sans display with a serif body separates the brand from generic SaaS. The same trick that gave The New York Times, Substack, and Medium their editorial credibility.
3. **Long-form needs help.** Owner letters, blog field notes, and policy explainers run to hundreds of words. A serif at 17-18px with optical sizing reads faster than a sans at the same size.

### Why Newsreader specifically

| Attribute | Newsreader's answer |
|---|---|
| Optical sizing | Yes, variable opsz axis |
| Reading speed | Designed for long-form on screen by Production Type |
| Personality | Calm, bookish, contemporary, not mannered |
| Weight range | 200 to 800, plus italics |
| Cost | Free, OFL on Google Fonts |

## Why Fraunces survives as accent only

The v2 wordmark used Fraunces. The v3 wordmark uses Geist. Fraunces still appears in the system at exactly one job: the italicized first-name signature line at the close of owner letters, proposals, and notices.

```
[Body of letter ends]

Megan          ← Fraunces Italic, 600, Cedar, 1.5x body size
Megan Green, Designated Broker     ← Geist 500, Ink-60, sm
```

Three reasons to keep Fraunces in the system:

1. **The signature pattern is the brand's named-operator promise made typographic.** Removing it would remove the strongest "real person" moment in writing.
2. **Fraunces italic is uniquely suited to this role.** Calligraphic terminals, optical sizing, ink-trapped joints. No sans-serif italic reads as personal-handwritten.
3. **Used three times across the brand.** Owner letter signature, proposal cover signature, notice signature. That's it. Three uses justify keeping one extra family loaded.

## Faces rejected

| Face | Why rejected |
|---|---|
| Inter (continued use) | Generic; reads tech-product; provides no display differentiation |
| Bricolage Grotesque | Cartoon energy; reads indie magazine; wrong for property management |
| GT Standard | Strongest match to inspiration set, but ~$450 family cost exceeds budget |
| GT Flaire | Strong personality, but ~$390 family cost exceeds budget |
| Clother (Adobe Fonts) | Available via CC, but less distinctive than Geist |
| Söhne | Reference standard, but ~$600+ cost is well over budget |
| Source Serif 4 | Safe but generic; lacks signature warmth |
| Spectral | Strong PNW match, but body-text-first; no display strength |
| Recoleta | Distinctive display, but $80 license and weaker mono ecosystem |
| Helvetica / Neue Haas Grotesk | Refused on principle; the anti-positioning of every brand on Earth |
| JetBrains Mono | Removed entirely from v3; the brand does not display code |

## Cost and licensing

All three faces:

- Free under SIL Open Font License (OFL)
- Available on Google Fonts
- Self-hostable via `fonts.googleapis.com` or local font files
- Commercial use permitted without attribution

Total brand cost: **$0**.

Recommended deployment: self-host as woff2 files in `/public/fonts/` to avoid third-party CDN dependencies in production.

## Three-faces system at a glance

| Role | Face | When |
|---|---|---|
| Display, UI, navigation, buttons, forms, financial figures, tables | Geist | Every interface element except prose and signatures |
| Body prose, long-form, blog posts, owner letters, documents | Newsreader | Anywhere a reader is reading paragraphs |
| Signature line accent | Fraunces Italic | Three documented uses only |

## Migration impact

The v3 system replaces the v2 system. Migration path documented in `23-typography-migration.md`. Token-level change documented in `21-typography-tokens.md`. Per-element usage documented in `22-typography-usage.md`.

## Acceptance

This doc is acceptable when:

- A designer can defend the choice of any of the three faces by referring to a section here
- A skeptical stakeholder asking "why not just keep Inter" gets a concrete answer
- Every rejected face has a documented reason
- The total cost line ($0) is unambiguous
