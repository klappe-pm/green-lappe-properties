---
domain: brand
category: design-system
sub-category: system-architecture
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on: []
produces:
  - stack-overview
  - environment-spec
  - deployment-spec
  - secrets-spec
  - performance-budget
  - observability-spec
executor: engineering
aliases:
tags:
---

# 80-system-architecture

The complete technical architecture for the Green Property Management web presence and supporting systems. Stack choices, environments, deployment, secrets management, performance budgets, and observability. Consumed by every engineer working on the system, the deployment pipeline, and operational runbooks.

## Dependencies

None at the design-system level. This doc bridges from the brand-system docs into the technical implementation.

## Outputs

1. Stack overview (every service and its role)
2. Environment specification (local, preview, production)
3. Deployment pipeline
4. Secrets and configuration management
5. Performance budgets
6. Observability stack
7. Backup and disaster recovery
8. Forbidden architectural patterns

## Stack overview

| Layer | Service | Role | Notes |
|---|---|---|---|
| Marketing site framework | Astro 4.x | Static site generator | Renders content from Sanity at build time; islands for interactivity |
| Styling | Tailwind CSS 3.x | Utility-class CSS | Configured per `tailwind.config.js` mirroring `green-pm-tokens.css` |
| Content layer | Sanity v3 | Headless CMS | Schemas in `sanity/schemas/`; deployed to Sanity Cloud |
| Hosting | Cloudflare Pages | Static asset hosting and edge runtime | Free tier sufficient for early stage |
| DNS | Cloudflare DNS | Domain management | `greenpmpnw.com` |
| Forms | Cloudflare Pages Functions or HubSpot Forms | Form submission handling | HubSpot Forms preferred for CRM integration |
| CRM | HubSpot Starter | Lead and contact management | Forms submit to HubSpot; pipeline tracks inquiries through close |
| Email transactional | Postmark | Transactional email sending | Reliable deliverability; per-template tracking |
| Email broadcasts | Postmark or HubSpot | Newsletter and broadcast email | HubSpot if CRM-integrated; Postmark if simpler |
| Authentication (portal) | Clerk or Auth0 | User auth for resident and owner portals | Choose Clerk for simpler pricing at the brand's scale |
| Database (portal data) | Postgres on Neon or Supabase | Application data for portal-specific records | Most data lives in the PMS; this is for portal-specific extensions |
| PMS (launch) | Rentvine | Property management software | Owner statements, tenant ledger, repair tracking, lease |
| PMS (50+ doors) | AppFolio | Larger PMS | Migration path when door count crosses 50 |
| Payments | Native PMS payment processor | Rent collection and owner payouts | Rentvine and AppFolio both handle ACH and card |
| Analytics | Plausible | Privacy-respecting web analytics | No cookie banner required; lightweight |
| Error monitoring | Sentry | Runtime error capture | Free tier sufficient for early stage |
| Uptime monitoring | Better Stack (formerly BetterUptime) or UptimeRobot | External uptime checks | Alerts via SMS to Megan |
| Source control | GitHub | Git hosting and CI/CD trigger | Repo: `klappe-pm/green-pm-site` (or similar) |
| CI/CD | GitHub Actions plus Cloudflare Pages auto-deploys | Build and deploy pipeline | Astro builds on commit; Sanity webhook triggers rebuild |
| Asset CDN | Cloudflare R2 or Sanity CDN | Image hosting | Sanity Cloud serves images via its CDN by default |
| DNS email records | Cloudflare DNS | SPF, DKIM, DMARC for Postmark | Configured per Postmark setup |

## Environment specification

Three environments. Promotion goes local → preview → production.

### Local development

| Attribute | Value |
|---|---|
| URL | `http://localhost:4321` |
| Sanity dataset | `development` |
| Database | Local Postgres via Docker or Neon dev branch |
| Email | Postmark sandbox (no real sends) |
| Authentication | Clerk development instance |
| PMS | Rentvine sandbox (read-only) |
| Analytics | Disabled |
| Sentry | Disabled |

### Preview (per-PR)

| Attribute | Value |
|---|---|
| URL | `[pr-branch].green-pm-site.pages.dev` (Cloudflare Pages auto-preview) |
| Sanity dataset | `preview` (mirrors production data with one-hour lag) |
| Database | Neon preview branch |
| Email | Postmark sandbox |
| Authentication | Clerk preview instance |
| PMS | Rentvine sandbox |
| Analytics | Disabled |
| Sentry | Enabled, tagged `preview` |

### Production

