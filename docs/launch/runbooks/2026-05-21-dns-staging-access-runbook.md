---
domain: green-lappe-properties
category: launch
sub-category: dns-staging-access
date-created: 2026-05-21
date-revised: 2026-05-21
doc-type: runbook
version: 0.1
doc-status: draft
aliases: []
tags: [dns, staging, access-control, website, launch, runbook]
---

# DNS, Staging, and Access Runbook

Purpose: provide an operator checklist for DNS, protected staging, and preview access after the approved domain purchase is complete. This runbook does not authorize buying domains, changing DNS, publishing public content, or bypassing licensing/counsel gates.

## Preconditions

| Requirement | Evidence |
|---|---|
| Domain purchase completed for approved domain only | Outside-repo receipt pointer |
| Registrar account MFA enabled | Outside-repo control screenshot pointer |
| Domain lock and auto-renew configured | Outside-repo control screenshot pointer |
| Evidence storage location chosen | Launch evidence storage index pointer |
| DNS owner selected | Domain inventory record |
| Public apex/root boundary chosen | Parked, protected, or unpublished |

Do not continue if the selected domain has not been purchased by the account owner or if the public apex/root behavior is unclear.

## DNS provider decision

| Pattern | Use when | Required record |
|---|---|---|
| Cloudflare Registrar + Cloudflare DNS | Simplicity and one-console operations are preferred. | Record Cloudflare account owner and zone owner. |
| Independent registrar + Cloudflare DNS | Registrar/DNS separation and portability are preferred. | Record registrar owner plus Cloudflare zone owner. |
| Other DNS provider | A different hosting or IT decision overrides the default. | Record owner, nameservers, access policy, and export path. |

Default for planning: Cloudflare Registrar/DNS plus Cloudflare Pages/Access for static or lightweight website testing. If the actual site stack requires Next.js-specific hosting, use Vercel for hosting while keeping DNS ownership documented separately.

## Zone setup checklist

| Step | Expected result | Evidence |
|---|---|---|
| Add domain to DNS provider | Zone exists under intended account | Zone overview screenshot pointer |
| Record zone owner | Named owner and backup owner recorded | Domain inventory entry |
| Record authoritative nameservers | Nameservers captured before registrar update | Domain inventory entry |
| Configure nameservers at registrar if separate | Registrar points to DNS provider nameservers | Registrar screenshot pointer |
| Confirm authoritative NS | `dig NS <domain>` returns intended nameservers | Command output pointer |
| Export initial zone | Baseline DNS zone saved outside repo if supported | Evidence pointer |
| Decide DNSSEC | Enabled or explicitly deferred with reason | Domain inventory entry |

## Minimum DNS records

| Record | Timing | Purpose |
|---|---|---|
| Provider verification records | Before custom-domain binding | Prove domain ownership to host. |
| `staging` | Before internal testing | Stable protected staging surface. |
| Preview provider records | Before PR previews, if required | Provider-specific validation. |
| Apex/root | Only after public boundary decision | Parked, protected, or unpublished until public launch. |
| `www` | Only after canonical policy is chosen | Public alias or redirect later. |
| CAA | After host choice | Limit certificate issuers if desired. |
| MX/SPF/DKIM/DMARC | Only if email provider is selected | Business email readiness. |

## Protected staging checklist

| Step | Expected result | Evidence |
|---|---|---|
| Create staging environment | Stable environment exists for internal review | Hosting dashboard pointer |
| Bind `staging.<domain>` | Host accepts staging custom domain | Host/domain screenshot pointer |
| Enable SSL | Valid certificate for staging hostname | Browser/certificate check pointer |
| Enable access policy | Only intended reviewers can access | Access policy screenshot pointer |
| Test authorized access | Intended reviewer reaches staging | Test note |
| Test unauthorized access | Incognito or unauthorized visitor is blocked | Test note |
| Enable `noindex` | Non-production crawler controls active | Header/meta evidence |
| Confirm no public claims | Placeholder/internal content only | Review note |

## Preview deployment checklist

| Step | Expected result | Evidence |
|---|---|---|
| Enable PR previews | Pull requests get preview URLs | Provider screenshot pointer |
| Protect preview URLs | Previews require team login, password, or Access policy | Access setting pointer |
| Confirm preview access | Authorized reviewer can open preview | Test note |
| Confirm preview block | Unauthorized visitor cannot open preview | Test note |
| Confirm preview noindex | Preview sends noindex or equivalent | Header/meta evidence |

## DNS smoke commands

Run from a terminal after DNS records exist:

```bash
dig +short NS greenlappe.com
dig +short A staging.greenlappe.com
dig +short AAAA staging.greenlappe.com
curl -I https://staging.greenlappe.com
```

Replace `greenlappe.com` with the actual purchased domain if the primary changes.

## Stop conditions

- Public apex/root serves unapproved content.
- Staging or preview is accessible to unauthorized visitors.
- DNS records point to an unintended provider.
- SSL is invalid or issued for the wrong hostname.
- Forms route to live inboxes, CRMs, payment systems, or production data stores before approval.
- Real owner/resident personal data appears in test workflows.
