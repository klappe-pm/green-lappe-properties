---
domain: green-property-management
category: launch
sub-category: domain-clearance
date-created: 2026-05-20
date-revised: 2026-05-20
doc-type: reference-note
version: 0.1
doc-status: draft
aliases: []
tags: [domain, trademark, clearance, website, launch]
---

# Domain Clearance Check

Purpose: record the current domain, USPTO, and web-collision evidence for the Green Property Management website domain decision. This is a launch reference note only, not legal advice, trademark clearance, or authorization to publish service language.

Checked: 2026-05-20 19:25-19:37 PDT / 2026-05-21T02:25-02:37Z.

## Executive readout

`greenlappe.com` remains the best primary candidate from an infrastructure and memorability standpoint. A Verisign RDAP check returned HTTP 404 for all six candidate `.com` domains, and DNS checks returned no NS, A, or AAAA records for those domains at the check time. Treat that as purchase-readiness evidence, not a reservation or guarantee.

No exact USPTO Trademark Search result surfaced for `GREEN LAPPE`, `GREENLAPPE`, or `GREEN LAPPE PROPERTIES`. Broader USPTO searches did surface live `LAPPE` marks outside real estate/property management and many `GREEN` plus `PROPERTY` marks in or near real estate. Counsel should review the mark before public use.

Recommended next action: if the partners approve purchase, buy `greenlappe.com` first and, if buying one defensive domain, buy `greenlappeproperties.com`. Do not buy the longer backup/rental variants unless the primary fails or the team explicitly chooses a larger portfolio.

## Domain availability evidence

Source method: Verisign `.com` RDAP endpoint plus DNS record checks.

| Domain | Verisign RDAP result | DNS result | Interpretation |
|---|---:|---|---|
| `greenlappe.com` | HTTP 404 | No NS/A/AAAA records | Purchase-ready candidate; re-check in registrar cart before buying. |
| `greenlappeproperties.com` | HTTP 404 | No NS/A/AAAA records | Best single defensive candidate if budget allows. |
| `greenlappepm.com` | HTTP 404 | No NS/A/AAAA records | Backup only. |
| `greenlappepropertymanagement.com` | HTTP 404 | No NS/A/AAAA records | Too long for primary; defensive only if explicitly approved. |
| `greenlappemanagement.com` | HTTP 404 | No NS/A/AAAA records | Backup/defensive only. |
| `greenlapperentals.com` | HTTP 404 | No NS/A/AAAA records | Avoid unless rentals become a separate product surface. |

Commands used:

```bash
curl -sS -o /tmp/rdap-greenlappe.com.json -w '%{http_code}' https://rdap.verisign.com/com/v1/domain/greenlappe.com
dig +short NS greenlappe.com
dig +short A greenlappe.com
dig +short AAAA greenlappe.com
```

The same pattern was run for the other five candidate domains.

## USPTO Trademark Search evidence

Source method: USPTO Trademark Search web app, Wordmark refinement, checked in the browser on 2026-05-20 PDT.

| Query | Result | Notes |
|---|---:|---|
| `CM:"green lappe"` | No results found | No exact federal wordmark match surfaced. |
| `CM:greenlappe` | No results found | No concatenated federal wordmark match surfaced. |
| `CM:"green lappe properties"` | No results found | No exact long-form federal wordmark match surfaced. |
| `CM:/.*greenlappe.*/` | No results found | No obvious substring match surfaced. |
| `CM:(/.*green.*/ AND /.*lappe.*/)` | No results found | No combined Green/Lappe mark surfaced. |
| `CM:lappe` | 2 results | `LAPPE`, live pending, IC 031 pet food; `LAPPE'S BEE SUPPLY`, live registered, IC 004/008/009/020/035. |
| `CM:(/.*lappe.*/ AND /.*propert.*/)` | No results found | No Lappe/property federal wordmark surfaced. |
| `CM:(/.*lappe.*/ AND /.*real.*/)` | 2 results | Both dead; `SANDLAPPER REAL ESTATE GROUP` included IC 036 real estate agency services but is not a live `LAPPE` mark. |
| `CM:(/.*green.*/ AND /.*propert.*/)` | 42 results | Many `GREEN` plus `PROPERTY` results exist, including real-estate/property-service marks. This supports counsel review before public use. |

Risk note: federal search results are not the same as trademark clearance. They do not cover every common-law use, state registration, trade name, domain conflict, or likelihood-of-confusion issue.

## Web collision scan

Source method: web searches for exact and close phrases.

| Search | Readout |
|---|---|
| `"Green Property Management"` | No exact Green Property Management business collision surfaced in the top scan; unrelated Green/Lappe name combinations and personal/business references surfaced. |
| `"Green Property Management"` | No exact company/brand collision surfaced in the top scan. |
| `"GreenLappe"` | No exact brand collision surfaced in the top scan. |
| `"greenlappe.com"` | No live-site collision surfaced in the top scan. |
| `"greenlappeproperties.com"` | No live-site collision surfaced in the top scan. |

Practical interpretation: exact web collision looks low from this scan, but the surname `Lappe` appears in unrelated web contexts and `Green` plus `Property/Properties` is common in real estate. That keeps the clearance question in counsel territory.

## Purchase-ready shortlist

| Priority | Domain | Action |
|---:|---|---|
| 1 | `greenlappe.com` | Buy first if still available in the registrar cart. |
| 2 | `greenlappeproperties.com` | Buy only if the team wants one long-form defensive redirect or parked domain. |
| 3 | `greenlappepm.com` | Defer unless primary cannot be purchased. |
| 4 | `greenlappepropertymanagement.com` | Defer; long and low-value for launch. |
| 5 | `greenlappemanagement.com` | Defer; less exact than the brand. |
| 6 | `greenlapperentals.com` | Defer; avoid unless rentals become a distinct product. |

## Required next checks before relying on the name

1. Re-run the registrar cart search immediately before purchase and save a screenshot or PDF with price and term.
2. Confirm account owner, billing owner, MFA, recovery email, auto-renew, and registrar lock before checkout or immediately after purchase.
3. Ask counsel to review federal, state, common-law, and market-confusion risk before public launch or owner-solicitation language.
4. Keep the apex/root domain parked, access-controlled, or unpublished until licensing and content gates clear.

## Source links

| Topic | Source |
|---|---|
| `.com` RDAP source | [Verisign RDAP for greenlappe.com](https://rdap.verisign.com/com/v1/domain/greenlappe.com) |
| USPTO search tool | [USPTO Trademark Search](https://tmsearch.uspto.gov/search/search-information) |
| USPTO search guidance | [USPTO federal trademark searching](https://www.uspto.gov/trademarks/search/federal-trademark-searching) |
| Project launch plan | [`2026-05-20-website-domain-internal-launch-plan.md`](../plans/2026-05-20-website-domain-internal-launch-plan.md) |
