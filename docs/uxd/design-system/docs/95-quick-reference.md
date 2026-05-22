---
domain: brand
category: design-system
sub-category: quick-reference
date-created: 2026-05-21
date-revised: 2026-05-21
status: locked
version: 3.0.0
depends-on:
  - 10-color-system
  - 20-typography-strategy
  - 21-typography-tokens
  - 22-typography-usage
  - 30-design-tokens
  - 40-spacing-layout
  - 41-radius-shadow
  - 42-motion
  - 52-component-grammar
  - 93-pairings-forbidden
produces:
  - single-page-cheat-sheet
  - printable-reference-card
  - llm-system-prompt-snippet
executor: strategy
aliases:
  - cheat-sheet
  - quick-ref
  - one-pager
tags:
  - quick-reference
  - cheat-sheet
  - governance
  - design-system
---

# 95-quick-reference

The single page every designer, developer, vendor, and LLM consults before producing anything for Green PM. If something here conflicts with a full spec doc, the full spec wins. This page exists for speed, not authority.

Print it. Pin it. Paste it into the system prompt of every LLM workflow.

## Dependencies

- [[10-color-system|color system]]
- [[20-typography-strategy|typography strategy]]
- [[21-typography-tokens|typography tokens]]
- [[22-typography-usage|typography usage]]
- [[30-design-tokens|design tokens]]
- [[40-spacing-layout|spacing and layout]]
- [[41-radius-shadow|radius and shadow]]
- [[42-motion|motion]]
- [[52-component-grammar|component grammar]]
- [[93-pairings-forbidden|approved pairings and forbidden patterns]]

## Outputs

1. Single-page cheat sheet
2. Printable reference card
3. LLM system prompt snippet

## 1. Brand foundation (5 facts)

1. **Name**: Green Property Management. Short: Green PM. Conversational: Green. Wordmark always reads "Green PM" in Geist 600.
2. **Operator**: Megan Green, designated broker, Washington state.
3. **Service area**: King County, Snohomish County, Washington.
4. **Pricing**: 9% of collected rent. 60% of first month's rent as leasing fee on placement only. Stated as plainly as that. No "starting at," no asterisks.
5. **Domain**: `greenpmpnw.com`. Portal: `portal.greenpmpnw.com`.

## 2. Anti-positioning (what Green PM is NOT)

- Not legacy navy-and-serif property management.
- Not REIT institutional grey-corporate.
- Not lifestyle sage-and-beige boutique with hand-lettered signage.
- Not SaaS proptech gradients and neon-mint accents.

If a mock or draft slides toward any of these, it is wrong.

## 3. Colors (memorize these names)

| Token | Hex | Use |
|-------|-----|-----|
| Cedar | `#2D6A4F` | Brand. Wordmark, headings on Cream, primary brand accent. |
| Ink | `#1F2A2E` | All body text. Never pure black. |
| Cream | `#FBF6EC` | Marketing surface background. |
| Paper | `#F7F5F0` | Product surface background. |
| Stone | `#D4D1CA` | Borders, dividers, low-emphasis surfaces. |
| Clay | `#A95C42` | CTAs ONLY. "Clay equals click." |
| Sky | `#7BA7B8` | Secondary accent, links, info. |

System colors: Success `#3E7A55`, Warning `#A8741A`, Error `#9C2D1F`, Info `#3A6480`.

**Never**: pure black (`#000`), pure white (`#FFF`), saturated red, neon, gradients on brand surfaces.

## 4. Type stack (3 families, $0 cost)

| Family | Use | Weights |
|--------|-----|---------|
| **Geist** | Display, wordmark, UI, nav, buttons, forms, numbers, financial figures. | 400, 500, 600, 700 |
| **Newsreader** | Body prose. Blog, owner letters, lease body, long-form anything. 17px / 1.6 leading. | 400, 500, 600 |
| **Fraunces Italic** | Signature line accent ONLY. Three uses: owner letter, proposal cover, formal notice. "Megan" in Cedar, ~1.5x body. | 400 italic only |

**Forbidden weights everywhere**: 100, 200, 300, 800, 900.

**Forbidden families**: Inter, Helvetica, Arial as primary (fallback only), JetBrains Mono (removed in v3), any cursive script other than Fraunces italic, any pixel font, any all-caps display font.

## 5. Spacing (4px base, 14 steps)

Steps: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.

Token names: `--space-0`, `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-8`, `--space-10`, `--space-12`, `--space-16`, `--space-20`, `--space-24`, `--space-32`.

Never use values outside the scale. Never use odd pixel values.

## 6. Containers

| Token | Width | Use |
|-------|-------|-----|
| `--measure-prose` | 65ch | Body text, blog, owner letter. |
| `--measure-form` | 40ch | Forms, login. |
| `--measure-card` | 40ch | Listing cards, evidence cards. |
| `--measure-modal` | 480px | Modal dialog content. |
| `--container-lg` | 1024px | Standard desktop container. |
| `--container-xl` | 1280px | Wide pages and dashboards. |

