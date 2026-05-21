---
domain: brand
category: design-system
sub-category: numbering-convention
date-created: 2026-05-21
date-revised: 2026-05-21
status: locked
version: 3.0.0
depends-on:
  - 00-index
  - 90-file-naming
  - 94-governance
produces:
  - numbering-scheme-definition
  - tier-allocation-table
  - reserved-slot-map
  - insertion-rules
  - renumbering-policy
executor: strategy
aliases:
  - numbering
  - doc-numbering
  - file-numbering
tags:
  - numbering
  - file-naming
  - governance
  - design-system
  - convention
---

# 96-numbering-convention

Defines the two-digit numerical prefix scheme used on every spec doc in this design system. The prefix encodes tier (tens digit) and order within tier (ones digit). Gaps are intentional and reserved for future growth. Renumbering existing docs is forbidden except under tightly defined conditions.

This document exists because numbering schemes drift when undocumented. A drifted scheme is worse than no scheme.

## Dependencies

- [[00-index|design system master index]] for the current inventory and tier plan
- [[90-file-naming|file naming conventions]] for kebab-case and path rules
- [[94-governance|governance and change management]] for proposal and renumbering authority

## Outputs

1. Numbering scheme definition
2. Tier allocation table
3. Reserved slot map
4. Insertion rules
5. Renumbering policy

## 1. The scheme in one sentence

Every doc filename is `NN-kebab-slug.md` where `NN` is a two-digit prefix; the tens digit selects a tier, the ones digit selects an order within that tier, and gaps between numbers are reserved insertion slots.

## 2. Why number at all

### 2.1 The four problems numbering solves

1. **Dependency order made visible at the filesystem level.** In Obsidian's file tree, in `ls` output, in VS Code's explorer, in git diffs, the files line up the way an orchestrator should read them. Foundation before primitives before components before surfaces before governance. The number IS the reading order.

2. **Stable references.** `52-component-grammar` is a permanent address. Backlinks (`[[52-component-grammar]]`), citations in other docs, and external references (Slack messages, PR descriptions, vendor handoffs) all resolve forever because the slug does not change for cosmetic reasons. Renaming is a breaking change.

3. **LLM-friendly routing.** An orchestrator agent reading `00-index.md` sees the tier prefixes and can compute the dependency graph without parsing every doc's frontmatter. The number is a routing hint. Tier 0 unblocks Tier 1; Tier 1 unblocks Tier 4; Tier 9 reads everything else.

4. **Resistance to alphabetical drift.** Without numbers, `accessibility.md` sorts before `voice.md`, dropping a new reader into governance before they have absorbed positioning. With numbers, the reader lands in `01-positioning.md` first, every time, regardless of tool or platform.

### 2.2 The alternative was worse

Two alternative schemes were considered and rejected. Documented here so the rejection is not relitigated.

| Alternative | Why rejected |
|-------------|--------------|
| No prefix; rely on Obsidian folders | Folders create another navigation layer; Obsidian wikilinks become `[[design-system/components/buttons]]` instead of `[[52-component-grammar]]`; cross-tool support degrades (VS Code, GitHub, `grep` all behave differently with nested paths). |
| Sequential numbering (`01`, `02`, ..., `42`) | Breaks the moment a new doc is inserted in the middle. Either every subsequent file renumbers (cascading rename, broken backlinks), or the new doc lands at the end of the list, divorced from its semantic neighbors. Defeats the purpose of ordering. |

The decimal-tier scheme below preserves both stability and growth.

## 3. Tier allocation

### 3.1 The six tiers

