---
domain: green-property-management
category: launch
sub-category: website-domain-internal-launch
date-created: 2026-05-20
date-revised: 2026-05-21
doc-type: launch-plan
version: 0.1
doc-status: draft
aliases: []
tags: [website, domain, dns, internal-testing, launch-plan]
---

# Website Domain and Internal Launch Plan

Purpose: plan the domain, DNS, deployment, and internal testing path for a Green Property Management website. This deliberately does not define visual style, imagery, copy, page sections, messaging hierarchy, or final public content. It is a launch-infrastructure plan only.

Planning boundary: do not publish a public sales site until the licensing/counsel gate in the business launch plan is satisfied. Internal deployment and testing may proceed behind access control with placeholder or non-public test content.

## Recommended approach

Use `greenlappe.com` as the primary candidate if it is still available at purchase time. The existing brand guide already names it as the preferred launch domain, and a direct Verisign WHOIS check returned no match for `greenlappe.com` at `2026-05-21T01:36Z`. Treat this as a snapshot, not a reservation.

Launch internal testing before public launch:

1. Register the primary domain and one defensive long-form domain if budget allows.
2. Put DNS under a provider that supports fast record changes, DNSSEC, access-control integration, and clean handoff documentation.
3. Create a protected staging environment at `staging.<primary-domain>`.
4. Create protected pull-request preview deployments for review.
5. Keep the public apex/root domain parked, access-protected, or unpublished until legal/content gates are cleared.

## Domain selection plan

### Candidate criteria

| Criterion | Decision rule |
|---|---|
| Memorability | Prefer short, spoken-word-simple domains. |
| Brand fit | Prefer the exact Green Property Management name over descriptive but long terms. |
| TLD | Prefer `.com` for the public face unless unavailable or legally blocked. |
| Hyphens | Avoid hyphenated names unless used only defensively. |
| Scope creep | Do not buy many speculative names; buy the minimum set needed to prevent confusion. |
| Legal clearance | Domain availability is not trademark clearance; counsel should review before public launch. |

### Availability snapshot

Checked via Verisign WHOIS on `2026-05-20 18:36 PDT` / `2026-05-21T01:36Z`.

Follow-up evidence: [`2026-05-20-domain-clearance-check.md`](2026-05-20-domain-clearance-check.md) records a 2026-05-20 19:25 PDT Verisign RDAP/DNS re-check plus USPTO and web-collision notes. [`2026-05-21-registrar-price-snapshot.md`](2026-05-21-registrar-price-snapshot.md) records a 2026-05-21 09:56 PDT registry/DNS refresh plus public registrar price evidence. Both keep `greenlappe.com` as the primary purchase candidate and `greenlappeproperties.com` as the only recommended initial defensive domain.

| Domain | Snapshot result | Proposed use |
|---|---|---|
| `greenlappe.com` | No match | Primary candidate. |
| `greenlappeproperties.com` | No match | Defensive redirect or parked domain. |
| `greenlappepm.com` | No match | Backup only if primary cannot be purchased. |
| `greenlappepropertymanagement.com` | No match | Too long for primary; defensive only. |
| `greenlappemanagement.com` | No match | Backup/defensive only. |
| `greenlapperentals.com` | No match | Avoid unless rentals become a separate product surface. |

### Purchase workflow

| Step | Owner | Output |
|---|---|---|
| Re-check availability in registrar cart immediately before purchase. | Kevin/Megan | Screenshot or PDF of availability and price. |
| Search USPTO Trademark Search for exact and confusingly similar marks. | Kevin/Megan, counsel if needed | Clearance notes; no legal conclusion unless counsel provides one. |
| Run web search for exact phrase and close variants. | Kevin/Megan | Collision notes. |
| Decide primary and defensive domains. | Kevin/Megan | Domain decision record. |
| Register primary domain for at least two years. | Account owner | Registration confirmation. |
| Enable auto-renew, registrar lock, MFA, recovery email, and billing owner. | Account owner | Domain-control checklist. |
| Export/save domain receipt, registrar account owner, renewal date, and DNS host. | Account owner | Domain inventory entry. |

Use [`2026-05-21-domain-purchase-evidence-runbook.md`](2026-05-21-domain-purchase-evidence-runbook.md) for the approved checkout evidence checklist and post-purchase inventory fields. Use [`2026-05-21-launch-evidence-storage-runbook.md`](2026-05-21-launch-evidence-storage-runbook.md) before saving receipts, account screenshots, or other sensitive launch evidence outside Git.

### Registrar and DNS recommendation

Shortlist two patterns:

| Pattern | When to use | Notes |
|---|---|---|
| Cloudflare Registrar + Cloudflare DNS | Best if the team wants one place for registrar, DNS, Pages, and Access. | Cloudflare Registrar sells at registry cost, but domains registered there must remain on Cloudflare nameservers. |
| Independent ICANN-accredited registrar + Cloudflare DNS | Best if registrar/DNS portability matters more than one-console simplicity. | Buy through an accredited registrar, then delegate DNS to Cloudflare or another DNS provider. |

