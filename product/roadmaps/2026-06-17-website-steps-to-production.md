---
domain: green-property-management
category: roadmaps
sub-category: website-production
date-created: 2026-06-17
date-revised: 2026-06-17
doc-type: runbook
version: 0.1
doc-status: active
aliases: [Steps to complete the website]
tags: [website, launch, roadmap, deployment]
---

# Website: Steps to Production

What remains to take `src/green-pm-site/` fully live. The site is **built, tested,
and CI-gated** (marketing + acquisition flows + portal shells, 32 routes; unit +
static + E2E on desktop/Android/iOS + Lighthouse). Everything left is either
account/credential provisioning or a decision only the owner/counsel can make —
the code seams already exist and fall back gracefully until wired.

Legend: **[ready]** code-ready (just needs config) · **[creds]** blocked on
account/credential · **[gate]** decision/counsel gate.

## 1. Provision accounts (🔒 owner)

Domain registrar, Cloudflare (Pages + DNS + Access), Sanity, HubSpot, Postmark,
Clerk, Neon (Postgres), Rentvine, Sentry, Plausible, Better Stack. Record owners,
MFA, and recovery per `docs/launch` runbooks. **Do not commit any secret.**

## 2. Content layer — Sanity (✅ code-ready)

- Create the Sanity project + studio; add the schemas from
  `product/design/uxd/design-system/docs/85-sanity-schemas.md`
  (`listing`, `blogPost`, `faq`, `team`, `settings`, `tag`, `neighborhood`, `page`, `lead`).
- Enter real content (listings, field notes, FAQs, settings).
- Set `SANITY_PROJECT_ID` + `SANITY_DATASET` in the Cloudflare Pages build env.
- The site auto-switches from sample data to Sanity (`src/lib/sanity.ts`); add a
  Sanity webhook → Cloudflare Pages deploy hook to rebuild on publish.

## 3. Forms — HubSpot + Turnstile (✅ seam ready, 🔒 creds)

- Add a Cloudflare Pages Function (`functions/api/lead.ts`) that validates
  Turnstile and forwards to HubSpot Forms using `HUBSPOT_*` secrets.
- Point `PUBLIC_FORMS_ENDPOINT` at it and enable the currently-disabled submit in
  `components/forms/PendingSubmit.astro` callers (proposal, inquiry).
- Keep the `mailto` fallback for no-JS. Env vars already stubbed in `.env.example`.

## 4. Portals — Clerk + Rentvine + Neon (✅ shells ready, 🔒 creds)

- Wire Clerk auth in front of `/portal/**`; gate the routes.
- Replace `src/features/portal/data.ts` sample data with cached Rentvine API
  reads (TTLs per `84-pms-integration.md`); embed Rentvine rent/repair widgets.
- Add Neon Postgres for portal-only state (notifications, preferences, audit).

## 5. Email — Postmark (🔒 creds, ⚖️ DNS)

Create the templates in `73-email-notifications.md`; configure SPF/DKIM/DMARC on
the domain; sender `megan@greenpmpnw.com`.

## 6. Deploy — Cloudflare Pages (✅ ready)

- Connect the repo; project root `src/green-pm-site`, build `npm run build`,
  output `dist`. `_redirects` is already emitted for server-side 301s.
- Protect staging + PR previews with Cloudflare Access (per the website launch
  plan). Add all env vars/secrets to Pages.

## 7. Domain + DNS (🔒 owner, ⚖️ counsel)

Purchase `greenpmpnw.com`, configure DNS/SSL, keep apex parked/protected until
launch. (Domain/trademark clearance is a counsel item.)

## 8. Pre-launch gates (⚖️ counsel/owner) — BLOCKING

- Counsel-approved public service language and the legal pages
  (`/privacy`, `/terms`, `/accessibility`) — currently shipped as drafts.
- Licensing / designated-broker firm status confirmed.
- Remove the pre-public boundary: drop `noindex` default in `BaseLayout.astro`
  and the `Disallow: /` in `robots.txt`; enable indexing + submit sitemap.
- Public-launch approval recorded in a passoff.

## 9. Observability (✅ config)

Add Sentry (`PUBLIC_SENTRY_DSN`), Plausible analytics, and Better Stack uptime
checks (`/`, `/sitemap.xml`, `/rentals`).

## 10. Optional hardening

- Visual-regression baselines (screenshot diffing) on top of the screenshot
  artifacts already produced in CI.
- Real-device testing (BrowserStack/Sauce) beyond Playwright emulation.
- Resolve the ~20 design-system TBDs (screening provider, Rentvine-vs-Postmark
  email sender, `page.sections` field specs, blog pagination strategy, repair
  SLAs, MFA policy, etc.) before the corresponding features go live.

## Definition of done (public launch)

All of: Sanity content live · forms submitting to HubSpot · portals authenticated
on Rentvine · email deliverable · deployed to `greenpmpnw.com` behind passed
DNS/SSL/access/rollback tests · counsel sign-off · `noindex` removed · CI green
(unit + static + E2E + Lighthouse) · launch approval recorded.