| Range | Tier name | Contents | Why this tier exists |
|-------|-----------|----------|----------------------|
| `00`-`09` | Foundation | Index, positioning, brand identity, voice, microcopy | Strategy and brand. Every downstream doc cites these. Tier 0 reads first. |
| `10`-`39` | System primitives | Color, audience modes, typography, design tokens | The raw materials. Components consume these. Three decades because typography earned its own cluster. |
| `40`-`59` | Layout and components | Spacing, radius/shadow, motion, z-index, forms, navigation, component grammar, component states, empty/loading/error | The building blocks. Surfaces compose these. Two decades to keep primitives and components clearly separated. |
| `60`-`79` | Surfaces | Iconography, photography, illustration, data display, status indicators, document templates, email, print, social | Where the system meets the world. Two decades because output surfaces multiply: print, web, email, mobile, in-person. |
| `80`-`89` | System architecture | Stack, user flows, data flows, routing, PMS integration, schemas | The technical substrate. Runs parallel to design tiers, not downstream of them. |
| `90`-`99` | Governance | File naming, accessibility, dark mode, pairings/forbidden, governance, quick reference, numbering convention | Meta-system. References everything else. Reads last (or first, as a refresher). |

### 3.2 Current allocation snapshot

As of v3.0.0, the system uses these slots:

```
Tier 0 (Foundation):
  00-index, 01-positioning, 02-brand-identity, 03-voice, 04-microcopy

Tier 1 (System primitives):
  10-color-system, 11-audience-modes,
  20-typography-strategy, 21-typography-tokens,
  22-typography-usage, 23-typography-migration,
  30-design-tokens

Tier 4-5 (Layout and components):
  40-spacing-layout, 41-radius-shadow, 42-motion, 43-z-index,
  50-form-components, 51-navigation, 52-component-grammar,
  53-component-states, 54-empty-loading-error

Tier 6-7 (Surfaces):
  60-iconography, 61-photography, 62-illustration,
  70-data-display, 71-status-indicators, 72-document-templates,
  73-email-notifications, 74-print, 75-social-media

Tier 8 (System architecture):
  80-system-architecture, 81-user-flows, 82-data-flows,
  83-routing, 84-pms-integration, 85-sanity-schemas

Tier 9 (Governance):
  90-file-naming, 91-accessibility, 92-dark-mode,
  93-pairings-forbidden, 94-governance, 95-quick-reference,
  96-numbering-convention
```

Used: 43 slots. Reserved: 57 slots. Capacity headroom: 133%.

### 3.3 Reserved slots (do not assume "empty equals available")

Some unused numbers are deliberately held for anticipated future docs. Filling these out of band creates confusion when the planned doc eventually arrives.

| Slot | Reserved for | Planned trigger |
|------|--------------|-----------------|
| `05`-`09` | Foundation expansion (mission, founding story, ethics statement) | When operator (broker) writes a public-facing statement of values. |
| `12`-`19` | Color expansion (palette extensions, print variants, accessibility deep-dive) | If color system grows beyond seven primitives. |
| `24`-`29` | Typography expansion (variable font config, multi-script support, performance budget) | If font stack changes or international rollout. |
| `31`-`39` | Design token expansion (semantic layers, theming API, token export formats) | When tokens are exported to Figma or other platforms. |
| `44`-`49` | Layout expansion (grid system formalization, breakpoint additions, container query patterns) | When responsive system grows beyond current 5 breakpoints. |
| `55`-`59` | Component expansion (advanced patterns: command palette, data tables, multi-step wizards) | When product surfaces require richer components. |
| `63`-`69` | Surface expansion (video, audio, AR/VR if ever relevant; signage; vehicle wraps) | When physical or media surfaces are added. |
| `76`-`79` | Outbound channel expansion (SMS, voicemail scripts, direct mail) | When operator adds new communication channels. |
| `86`-`89` | Architecture expansion (search, analytics, payments deeper, internationalization) | When stack grows. |
| `97`-`99` | Governance expansion (legal compliance docs, audit procedures, vendor evaluation rubrics) | When operator engages legal counsel for ongoing review. |

A slot moves from "reserved" to "available" only via the governance proposal process (see `94-governance.md`).

## 4. Numbering rules

### 4.1 Choosing a number for a new doc

When proposing a new doc, follow this decision tree:

