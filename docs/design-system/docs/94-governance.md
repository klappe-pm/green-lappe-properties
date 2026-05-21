---
domain: brand
category: design-system
sub-category: ownership-and-change-management
date-created: 2026-05-21
date-revised: 2026-05-21
status: locked
version: 3.0.0
depends-on:
  - 00-index
  - 90-file-naming
  - 91-accessibility
  - 92-dark-mode
  - 93-pairings-forbidden
produces:
  - governance-charter
  - change-proposal-template
  - versioning-policy
  - deprecation-policy
  - override-exception-log-schema
  - annual-review-checklist
executor: strategy
aliases:
tags:
  - governance
  - change-management
  - versioning
  - design-system
  - process
---

# 94-governance

Defines who owns the Green PM design system, how changes are proposed and approved, how versions are numbered, how things get deprecated, how exceptions are logged, and how the system is reviewed on a recurring cadence. Governance is the safety net that prevents drift between the locked v3 specification and shipped product.

## Dependencies

- [[00-index|design system master index]] for the doc contract and execution graph
- [[90-file-naming|file naming conventions]] for repository and artifact naming
- [[91-accessibility|accessibility requirements]] for governance-level compliance obligations
- [[92-dark-mode|dark mode policy]] for deferred-mode governance
- [[93-pairings-forbidden|approved pairings and forbidden patterns]] for drift detection

## Outputs

1. Governance charter
2. Change proposal template
3. Versioning policy
4. Deprecation policy
5. Override and exception log schema
6. Annual review checklist

## 1. Scope and intent

### 1.1 What this document governs

Every artifact produced by this design system:

- All `.md` spec files in `docs/`.
- All token files: `green-pm-tokens.css`, `modes.css`, `base.css`, `tailwind.config.js`.
- All Sanity schemas in the `studio/` workspace.
- All Astro components in `src/components/` that consume system tokens.
- All public-facing documents that carry the brand: statements, leases, proposals, notices, owner letters, email templates, print collateral, social posts.
- All marketing-site routes and layouts.

### 1.2 What this document does NOT govern

- Product roadmap. Lives in `product-thinking/` repo separately.
- Operational policies (move-in checklists, vendor onboarding, repair triage). Lives in `operations/` repo.
- Legal documents (the lease form itself, addenda, disclosures). Owned by legal counsel; this design system governs presentation, not contract terms.
- Pricing, fee structure, market positioning. Owned by Megan as broker; positioning doc (`01-positioning.md`) reflects business decisions, it does not make them.

### 1.3 Governance principles

1. **Locked by default**. Once a spec is marked `status: locked` in its frontmatter, it cannot be changed without a change proposal. Default for all foundation-tier docs.
2. **Single owner per artifact**. Every file has exactly one human owner who approves changes. Listed below.
3. **Reversibility preferred**. Changes that can be rolled back in under 30 minutes are preferred over changes that cannot. Token changes are reversible; database migrations are not.
4. **Public over private**. Exception logs, deprecation notices, and change proposals are visible to all stakeholders, not buried in private channels.
5. **Cadence over urgency**. Annual reviews catch drift that incremental changes miss. Urgency is suspect; almost nothing is actually urgent.

## 2. Ownership model

### 2.1 Roles

| Role | Responsibility | Veto power |
|------|----------------|------------|
| Broker | Final approval on positioning, voice, brand identity, naming, pricing display, legal-adjacent documents (leases, notices). | Yes, on her domain. |
| System owner | Maintains tokens, components, documentation, technical architecture. Drives the proposal process. | Yes, on technical implementation. |
| Operator | Day-to-day use of templates, statements, owner letters. Surfaces friction. | No; advisory. |
| Counsel | Reviews lease form, notices, disclosures for legal sufficiency. | Yes, on legal content. |
| Vendors (designer, developer, photographer) | Execute against the spec. | No; raise issues via proposal. |

For Green PM at launch (1-20 doors), Megan holds Broker and Operator roles. Kevin holds System Owner role. Counsel is engaged ad hoc.

### 2.2 Per-document ownership

