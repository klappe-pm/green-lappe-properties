---
domain: brand
category: design-system
sub-category: brand-identity
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 01-positioning
produces:
  - name-forms-table
  - wordmark-spec
  - operator-signature-spec
  - pronunciation-rules
executor: brand
aliases:
tags:
---

# 02-brand-identity

Name forms, wordmark composition, and the operator signature pattern. Defines how the brand identifies itself in writing and in the wordmark. Consumed by every surface that displays the company name.

## Dependencies

- `01-positioning` for the named-operator strategic premise

## Outputs

1. Three name forms (legal, short, portal mark) with declared use contexts
2. Wordmark composition rules in the live type system (Geist semibold)
3. Operator signature block specification
4. Pronunciation and forbidden-acronym rules

## 2.1 Name forms

| Form | Use |
|---|---|
| Green Property Management | Full legal name. Contracts, broker filings, footer legal text, first formal reference |
| Green PM | Short form. Body copy second-reference, social handles, email signatures, conversational copy |
| Green | Portal mark. Authenticated portal headers, favicon caption, app icon contexts |

Domain: `greenpmpnw.com`. The `pnw` qualifier reinforces regional identity and protects against generic-name collision.

## 2.2 Wordmark

Set in Geist (the v3 display face) until a commissioned mark exists:

- **Full lockup**: `Green` in semibold (600), `Property Management` at 70% size in medium (500). Two-tier hierarchy.
- **Short lockup**: `Green PM`, both words at semibold (600), single tier.
- **Portal mark**: `Green` alone, semibold (600).
- **Color**: Cedar on light backgrounds, Cream on dark.
- **Letter-spacing**: `tracking-tight` (`-0.02em`) at display sizes.
- **Optical sizing**: Geist is a static-variable face. Use size 600 weight at display sizes for the wordmark. No optical-size axis.

## 2.3 Operator signature

The person comes before the brand. In email signatures and proposal covers:

```
Megan Green
Designated Broker · WA #XXXXXX
Green Property Management
(425) XXX-XXXX
megan@greenpmpnw.com
greenpmpnw.com
```

Typographic rules:

- Megan's name in Geist, semibold (600), size `lg`
- Title and license in Geist, medium (500), size `sm`, color Ink-60
- Company line in Geist, regular (400), size `sm`, color Ink-60
- Contact lines in Geist, regular (400), size `sm`, color Cedar (links) or Ink-60

The named-operator signature line at the close of documents uses Fraunces italic (see `22-typography-usage.md` section on signatures).

## 2.4 Pronunciation

`Green P-M` for "Green PM." `Green Property Management` always spelled out, never `GPM` in customer-facing copy (internal acronym fine).

## 2.5 What never appears

- The company name in any face other than Geist (display) or Fraunces (italic signature accent only)
- The company name in pure black `#000000` or pure white `#FFFFFF`
- The wordmark on a Sky or Clay background (only Cream, Paper, Cedar, or Ink)
- An icon or logo mark alongside the wordmark (the wordmark IS the mark until a separate mark is commissioned)
- "GPM" as a visible abbreviation
- Legacy name forms: Green Lappe, Green Lappe Properties, Green PM Properties

## Acceptance

This doc is acceptable when:

- A designer can produce the wordmark in any of three lockups using only this doc plus `21-typography-tokens.md`
- A content author knows which name form to use in any context
- Pure black and pure white are explicitly forbidden in any wordmark application
