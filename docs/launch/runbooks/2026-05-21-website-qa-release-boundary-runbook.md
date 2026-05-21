---
domain: green-lappe-properties
category: launch
sub-category: website-qa-release-boundary
date-created: 2026-05-21
date-revised: 2026-05-21
doc-type: runbook
version: 0.1
doc-status: draft
aliases: []
tags: [qa, release, launch, website, runbook]
---

# Website QA and Release Boundary Runbook

Purpose: define technical QA and the boundary between internal website testing and public launch. This runbook supports internal staging and previews only; it does not approve public launch.

## Internal QA checklist

| Area | Check | Evidence |
|---|---|---|
| Access | Unauthorized visitors are blocked from staging and previews | Test note |
| SSL | Staging certificate is valid and matches hostname | Browser/curl evidence |
| DNS | Staging resolves to intended provider | `dig` output pointer |
| Noindex | Staging and preview pages send `noindex` or equivalent | Header/meta evidence |
| Content | No public sales or property-management service claims appear | Review note |
| Links | Internal links do not route to accidental public claims | Link check note |
| Forms | Forms submit only to sandbox or internal destinations | Test note |
| Data | No real owner/resident personal data is used | Test data note |
| Desktop | Smoke test passes at common desktop width | Browser note |
| Mobile | Smoke test passes at common mobile width | Browser note |
| Rollback | Rollback has been tested once on staging | Rollback note |

## Browser smoke script

Use after staging exists:

```text
1. Open staging in a normal browser session as an authorized reviewer.
2. Confirm login/access challenge appears if not already authorized.
3. Confirm the expected internal placeholder or test site appears after authorization.
4. Open staging in incognito or an unauthorized session.
5. Confirm the unauthorized session is blocked.
6. Check desktop and mobile widths.
7. Confirm no public service claims, real contact intake, or live forms are present.
8. Record evidence pointer outside Git if screenshots contain access/account details.
```

## Public launch boundary

Public launch is not part of internal infrastructure completion. It requires a separate approval record covering:

| Gate | Required approval/evidence |
|---|---|
| Licensing/firm status | Counsel or licensing owner approval |
| Designated broker/role boundaries | Internal owner and counsel approval |
| Public copy | Counsel-approved service language |
| Privacy and analytics | Privacy policy and analytics consent decisions |
| Contact/intake | Approved handling path for inquiries |
| Insurance/risk | Insurance or risk owner review as needed |
| DNS/public release | Account owner approval to route apex/root publicly |
| Search indexing | Explicit approval to allow indexing |

## Production release decision

Until every public launch gate clears, choose one:

| Decision | Operational action |
|---|---|
| Parked | Leave apex/root at registrar/DNS parking page without service claims. |
| Protected | Route apex/root to a protected internal page with access control. |
| Unpublished | Leave apex/root without website records. |
| Public | Only after public launch approval record exists. |

## Release evidence

If public launch is later approved, record:

| Field | Value |
|---|---|
| Approval owner | TBD |
| Approval date | TBD |
| Domain | TBD |
| Production deploy commit | TBD |
| Public DNS change | TBD |
| SSL verification | TBD |
| Access-control change | TBD |
| Indexing decision | TBD |
| Rollback target | TBD |
| Post-launch smoke result | TBD |

## Stop conditions

- Public launch approval record is missing.
- Counsel-approved copy is missing.
- Licensing/firm-status constraints are unresolved.
- Privacy policy or contact handling is missing.
- Production cannot be rolled back.
- Unauthorized public users can access staging or preview.