Touch target minimum: 44px.

## 7. Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 4px | Inputs, small chips. |
| `--radius-md` | 8px | Buttons, cards. |
| `--radius-lg` | 16px | Modals, large cards. |
| `--radius-pill` | 999px | Pill badges, avatar. |

Default: `--radius-md`. Cards do not nest with same radius; inner elements step down one level.

## 8. Shadow

3 steps, all ink-tinted (rgba based on Ink, not black).

| Token | Use |
|-------|-----|
| `--shadow-1` | Cards floating on a same-color surface. |
| `--shadow-2` | Dropdowns, popovers, sticky nav, hovered cards. |
| `--shadow-3` | Modals, takeovers, toast notifications. |

Default: no shadow. Use Stone border instead.

Evidence cards use a 4px Cedar left border, no shadow.

## 9. Motion

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | 100ms | Tooltips, micro-feedback, iconography state changes. |
| `--duration-quick` | 150ms | Links, small text color shifts, focus ring fade-in. |
| `--duration-default` | 200ms | Buttons, cards, dropdowns, accordions. |
| `--duration-slow` | 250ms | Modals, drawers, page transitions. |

Easing: `cubic-bezier(0.4, 0, 0.2, 1)`. Single curve, everywhere.

**Forbidden**: spring physics, parallax, auto-playing carousels, scroll-jacking, animated gradients, blink, marquee, motion longer than 250ms without explicit reduced-motion fallback.

Reduced motion: respect `prefers-reduced-motion: reduce`. All animations become instant.

## 10. Z-index (8 steps, named)

| Token | Value | Use |
|-------|-------|-----|
| `--z-base` | 1 | Explicit in-flow stacking context. |
| `--z-dropdown` | 10 | Select menus, autocomplete. |
| `--z-sticky` | 20 | Sticky headers. |
| `--z-skip` | 25 | Skip-to-content link. |
| `--z-modal` | 30 | Modal dialogs, drawers. |
| `--z-popover` | 40 | Popovers, tooltips' parent. |
| `--z-toast` | 50 | Toast notifications. |
| `--z-tooltip` | 60 | Tooltips, always on top. |

Never use raw numbers. Never use values like `z-index: 9999`.

## 11. Audience modes (5)

| Mode | Background | Use |
|------|------------|-----|
| `neutral-acquisition` | Cream | Homepage, generic marketing. |
| `owner-acquisition` | Paper | For-owners marketing, proposal. |
| `owner-product` | Paper exclusive | Owner portal, statements. |
| `renter-acquisition` | Cream | Listings, application. |
| `renter-product` | Paper plus Cream accent | Resident portal. |

Set on the document root (`<html>` preferred, `<body>` accepted) as `data-audience="owner-product"`. CSS in `modes.css` switches surface tokens.

## 12. Buttons (memorize 5 sizes, 5 variants)

**Sizes**: `xs` (28px), `sm` (32px), `md` (40px, default), `lg` (48px), `xl` (56px).

**Variants**:

- `primary`: Clay background, Cream text. The "do it" button. One per view.
- `secondary`: Cedar border, Cedar text, transparent background.
- `tertiary`: No border, Cedar text. For "cancel" and low-emphasis.
- `icon`: Square, icon only. Always has aria-label.
- `destructive`: Error background, Cream text. Confirmation required.

**Never**: more than one primary per view, primary in body copy, gradient buttons, all-caps button labels, drop shadows on buttons.

## 13. The signature pattern (Fraunces italic)

Used in exactly 3 places:

1. Owner letter sign-off.
2. Proposal cover sheet operator name.
3. Formal notice operator name.

Pattern:

```html
<p class="signature">
  <span class="signature-given">Megan</span>
  <span class="signature-family">Green</span>
  <span class="signature-role">Designated Broker, Green PM</span>
</p>
```

`signature-given`: Fraunces 400 italic, Cedar, ~1.5x body size.
`signature-family`: Geist 500, Ink, body size.
`signature-role`: Geist 400, Ink-60, smaller.

Never use Fraunces italic anywhere else. Not in pull quotes. Not in section eyebrows. Not in marketing copy.

## 14. Voice (5 principles, condensed)

1. **Plain over polished**. "We collect rent on the 1st" not "We facilitate timely rent remittance."
2. **Specific over generic**. "Bothell, Mill Creek, North Seattle" not "the Pacific Northwest."
3. **Operator-first**. "Megan handles the call" not "Our team is here to assist."
4. **Evidence over claims**. Show the statement, show the photo, show the lease clause. Do not say "transparent"; be transparent.
5. **Calm over urgent**. No "Act now." No "Limited time." Property management is a long game.

