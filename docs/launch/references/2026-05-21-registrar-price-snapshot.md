---
domain: green-lappe-properties
category: launch
sub-category: registrar-price-snapshot
date-created: 2026-05-21
date-revised: 2026-05-21
doc-type: reference-note
version: 0.1
doc-status: draft
aliases: []
tags: [domain, registrar, pricing, website, launch]
---

# Registrar Price Snapshot

Purpose: record the current registry/DNS availability snapshot and public registrar price evidence for the Green Lappe website domain decision. This note is not legal, trademark, licensing, tax, insurance, or domain-purchase advice, and it is not authorization to buy domains or publish public service language.

Checked: 2026-05-21 09:56-10:12 PDT / 2026-05-21T16:56-17:12Z.

## Executive readout

`greenlappe.com` remains the first purchase candidate, with `greenlappeproperties.com` still the only recommended initial defensive domain if the partners approve buying one. Verisign RDAP returned HTTP 404 for all six candidate `.com` domains after retry, and DNS checks returned no NS, A, or AAAA records at the check time.

Public registrar price evidence was available from Porkbun: its `.com` pricing table showed $11.08 per year for registration, renewal, and transfer. Treat this as public pricing evidence only. It is not a completed cart, reservation, checkout quote, tax/fee total, or guarantee that any candidate will remain available.

## Domain availability snapshot

Source method: Verisign `.com` RDAP endpoint plus DNS record checks.

| Domain | Verisign RDAP result | DNS result | Interpretation |
|---|---:|---|---|
| `greenlappe.com` | HTTP 404 after retry | No NS/A/AAAA records | Still the primary purchase candidate; re-check in registrar cart before buying. |
| `greenlappeproperties.com` | HTTP 404 after retry | No NS/A/AAAA records | Still the best single defensive candidate if budget allows. |
| `greenlappepm.com` | HTTP 404 | No NS/A/AAAA records | Backup only. |
| `greenlappepropertymanagement.com` | HTTP 404 | No NS/A/AAAA records | Too long for primary; defensive only if explicitly approved. |
| `greenlappemanagement.com` | HTTP 404 | No NS/A/AAAA records | Backup/defensive only. |
| `greenlapperentals.com` | HTTP 404 | No NS/A/AAAA records | Avoid unless rentals become a separate product surface. |

Commands used:

```bash
curl --http1.1 --connect-timeout 5 --max-time 20 --retry 2 --retry-delay 1 -sS -o /tmp/rdap-retry-greenlappe.com.json -w '%{http_code}' https://rdap.verisign.com/com/v1/domain/greenlappe.com
dig +time=3 +tries=1 +short NS greenlappe.com
dig +time=3 +tries=1 +short A greenlappe.com
dig +time=3 +tries=1 +short AAAA greenlappe.com
```

The same pattern was run for the other five candidate domains. The first RDAP attempt for `greenlappe.com` and `greenlappeproperties.com` timed out; retry returned HTTP 404 for both.

## Registrar pricing evidence

| Registrar/source | Evidence captured | Readout | Limitation |
|---|---|---|---|
| Porkbun public pricing table | `.com` row on `porkbun.com/products/details` | `.com` registration $11.08/year, renewal $11.08/year, transfer $11.08/year | Public TLD pricing only; not a candidate-specific cart or tax/fee total. |
| Porkbun public search page | `porkbun.com/checkout/search?q=greenlappe.com` | Page loaded with a pending dynamic result for `greenlappe.com`; static HTML did not expose final availability/price without browser-side processing | Do not treat as a completed cart quote. |
| Cloudflare Registrar docs | Registrar operates without markup and charges registry/ICANN cost; renewals use registry list price | Supports Cloudflare-only pattern for simplicity, but exact candidate price requires dashboard/API cart check | Public docs did not expose an unauthenticated candidate-specific checkout quote. |
| Namecheap public pages | Attempted domain result and pricing pages | Returned a Cloudflare anti-bot challenge in command-line fetch | Not used as evidence. |

Relevant Porkbun HTML excerpt captured:

```html
<div class="domainsPricingAllExtensionsItem" data-extension="com" data-price-registration="1108" data-price-renewal="1108" data-price-transfer="1108">
```

## Purchase checkpoint

If partners approve purchase, the account owner should complete these checks immediately before checkout:

1. Search `greenlappe.com` in the selected registrar cart.
2. Save a screenshot or PDF that shows the exact domain, term length, registration price, renewal price if visible, taxes/fees, privacy option, and auto-renew setting.
3. If buying one defensive domain, repeat the same cart evidence for `greenlappeproperties.com`.
4. Confirm account MFA, recovery email, registrar lock, auto-renew, billing owner, and domain owner before or immediately after checkout.
5. Save the receipt, registrar owner, renewal date, and DNS host in the project evidence record.

## Registrar pattern recommendation

Use Cloudflare Registrar plus Cloudflare DNS if the partners prioritize one console for registrar, DNS, Pages, and Access. Use an independent ICANN-accredited registrar plus Cloudflare DNS if portability and registrar/DNS separation matter more than one-console simplicity.

Do not buy speculative backup domains without explicit approval. Do not publish public website content or service language until licensing, counsel, and content gates clear.

## Source links

| Topic | Source |
|---|---|
| `.com` RDAP source | [Verisign RDAP for greenlappe.com](https://rdap.verisign.com/com/v1/domain/greenlappe.com) |
| Porkbun `.com` pricing | [Porkbun domain pricing](https://porkbun.com/products/details) |
| Porkbun domain search page checked | [Porkbun search for greenlappe.com](https://porkbun.com/checkout/search?q=greenlappe.com) |
| Cloudflare Registrar overview | [Cloudflare Registrar docs](https://developers.cloudflare.com/registrar/) |
| Cloudflare Registrar about/pricing model | [Cloudflare Registrar about](https://developers.cloudflare.com/registrar/about/) |
| Cloudflare Registrar renewals | [Renew domains with Cloudflare Registrar](https://developers.cloudflare.com/registrar/account-options/renew-domains/) |
| ICANN registrar directory | [ICANN Accredited Registrar Directory](https://www.icann.org/en/contracted-parties/accredited-registrars/list-of-accredited-registrars) |
