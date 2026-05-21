---
domain: brand
category: design-system
sub-category: typography-migration
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 21-typography-tokens
  - 22-typography-usage
produces:
  - migration-step-list
  - file-level-find-replace-table
  - regression-test-checklist
  - rollback-plan
executor: engineering
aliases:
tags:
---

# 23-typography-migration

Step-by-step migration plan from the v2 type system (Fraunces display, Inter body, JetBrains Mono) to the v3 type system (Geist display, Newsreader body, Fraunces italic accent only). Consumed by the engineer executing the upgrade.

## Dependencies

- `21-typography-tokens` for the target token state
- `22-typography-usage` for the target per-element state

## Outputs

1. Pre-migration checklist
2. File-level find-and-replace map
3. Step-by-step migration sequence
4. Regression test checklist
5. Rollback plan

## Pre-migration checklist

Before starting:

- [ ] Working branch created off `main`: `feat/typography-v3`
- [ ] Current v2 tokens.css backed up
- [ ] Current `tailwind.config.js` backed up
- [ ] List of surfaces with hard-coded font-family values (search `font-family:` across `/src/`)
- [ ] List of surfaces with hard-coded font-weight values that conflict with the four allowed weights
- [ ] Identify pages or templates that quote Fraunces explicitly outside the signature pattern

## File-level find-and-replace map

| File | Find | Replace |
|---|---|---|
| `green-pm-tokens.css` | `--font-display: "Fraunces", Georgia, "Times New Roman", serif;` | `--font-display: 'Geist', system-ui, -apple-system, sans-serif;` |
| `green-pm-tokens.css` | `--font-body: "Inter", system-ui, -apple-system, sans-serif;` | `--font-body: 'Newsreader', Georgia, 'Times New Roman', serif;` |
| `green-pm-tokens.css` | `--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", monospace;` | `--font-accent: 'Fraunces', Georgia, 'Times New Roman', serif;` |
| `tailwind.config.js` | `display: ['Fraunces', 'Georgia', '"Times New Roman"', 'serif'],` | `display: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],` |
| `tailwind.config.js` | `body:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],` | `body:    ['Newsreader', 'Georgia', '"Times New Roman"', 'serif'],` |
| `tailwind.config.js` | `mono:    ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'monospace'],` | `accent:  ['Fraunces', 'Georgia', '"Times New Roman"', 'serif'],` |
| `base.css` | `.signature { ... font-family: var(--font-display); ... }` | `.signature { ... font-family: var(--font-accent); ... }` |
| `base.css` | `.prose em { font-style: italic; font-family: var(--font-display); }` | `.prose em { font-style: italic; }` (drop Fraunces switch) |

## Step sequence

### Step 1: Update tokens

Edit `green-pm-tokens.css`:

```css
/* OLD */
--font-display: "Fraunces", Georgia, "Times New Roman", serif;
--font-body:    "Inter", system-ui, -apple-system, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, "SF Mono", monospace;

/* NEW */
--font-display: 'Geist', system-ui, -apple-system, sans-serif;
--font-body:    'Newsreader', Georgia, 'Times New Roman', serif;
--font-accent:  'Fraunces', Georgia, 'Times New Roman', serif;
/* font-mono removed entirely */
```

### Step 2: Update Tailwind

Edit `tailwind.config.js` per the find-and-replace map. Remove the `mono` key. Add the `accent` key. Add `prose` to `fontSize`:

```js
prose: ['1.0625rem', { lineHeight: '1.6' }],   // 17px body prose
```

### Step 3: Update font loading

In every Astro layout (`BaseLayout.astro`, `NeutralAcquisitionLayout.astro`, etc.), replace the existing Google Fonts link with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Fraunces:ital,opsz,wght@1,9..144,600&display=swap" rel="stylesheet">
```

### Step 4: Update `base.css`

Edit element selectors that quote `var(--font-display)` for body prose contexts. Headings keep `var(--font-display)` (now Geist). Prose `.prose` and body paragraphs in long-form contexts switch to `var(--font-body)` (now Newsreader).

```css
/* Body default stays Geist (formerly Inter) for UI */
body {
  font-family: var(--font-display);   /* Geist */
}