1. **Which tier does the doc belong to?** Read section 3.1 above. If unclear, the doc may not exist yet conceptually; sharpen the scope first.
2. **Is there a reserved slot for this doc's topic?** Check section 3.3. If yes, use the reserved slot.
3. **Is there an unused number adjacent to a semantically related doc?** If yes, use it. Adjacency is meaningful; readers infer relationships from proximity.
4. **Is the doc a sub-topic of an existing doc?** If yes, place it at the next available number within that cluster. Example: a new typography doc goes at `24`, not `45`.
5. **If all of the above fail**, the doc may belong to a new tier. That requires a governance proposal (section 5.3 below).

### 4.2 What the ones digit communicates

Within a tier, the ones digit usually signals dependency or specificity:

- Lower ones digits are more foundational. `40-spacing-layout` reads before `41-radius-shadow` because spacing constrains shadow placement.
- Higher ones digits are more specific or more composite. `54-empty-loading-error` reads after the basic components because it composes them.
- Tens-digit jumps within a tier (e.g., `30-design-tokens` after `23-typography-migration`) signal a sub-cluster boundary: typography has its own decade (`20`-`29`); design tokens transcend typography and sit at the boundary of the tier.

This is a soft convention. Do not contort doc order to fit a numeric pattern; if the dependency order is genuinely fuzzy, pick the number that reads best in the file tree.

### 4.3 Two-digit padding

All prefixes are two digits, zero-padded. `00`, not `0`. `05`, not `5`. This guarantees lexical sort matches numeric sort across all tools.

The system does not extend to three digits. If `99` is exhausted, the system has outgrown the scheme and a major refactor is required (see section 6.4).

### 4.4 No fractional or decimal numbers

`41.5-something.md` is forbidden. If a doc needs to slot between `41` and `42`, either:

- Use a reserved slot if one is allocated for that purpose (section 3.3).
- File a proposal to renumber under the controlled renumbering policy (section 5.2).

Filenames with decimals break sort order in many tools, confuse Obsidian autocomplete, and signal that the scheme is breaking down. Resist the temptation.

### 4.5 No alphabetic suffixes

`41a-something.md`, `41-component-grammar-v2.md`, `41-component-grammar-new.md` are all forbidden. Versions are tracked in frontmatter and git, not in filenames.

If a doc is superseded, the new doc takes a fresh number and the old doc is deprecated per `94-governance.md` section 5. The slug stays stable until removal.

## 5. Insertion and renumbering

### 5.1 Inserting a new doc (the common case)

Inserting a new doc is routine and does not require renumbering anything else. Process:

1. Identify the tier (section 3.1).
2. Check reserved slots (section 3.3).
3. Pick the lowest available number that respects adjacency to related docs.
4. Create the file with frontmatter, dependencies, outputs declared.
5. Update `00-index.md` to list the new doc in its tier's table.
6. Optionally, update this doc (`96-numbering-convention.md`) section 3.2 to reflect the new allocation snapshot.

No other doc changes. No backlinks break. No cascading edits.

### 5.2 Renumbering an existing doc (rare; requires proposal)

Renumbering is allowed only when:

- The current number is in the wrong tier (e.g., a doc landed in `40`-`59` but is actually a primitive belonging in `10`-`39`). This is a categorization error worth fixing.
- A tier reorganization is approved (section 5.3 below).
- The original number conflicts with a newly discovered standard, legal requirement, or external integration that demands a specific naming.

Renumbering is forbidden when:

- "It would look better." Aesthetic renumbering breaks every external reference. Not worth it.
- "I want to make room for something." Use reserved slots or insert at the next available number.
- "Someone else's doc would benefit from being lower in the list." Their problem to file a separate proposal.

Renumbering process:

1. File a proposal per `94-governance.md`.
2. Proposal must enumerate every backlink, citation, external reference (vendor handoffs, Slack pins, PRs) that points to the old number, and provide a migration plan for each.
3. Required approvers: System owner. Broker approval if the doc is in tier 0 (foundation).
4. On approval, the doc is renamed in a single PR. The old filename is left as a stub Markdown file containing only a frontmatter `redirect-to:` field and a single-line note. The stub is deleted after 90 days.
5. The annual review (`94-governance.md` section 8) audits stub files for cleanup.

### 5.3 Adding a new tier (very rare; major-version event)

Adding a new tier is a major-version bump (see `94-governance.md` section 4.1). It requires:

1. A proposal that demonstrates the new content does not fit any existing tier.
2. Identification of the tier's number range (must be currently unallocated; cannot reclaim a used tier).
3. Update to this doc's section 3.1 table.
4. Update to `00-index.md`.
5. Communication to all owners that the doc graph has grown.

The system currently has six tiers and capacity for at least four more (tier `1x` decimal subdivisions, tier extension into `10x` if absolutely required, but see section 6.4 first).

## 6. Capacity and end-of-life

### 6.1 Current capacity

100 slots total (`00`-`99`). 43 used, 57 unused or reserved. At the current rate of doc growth (about 10 new docs per year of active development, slowing as the system stabilizes), the scheme has 5-6 years of growth runway before tier saturation becomes a real concern.

### 6.2 Per-tier capacity

| Tier | Slots | Used | Free | Reserved |
|------|-------|------|------|----------|
| 0 (Foundation) | 10 | 5 | 5 | 5 |
| 1-3 (Primitives) | 30 | 7 | 23 | 23 |
| 4-5 (Components) | 20 | 9 | 11 | 11 |
| 6-7 (Surfaces) | 20 | 9 | 11 | 11 |
| 8 (Architecture) | 10 | 6 | 4 | 4 |
| 9 (Governance) | 10 | 7 | 3 | 3 |

Tier 9 has only 3 free slots. Watch this one; it fills first as the system matures.

### 6.3 Tier saturation handling

When a tier approaches saturation (8 or more of 10 slots used):

1. Audit the tier for docs that should be split, merged, or moved.
2. Consider whether the tier is genuinely too large or whether the system has accidentally accumulated trivia in that tier.
3. If still saturated, the choices are:
   - Split a sub-cluster into its own tier (major-version event; see section 5.3).
   - Re-tier some docs to adjacent ranges if semantically defensible.
   - Move purely informational appendices to a sibling folder (`docs/appendices/`) outside the numbered set.

### 6.4 Scheme exhaustion (the hundred-doc moment)

If the system reaches 100 numbered docs (`99` taken, no reserved slots remain), the two-digit scheme has reached end of life. Options at that point:

1. **Three-digit extension.** Move to `NNN-slug.md`. Requires renumbering every existing doc (`00` becomes `000`, etc.). Achievable in a single PR but breaks every external reference. Major-version event.
2. **Sub-folders with reset numbering.** Group tiers into folders (`docs/foundation/01-positioning.md`). Resets the namespace within each folder. Breaks flat backlinks; preserves intra-tier numbering.
3. **Hybrid: split the design system.** Move governance, architecture, or surfaces into a separate repository with its own numbered set. Reduces the load on the primary set.

The system owner files a proposal at saturation. The decision is recorded as a system-version bump (likely 4.0.0 by then).

This is a problem for future maintainers. Document it; do not solve it preemptively.

## 7. Cross-references and tooling

### 7.1 How numbers appear in backlinks

Wikilink form:

```markdown
[[52-component-grammar]]
[[52-component-grammar|component grammar]]
```

The numerical prefix is part of the canonical link. Display text overrides what the reader sees, but the link target is the full filename.

### 7.2 How numbers appear in CSS, code, comments

Spec doc references in comments use the full filename without `.md`:

```css
/* See docs/21-typography-tokens for type scale rationale. */
```

```typescript
// Schema mirrors docs/85-sanity-schemas.md section 3.2.
```

This makes grep-based audits trivial: any reference to a removed doc surfaces immediately.

