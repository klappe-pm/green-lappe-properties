---
domain: green-property-management
category: data
sub-category: analytics-framework
date-created: 2026-06-17
date-revised: 2026-06-17
doc-type: framework
version: 0.1
doc-status: active
aliases: [Analytics framework, Data & logging framework]
tags: [analytics, logging, observability, privacy, metrics]
---

# Analytics & Logging Framework

How the Green PM site collects behavioural data, business metrics, errors, and
logs — what we measure, how it flows, and how privacy is protected. Aligns with
the observability stack in `product/design/uxd/design-system/docs/80-system-architecture.md`.

## Principles

1. **Privacy-first.** Cookieless analytics (Plausible) — no cross-site tracking,
   no cookie banner. **Never collect PII** in analytics (no names, emails,
   phones, addresses). The code seam strips PII keys automatically
   (`src/lib/analytics.ts` → `sanitizeProps`).
2. **Measure only the public site.** Analytics load only on indexable pages, so
   the pre-launch `noindex` site is never measured (enforced in `BaseLayout`).
3. **One typed entry point.** All custom events go through `track()` with a fixed
   taxonomy (`ANALYTICS_EVENTS`) so names stay consistent and queryable.
4. **Structured logs.** Server/Function logs are one JSON line per event
   (`src/lib/logger.ts`), queryable and PII-free.
5. **Env-gated + safe by default.** Everything no-ops until configured, so it
   ships dark and turns on with `PUBLIC_PLAUSIBLE_DOMAIN` / `PUBLIC_SENTRY_DSN`.

## The stack (what collects what)

| Concern | Tool | Scope | Config |
| --- | --- | --- | --- |
| Web analytics (pageviews, sources, goals) | **Plausible** | Public marketing site | `PUBLIC_PLAUSIBLE_DOMAIN` |
| Conversion funnels / custom events | **Plausible goals** via `track()` | Marketing + portal entry | code seam (built) |
| Error & performance monitoring | **Sentry** | Client + Pages Functions | `PUBLIC_SENTRY_DSN` / `SENTRY_*` |
| Structured request/app logs | **Cloudflare logs** (JSON) | Pages Functions | `logEvent()` (built) |
| Uptime / synthetic checks | **Better Stack** | Production URLs | external |
| Portal product events (optional) | **Postgres (Neon)** `audit_log` | Authenticated portal | later |
| Email engagement | **Postmark** opens/clicks | Transactional email | later |

## Event taxonomy (mapped to the funnels in 81-user-flows.md)

Implemented names in `ANALYTICS_EVENTS`:

| Event | Fires when | Safe props |
| --- | --- | --- |
| `cta_clicked` | Any primary CTA click | `location` (e.g. hero, owners) |
| `owner_proposal_started` | Owner opens `/owners/proposal` / focuses the form | — |
| `owner_proposal_submitted` | Proposal submitted (post-wiring) | `doors_bucket` |
| `renter_inquiry_started` | Inquiry form focused | `neighborhood` |
| `renter_inquiry_submitted` | Inquiry submitted (post-wiring) | `neighborhood` |
| `rental_viewed` | `/rentals/[slug]` viewed | `neighborhood`, `status` |
| `rentals_filtered` | Rentals filter applied | `filter` |
| `portal_signin_started` | Portal sign-in initiated | `portal` (owner/resident) |
| `outbound_click` | External link (auto via Plausible) | `url` host |

Props are deliberately **low-cardinality and non-identifying** (bucketed counts,
neighborhood, status) so they never become PII.

## Metrics & funnels

**North-star:** qualified owner proposals per month (the acquisition outcome).

**Owner acquisition funnel:** `/owners` view → `cta_clicked(location=owners)` →
`owner_proposal_started` → `owner_proposal_submitted` → (offline) signed
management agreement. Track step-through rates; the last hop is reconciled in
HubSpot.

**Renter acquisition funnel:** `/rentals` view → `rental_viewed` →
`renter_inquiry_started` → `renter_inquiry_submitted` → (offline) lease.

**Supporting metrics:** top neighborhoods viewed, top sources/referrers, listing
view-to-inquiry rate, Core Web Vitals (Lighthouse CI + Plausible), error rate &
top errors (Sentry).

## Data flow

```
Browser ──pageview/goal──▶ Plausible          (cookieless, aggregate)
Browser ──error──────────▶ Sentry (client)
Form ──▶ Pages Function ──logEvent JSON──▶ Cloudflare logs
                         └─error──────────▶ Sentry (server)
HubSpot/Rentvine ── business outcomes (CRM/PMS dashboards, reconciled offline)
```

No raw event store is built in-app; Plausible/Sentry/Cloudflare are the systems
of record. A Neon `audit_log` is added only for authenticated portal actions.

## Privacy & retention

- No cookies, no fingerprinting, no PII in analytics. Plausible is GDPR/CCPA-
  friendly by design.
- Sentry: scrub PII in `beforeSend`; do not log auth tokens.
- Logs: PII-free by contract; Cloudflare retention per plan.
- A public privacy policy must describe analytics before launch (counsel gate).

## Implementation status

- ✅ **Built:** typed `track()` + taxonomy + PII sanitizer (`analytics.ts`),
  structured `logEvent()` (`logger.ts`), env-gated Plausible loader in
  `BaseLayout` (indexable pages only), `.env.example` entries, unit tests.
- ⏳ **To wire (needs accounts/config):** set `PUBLIC_PLAUSIBLE_DOMAIN`; create
  Plausible goals matching the taxonomy; add Sentry SDK with DSN + `beforeSend`
  scrubbing; call `track()` from CTAs/forms when forms go live; add Better Stack
  checks; (optional) Neon `audit_log` for portal events.

## Next steps

1. Provision Plausible + Sentry; set the `PUBLIC_*` env vars in Cloudflare Pages.
2. Create Plausible goals for each `ANALYTICS_EVENTS` value.
3. Instrument CTAs/forms with `track()` as forms/portals are wired.
4. Build the owner/renter funnel dashboards in Plausible; reconcile final
   conversions against HubSpot/Rentvine.
5. Define alert thresholds (Sentry error spikes; Better Stack downtime).
