---
domain: green-lappe-properties
category: launch
sub-category: evidence-storage
date-created: 2026-05-21
date-revised: 2026-05-21
doc-type: runbook
version: 0.1
doc-status: draft
aliases: []
tags: [evidence, records, storage, runbook, launch]
---

# Launch Evidence Storage Runbook

Purpose: define how launch evidence should be stored before sensitive domain, registrar, billing, legal, licensing, or account screenshots exist. This runbook is an operating checklist only. It is not legal, tax, insurance, privacy, cybersecurity, or records-retention advice.

## Storage rule

Keep operational notes and non-sensitive public-source evidence in this repository. Keep sensitive evidence outside this repository in an access-controlled storage location selected by the partners.

| Evidence type | Store in repo? | Storage rule |
|---|---:|---|
| Public source notes and links | Yes | Commit summarized notes and source links. |
| Planning checklists and blank templates | Yes | Commit blank runbooks and inventory templates. |
| Registrar cart screenshots | No | Store outside repo; record only filename/location pointer. |
| Domain purchase receipts | No | Store outside repo; record only filename/location pointer. |
| Registrar account screenshots | No | Store outside repo; redact where possible. |
| Payment details | No | Do not commit; do not duplicate outside the payment system except required receipt records. |
| Personal registrant/contact data | No | Store only in the registrar/account system and approved evidence location. |
| Counsel memos or legal advice | No by default | Store outside repo unless counsel and partners approve repository storage. |
| License documents | No by default | Store outside repo unless repository access model changes. |
| Credentials, MFA seeds, recovery codes | Never | Store only in the approved password manager or account recovery system. |

## Recommended evidence container

Choose one controlled evidence container before checkout:

| Option | Use when | Notes |
|---|---|---|
| Business Google Drive shared drive | Partners already use Google Workspace and want simple evidence sharing. | Use restricted membership, MFA-backed accounts, and a stable folder structure. |
| Business Microsoft SharePoint/OneDrive site | Partners already use Microsoft 365. | Use restricted site membership and stable document libraries. |
| Password manager secure notes/files | Evidence is account-recovery-sensitive, such as recovery codes or account ownership notes. | Use for secrets and recovery material, not general project docs. |
| Counsel/accounting portal | Evidence is legal, tax, insurance, or accounting-sensitive. | Use when the record belongs with the professional advisor. |

Do not use personal downloads folders, email attachments as the only copy, local desktop folders, or this Git repository as the system of record for sensitive evidence.

## Folder pattern

Create this structure in the selected evidence container:

```text
Green Lappe Properties/
  Launch Evidence/
    00-index/
    01-domain-and-dns/
    02-legal-and-licensing/
    03-insurance-and-risk/
    04-banking-and-trust-accounting/
    05-vendor-accounts/
    06-website-and-hosting/
```

Suggested domain evidence filenames:

```text
yyyy-MM-dd-domain-cart-<registrar>-<domain>.pdf
yyyy-MM-dd-domain-cart-<registrar>-<domain>.png
yyyy-MM-dd-domain-receipt-<registrar>-<domain-or-order>.pdf
yyyy-MM-dd-domain-security-<registrar>-<domain>.pdf
yyyy-MM-dd-domain-inventory-<domain>.md
```

## Evidence index template

Keep this index in the evidence container, not in Git if it contains sensitive links, account names, or personal data.

| Field | Value |
|---|---|
| Evidence container | TBD |
| Owner | TBD |
| Backup owner | TBD |
| Access group | TBD |
| MFA required for owners | TBD |
| Date created | TBD |
| Last access review | TBD |
| Next access review | TBD |
| Notes | TBD |

## Evidence pointer format for Git

When a repo document needs to refer to a sensitive record, use a pointer that is useful without exposing secrets:

```text
Evidence location: Launch Evidence / 01-domain-and-dns / yyyy-MM-dd-domain-receipt-registrar-domain.pdf
Owner: Kevin/Megan
Stored outside repo: yes
Contains sensitive data: yes
```

Do not include share URLs, personal email addresses, payment details, account IDs, recovery codes, or unredacted screenshots in Git.

## Access checklist

Complete this before saving the first registrar cart or receipt evidence:

| Step | Expected result | Status |
|---|---|---|
| Choose evidence container | One controlled storage system selected | Pending |
| Assign owner | Primary owner named | Pending |
| Assign backup owner | Backup owner named | Pending |
| Restrict access | Only intended partners/advisors have access | Pending |
| Confirm MFA | Owner accounts have MFA enabled | Pending |
| Create folder structure | Launch Evidence folders created | Pending |
| Create index | Evidence index exists in the container | Pending |
| Test upload | Non-sensitive test PDF uploaded and opened by owner/backup | Pending |
| Define review cadence | Next access review date recorded | Pending |

## Domain purchase handoff

Before domain checkout, update the domain purchase evidence runbook with:

1. The selected evidence container name.
2. The domain evidence folder path.
3. The primary owner and backup owner.
4. The filename pattern to use for cart screenshots, receipt, and post-purchase controls.

After checkout, save the receipt and security-control screenshots outside Git, then record only evidence pointers in the domain inventory record.

## Do not store

- Passwords, MFA seeds, backup codes, private keys, or API tokens.
- Full credit card numbers, bank account numbers, or payment authorization data.
- Personal registrant data unless the selected evidence container is approved for it.
- Counsel advice or legal memos unless counsel approves the storage location.
- Unredacted screenshots that reveal account IDs, email addresses, recovery contacts, payment data, or unrelated personal information when a redacted copy is sufficient.
