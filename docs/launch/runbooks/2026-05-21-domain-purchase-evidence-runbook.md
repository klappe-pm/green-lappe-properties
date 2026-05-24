---
domain: green-property-management
category: launch
sub-category: domain-purchase-evidence
date-created: 2026-05-21
date-revised: 2026-05-21
doc-type: runbook
version: 0.1
doc-status: draft
aliases: []
tags: [domain, registrar, evidence, runbook, website, launch]
---

# Domain Purchase Evidence Runbook

Purpose: give the account owner a step-by-step evidence checklist for an approved domain purchase. This runbook does not authorize buying domains, does not reserve any domain, and is not legal, trademark, licensing, tax, insurance, or domain-purchase advice.

Use only after partner approval and account-owner readiness. Choose the evidence container in [`2026-05-21-launch-evidence-storage-runbook.md`](2026-05-21-launch-evidence-storage-runbook.md) before saving registrar cart screenshots, receipts, or account-control evidence. Keep public website content parked, protected, or unpublished until licensing, counsel, and content gates clear.

## Purchase boundary

| Boundary | Rule |
|---|---|
| Approval | Do not start checkout until partners approve the exact domain set and term. |
| Primary domain | Try `greenlappe.com` first. |
| Defensive domain | Buy `greenlappeproperties.com` only if partners approve one defensive domain. |
| Backup domains | Do not buy `greenlappepm.com`, `greenlappepropertymanagement.com`, `greenlappemanagement.com`, or `greenlapperentals.com` without explicit approval. |
| Public content | Do not publish public sales or property-management service language from the domain before legal/content gates clear. |
| Evidence | Save evidence before checkout, immediately after checkout, and after registrar controls are configured. |

## Pre-check evidence

Complete this section immediately before purchase, because availability and pricing can change.

| Item | Evidence to save | Status |
|---|---|---|
| Partner approval | Written approval naming exact domains and term length | Pending |
| Registrar selected | Screenshot or note naming registrar and account owner | Pending |
| Cart search for `greenlappe.com` | Screenshot/PDF showing exact domain availability | Pending |
| `greenlappe.com` price | Screenshot/PDF showing registration term, price, taxes/fees, privacy, and renewal price if visible | Pending |
| Defensive-domain decision | Written approval or deferral note for `greenlappeproperties.com` | Pending |
| Cart search for `greenlappeproperties.com`, if approved | Screenshot/PDF showing exact domain availability | Pending |
| Counsel review status | Note that counsel review is complete, scheduled, or explicitly pending | Pending |
| Evidence storage location | Outside-repo evidence container and folder path selected | Pending |

Suggested evidence filename pattern:

```text
yyyy-MM-dd-domain-cart-<registrar>-<domain>.pdf
yyyy-MM-dd-domain-cart-<registrar>-<domain>.png
```

## Checkout checklist

| Step | Expected control | Status |
|---|---|---|
| Verify account owner | Account owner can access registrar account and recovery email | Pending |
| Enable account MFA | Registrar account MFA enabled before checkout if available | Pending |
| Confirm billing owner | Payment method and billing owner are known | Pending |
| Confirm registrant contact | Registrant contact is accurate and appropriate for the business | Pending |
| Confirm privacy/redaction | WHOIS privacy/redaction option understood and captured | Pending |
| Confirm term | Primary domain registered for approved term, recommended at least two years | Pending |
| Confirm auto-renew | Auto-renew enabled unless partners intentionally choose otherwise | Pending |
| Complete purchase | Checkout completed only for approved domains | Pending |
| Save receipt | Receipt/PDF saved with registrar, domains, term, subtotal, taxes/fees, total, and order/reference number | Pending |

## Post-purchase control checklist

Complete this before starting DNS, staging, or hosting work.

| Control | Expected state | Evidence |
|---|---|---|
| Registrar account MFA | Enabled | Screenshot or account-security note |
| Recovery email | Controlled by account owner/business owner | Account inventory note |
| Registrar lock | Enabled where supported | Screenshot |
| Auto-renew | Enabled where intended | Screenshot |
| Renewal date | Recorded for each domain | Domain inventory note |
| Registrar owner | Named person/account recorded | Domain inventory note |
| Billing owner | Named person/payment owner recorded | Domain inventory note |
| DNS host decision | Cloudflare-only or separate registrar plus Cloudflare DNS recorded | Domain inventory note |
| WHOIS privacy/redaction | Confirmed as active or documented limitation | Screenshot or registrar note |
| Domain receipt | Stored in approved evidence location | Receipt/PDF path or Drive location |

## Domain inventory record

Create one record per purchased domain.

| Field | Value |
|---|---|
| Domain | TBD |
| Registrar | TBD |
| Registrar account owner | TBD |
| Billing owner | TBD |
| Registrant owner | TBD |
| Purchase date | TBD |
| Initial term | TBD |
| Renewal date | TBD |
| Auto-renew status | TBD |
| Registrar lock status | TBD |
| WHOIS privacy/redaction status | TBD |
| DNS host | TBD |
| Nameservers | TBD |
| Receipt/evidence location | TBD |
| Notes | TBD |

Use a pointer rather than a sensitive link or file contents:

```text
Evidence location: Launch Evidence / 01-domain-and-dns / yyyy-MM-dd-domain-receipt-registrar-domain.pdf
Stored outside repo: yes
Contains sensitive data: yes
```

## DNS handoff boundary

Do not configure public production content immediately after purchase. After domain-control evidence is saved, the next technical work is:

1. Decide Cloudflare-only versus independent registrar plus Cloudflare DNS.
2. Add the domain to the DNS provider.
3. Configure nameservers only after the DNS zone is ready.
4. Add staging and provider-verification records first.
5. Keep apex/root parked, protected, or unpublished until the public launch gate clears.

## Source links

| Topic | Source |
|---|---|
| Domain registration basics | [ICANN Registering Domain Names](https://www.icann.org/resources/pages/register-domain-name-2017-06-20-en) |
| Accredited registrar directory | [ICANN Accredited Registrar Directory](https://www.icann.org/en/accredited-registrars) |
| Cloudflare domain registration workflow | [Register a new domain](https://developers.cloudflare.com/registrar/get-started/register-domain/) |
| Cloudflare renewal behavior | [Renew domains with Cloudflare Registrar](https://developers.cloudflare.com/registrar/account-options/renew-domains/) |
| Cloudflare WHOIS redaction | [WHOIS redaction](https://developers.cloudflare.com/registrar/account-options/whois-redaction/) |
| Cloudflare DNSSEC | [Enable DNSSEC](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/) |