Use the ICANN accredited registrar directory when evaluating any registrar not already known to the team. Avoid reseller-only offers unless there is a clear reason.

## Environment model

| Environment | URL pattern | Access | Purpose |
|---|---|---|---|
| Local | `localhost` | Developer machine | Build and smoke test changes before push. |
| Preview | Provider-generated URL per PR | Restricted to internal reviewers | Review each pull request before merge. |
| Staging | `staging.greenlappe.com` or equivalent | Restricted to Kevin/Megan/internal reviewers | Stable internal test surface. |
| Production reserved | `greenlappe.com` | Not public until legal/content gates clear | DNS, SSL, redirect, and release-readiness testing only. |
| Public production | `greenlappe.com` | Public | Later phase after licensing, counsel-approved language, content, and launch approval. |

Internal testing must include `noindex` behavior for non-production deployments and must not submit real owner/resident data into production workflows.

## Hosting platform decision

Evaluate three provider options against the actual site architecture once the build approach is known:

| Provider | Good fit | Watch-outs |
|---|---|---|
| Cloudflare Pages | Static or JAMstack site, Cloudflare DNS, protected previews through Cloudflare Access. | Preview deployments are public unless Access policy is enabled. Custom-domain protection needs explicit Access configuration. |
| Vercel | Next.js or React-heavy app with strong PR preview workflow. | Production-domain protection may require paid plan level; generated deployment URLs need protection settings. |
| Netlify | Static/JAMstack site with deploy previews and simple password/team login protection. | Team-login or all-deploy protection may require paid plan level. |

Default recommendation for internal testing: Cloudflare Registrar/DNS plus Cloudflare Pages/Access if the site is static or lightweight. Use Vercel if the implementation later requires Next.js-specific features. Use Netlify if its team-login review workflow is preferred.

## DNS plan

Minimum DNS records before internal testing:

| Record | Purpose |
|---|---|
| Apex/root record | Point `greenlappe.com` to the selected host only when ready. |
| `www` | Canonical public alias; redirect policy decided later. |
| `staging` | Stable internal test environment. |
| Provider verification records | Domain ownership and SSL issuance. |
| CAA records | Optional but recommended after host choice. |
| MX/SPF/DKIM/DMARC | Required if business email is launched on the domain. |

DNS setup sequence:

1. Add the domain to the DNS provider.
2. Configure nameservers at registrar if registrar and DNS are separate.
3. Add provider verification records.
4. Add staging records first.
5. Validate SSL issuance and redirects.
6. Leave public apex/root parked or protected until public launch approval.
7. Export DNS zone records after setup.

Use [`2026-05-21-dns-staging-access-runbook.md`](2026-05-21-dns-staging-access-runbook.md) for DNS zone setup, protected staging, preview access controls, smoke commands, and stop conditions.

## Internal development workflow

| Step | Output |
|---|---|
| Choose repo location: current repo subfolder versus separate website repo. | Repo decision record. |
| Create website skeleton only after tech stack decision. | Buildable placeholder app; no final style/content decisions. |
| Configure CI build command, lint command, and smoke test command. | Passing CI on pull requests. |
| Connect hosting provider to the Git repository. | Automatic preview deployments. |
| Protect preview and staging URLs. | Only approved reviewers can access. |
| Add branch rules for production deploys. | Production deploy only from `main` or release branch. |
| Document environment variables and secrets. | No secrets committed to repo; staging and production separated. |
| Add rollback procedure. | Known path to restore last good deploy. |

Use [`2026-05-21-website-deployment-rollback-runbook.md`](2026-05-21-website-deployment-rollback-runbook.md) for hosting decision records, CI/build settings, preview/staging workflows, production protection, and rollback testing.

## Internal testing gates

### Gate 1: Domain control

- Registrar account has MFA enabled.
- Domain is locked.
- Auto-renew is enabled.
- Renewal date is recorded.
- DNS owner and registrar owner are recorded.
- Domain inventory is stored in the project evidence folder.

### Gate 2: DNS and SSL

- `dig` confirms authoritative DNS is correct.
- Staging hostname resolves.
- SSL certificate is valid for staging.
- Public apex/root is not accidentally serving unapproved public content.
- DNSSEC decision is documented.

### Gate 3: Access control

- Authorized reviewer can access staging.
- Unauthorized/incognito visitor is blocked.
- PR preview URLs are blocked or password/team protected.
- Access policy includes only intended reviewers.
- Access logs can be inspected.

### Gate 4: Build and deployment

- CI installs dependencies from lockfile.
- CI build passes.
- Preview deploy appears on pull request.
- Staging updates from the intended branch only.
- Production deploy is disabled or protected until public launch approval.
- Rollback has been tested once.

### Gate 5: Technical QA

- Links do not point to accidental public claims or broken internal routes.
- Forms, if present for testing, submit only to sandbox or internal destinations.
- No real owner/resident PII is used in test data.
- Non-production pages send `noindex` or equivalent crawler controls.
- Browser smoke test passes on desktop and mobile widths.