| Attribute | Value |
|---|---|
| URL | `https://greenpmpnw.com` |
| Sanity dataset | `production` |
| Database | Neon production branch |
| Email | Postmark live |
| Authentication | Clerk production instance |
| PMS | Rentvine live |
| Analytics | Enabled |
| Sentry | Enabled, tagged `production` |

## Deployment pipeline

```
[Local commit] →
[Push to GitHub branch] →
[GitHub Actions: lint, type-check, test] →
[Cloudflare Pages: build Astro, deploy preview URL] →
[Manual or automated approval] →
[Merge to main] →
[Cloudflare Pages: build, deploy to production] →
[Cloudflare Pages: post-deploy webhook → Sentry release marker] →
[Better Stack: receive deploy ping, attach to uptime timeline]
```

### Build steps (per deploy)

1. `pnpm install` (or `npm ci`)
2. `pnpm typecheck` (Astro + TypeScript)
3. `pnpm lint` (ESLint + Stylelint + Prettier check)
4. `pnpm test` (Vitest unit tests if present)
5. `pnpm build` (Astro build)
6. Upload to Cloudflare Pages
7. Sentry source map upload
8. Webhook to deploy log

### Cache invalidation

Sanity webhooks trigger a Cloudflare Pages rebuild on content change. Cloudflare Pages automatically invalidates the CDN cache on deploy. No manual cache invalidation should be necessary.

For ad-hoc cache busts, use Cloudflare's "Purge Everything" option.

## Secrets and configuration management

### Secrets

Never committed to the repository. Stored in:

- Cloudflare Pages environment variables (for build-time secrets)
- Cloudflare Workers KV or Secrets (for runtime secrets accessed by Pages Functions)
- GitHub Actions secrets (for CI/CD)
- A local `.env.local` file (gitignored) for development

### Required secrets

| Secret | Where used | Stored in |
|---|---|---|
| `SANITY_PROJECT_ID` | Astro build | Cloudflare Pages env |
| `SANITY_DATASET` | Astro build | Cloudflare Pages env |
| `SANITY_API_TOKEN` | Astro build (preview content) | Cloudflare Pages env |
| `POSTMARK_SERVER_TOKEN` | Form submission, transactional email | Cloudflare Workers Secrets |
| `HUBSPOT_PORTAL_ID` | HubSpot Forms embed | Cloudflare Pages env |
| `HUBSPOT_API_KEY` | Lead sync | Cloudflare Workers Secrets |
| `CLERK_SECRET_KEY` | Portal authentication | Cloudflare Workers Secrets |
| `CLERK_PUBLISHABLE_KEY` | Portal authentication | Cloudflare Pages env (build-time public) |
| `DATABASE_URL` | Portal data layer | Cloudflare Workers Secrets |
| `RENTVINE_API_KEY` | PMS integration | Cloudflare Workers Secrets |
| `SENTRY_DSN` | Error monitoring | Cloudflare Pages env (build-time public) |
| `SENTRY_AUTH_TOKEN` | Source map upload | GitHub Actions secret |

### Configuration

Non-secret configuration (feature flags, brand-color hex values, sitemap settings) lives in:

- `src/config/site.ts` for site-wide configuration
- `src/config/brand.ts` for brand-system values
- `astro.config.mjs` for build configuration
- `tailwind.config.js` for design tokens
- `sanity.config.ts` for content layer configuration

## Performance budgets

### Marketing site

| Metric | Budget |
|---|---|
| Largest Contentful Paint (LCP) | < 2.0s |
| First Input Delay (FID) / INP | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.0s |
| Initial JS bundle | < 50 KB gzipped |
| Initial CSS bundle | < 30 KB gzipped |
| Total page weight (homepage) | < 500 KB |
| Hero image weight | < 100 KB |
| Lighthouse Performance score | > 90 |
| Lighthouse Accessibility score | > 95 |
| Lighthouse Best Practices score | > 95 |
| Lighthouse SEO score | > 95 |

### Resident portal

| Metric | Budget |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| Initial JS bundle | < 150 KB gzipped (interactive app) |
| Page weight | < 800 KB |

### Owner portal

Same as resident portal.

### Enforcement

- Lighthouse CI runs on every preview deploy
- Bundle size analysis runs on every preview deploy (using `astro build --analyze` or `webpack-bundle-analyzer`-equivalent)
- A budget regression blocks deploy with a label, not a hard fail (requires reviewer override)

## Observability stack

### Logs

Cloudflare Pages Functions logs flow to Cloudflare's log aggregation. Tail logs locally with `wrangler tail`.