| Document range | Owner | Approval also requires |
|----------------|-------|------------------------|
| `00-index.md` | System owner | Broker |
| `01-positioning.md` to `04-microcopy.md` | Broker | System owner consult |
| `10-color-system.md` to `30-design-tokens.md` | System owner | Broker for brand colors only |
| `40-spacing-layout.md` to `54-empty-loading-error.md` | System owner | None |
| `60-iconography.md` to `62-illustration.md` | System owner | Broker for photography subjects |
| `70-data-display.md` to `71-status-indicators.md` | System owner | None |
| `72-document-templates.md` | System owner | Broker AND Counsel for lease/notice |
| `73-email-notifications.md` to `75-social-media.md` | System owner | Broker for voice |
| `80-system-architecture.md` to `85-sanity-schemas.md` | System owner | None |
| `90-file-naming.md` to `96-numbering-convention.md` | System owner | None |

### 2.3 Owner transition

If an owner role changes hands (new system owner, new broker, agency engagement), the outgoing owner produces a handoff document covering open proposals, exception log status, pending deprecations, and known issues. Handoff doc lives at `docs/passoffs/yyyy-mm-dd-handoff-{role}.md`.

## 3. Change proposal process

### 3.1 When a proposal is required

A proposal is required for any change to:

- A `status: locked` document.
- Any value in `green-pm-tokens.css` (colors, type, spacing, radius, shadow, motion).
- The wordmark, logo, or signature pattern.
- The font stack.
- The audience-mode taxonomy.
- The voice principles or banned phrase lists.
- Document templates (statement, lease, proposal, notice, owner letter).
- The system architecture stack (Astro, Tailwind, Sanity, Rentvine, HubSpot, Postmark, Clerk, Neon).
- The PMS choice (Rentvine to AppFolio migration is itself a proposal).

A proposal is NOT required for:

- Adding a new blog post, listing, FAQ entry, or page via Sanity (content, not system).
- Adding a new icon from the approved Lucide set.
- Adding a new neighborhood entry.
- Fixing a typo in body copy.
- Routine dependency updates (security patches, minor version bumps).
- Adding a new email template that uses only approved components and tokens.

### 3.2 Proposal template

Every proposal is a single Markdown file at `docs/proposals/yyyy-mm-dd-{kebab-slug}.md` with this frontmatter and structure:

```yaml
---
domain: design-system
category: proposal
sub-category: {component|token|template|architecture|brand}
date-created:
date-revised:
proposer:
status: draft
target-doc:
target-section:
aliases:
tags:
  - proposal
---
```

Body sections, in order:

1. **Summary**. One paragraph. What changes, in plain language.
2. **Motivation**. Why now. Cite specific evidence: user feedback, broken flow, brand drift, technical debt, business need. No "I think it would look nicer."
3. **Specification**. The full new spec. Diff format preferred for token changes; full replacement for prose changes.
4. **Impact analysis**. Which docs change. Which components rebuild. Which shipped artifacts (live site, sent emails, printed collateral) become out of date. Estimate in hours.
5. **Rollback plan**. Exact steps to revert. Must be possible in under 30 minutes for any token or copy change.
6. **Alternatives considered**. Minimum two. State why each was rejected.
7. **Open questions**. Anything the proposer cannot answer alone.

### 3.3 Proposal lifecycle

```
draft -> review -> approved -> shipped -> closed
                \-> rejected -> closed
                \-> withdrawn -> closed
```

State transitions:

- **draft to review**: Proposer marks ready. System owner schedules review.
- **review to approved**: Required approvers sign off in the proposal doc (append name and date under "Approvals" section).
- **review to rejected**: Reviewer documents reason in the proposal. Rejected proposals stay in the repo; they are historical record.
- **approved to shipped**: Proposer implements. PR linked from proposal doc.
- **shipped to closed**: Two weeks after ship date with no reported issues. Closing requires updating the target spec doc with new content and bumping the spec version.

### 3.4 Review cadence