Use [`2026-05-21-website-qa-release-boundary-runbook.md`](2026-05-21-website-qa-release-boundary-runbook.md) for internal QA, browser smoke testing, release evidence, and public launch stop conditions.

## Public launch readiness boundary

This plan ends when the team has:

- Purchased and secured the selected domain.
- Configured DNS.
- Established protected staging and PR previews.
- Verified build/deploy/access/rollback.
- Documented the operating runbook.

Public launch needs a separate approval gate covering:

- Counsel-approved public language.
- License/firm-status constraints.
- Final content.
- Final visual system and assets.
- Analytics/privacy policy.
- Contact/intake handling.
- Google Business Profile and search indexing.

## Task plan

| Phase | Task | Dependency | Output |
|---|---|---|---|
| 1 | Confirm domain candidates and registrar pattern. | None | Domain decision record. |
| 1 | Re-check `greenlappe.com` and defensive domains in registrar cart. | Domain candidates | Purchase-ready shortlist. |
| 1 | Run USPTO and web collision checks. | Domain candidates | Clearance notes. |
| 1 | Purchase selected domain(s). | Partner approval and purchase evidence runbook | Domain registration receipt and domain inventory entry. |
| 2 | Configure registrar security and renewal controls. | Domain purchase | Security checklist. |
| 2 | Configure DNS zone and staging hostname. | DNS provider decision | Working staging DNS. |
| 2 | Configure email DNS only if email provider is selected. | Email provider decision | MX/SPF/DKIM/DMARC records. |
| 3 | Select hosting provider for internal testing. | Repo/stack decision | Provider setup record. |
| 3 | Connect Git repository and deploy protected staging. | Hosting provider | Internal staging URL. |
| 3 | Enable PR preview deployments and protection. | Hosting provider | Preview review flow. |
| 4 | Run DNS, SSL, access, CI, and rollback tests. | Staging live | QA evidence log. |
| 4 | Write runbook for domain/DNS/deploy operations. | Tests complete | Website ops runbook. |
| 5 | Decide whether to keep production parked, protected, or unpublished. | Legal/content gate status | Production boundary decision. |

[`2026-05-21-website-phase-completion-register.md`](2026-05-21-website-phase-completion-register.md) records which phase outputs are complete in the repository and which external execution steps remain blocked by account-owner action, credentials, purchased domains, counsel review, or public launch authority.

## Open decisions

| Decision | Options | Recommendation for now |
|---|---|---|
| Primary domain | `greenlappe.com`, long-form `.com`, other | Try to purchase `greenlappe.com` first. |
| Defensive domains | None, one, several | Buy at most one long-form defensive domain initially. |
| Registrar/DNS pattern | Cloudflare-only, registrar separated from DNS | Cloudflare-only for one-console simplicity; independent registrar plus Cloudflare DNS if registrar/DNS portability is more important. |
| Hosting provider | Cloudflare Pages, Vercel, Netlify | Cloudflare Pages for static/lightweight; Vercel for Next.js. |
| Website code location | Current repo subfolder, separate repo | Decide based on whether this repo should remain docs-first. |
| Email provider | Google Workspace, Microsoft 365, defer | Defer unless email is required for launch testing. |
| Public apex behavior | Parked, access-protected, staging redirect, public | Keep parked or protected until public launch gate. |

## Risks

- Domain availability can change before purchase.
- A domain can be available but still create trademark, trade-name, or market-confusion risk.
- Cloudflare Registrar simplifies setup but locks the domain to Cloudflare nameservers while registered there.
- Preview URLs can be public by default on several platforms unless protection is explicitly enabled.
- Public production domains may have different protection rules from preview domains depending on provider and plan.
- Publishing even a placeholder site can imply business readiness if it contains unapproved service language.
- Internal forms can accidentally route real inquiries if connected to live inboxes or CRMs too early.

## Source links used

| Topic | Source |
|---|---|
| Domain registration basics and accredited registrars | [ICANN Registering Domain Names](https://www.icann.org/resources/pages/register-domain-name-2017-06-20-en), [ICANN Accredited Registrar Directory](https://www.icann.org/en/contracted-parties/accredited-registrars/list-of-accredited-registrars) |
| Trademark search | [USPTO Trademark Search](https://www.uspto.gov/trademarks/search) |
| Cloudflare Registrar | [Cloudflare Registrar overview](https://developers.cloudflare.com/registrar/), [Cloudflare Registrar FAQ](https://developers.cloudflare.com/registrar/faq/) |
| Cloudflare Pages previews and custom domains | [Cloudflare Pages preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/) |
| Cloudflare Access | [Cloudflare Access self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/), [Cloudflare Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) |
| Vercel deployment protection and generated URLs | [Vercel Deployment Protection](https://vercel.com/docs/deployment-protection), [Vercel generated deployment URLs](https://vercel.com/docs/deployments/generated-urls) |
| Netlify deploy previews and protected access | [Netlify Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/), [Netlify Password Protection](https://docs.netlify.com/manage/security/secure-access-to-sites/password-protection/) |
