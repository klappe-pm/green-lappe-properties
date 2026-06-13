---
domain: brand
category: design-system
sub-category: data-flows
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 80-system-architecture
produces:
  - sanity-to-astro-flow
  - hubspot-flow
  - rentvine-sync-flow
  - postmark-flow
  - clerk-flow
  - data-flow-diagrams
  - failure-mode-handling
executor: engineering
aliases: []
tags: []
---

# 82-data-flows

How data moves between services: Sanity → Astro (content publish), HubSpot (CRM events), Rentvine (PMS sync), Postmark (transactional email), Clerk (auth), and Postgres (portal data). Each flow specifies the direction, the trigger, the payload, the latency expectation, and the failure handling. Consumed by integration engineers and the operational runbook.

## Dependencies

- `80-system-architecture` for the services in the stack

## Outputs

1. Sanity to Astro content publish flow
2. HubSpot lead and deal flow
3. Rentvine PMS sync flow
4. Postmark transactional email flow
5. Clerk authentication flow
6. Postgres portal data flow
7. Cross-service data ownership matrix
8. Failure mode handling

## Service responsibilities

The principle: each service owns its data. Other services consume that data via read APIs or webhooks. Never duplicate write-authoritative data across services.

| Service | Owns |
|---|---|
| Sanity | Marketing content (listings, blog, pages, FAQs, team) |
| HubSpot | Leads, deals, contacts (CRM) |
| Rentvine | Properties, leases, residents, rent ledger, repairs |
| Clerk | User identities (portal sign-in) |
| Postgres | Portal-specific extensions (notifications, preferences, audit log) |
| Postmark | Email delivery (transactional and broadcast) |
| Plausible | Web analytics |
| Sentry | Error events |

## Sanity to Astro flow

### Direction

Sanity → Astro build pipeline → Cloudflare Pages → CDN → browser.

### Trigger

1. Content editor publishes in Sanity Studio
2. Sanity webhook fires to Cloudflare Pages deploy hook
3. Cloudflare Pages rebuilds the Astro site
4. New site deployed to CDN

### Payload

| Source | Type | Destination |
|---|---|---|
| Sanity dataset (production) | All published documents | Astro `getCollection()` calls at build time |
| Sanity image assets | CDN-served images | Browser via `https://cdn.sanity.io/images/[project-id]/[dataset]/...` |

### Latency

- Webhook to rebuild start: < 5 seconds
- Build duration: 30 to 90 seconds (depending on listing count and image processing)
- CDN propagation: < 30 seconds
- Total publish-to-live: typically 2 minutes; up to 5 minutes worst case

### Failure modes

| Failure | Handling |
|---|---|
| Sanity webhook fails to fire | Cloudflare Pages has a manual deploy button; Megan can trigger manually |
| Build fails | Cloudflare Pages reports failure; previous deploy stays live; Sentry captures build error |
| Build succeeds but a listing renders broken | Visual regression check (manual review of first preview deploy after major content change) |
| Sanity outage | Site stays up with last successful build; content changes blocked until Sanity recovers |

## HubSpot lead and deal flow

### Direction

Astro form → HubSpot Forms API → HubSpot CRM.

### Trigger

User submits a form on the Astro site (`/owners/proposal`, `/rentals/inquire`).

### Payload

```json
{
  "form_id": "owner-proposal",
  "fields": {
    "first_name": "...",
    "last_name": "...",
    "email": "...",
    "phone": "...",
    "property_address": "...",
    "number_of_doors": 4,
    "current_pm": "...",
    "message": "..."
  },
  "context": {
    "hutk": "...",
    "page_uri": "...",
    "ip_address": "...",
    "utm_source": "...",
    "utm_medium": "...",
    "utm_campaign": "..."
  }
}
```

### Outcome

1. HubSpot creates or updates the contact
2. HubSpot creates a deal in the "New Leads" stage
3. HubSpot workflow fires: tags the deal, assigns to Megan, sends an internal notification
4. HubSpot triggers an automated acknowledgment email to the prospect
5. Astro renders the form success state

### Latency

- Form submit to HubSpot receipt: < 2 seconds
- HubSpot workflow execution: < 30 seconds
- Acknowledgment email delivery: < 60 seconds

### Failure modes