For structured logs, format JSON:

```js
console.log(JSON.stringify({
  level: 'info',
  event: 'form_submitted',
  form: 'owner-proposal',
  property_address: '1823 NW 65th St',
  timestamp: new Date().toISOString(),
}));
```

### Metrics

Plausible Analytics dashboard provides:

- Page views by URL
- Top referrers
- Top countries (mostly US, mostly WA)
- Conversion goals (form submissions, portal sign-ins)

### Traces

Not implemented at brand launch scale. Add when:

- A latency issue spans multiple services
- Request volume justifies investment

### Errors

Sentry receives all errors from:

- Astro client-side hydration
- Cloudflare Workers / Pages Functions
- Background jobs

Sentry alerts to Megan via SMS for new error types or sudden frequency increases.

### Uptime monitoring

Better Stack checks every two minutes:

- `https://greenpmpnw.com` (200 OK, root)
- `https://greenpmpnw.com/sitemap.xml` (200 OK, valid XML)
- `https://greenpmpnw.com/rentals` (200 OK)
- Portal sign-in flow (synthetic check, weekly)

Alerts via SMS to Megan if a check fails twice consecutively.

## Backup and disaster recovery

### Backups

| Service | Backup strategy | Retention |
|---|---|---|
| Sanity (content) | Sanity's automatic daily snapshots | 30 days |
| Postgres (portal data) | Neon's point-in-time recovery | 7 days (free tier); 30 days when upgraded |
| GitHub (source code) | GitHub's distributed git copies | Forever |
| Email (Postmark) | Postmark message log | 45 days |
| PMS (Rentvine) | Rentvine's provider-managed backups | Per provider SLA |

### Disaster scenarios

| Scenario | Recovery plan | RTO | RPO |
|---|---|---|---|
| Cloudflare Pages outage | Wait; status page; manual notification to active users | < 4 hours | n/a |
| Sanity outage | Site stays up (statically built); content edits delayed | < 4 hours | n/a |
| Postgres data loss | Restore from Neon PITR backup | < 1 hour | < 5 minutes |
| GitHub account compromise | Use locally-cached clones; restore to new GitHub account; rotate all secrets | < 1 day | 0 |
| Postmark outage | Queue emails; fall back to manual delivery for urgent items | < 4 hours | < 1 hour |
| PMS outage | Notify owners and residents; use email and phone for urgent ops | < 24 hours | 0 |
| Domain seizure or transfer dispute | Pre-stage a backup domain (`greenpmpnw.net`) and update DNS through registrar lock | < 48 hours | n/a |

RTO = Recovery Time Objective. RPO = Recovery Point Objective.

## Security baseline

- HTTPS everywhere (Cloudflare auto-provisions)
- HSTS header set with preload
- CSP header set with strict source allowlist
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Cookies marked `Secure`, `HttpOnly`, `SameSite=Lax`
- Form submissions over HTTPS only
- All third-party scripts loaded from explicit allowed origins
- No `eval()`, no `innerHTML` for untrusted content
- Sanity API token scoped to read-only on production dataset for site build
- Database queries parameterized (no string-concatenated SQL)
- Auth tokens never logged
- PII (renter names, owner financial details) encrypted at rest in Postgres
- Megan, as designated broker, retains responsibility for tenant data per WA RCW

## Forbidden architectural patterns

- Storing secrets in the repository
- Storing secrets in client-side environment variables (anything prefixed `PUBLIC_` is shipped to the browser; secrets must be runtime-only)
- Running production database migrations without a rollback path
- Deploying to production without a preview build
- Disabling Cloudflare Pages preview checks
- Adding a dependency without justification in the PR description
- Adding a service to the stack without a documented purpose
- Long-running serverless functions (Cloudflare Workers cap at 10s; design accordingly)
- Synchronous calls to the PMS API on user-facing requests (always cache or queue)
- Storing PMS API tokens client-side
- Custom authentication when Clerk handles it
- Building features that depend on Sanity's "edit live" capability for production (always rebuild on change)
- Embedding third-party scripts that lack a privacy policy review
- Skipping Lighthouse CI on preview deploys
- Pushing directly to `main` (always via PR)

## Acceptance

This doc is acceptable when:

- A new engineer can understand the stack and its purpose from this doc alone
- Every secret has a documented storage location
- Every environment has a defined data source
- Performance budgets are enforceable in CI
- Disaster scenarios have an RTO and RPO assigned
- Forbidden patterns are flaggable in PR review