## 15. Banned phrases (partial list, see `04-microcopy.md` for full)

- "Best in class"
- "Industry-leading"
- "Boutique"
- "White-glove"
- "Synergy"
- "Solutions" (as in "property management solutions")
- "Hassle-free"
- "Worry-free"
- "Peace of mind"
- "Family-owned" (true but cliched; show, do not tell)
- "Local experts" (show neighborhoods instead)
- "Trusted by"
- "Reach out" (use "email" or "call")

## 16. Component grammar one-liners

- Cards never nest cards.
- Lists never nest more than 2 levels deep in body copy.
- Tables show financial data; never use tables for layout.
- Forms cap at 40ch unless a specific field requires wider.
- Modals are dismissable with Escape and outside-click unless they confirm destructive action.
- Toasts auto-dismiss after 5 seconds; errors persist until acknowledged.
- Tooltips are not for primary information; if it is important, it is visible.

## 17. Document templates (5 locked)

1. **Statement** (`72-document-templates.md` section 4): monthly owner statement.
2. **Proposal** (`72-document-templates.md` section 5): new-owner proposal cover + body.
3. **Lease** (`72-document-templates.md` section 6): lease body presentation. Content owned by Counsel.
4. **Notice** (`72-document-templates.md` section 7): formal notices (entry, lease end, repair).
5. **Owner letter** (`72-document-templates.md` section 8): narrative monthly letter accompanying statement.

Each renders to HTML (web), PDF (download), and print. Same template, three outputs.

## 18. Email rules

- Subject lines: sentence case, no emojis, no "RE:" prefixes added by us, no all-caps.
- From name: "Megan at Green PM" for personal touch, "Green PM" for system notifications.
- HTML emails: table-based, max 600px wide, bulletproof buttons (no CSS gradients).
- Plain-text fallback always included.
- No tracking pixels disclosed as such; if used, mentioned in privacy policy.
- One CTA per email.

## 19. Print and physical

- Yard sign: 18×24in, Cedar background, Cream wordmark, phone number in Geist 600.
- Business card: 3.5×2in, Cream, Cedar wordmark front, contact details back in Geist.
- Letterhead: top-left Cedar wordmark, address block bottom-right in Geist 400 10pt.
- Always CMYK conversion table (see `74-print.md`). Cedar `#2D6A4F` is `C82 M40 Y82 K35` for offset.

## 20. Accessibility minimums

- WCAG 2.1 AA target.
- Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large text 18pt+ or 14pt+ bold).
- All interactive elements keyboard-reachable.
- Focus-visible outlines, never `outline: none` without replacement.
- Skip-to-content link, first focusable element.
- Touch targets ≥ 44×44px.
- Form fields have visible labels; placeholders are not labels.
- Icon-only buttons have `aria-label`.
- Images have alt text (decorative gets `alt=""`).
- Reduced-motion respected.
- Color is never the only information channel (always pair with text or icon).

## 21. Forbidden patterns master list (condensed)

**Color**:
- Pure black or pure white.
- Saturated red, neon green, electric blue.
- Gradients on brand surfaces.
- Clay used for anything that is not a CTA.

**Type**:
- Inter, Helvetica, Arial as primary (fallback only).
- JetBrains Mono.
- Weights 100, 200, 300, 800, 900.
- All-caps body copy.
- Letter-spacing > 0.04em outside of small uppercase labels.
- Italic for emphasis (use weight instead; Fraunces italic is signature-only).
- Underline anything other than links.

**Layout**:
- Center-aligned long-form body copy.
- Body copy wider than 75ch.
- Grids more than 12 columns.
- Sticky elements that cover more than 15% of the viewport.

**Shape and shadow**:
- Drop shadows on buttons.
- Soft inner glows.
- Rounded corners > 24px on non-pill elements.
- Skeuomorphic textures (paper grain, wood, leather).

**Motion**:
- Spring physics.
- Parallax.
- Auto-playing carousels.
- Scroll-jacking.
- Animated gradients.
- Marquee, blink.

**Brand identity**:
- Logo on a photograph background without a Cedar or Cream plate behind it.
- Logo rotated, skewed, or stretched.
- Wordmark in any font other than Geist 600.
- Stock photography of "diverse business team smiling."
- Stock photography of skylines, gavels, keys-in-hand, sold signs.

See `93-pairings-forbidden.md` for the full forbidden master list.

## 22. Stack (locked)

| Layer | Choice |
|-------|--------|
| Marketing site | Astro + Tailwind CSS |
| CMS | Sanity |
| Hosting | Cloudflare Pages |
| PMS (resident + owner portal) | Rentvine (→ AppFolio at 50+ doors) |
| CRM | HubSpot Starter |
| Email | Postmark |
| Auth | Clerk |
| Database | Neon Postgres |
| Icons | Lucide |
| Fonts | Google Fonts (self-hosted) |

