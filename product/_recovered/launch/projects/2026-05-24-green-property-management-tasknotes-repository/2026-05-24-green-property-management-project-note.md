---
domain: green-property-management
category: launch
sub-category: project-note
date-created: 2026-05-23
date-revised: 2026-05-24
doc-type: tasknotes-project-note
version: 0.2
doc-status: draft
aliases: [Green Property Management Delivery Project, Green Property Management Project Note]
tags: [launch, tasknotes, tasks-plugin, project, epics, features, status/blocked]
---

# Green Property Management Delivery Project

Launch target: 2026-06-15.

This is the project note for tracking Green Property Management delivery work
inside the repo and in Obsidian. It uses TaskNotes task notes as the durable
task records and the Tasks plugin for live views. The target date is a
conditional launch-readiness target, not a public launch approval.

## Project

| Field | Value |
|---|---|
| Project | Green Property Management Delivery |
| Project ID | GPM-DELIVERY |
| Target date | 2026-06-15 |
| Current status tag | `#status/blocked` |
| Current status | Externally blocked until legal, licensing, owner-discovery, account-owner, vendor, and market inputs arrive. |
| Planning source | [`../../plans/2026-05-20-business-launch-project-plan.md`](../../plans/2026-05-20-business-launch-project-plan.md) |
| Gate source | [`../../legal/2026-05-20-launch-readiness-gates.md`](../../legal/2026-05-20-launch-readiness-gates.md) |
| Discovery source | [`../../discovery/2026-05-20-owner-discovery-guide.md`](../../discovery/2026-05-20-owner-discovery-guide.md) |

## Delivery Hierarchy

| Epic ID | Epic | Priority | Purpose |
|---|---|---|---|
| GPM-E01 | Governance and evidence control | P0 | Assign owners and keep sensitive evidence out of Git. |
| GPM-E02 | Legal and licensing gates | P0 | Resolve designated broker, entity, trust-accounting, insurance, contract, and role-boundary gates. |
| GPM-E03 | Owner discovery proof sprint | P0 | Run 20 approved owner conversations and convert findings into launch decisions. |
| GPM-E04 | First-cohort operations | P1 | Prepare onboarding, maintenance, vendor, and acceptance rules for 2-5 SFRs. |
| GPM-E05 | Systems proof | P1 | Build one owner-visible proof artifact from discovery evidence. |
| GPM-E06 | Website and public boundary | P1 | Prepare domain, staging, copy, QA, and release/hold decisions without crossing legal gates. |
| GPM-E07 | Task operations process | P1 | Define how this task repository is maintained after the draft is critiqued. |

## Features

| Feature ID | Epic | Feature | Priority | Depends on |
|---|---|---|---|---|
| GPM-F01 | GPM-E01 | Workstream owner map | P0 | none |
| GPM-F02 | GPM-E01 | Non-repo evidence storage | P0 | GPM-F01 |
| GPM-F03 | GPM-E02 | Designated broker path | P0 | GPM-F01 |
| GPM-F04 | GPM-E02 | Entity and firm licensing sequence | P0 | GPM-F03 |
| GPM-F05 | GPM-E02 | Counsel-approved outreach language | P0 | GPM-F03 |
| GPM-F06 | GPM-E02 | Trust accounting and insurance plan | P0 | GPM-F04 |
| GPM-F07 | GPM-E02 | Kevin role boundary | P0 | GPM-F01 |
| GPM-F08 | GPM-E03 | Warm-owner list | P0 | GPM-F01 |
| GPM-F09 | GPM-E03 | 20 owner conversations | P0 | GPM-F05, GPM-F08 |
| GPM-F10 | GPM-E03 | Prospect scoring and pricing signal | P0 | GPM-F09 |
| GPM-F11 | GPM-E04 | First-cohort acceptance rules | P1 | GPM-F06, GPM-F10 |
| GPM-F12 | GPM-E04 | Maintenance SLA and approval thresholds | P1 | GPM-F06, GPM-F10 |
| GPM-F13 | GPM-E04 | Vendor escalation tree | P1 | GPM-F06 |
| GPM-F14 | GPM-E05 | Owner-visible systems proof | P1 | GPM-F10 |
| GPM-F15 | GPM-E06 | Public copy boundary | P0 | GPM-F05 |
| GPM-F16 | GPM-E06 | Domain, DNS, staging, and QA | P1 | GPM-F15 |
| GPM-F17 | GPM-E07 | Task repository operating process | P1 | none |