- Standing review window: first Monday of each month.
- Urgent proposals (security, broken legal compliance, blocking customer issue): same-day async review by required approvers.
- "Urgent because the broker wants it Friday" is not urgent. Goes to next standing review.

### 3.5 Required approvers by proposal type

| Proposal type | Required approvers |
|---------------|--------------------|
| Color primitive change | Broker + System owner |
| Type stack change | Broker + System owner |
| Voice principle change | Broker |
| Wordmark or signature change | Broker |
| Pricing display change | Broker |
| Lease or notice template change | Broker + Counsel |
| Component grammar change | System owner |
| Token (non-color) change | System owner |
| Architecture or stack change | System owner |
| PMS migration | Broker + System owner |
| Audience mode add or remove | Broker + System owner |
| Forbidden pattern add or remove | System owner; Broker for brand pairings |

## 4. Versioning policy

### 4.1 Versioning scheme

The design system uses semantic versioning adapted for design specs: `MAJOR.MINOR.PATCH`.

- **MAJOR**: Breaking change. A token primitive is renamed, removed, or has its meaning changed. A typography family is replaced. A core component grammar shifts (button heights change, signature pattern is redefined). Requires every consuming artifact to be reviewed and likely updated.
- **MINOR**: Additive or backward-compatible change. New token added. New component variant. New audience mode. New document template. Existing artifacts continue to work without modification.
- **PATCH**: Documentation clarification, typo fix, expanded examples, internal restructure with no spec change.

### 4.2 Version anchor points

| Version | Anchor |
|---------|--------|
| 1.0.0 | First locked production spec. Not yet reached. |
| 2.x.x | The v2 monolith style guide (the 4,219-line uploaded document). Now superseded. |
| 3.0.0 | This v3 modular refactor, locked at launch. Target version. |

### 4.3 Per-document versions

Each doc carries a version in its frontmatter:

```yaml
version: 3.0.0
```

When a doc changes:

- Patch-level edit (typo, clarification): increment doc patch, do not increment system version.
- Minor-level edit (new section, new variant): increment doc minor AND system minor.
- Major edit: increment doc major AND system major. Requires migration doc.

### 4.4 Token file versions

`green-pm-tokens.css` carries a top-of-file version comment:

```css
/* Green PM design tokens
 * Version: 3.0.0
 * Date: 2026-05-21
 * Owner: System owner
 */
```