Changes to any of these require a proposal (see `94-governance.md`).

## 23. File naming (kebab-case)

- Markdown specs: `42-motion.md`.
- Components: `PascalCase.astro` (Astro convention).
- CSS files: `kebab-case.css`.
- Sanity schemas: `camelCase.ts` (file) / `pascalCase` (type name).
- Routes: kebab-case (`/for-owners`).
- Assets: kebab-case (`cedar-yard-sign.svg`).
- Env vars: `SCREAMING_SNAKE_CASE` with `PUBLIC_` prefix for client-exposed.

H1 of every doc matches the filename (without `.md`).

## 24. Frontmatter schema (every Markdown doc)

```yaml
---
domain:
category:
sub-category:
date-created:
date-revised:
[other fields alphabetical]
aliases:
tags:
---
```

`aliases` and `tags` always last. No blank lines inside the block. Single-level tags only, kebab-case for compound.

## 25. The 30-second triage

When in doubt, check in this order:

1. Is the value a hex code that is not in section 3? **Wrong**. Use a token.
2. Is the font Inter, Helvetica, Arial, or JetBrains Mono? **Wrong**. Use Geist or Newsreader.
3. Is the spacing not on the 4px scale (section 5)? **Wrong**. Snap to the scale.
4. Is the button shadowed, gradient, or all-caps? **Wrong**. See section 12.
5. Does the copy contain anything in section 15? **Wrong**. Rewrite.
6. Is there more than one primary CTA on the view? **Wrong**. Pick one.
7. Is Fraunces italic used anywhere outside the 3 signature places? **Wrong**. Remove.
8. Is pure black or pure white anywhere? **Wrong**. Use Ink or Cream/Paper.
9. Does the page break the spec without a logged exception (see `94-governance.md`)? **Wrong**. Log it or fix it.
10. Did the change ship without a proposal on a locked doc? **Wrong**. Revert and file proposal.

## 26. LLM system prompt snippet

When using this design system in an LLM workflow, include this paragraph in the system prompt:

```
You are producing artifacts for Green Property Management (Green PM), a
Washington property management company operated by Megan Green. Use only the
locked color palette (Cedar #2D6A4F brand, Ink #1F2A2E text, Cream #FBF6EC
marketing surface, Paper #F7F5F0 product surface, Stone #D4D1CA borders, Clay
#A95C42 for CTAs ONLY, Sky #7BA7B8 secondary). Use only Geist (UI), Newsreader
(body prose), and Fraunces italic (signature-line accent in exactly three
documented places). Never use pure black or pure white. Never use Inter,
Helvetica, Arial as primary, or JetBrains Mono. Spacing is on a 4px scale.
Touch targets are 44px minimum. The voice is plain, specific, operator-first,
evidence-based, calm. Banned phrases include "best in class," "boutique,"
"white-glove," "hassle-free," "peace of mind," "local experts." One primary
CTA per view. Refer to docs/95-quick-reference.md and docs/93-pairings-forbidden.md
before producing.
```

## 27. Acceptance

This document is acceptable when:

- Every high-risk quick rule matches the authoritative full spec.
- Every token name in this document exists in `green-pm-tokens.css` or `tailwind.config.js`.
- Every linked full spec resolves through an Obsidian wikilink.
- The LLM prompt snippet preserves the locked colors, type families, spacing rule, voice, and one-primary-CTA rule.

## 28. References (specs for deep dives)

- [[00-index]]
- [[01-positioning]]
- [[02-brand-identity]]
- [[03-voice]]
- [[04-microcopy]]
- [[10-color-system]]
- [[11-audience-modes]]
- [[20-typography-strategy]]
- [[21-typography-tokens]]
- [[22-typography-usage]]
- [[23-typography-migration]]
- [[30-design-tokens]]
- [[31-token-atomic-execution]]
- [[40-spacing-layout]]
- [[41-radius-shadow]]
- [[42-motion]]
- [[43-z-index]]
- [[50-form-components]]
- [[51-navigation]]
- [[52-component-grammar]]
- [[53-component-states]]
- [[54-empty-loading-error]]
- [[60-iconography]]
- [[61-photography]]
- [[62-illustration]]
- [[70-data-display]]
- [[71-status-indicators]]
- [[72-document-templates]]
- [[73-email-notifications]]
- [[74-print]]
- [[75-social-media]]
- [[80-system-architecture]]
- [[81-user-flows]]
- [[82-data-flows]]
- [[83-routing]]
- [[84-pms-integration]]
- [[85-sanity-schemas]]
- [[90-file-naming]]
- [[91-accessibility]]
- [[92-dark-mode]]
- [[93-pairings-forbidden]]
- [[94-governance]]
- [[96-numbering-convention]]