/* Prose context uses Newsreader */
.prose,
.prose p {
  font-family: var(--font-body);      /* Newsreader */
  font-size: 1.0625rem;               /* 17px */
  line-height: 1.6;
}

/* Signature uses Fraunces */
.signature {
  font-family: var(--font-accent);    /* Fraunces */
  font-style: italic;
  font-weight: 600;
  font-size: var(--text-2xl);
  color: var(--color-cedar);
}
```

### Step 5: Update prose monospace block (none in v3)

The `.prose code { font-family: var(--font-mono); }` rule is removed. Code does not appear in customer-facing surfaces. If code styling is needed for internal documentation, use system monospace as fallback only.

### Step 6: Find and remove every JetBrains Mono reference

```bash
grep -rn "JetBrains" ./src/ ./public/
grep -rn "font-mono" ./src/
grep -rn "--font-mono" ./src/
```

Replace any remaining references with the appropriate v3 family. Delete font-mono token entirely.

### Step 7: Find and audit every Fraunces reference

```bash
grep -rn "Fraunces\|font-display.*serif\|font-accent" ./src/
```

For each match, verify:

- If it is the signature pattern (first-name italic), update to `var(--font-accent)` and add the italic 600 styling
- If it is a heading or hero, update to `var(--font-display)` (now Geist)
- If it is body emphasis (`<em>` in prose), remove the font-family switch entirely; let italic stand on its own

### Step 8: Adjust H1 to H4 weights

Geist runs slightly heavier than Fraunces at the same weight. Audit headings and consider dropping weight from 600 to 500 for H1 to H4 where the visual feels too heavy.

### Step 9: Adjust line-height for Newsreader body

Newsreader at 17px reads best at `line-height: 1.6`. Inter at 16px ran at 1.55. Update prose contexts accordingly.

### Step 10: Visual regression review

Walk every page in every audience mode. Confirm:

- Wordmark reads correctly in Geist 600
- Hero headlines render in Geist, not Fraunces
- Long-form blog body reads in Newsreader
- Owner letter signatures render Fraunces italic
- Statement tables use tabular Geist
- No JetBrains Mono code blocks visible anywhere

## Regression test checklist

| Surface | Check | Pass |
|---|---|---|
| Landing page hero | Geist 500, Ink, 56px desktop | |
| Owner acquisition hero | Geist 500, Ink, 56px desktop | |
| Renter acquisition hero | Geist 500, Ink, 56px desktop | |
| Wordmark in nav | Geist 600, Cedar | |
| Wordmark in footer | Geist 600, Cedar | |
| Blog index | Card titles Geist, excerpts Newsreader | |
| Blog post body | Newsreader 17px, line-height 1.6 | |
| Listing card | Geist throughout, rent figure tabular | |
| Listing detail description | Newsreader long-form | |
| Owner statement | Geist tabular, signature Fraunces italic | |
| Resident portal home | Geist throughout | |
| Owner portal home | Geist throughout | |
| Email templates | Geist with Georgia fallback | |
| Print letterhead | Geist Cedar, signature Fraunces | |
| Form labels | Geist 500 14px | |
| Form inputs | Geist 400 16px | |
| Error messages | Geist 500 13px Error color | |

## Rollback plan

If a critical regression appears:

1. Revert the `feat/typography-v3` branch merge
2. Reset `green-pm-tokens.css`, `tailwind.config.js`, and `base.css` from the backup
3. Trigger a Cloudflare Pages rebuild from `main`
4. Re-add Fraunces and Inter to font loading
5. Document the failure mode and address before re-attempting

Rollback budget: under 30 minutes from decision to live previous version.

## Acceptance

This doc is acceptable when:

- An engineer can complete the migration in a single working session by following these steps
- Every regression test in the checklist has a clear pass criterion
- The rollback plan returns the live site to v2 in under 30 minutes