Token version changes follow the same MAJOR/MINOR/PATCH rules. A renamed token is MAJOR. An added token is MINOR. A value tweak that does not change meaning (Cedar #2D6A4F to #2D6B4F for print accuracy) is PATCH but still requires a proposal.

### 4.5 Migration documents

A MAJOR version bump produces a numbered migration doc at `docs/migrations/vN-to-vN+1.md`. Template mirrors `23-typography-migration.md`: rationale, breaking changes table, find-and-replace operations, regression checklist, rollback plan.

## 5. Deprecation policy

### 5.1 What deprecation means

A deprecated artifact is one that still exists but should no longer be used. New work does not use it. Existing work has a migration plan. Removal happens later, on a scheduled date.

### 5.2 Deprecation lifecycle

```
active -> deprecated -> sunset -> removed
```

- **deprecated**: Still works. Marked in code and docs with deprecation notice. New usage forbidden.
- **sunset**: Final removal date announced. All consumers notified.
- **removed**: Gone. References produce build errors.

### 5.3 Minimum timelines

| Artifact type | Deprecated to sunset | Sunset to removed |
|---------------|----------------------|-------------------|
| Token | 30 days | 60 days |
| Component variant | 60 days | 90 days |
| Document template | 90 days | 180 days |
| Audience mode | 90 days | 180 days |
| Font family | 180 days | 365 days |
| PMS or major architecture | Per migration plan | Per migration plan |

### 5.4 Deprecation marking

In CSS:

```css
/* DEPRECATED in v3.2.0. Sunset 2026-08-01. Removed 2026-10-01.
 * Use --color-cedar-600 instead.
 */
--color-cedar-legacy: #2D6A4F;
```

In Markdown specs, add a callout at the top of the deprecated section:

```markdown
> **Deprecated in v3.2.0.** Sunset 2026-08-01. Removed 2026-10-01.
> Replacement: see [[21-typography-tokens|typography tokens]] section 3.4.
```

In TypeScript or JavaScript:

```typescript
/** @deprecated Use buttonPrimaryV2. Sunset 2026-08-01. */
export const buttonPrimary = ...;
```

### 5.5 Sunset communication

The system owner posts a sunset notice to `docs/deprecations.md`, a running log. Each entry includes artifact name, deprecation date, sunset date, removal date, replacement, and migration link.

## 6. Override and exception log

### 6.1 When an override is allowed

Designs sometimes need to break the system, briefly. Examples:

- A landing page for a one-off marketing campaign that uses a non-system layout.
- A legal disclosure that requires specific typography per state law.
- A vendor-supplied embed (Rentvine portal, HubSpot form) that cannot be fully themed.
- A print job at a vendor that cannot match Cedar exactly in CMYK.

Overrides are allowed if logged. Silent overrides are violations.

### 6.2 What an override is NOT

- "I don't like the Clay button color on this page." Not an override; use the system. If the system is wrong, file a proposal.
- "The designer mocked it with Inter." Not an override; reject the mock.
- "We've been doing it this way." Not an override; correct the drift.

### 6.3 Exception log location

`docs/exceptions.md`, single running log. Newest at top.

### 6.4 Exception log entry schema

Every entry is a top-level section with this structure:

```markdown
## 2026-05-21: rentvine-portal-typography

**Owner:** System owner
**Component or surface:** Rentvine resident portal (renter-product mode)
**Spec violated:** 22-typography-usage, section 4.1 (all body copy uses Newsreader)
**Actual implementation:** Rentvine portal uses Rentvine default font stack (Helvetica/Arial fallback)
**Reason:** Rentvine SaaS does not expose font configuration in our plan tier.
**Mitigation:** Portal lives at portal.greenpmpnw.com (subdomain). Marketing site retains Newsreader. Brand consistency maintained via Cedar accent color, wordmark in header.
**Resolution path:** Migration to AppFolio at 50+ doors will reassess. AppFolio offers richer theming. Re-evaluate then.
**Sunset trigger:** AppFolio migration OR Rentvine plan upgrade.
**Review date:** 2026-11-21 (6-month check).
```

### 6.5 Exception review

Every exception older than 6 months is reviewed at the annual review. Exceptions that have outlived their reason are closed (resolved). Exceptions that have hardened into the new normal are either resolved by changing the spec to match reality, or escalated for active resolution.

## 7. Drift detection

### 7.1 What drift is

Drift is the gap between what the spec says and what is actually shipped. Drift compounds. Caught early, drift is a typo. Caught late, drift is a brand identity crisis.

### 7.2 Drift sources

1. Designers and developers working from memory instead of from the spec.
2. Vendors who never read the spec.
3. Specs that became out of date because shipped reality moved.
4. Hardcoded values in components that bypass tokens.
5. Copy-paste from older templates that predate v3.
6. "Quick fixes" that bypass the proposal process.

### 7.3 Detection mechanisms

| Mechanism | Cadence | Owner |
|-----------|---------|-------|
| Token usage audit (grep for hex values in `src/`) | Monthly | System owner |
| Font audit (computed font-family on every page) | Monthly | System owner |
| Voice audit (sample 5 shipped documents, compare to `03-voice.md`) | Quarterly | Broker |
| Visual regression (Chromatic or Percy snapshots) | Per PR | Automated |
| Accessibility audit (axe-core) | Quarterly | System owner |
| Content audit (Sanity content vs. voice spec) | Quarterly | Broker |
| Full annual review | Annual | All owners |

### 7.4 Token audit specifics

A passing token audit means:

- Zero hex color values in `src/components/` outside of `green-pm-tokens.css`.
- Zero rem or px values in `src/components/` outside of approved exceptions (1px borders, 100% widths, etc.).
- Zero font-family declarations outside of `base.css`.
- Zero `!important` declarations outside of `modes.css` and accessibility overrides.

The audit script lives at `scripts/audit-tokens.sh`. Runs in CI on every PR. Failing audit blocks merge.

## 8. Annual review cycle

### 8.1 Purpose

Once a year, every owner reviews the system end to end. Catches drift, retires deprecations, evaluates whether locked decisions still hold, refreshes anti-positioning against the current competitive landscape.

### 8.2 Schedule

Every January. Two-week window. Output is an annual review document at `docs/annual-reviews/yyyy-annual-review.md`.

### 8.3 Annual review checklist

The system owner runs through this checklist and produces the review document.

#### 8.3.1 Brand foundation

- [ ] Re-read `01-positioning.md`. Does the positioning still match the business reality? Have competitors shifted such that anti-positioning needs adjustment?
- [ ] Re-read `02-brand-identity.md`. Name forms still correct? Megan still designated broker? Wordmark in active use?
- [ ] Re-read `03-voice.md`. Sample 10 shipped artifacts. Score each against the 5 voice principles.
- [ ] Re-read `04-microcopy.md`. Surface any CTAs or microcopy that have crept in outside the bank.

#### 8.3.2 Tokens

- [ ] Run token audit script. Resolve all violations or log exceptions.
- [ ] Check `green-pm-tokens.css` for unused tokens. Deprecate any that have not been referenced in 12 months.
- [ ] Verify contrast matrix in `10-color-system.md` still passes WCAG AA against current implementation.

#### 8.3.3 Typography

- [ ] Verify Geist, Newsreader, Fraunces still hosted, still free, still recommended.
- [ ] Check that no JetBrains Mono references have re-entered the codebase or specs.
- [ ] Verify Fraunces italic is used in exactly the 3 documented places, no more.

#### 8.3.4 Components

- [ ] Visual regression diff against last annual baseline.
- [ ] Manually inspect every component variant in Storybook (or equivalent).
- [ ] Confirm component state matrix in `53-component-states.md` matches shipped reality.

#### 8.3.5 Templates and documents

- [ ] Generate a sample of each template (statement, proposal, lease, notice, owner letter). Compare against spec.
- [ ] Verify Counsel has reviewed lease and notice templates within the last 12 months. If not, schedule review.

#### 8.3.6 Architecture and integrations

- [ ] Confirm stack still locked: Astro, Tailwind, Sanity, Rentvine, HubSpot, Postmark, Clerk, Neon.
- [ ] Check Rentvine vs. AppFolio decision point. Are we approaching 50 doors? Time to start migration planning?
- [ ] Review performance budgets in `80-system-architecture.md`. Still met? If not, file proposals.

#### 8.3.7 Accessibility

- [ ] Run axe audit across all critical paths.
- [ ] Confirm accessibility statement is current and published.

#### 8.3.8 Exception log

- [ ] Review every entry in `docs/exceptions.md`. Resolve, escalate, or extend.

#### 8.3.9 Deprecations

- [ ] Review every entry in `docs/deprecations.md`. Anything past its removal date that has not been removed? Remove it.

#### 8.3.10 Forbidden patterns

- [ ] Re-read `93-pairings-forbidden.md`. Has anything on the forbidden list re-entered the system? If yes, file a proposal to either remove it (treat as drift) or unforbid it (treat as policy change).

### 8.4 Annual review document template

```markdown
---
domain: design-system
category: annual-review
date-created:
date-revised:
year:
reviewer:
status: in-progress
aliases:
tags:
  - annual-review
---

# yyyy-annual-review

## Summary
One paragraph. State of the system. Major changes since last review. Top risks.

## Brand foundation findings
## Token findings
## Typography findings
## Component findings
## Template findings
## Architecture findings
## Accessibility findings
## Exception log status
## Deprecation status
## Forbidden patterns status

## Proposals generated
List of proposals filed as a result of this review, linked.

## Sign-offs
- Broker:
- System owner:
- Counsel (if reviewed):
```

## 9. Conflict resolution

### 9.1 Spec conflicts with itself

If two specs disagree (e.g., `21-typography-tokens.md` says body is 17px but `22-typography-usage.md` says 16px), the authoritative resolution order is:

1. `30-design-tokens.md` (token source of truth).
2. `green-pm-tokens.css` (computed token values).
3. Foundation tier (`00`-`04`) for brand and voice.
4. System primitives tier (`10`-`30`).
5. Component and surface tiers.

If the conflict persists after consulting the hierarchy, the system owner resolves and updates both docs to match.

### 9.2 Spec conflicts with shipped reality

Shipped reality does not override the spec. If the site says one thing and the spec says another, the spec wins until the spec is changed. Fix the site or file a proposal to change the spec.

Exception: legal or accessibility requirements that postdate the spec. Those win automatically and a proposal is filed retroactively.

### 9.3 Owner conflicts

If Broker and System owner disagree on a proposal:

1. Both write their position in the proposal doc.
2. 7-day cooling period.
3. If still unresolved, Broker has final authority on brand domain (positioning, voice, identity, pricing, legal documents). System owner has final authority on technical implementation (architecture, tokens, components, performance).
4. Where domains overlap, the proposal is rejected by default. Better to ship nothing than ship a contested change.

## 10. Tooling

### 10.1 Required tooling

| Tool | Purpose | Owner |
|------|---------|-------|
| Git + GitHub | Source of truth, change history | System owner |
| Obsidian | Spec authoring and navigation | All |
| VS Code or equivalent | Code editing | System owner |
| axe DevTools | Accessibility auditing | System owner |
| Lighthouse CI | Performance monitoring | System owner |
| Chromatic or Percy | Visual regression | System owner |
| Postmark logs | Email delivery monitoring | System owner |
| Sanity Studio | Content editing | Broker, Operator |

### 10.2 Optional tooling

- Figma for design exploration. Mocks must be tagged with spec doc references; mocks that bypass the spec are returned for revision.
- Notion for high-level project tracking if Obsidian feels too engineering-flavored.

### 10.3 Forbidden tooling

- No new CMS unless via proposal (Sanity is locked).
- No new component framework unless via proposal (Astro + Tailwind is locked).
- No new font hosting unless via proposal (Google Fonts via self-host is locked).
- No design-to-code generators that bypass tokens (Anima, Locofy, etc.).

## 11. Communication norms

### 11.1 Where decisions live

- Proposals: `docs/proposals/`.
- Exceptions: `docs/exceptions.md`.
- Deprecations: `docs/deprecations.md`.
- Annual reviews: `docs/annual-reviews/`.
- Handoffs: `docs/passoffs/`.
- Daily questions, clarifications: Slack or equivalent, but any decision must be transcribed into the appropriate `docs/` location within 48 hours. Slack is not the record.

### 11.2 What does NOT live in Slack as a decision

- Token changes.
- Voice or copy changes.
- Component behavior changes.
- Anything that affects shipped artifacts.

These exist as proposals. Slack discussion is a starting point, not an ending point.

### 11.3 Announcing changes

When a proposal ships:

1. Update the target spec doc.
2. Bump version.
3. Post a one-line entry to `docs/changelog.md`.
4. If user-facing, post to the operator (Megan) with what changed and where to look.

## 12. Acceptance

This document is acceptable when:

- Every role has a single named owner.
- Every governed artifact has a named owner mapped in section 2.2.
- The proposal template renders cleanly when copied into a new file.
- Versioning rules are unambiguous for any common change (a developer can determine MAJOR vs MINOR vs PATCH without asking).
- Deprecation timelines are stated, not implied.
- The exception log schema is complete enough that an LLM could fill it out from a brief description.
- The annual review checklist is comprehensive enough to run without additional guidance.
- Conflict resolution paths exist for spec-spec, spec-reality, and owner-owner disputes.

## 13. References

- [[00-index|design system master index]]
- [[90-file-naming|file naming conventions]]
- [[91-accessibility|accessibility requirements]]
- [[92-dark-mode|dark mode policy]]
- [[93-pairings-forbidden|approved pairings and forbidden patterns]]
- [[95-quick-reference|one-page quick reference]]
- [[96-numbering-convention|numbering convention]]
