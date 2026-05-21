---
domain: green-lappe-properties
category: launch
sub-category: website-deployment-rollback
date-created: 2026-05-21
date-revised: 2026-05-21
doc-type: runbook
version: 0.1
doc-status: draft
aliases: []
tags: [deployment, rollback, hosting, website, launch, runbook]
---

# Website Deployment and Rollback Runbook

Purpose: define the deployment, preview, staging, production-protection, and rollback operating path for the website once the repo/stack and hosting provider are selected. This runbook does not publish public production content.

## Preconditions

| Requirement | Evidence |
|---|---|
| Repo location chosen | Repo decision record |
| Tech stack chosen | Stack decision record |
| Hosting provider chosen | Provider setup record |
| DNS/staging/access plan ready | DNS, staging, and access runbook |
| Public apex/root boundary recorded | Parked, protected, or unpublished |
| Secrets storage chosen | Provider secret manager or approved password manager |

## Hosting decision record

| Field | Value |
|---|---|
| Website repo location | TBD |
| Stack | TBD |
| Hosting provider | TBD |
| DNS provider | TBD |
| Preview protection method | TBD |
| Staging protection method | TBD |
| Production deploy source | `main` or release branch only |
| Production status before public launch | Disabled, parked, protected, or unpublished |
| Rollback method | TBD |

## CI and build checklist

| Step | Expected result | Evidence |
|---|---|---|
| Lockfile committed | Dependency install is reproducible | Repo file |
| Install command documented | CI and host use the same install command | Provider setting pointer |
| Build command documented | CI and host use the same build command | Provider setting pointer |
| Lint/type/test command documented | Local and CI verification match | Repo/CI note |
| Environment variables documented | Names and purpose recorded, no secret values in Git | Environment inventory |
| Secrets configured outside Git | Host/provider secret manager contains values | Provider screenshot pointer |
| CI passes on PR | Required check passes before merge | PR check evidence |

## Preview workflow

| Step | Expected result |
|---|---|
| Open pull request | Preview deployment is created automatically. |
| Verify protection | Preview requires approved login/password/access policy. |
| Run smoke review | Links, layout, noindex, and placeholder content are checked. |
| Merge only after review | `main` receives only reviewed changes. |

## Staging workflow

| Step | Expected result |
|---|---|
| Deploy from intended branch | Staging updates only from the selected branch. |
| Verify custom domain | `staging.<domain>` resolves and has valid SSL. |
| Verify access policy | Authorized users can access; unauthorized users are blocked. |
| Verify noindex | Non-production crawler controls are present. |
| Verify safe integrations | Forms and integrations use sandbox/internal destinations only. |

## Production protection

Before public launch approval, production must be one of:

| Mode | Description |
|---|---|
| Disabled | No production deployment is connected. |
| Parked | Domain shows registrar/DNS parking only, without service claims. |
| Protected | Access control blocks public visitors. |
| Unpublished | DNS does not route apex/root to a website host. |

Do not serve public sales or property-management service language until licensing, counsel, content, privacy, analytics, and launch approvals are complete.

## Rollback checklist

| Step | Expected result | Evidence |
|---|---|---|
| Identify last good deploy | Deployment ID, commit SHA, and timestamp known | Provider screenshot pointer |
| Roll back staging once | Staging rollback tested before public launch | Test note |
| Record rollback owner | Person responsible for rollback named | Ops note |
| Record rollback time | Expected rollback duration noted | Ops note |
| Verify post-rollback | Site responds, SSL works, access still enforced | Smoke test note |

## Incident stop conditions

- Public production becomes reachable before approval.
- Access protection is removed from staging or previews.
- A deploy contains real owner/resident personal data.
- Forms submit to production systems before approval.
- Secrets or credentials appear in logs, Git, screenshots, or public pages.
- Rollback fails or cannot identify a last good deployment.