## Task Notes

These are the current durable TaskNotes notes for delivery tracking. They are
organized around delivery, not around internal document categories.

| Task note | Feature | Status tag |
|---|---|---|
| [`tasks/2026-05-24-gpm-t001-define-delivery-owners.md`](tasks/2026-05-24-gpm-t001-define-delivery-owners.md) | GPM-F01 | `#status/open` |
| [`tasks/2026-05-24-gpm-t010-create-evidence-storage-boundary.md`](tasks/2026-05-24-gpm-t010-create-evidence-storage-boundary.md) | GPM-F02 | `#status/open` |
| [`tasks/2026-05-24-gpm-t100-confirm-designated-broker-path.md`](tasks/2026-05-24-gpm-t100-confirm-designated-broker-path.md) | GPM-F03 | `#status/blocked` |
| [`tasks/2026-05-24-gpm-t130-confirm-discovery-language.md`](tasks/2026-05-24-gpm-t130-confirm-discovery-language.md) | GPM-F05 | `#status/blocked` |
| [`tasks/2026-05-24-gpm-t200-build-warm-owner-list.md`](tasks/2026-05-24-gpm-t200-build-warm-owner-list.md) | GPM-F08 | `#status/open` |
| [`tasks/2026-05-24-gpm-t210-run-owner-discovery-sprint.md`](tasks/2026-05-24-gpm-t210-run-owner-discovery-sprint.md) | GPM-F09 | `#status/blocked` |
| [`tasks/2026-05-24-gpm-t250-decide-pricing-posture.md`](tasks/2026-05-24-gpm-t250-decide-pricing-posture.md) | GPM-F10 | `#status/planned` |
| [`tasks/2026-05-24-gpm-t410-choose-systems-proof.md`](tasks/2026-05-24-gpm-t410-choose-systems-proof.md) | GPM-F14 | `#status/planned` |
| [`tasks/2026-05-24-gpm-t500-confirm-public-copy-boundary.md`](tasks/2026-05-24-gpm-t500-confirm-public-copy-boundary.md) | GPM-F15 | `#status/blocked` |
| [`tasks/2026-05-24-gpm-t900-complete-launch-go-no-go.md`](tasks/2026-05-24-gpm-t900-complete-launch-go-no-go.md) | Final go/no-go | `#status/blocked` |

## Milestones

| Date | Milestone | Required evidence |
|---|---|---|
| 2026-05-24 | Governance assigned | Workstream owners named. |
| 2026-05-29 | Hard legal prework complete or explicitly blocked | DB path, outreach language, and Kevin role boundary known or blocked. |
| 2026-06-05 | First owner-discovery batch complete | 10 conversations or explicit shortfall. |
| 2026-06-09 | 20 owner conversations complete | Notes, scoring inputs, and pricing reactions. |
| 2026-06-10 | Discovery decisions drafted | Pricing posture, trust proof, and systems artifact direction. |
| 2026-06-12 | Launch go/no-go decided | Public launch, private readiness, or hold decision. |
| 2026-06-15 | Launch target | Execute only the approved launch/hold path. |

## Status Tag Definitions

| Status tag | Meaning |
|---|---|
| `#status/planned` | Known work that is not actionable yet. |
| `#status/open` | Actionable now. |
| `#status/active` | Actively being worked. |
| `#status/blocked` | Waiting on named external or upstream input. |
| `#status/review` | Work is ready for review, QA, or approval. |
| `#status/done` | Completed with linked evidence. |
| `#status/canceled` | Canceled or superseded with reason preserved. |

## Live Views

```tasks
not done
path includes 2026-05-24-green-property-management-tasknotes-repository
tag includes #status/blocked
sort by due
```

```tasks
not done
path includes 2026-05-24-green-property-management-tasknotes-repository
tag includes #status/open
sort by due
```

```tasks
not done
path includes 2026-05-24-green-property-management-tasknotes-repository/tasks
sort by priority
sort by due
```