| Failure | Handling |
|---|---|
| HubSpot API timeout | Astro page shows generic error; offers `mailto:` fallback; logs to Sentry |
| HubSpot rate limit hit | Retry with exponential backoff (3 attempts); fall back to direct Postmark notification + queue for HubSpot sync |
| Duplicate contact (same email submits twice) | HubSpot updates existing contact; creates new deal; Megan sees duplicate flag |
| Form spam | Honeypot field + Cloudflare Turnstile; rejected submissions logged but not stored |

## Rentvine PMS sync flow

### Direction

Bidirectional between Rentvine and the portal. Rentvine is authoritative for operational data; the portal reads it.

### Read flow (portal displaying PMS data)

1. Resident or owner authenticates via Clerk
2. Portal requests data from a Cloudflare Pages Function backend route
3. Function authenticates the user, derives their Rentvine account mapping
4. Function calls Rentvine API with the API key, scoped to that user's data
5. Function returns sanitized data to the browser
6. Browser renders

### Cache strategy

Rentvine reads are cached briefly in Cloudflare Workers KV:

| Data type | Cache duration |
|---|---|
| Statements | 5 minutes |
| Current rent ledger | 1 minute |
| Property details | 15 minutes |
| Lease document | 1 hour |
| Repair list | 1 minute |
| Resident contact info | 5 minutes |

### Write flow (portal initiating PMS action)

| Action | Path |
|---|---|
| Rent payment | Embed Rentvine's payment widget directly (avoids handling payment through the portal) |
| Repair request | POST to Cloudflare Function → Rentvine API |
| Profile update | POST to Cloudflare Function → Rentvine API for PMS-tracked fields; Postgres for portal-only fields |

### Sync frequency

Rentvine to portal: real-time on user request (with cache).
Portal to Rentvine: real-time on user action.

No background polling. No periodic batch sync.

### Failure modes

| Failure | Handling |
|---|---|
| Rentvine API timeout | Portal displays cached data with a banner ("Last updated [time]; some data may be stale") |
| Rentvine API authentication failure | Portal logs out user; redirects to sign-in; Sentry alerts Megan |
| Rentvine rate limit | Cache aggressively; rate-limit user actions client-side |
| Rentvine outage | Portal displays degraded UI with messaging; rent payment falls back to email instruction |

## Postmark transactional email flow

### Direction

Application server → Postmark API → recipient inbox.

### Trigger

Multiple triggers across the system; see `73-email-notifications.md` for the full catalog.

### Payload

```json
{
  "From": "Megan Green <megan@greenpmpnw.com>",
  "To": "owner@example.com",
  "Subject": "Your November statement is ready",
  "TemplateAlias": "owner-statement-ready",
  "TemplateModel": {
    "owner_first_name": "John",
    "statement_period": "November 2026",
    "property_address": "1823 NW 65th St",
    "net_to_owner": "$2,268.50",
    "statement_url": "https://greenpmpnw.com/portal/owner/statements/2026-11"
  },
  "MessageStream": "outbound"
}
```

### Postmark configuration

| Setting | Value |
|---|---|
| Server | Production server with separate broadcast and transactional streams |
| Domain | `greenpmpnw.com` (DKIM, SPF, DMARC configured) |
| Tracking | Opens tracked; clicks tracked; no pixel-level user identification |
| Bounce handling | Automatic; deliverability dashboard reviewed weekly |
| Suppression list | Maintained automatically; honors unsubscribe |

### Latency

- API send to inbox: typically < 60 seconds; bounded at < 5 minutes
- Bounce notification: within 1 hour for hard bounces

### Failure modes

| Failure | Handling |
|---|---|
| Postmark outage | Queue emails in Postgres outbox table; replay when service restored |
| Hard bounce | Suppress that address; alert Megan via Sentry log |
| Soft bounce | Postmark retries automatically |
| Recipient marks as spam | Suppress immediately; remove from broadcast streams |
| Template missing | Application logs error; falls back to plain-text version |

## Clerk authentication flow

### Direction

User browser ↔ Clerk hosted endpoints ↔ Cloudflare Functions.

### Sign-in flow

1. User visits `/portal/resident` or `/portal/owner`
2. Astro page detects no session; redirects to Clerk sign-in
3. User enters email; Clerk sends magic link
4. User clicks magic link
5. Clerk creates session and returns user to portal
6. Astro page (or Cloudflare Function) verifies session token
7. Application loads user-specific data

