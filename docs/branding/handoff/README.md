# README

Implementation bundle for the **Green Property Management** brand and design
system, built from a Claude Design handoff.

## Files

| File | What it is | Who reaches for it |
| --- | --- | --- |
| `green-pm-tokens.css` | Machine-readable token export: palette, type, spacing, elevation, audience-mode surfaces, base styles. | Claude Code — `@import` it into any real GPM surface. |
| `green-pm-style-guide.md` | Distilled style guide: voice, color, type, modes, component recipes, accessibility, the five rules. | Claude Code and Claude Design — read before building. |
| [`../colors/gpm-brand-book.html`](../colors/gpm-brand-book.html) | The full editorial brand book (22 spreads). Self-contained; open in any browser. Canonical copy lives in `docs/branding/colors/`. | Humans, vendors, and as the rendered reference. |

This is the **distilled** implementation kit. The comprehensive canonical
reference is [`../green-pm-style-guide.md`](../green-pm-style-guide.md); the
full token set is [`../css/green-pm-tokens.css`](../css/green-pm-tokens.css).
Use this bundle for fast surface builds and that pair as the source of truth.

## Quick Start

For a new surface, import the tokens, declare an audience mode, and build from
the components in the style guide:

```html
<link rel="stylesheet" href="green-pm-tokens.css" />
<body data-audience="renter-acquisition">
  <!-- compose with the §8 component recipes; reach for tokens by name -->
</body>
```

## The Rules, in One Line Each

1. Clay = click. Nowhere else.
2. Seven primitives. No more.
3. `renter` before a lease, `resident` after. Owner stays owner.
4. Megan signs the work, in every mode.
5. State colors are scoped outside the brand.

See `green-pm-style-guide.md` for the full system.
