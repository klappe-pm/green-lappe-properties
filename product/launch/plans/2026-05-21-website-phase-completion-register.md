---
domain: green-property-management
category: launch
sub-category: website-phase-completion
date-created: 2026-05-21
date-revised: 2026-05-21
doc-type: phase-register
version: 0.1
doc-status: draft
aliases: []
tags: [website, domain, dns, staging, launch-plan, phase-register]
---

# Website Phase Completion Register

Purpose: record the completion state for the website domain/internal launch phases. This register distinguishes completed in-repository planning artifacts from external execution tasks that require account-owner action, purchased domains, credentials, counsel review, or public launch authority.

## Completion standard

| Status | Meaning |
|---|---|
| Complete in repo | The required plan/runbook/template exists and is linked. |
| External execution pending | The task requires account-owner action, credentials, purchased domains, sensitive records, or counsel/business approval. |
| Do not execute yet | Execution would publish public content, bypass legal/licensing gates, or commit sensitive information. |

## Phase register

| Phase | Task | Repo status | External execution status |
|---:|---|---|---|
| 1 | Confirm domain candidates and registrar pattern | Complete in repo: domain clearance and registrar snapshot notes exist. | Partner decision still required before checkout. |
| 1 | Re-check `greenlappe.com` and defensive domains in registrar cart | Complete in repo: purchase evidence runbook defines required cart evidence. | Account-owner logged-in cart check pending. |
| 1 | Run USPTO and web collision checks | Complete in repo: dated clearance note exists. | Counsel review still pending before public use. |
| 1 | Purchase selected domain(s) | Complete in repo: purchase and storage runbooks exist. | External execution pending; do not buy without partner approval/account owner. |
| 2 | Configure registrar security and renewal controls | Complete in repo: purchase evidence runbook defines controls. | External execution pending after purchase. |
| 2 | Configure DNS zone and staging hostname | Complete in repo: DNS/staging/access runbook exists. | External execution pending after domain purchase and DNS decision. |
| 2 | Configure email DNS only if email provider is selected | Complete in repo: DNS runbook identifies email DNS as conditional. | External execution pending email-provider decision. |
| 3 | Select hosting provider for internal testing | Complete in repo: website plan and deployment runbook define decision record. | External execution pending stack/repo/provider decision. |
| 3 | Connect Git repository and deploy protected staging | Complete in repo: deployment and DNS/access runbooks define process. | External execution pending provider account and domain. |
| 3 | Enable PR preview deployments and protection | Complete in repo: DNS/access and deployment runbooks define preview controls. | External execution pending provider setup. |
| 4 | Run DNS, SSL, access, CI, and rollback tests | Complete in repo: QA and deployment runbooks define tests. | External execution pending live staging. |
| 4 | Write runbook for domain/DNS/deploy operations | Complete in repo: purchase, storage, DNS/access, deployment/rollback, and QA runbooks exist. | Update after actual provider choices. |
| 5 | Decide whether to keep production parked, protected, or unpublished | Complete in repo: QA/release boundary runbook defines options. | External decision pending; default remains parked, protected, or unpublished. |

## Current in-repo runbook set

| Runbook | Covers |
|---|---|
| [`../runbooks/2026-05-21-launch-evidence-storage-runbook.md`](2026-05-21-launch-evidence-storage-runbook.md) | Sensitive evidence storage and safe pointers. |
| [`../runbooks/2026-05-21-domain-purchase-evidence-runbook.md`](2026-05-21-domain-purchase-evidence-runbook.md) | Approved domain purchase evidence, controls, and inventory. |
| [`../runbooks/2026-05-21-dns-staging-access-runbook.md`](2026-05-21-dns-staging-access-runbook.md) | DNS zone, staging domain, access controls, and preview protection. |
| [`../runbooks/2026-05-21-website-deployment-rollback-runbook.md`](2026-05-21-website-deployment-rollback-runbook.md) | Hosting, CI, preview workflow, staging workflow, production protection, and rollback. |
| [`../runbooks/2026-05-21-website-qa-release-boundary-runbook.md`](2026-05-21-website-qa-release-boundary-runbook.md) | Internal QA and public release boundary. |

## Remaining external work

1. Partner/account-owner approval for exact domain purchase and term.
2. Outside-repo evidence container selection and access setup.
3. Logged-in registrar cart check immediately before purchase.
4. Domain purchase by account owner.
5. Registrar security controls and domain inventory evidence.
6. Counsel review before public use of the name and service language.
7. DNS provider, hosting provider, repo location, and stack decisions.
8. Protected staging and preview setup after domain/provider access exists.
9. Public launch approval record before any public production content.

## Non-negotiable boundaries

- Do not buy domains without explicit partner approval and account-owner action.
- Do not commit sensitive evidence to Git.
- Do not publish public sales or property-management service language before licensing/counsel gates clear.
- Do not route public production content before staging, access control, QA, rollback, and public launch approval are complete.