### Session

| Setting | Value |
|---|---|
| Session lifetime | 30 days (refresh on activity) |
| Single sign-on | Not used at launch |
| Multi-factor authentication | Optional; enabled by default for owner portal, optional for resident portal |
| Password authentication | Not offered (magic links and OAuth only) |

### Failure modes

| Failure | Handling |
|---|---|
| Clerk outage | Portal sign-in unavailable; site marketing pages stay up; Megan notified |
| User can't access email for magic link | Megan can manually verify identity and reset via Clerk admin |
| Session token tampering | Cloudflare Function rejects; logs to Sentry |

## Postgres portal data flow

### Direction

Cloudflare Functions ↔ Postgres (Neon).

### Schema

Portal extensions only. Operational data lives in Rentvine.

| Table | Purpose |
|---|---|
| `notifications` | Portal-displayed notifications (read/unread) |
| `preferences` | User communication preferences (email frequency, channels) |
| `audit_log` | Portal user actions (sign-in, profile update, payment initiated) |
| `feedback` | Optional NPS or feedback submissions |
| `saved_searches` | (Future) Renter saved search criteria |

### Queries

Always parameterized. Use a connection pool. Never expose direct database access to the browser.

### Backups

Neon point-in-time recovery covers the last 7 days (free tier) or 30 days (paid). Daily logical backups exported to Cloudflare R2 (encrypted) for longer retention.

### Failure modes

| Failure | Handling |
|---|---|
| Neon outage | Portal disables features that depend on Postgres; PMS-sourced features (statements, rent) continue working |
| Connection pool exhaustion | Function returns 503; client retries with backoff |
| Migration failure | Migrations run as transactions; failure rolls back; Sentry alerts |

## Cross-service data ownership matrix

| Data | Owner | Read access |
|---|---|---|
| Marketing content (listings, blog, pages) | Sanity | Astro (build time); Cloudflare CDN (runtime) |
| Lead contact info | HubSpot | Megan; no portal access |
| Deal status | HubSpot | Megan |
| User identity | Clerk | Portal Functions; never exposed to other services |
| Property and lease | Rentvine | Portal Functions (cached); Astro at build for public listing data |
| Rent ledger | Rentvine | Portal Functions |
| Repair tickets | Rentvine | Portal Functions |
| Statements | Rentvine | Portal Functions; PDF copies retained 7 years |
| Portal notifications | Postgres | Portal Functions |
| User preferences | Postgres | Portal Functions |
| Audit log | Postgres | Portal Functions (admin only) |
| Email send log | Postmark | Postmark dashboard; not exposed to user |
| Analytics events | Plausible | Megan via Plausible dashboard |
| Error events | Sentry | Engineering via Sentry dashboard |

## Failure mode handling principles

1. **Graceful degradation.** When a service fails, the affected feature degrades visibly rather than the whole portal crashing.
2. **No cascading failure.** A Rentvine outage must not crash Astro page rendering for marketing content (which doesn't depend on Rentvine).
3. **Explicit user messaging.** When data is stale or unavailable, tell the user. Do not show empty states that imply "no data."
4. **Log to Sentry.** Every cross-service failure is captured with context (user ID redacted, service name, error class, timestamp).
5. **Manual escalation path.** Megan is the operator of last resort. Every flow has a manual fallback (email, phone, in-person).

## Forbidden data patterns

- Duplicating write-authoritative data across services without a documented sync
- Exposing PMS API tokens client-side
- Storing payment card details outside the PMS payment processor
- Logging passwords, full payment data, or full Social Security numbers
- Polling third-party APIs on every page load (always cache)
- Sending PII over unencrypted channels
- Granting Sanity read tokens production-write permission
- Storing emails or other PII in browser localStorage
- Cross-service joins at request time (denormalize via the source service)
- Synchronous PMS calls in the critical render path

## Acceptance

This doc is acceptable when:

- Every cross-service interaction has a documented direction, trigger, payload, latency, and failure handling
- Data ownership is unambiguous for every field
- An engineer can trace any data point back to its authoritative owner
- Failure handling is graceful and documented
- Forbidden patterns are flaggable during architectural review
