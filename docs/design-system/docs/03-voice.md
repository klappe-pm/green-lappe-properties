---
domain: brand
category: design-system
sub-category: voice
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 01-positioning
  - 02-brand-identity
produces:
  - voice-principles-table
  - three-context-voice-samples
  - words-to-use-and-avoid
executor: brand
aliases:
tags:
---

# 03-voice

Voice principles and example copy across the three core contexts: sales, operations, evidence. Consumed by content authors, email template authors, document template authors, and form helper text authors.

## Dependencies

- `01-positioning` for the named-operator and small-portfolio premise
- `02-brand-identity` for who "I" refers to (Megan) and when first person is used

## Outputs

1. Five voice principles with examples of what each means and does not mean
2. Three context-specific voice samples (sales, operations, evidence)
3. Word lists: use and avoid

## 3.1 Voice principles

| Principle | Means | Does not mean |
|---|---|---|
| Direct | Short sentences, plain words, answer first | Blunt or cold |
| Specific | Numbers, names, dates, addresses | Jargon or legalese |
| Accountable | First person singular when Megan speaks | Self-deprecating |
| Local | Says Bothell, not "the Puget Sound region" | Folksy or twee |
| Calm | No manufactured urgency | Slow or evasive |

## 3.2 Voice in three contexts

**Sales (landlord-facing):**

> I manage rentals in King and Snohomish counties. I work with owners of 1 to 20 doors. The fee is 9% of collected rent. The leasing fee is 60% of one month, billed only on placement. No setup fee, no maintenance markup. Megan Green, designated broker.

**Operations (tenant-facing):**

> Rent is due the 1st. Late on the 6th. Pay through the portal, by check, or by ACH. Maintenance requests go through the portal. I respond within one business day. After hours emergencies: (425) XXX-XXXX.

**Evidence (blog, field notes):**

> The boiler at this 1924 four-plex is 22 years old. Replacing it now costs $3,500. Replacing it during a January cold snap when it dies costs $5,500 plus emergency dispatch. The owner approved the replacement last week. Work starts Tuesday.

## 3.3 Words to use

home, owner, resident, neighbor, repair, response, your, ours, fixed, paid, signed, returned, ready, due, paid, late, posted, sent, scheduled, confirmed.

## 3.4 Words to avoid

stakeholder, leverage, solutions, synergies, family (in marketing copy; reserved for actual families), unbeatable, premier, luxury, world-class, value-add, ecosystem, journey (in customer-experience sense), unlock, empower, transform, elevate, curated, bespoke.

## 3.5 First person rules

- "I" refers to Megan when used in body copy and signatures
- "We" is reserved for moments when the company speaks (legal text, system messages, "we use cookies")
- Default to "I" anywhere a person could plausibly be speaking
- Never use "the company" or "Green Property Management" as a sentence subject in conversational copy

## 3.6 Number rules

- Dollars: always with `$` and comma separators, no cents unless required (`$2,400`, not `$2400.00`)
- Percentages: `9%`, not `nine percent`
- Dates: `March 14, 2026` in long form; `3/14/26` only in tables; `2026-03-14` in machine-readable contexts
- Phone: `(425) XXX-XXXX` format
- Square feet: `1,250 sqft`, lowercase, no space
- Beds and baths: `2 bed · 1.5 bath`, middot separator

## 3.7 Banned patterns

- Engagement bait ("Tag a landlord who needs to see this!")
- All-caps for emphasis (use weight or color)
- Multiple exclamation marks
- Emoji in marketing copy (acceptable in resident-facing chat acknowledgments only, sparingly)
- Hashtag stuffing
- Manufactured urgency ("Don't miss out!", "Limited time!")
- Hedging ("we believe", "we feel", "we think")
- Marketing intensifiers ("incredibly", "amazingly", "absolutely")

## Acceptance

This doc is acceptable when:

- A copywriter can write a 200-word section for any surface using only this doc and stay in voice
- The three context samples are distinguishable enough that a reader can identify which context applies to a given snippet
- Every banned pattern would be flagged by a copy reviewer