### 7.3 Search and navigation tools

- **Obsidian**: numbered prefixes display in the file tree in numeric order; the graph view groups by frontmatter tags, not number.
- **VS Code Explorer**: numbers sort correctly with the "sort by name" default.
- **GitHub web UI**: numeric sort is the default for the file list view.
- **`ls` on the command line**: zero-padded two-digit prefixes sort lexically, which matches numerically. Verified.
- **`grep -rn "21-typography"` and similar**: works because slug is stable.

### 7.4 Print outputs and PDFs

When a doc is exported to PDF (rare; mostly for offline review), the filename retains the prefix: `21-typography-tokens.pdf`. The prefix is meaningful even outside the design system folder.

## 8. Anti-patterns

### 8.1 Things that look helpful but break the scheme

| Anti-pattern | Why it breaks things |
|--------------|----------------------|
| Renaming docs to "improve" their numbers | Breaks every external reference. Aesthetic gains do not outweigh stability. |
| Using decimals (`41.5`) | Breaks lexical sort, confuses Obsidian, signals scheme breakdown. |
| Using alphabetic suffixes (`41a`, `41b`) | Same problems as decimals; also implies an undocumented hierarchy. |
| Skipping zero-padding (`5-microcopy`) | Sorts `5-microcopy` after `50-form-components`. Wrong. |
| Adding new tiers casually | Tiers carry conceptual weight; each new tier dilutes the others. Requires a proposal. |
| Filling reserved slots without checking | Causes future conflicts when the planned doc arrives. |
| Treating numbers as ordinals (1st, 2nd, 3rd) | They are addresses, not ranks. `73-email-notifications` is not "more important than" `72-document-templates`; it just lives next to it. |

### 8.2 Things that look broken but are intentional

| Pattern | Why it is correct |
|---------|-------------------|
| Gaps in the sequence (no `05`, no `12`-`19`, no `24`-`29`) | Reserved for future docs. |
| Tier jumps (e.g., `30-design-tokens` immediately after `23-typography-migration`) | Sub-cluster boundary. Typography has its own decade; tokens span the tier. |
| Two-decade tiers (`10`-`39` for primitives, `40`-`59` for components) | Reflects topic density; primitives and components both need elbow room. |
| Governance ends at `99`, not later | The scheme caps at two digits by design. See section 6.4. |

## 9. Maintenance

### 9.1 Who maintains this doc

System owner per `94-governance.md` section 2.2 (governance tier).

### 9.2 When this doc updates

- Whenever a new doc is added (update section 3.2 snapshot).
- Whenever a reserved slot is filled (update section 3.3).
- Whenever a tier approaches saturation (update section 6.2).
- Whenever the renumbering or insertion policy is debated and clarified (update sections 4 and 5).

### 9.3 Annual review obligations

During the annual review (`94-governance.md` section 8):

- [ ] Recount used slots. Update section 3.2.
- [ ] Recount per-tier capacity. Update section 6.2.
- [ ] Audit reserved slots; release any that are no longer planned. Update section 3.3.
- [ ] Check for any decimal, suffix, or three-digit numbering that has crept in. Treat as drift.
- [ ] Verify no stub redirect files have outlived their 90-day window.

## 10. Acceptance

This document is acceptable when:

- The tier table (section 3.1) covers every existing doc.
- The reserved-slot table (section 3.3) has at least one planned trigger per reservation.
- The insertion rules (section 4) are unambiguous for any common scenario.
- The renumbering policy (section 5.2) forbids cosmetic renames and permits only categorization-driven renames.
- Capacity is tracked per tier (section 6.2) and end-of-life is anticipated (section 6.4).
- An LLM reading this doc cold can pick a correct number for a hypothetical new doc without further clarification.

## 11. References

- [[00-index|design system master index]]
- [[90-file-naming|file naming conventions]]
- [[94-governance|governance and change management]]
- [[95-quick-reference|one-page quick reference]]
