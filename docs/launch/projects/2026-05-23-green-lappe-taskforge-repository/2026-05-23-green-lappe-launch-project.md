---
domain: green-lappe-properties
category: launch
sub-category: project-definition
date-created: 2026-05-23
date-revised: 2026-05-23
doc-type: taskforge-project
version: 0.1
doc-status: draft
aliases: [Green Lappe Launch Project]
tags: [launch, taskforge, project, epics, features]
---

# Green Lappe Launch Project

Launch target: 2026-06-15.

This file defines the project hierarchy that the task file uses. It is a draft
for critique. The target date is a conditional launch-readiness target, not a
public launch approval.

## Project

| Field | Value |
|---|---|
| Project | Green Lappe Launch |
| Project ID | GLP-LAUNCH |
| Target date | 2026-06-15 |
| Current status | Draft plan, externally blocked |
| Planning source | [`../../plans/2026-05-20-business-launch-project-plan.md`](../../plans/2026-05-20-business-launch-project-plan.md) |
| Gate source | [`../../legal/2026-05-20-launch-readiness-gates.md`](../../legal/2026-05-20-launch-readiness-gates.md) |
| Discovery source | [`../../discovery/2026-05-20-owner-discovery-guide.md`](../../discovery/2026-05-20-owner-discovery-guide.md) |

## Epics

| Epic ID | Epic | Priority | Purpose |
|---|---|---|---|
| GLP-E01 | Governance and evidence control | P0 | Assign owners and keep sensitive evidence out of Git. |
| GLP-E02 | Legal and licensing gates | P0 | Resolve designated broker, entity, trust-accounting, insurance, contract, and role-boundary gates. |
| GLP-E03 | Owner discovery proof sprint | P0 | Run 20 approved owner conversations and convert findings into launch decisions. |
| GLP-E04 | First-cohort operations | P1 | Prepare onboarding, maintenance, vendor, and acceptance rules for 2-5 SFRs. |
| GLP-E05 | Systems proof | P1 | Build one owner-visible proof artifact from discovery evidence. |
| GLP-E06 | Website and public boundary | P1 | Prepare domain, staging, copy, QA, and release/hold decisions without crossing legal gates. |
| GLP-E07 | Task operations process | P1 | Define how this task repository is maintained after the draft is critiqued. |

## Features

| Feature ID | Epic | Feature | Priority | Depends on |
|---|---|---|---|---|
| GLP-F01 | GLP-E01 | Workstream owner map | P0 | none |
| GLP-F02 | GLP-E01 | Non-repo evidence storage | P0 | GLP-F01 |
| GLP-F03 | GLP-E02 | Designated broker path | P0 | GLP-F01 |
| GLP-F04 | GLP-E02 | Entity and firm licensing sequence | P0 | GLP-F03 |
| GLP-F05 | GLP-E02 | Counsel-approved outreach language | P0 | GLP-F03 |
| GLP-F06 | GLP-E02 | Trust accounting and insurance plan | P0 | GLP-F04 |
| GLP-F07 | GLP-E02 | Kevin role boundary | P0 | GLP-F01 |
| GLP-F08 | GLP-E03 | Warm-owner list | P0 | GLP-F01 |
| GLP-F09 | GLP-E03 | 20 owner conversations | P0 | GLP-F05, GLP-F08 |
| GLP-F10 | GLP-E03 | Prospect scoring and pricing signal | P0 | GLP-F09 |
| GLP-F11 | GLP-E04 | First-cohort acceptance rules | P1 | GLP-F06, GLP-F10 |
| GLP-F12 | GLP-E04 | Maintenance SLA and approval thresholds | P1 | GLP-F06, GLP-F10 |
| GLP-F13 | GLP-E04 | Vendor escalation tree | P1 | GLP-F06 |
| GLP-F14 | GLP-E05 | Owner-visible systems proof | P1 | GLP-F10 |
| GLP-F15 | GLP-E06 | Public copy boundary | P0 | GLP-F05 |
| GLP-F16 | GLP-E06 | Domain, DNS, staging, and QA | P1 | GLP-F15 |
| GLP-F17 | GLP-E07 | Task repository operating process | P1 | none |

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

## Status definitions

| Status | Meaning |
|---|---|
| `- [ ]` | Open and actionable. |
| `- [/]` | In progress. |
| `- [!]` | Blocked or on hold. |
| `- [>]` | Planned but not yet actionable. |
| `- [x]` | Done with evidence or linked decision. |
| `- [-]` | Canceled or superseded. |

## Priority definitions

| Priority | Marker | Meaning |
|---|---|---|
| P0 | 🔺 | Blocks the launch/hold decision. |
| P1 | ⏫ | Needed for a credible launch-readiness package. |
| P2 | 🔼 | Useful after launch path is clear. |
| P3 | 🔽 | Nice-to-have or post-launch improvement. |
