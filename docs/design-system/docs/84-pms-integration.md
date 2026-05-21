---
domain: brand
category: design-system
sub-category: pms-integration
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 80-system-architecture
  - 82-data-flows
produces:
  - rentvine-config
  - rentvine-embedded-widgets
  - appfolio-migration-plan
  - theming-constraints
  - data-mapping
  - launch-checklist
executor: engineering
aliases:
tags:
---

# 84-pms-integration

The Property Management System (PMS) integration spec. Rentvine at launch; AppFolio at 50+ doors. Defines what's embedded vs custom, what theming is possible, how data syncs, and the migration path. Consumed by the engineering team configuring Rentvine, building Astro portal pages, and planning the AppFolio migration.

## Dependencies

- `80-system-architecture` for the overall stack context
- `82-data-flows` for the read/write patterns

## Outputs

1. Rentvine configuration (account setup, API access, owner/resident portal config)
2. Embedded widget mapping (which Rentvine surfaces embed in Astro vs custom)
3. Theming constraints (what can be branded, what can't)
4. Data field mapping (Rentvine fields ↔ Sanity/Postgres)
5. AppFolio migration plan
6. Pre-launch checklist
7. Operational handoff to Megan
8. Forbidden integration patterns

## Why Rentvine at launch

Rentvine is chosen because:

1. **Pricing matches portfolio size.** Rentvine charges per-unit; affordable at 1 to 50 doors
2. **Modern UI.** Resident and owner portals are usable, not 2008-era
3. **Embeddable widgets.** Rent payment, resident application, and statements can embed in Astro pages
4. **API access.** Read-write API for custom integrations
5. **Migration story to AppFolio.** Industry-standard data export when scale demands

Trade-offs:

- Less feature-deep than AppFolio (acceptable at launch scale)
- Smaller vendor; more dependent on their ongoing development
- Some workflows still require Rentvine UI access (acceptable; Megan can use it directly)

## Rentvine account setup

| Item | Value |
|---|---|
| Account name | Green Property Management |
| Account owner | Megan Green |
| Plan | Per-unit pricing (verify current tiering at signup) |
| Branding | Custom logo upload (Cedar wordmark); accent color (Cedar); company URL (greenpmpnw.com) |
| Time zone | America/Los_Angeles |
| Domain (resident portal) | `portal.greenpmpnw.com` (CNAME to Rentvine subdomain) or hosted at Rentvine domain |
| Email sender | `hello@greenpmpnw.com` (configured via Rentvine's email settings; or override and use Postmark) |
| Payment processor | Rentvine's integrated processor (ACH free; card per transaction) |
| Owner payout | ACH direct deposit, configurable per owner |

## What's embedded vs custom

The Astro site uses Rentvine where it makes sense to embed, and custom Astro pages where the brand experience benefits from a from-scratch implementation.

### Embedded from Rentvine

| Surface | Why embedded |
|---|---|
| Rent payment widget (in resident portal) | Payment compliance and PCI scope handled by Rentvine; never reinvent payments |
| Application form | Rentvine's screening provider integration; data flows directly into the system |
| Maintenance request submission (initially) | Routes directly into Rentvine's repair queue with vendor dispatch logic |

### Custom in Astro

| Surface | Why custom |
|---|---|
| Marketing site (`/`, `/owners`, `/rentals`, `/blog`, `/about`) | Brand expression; not appropriate for PMS theming |
| Listings index and detail (`/rentals`) | Brand expression; pulls listing data from Sanity (which mirrors Rentvine listing data) |
| Resident portal dashboard (`/portal/resident`) | Custom-themed dashboard pulls Rentvine data via API; presents in brand UI |
| Resident statements view | Custom Astro page reading Rentvine API; presents per `70-data-display.md` |
| Owner portal dashboard (`/portal/owner`) | Same approach as resident |
| Owner statement detail view | Custom |

### Decision tree for embed vs custom

- **Sensitive operation (payment, application, identity verification)?** Embed.
- **Read-only display of PMS data?** Custom (read via API, present in brand UI).
- **Heavy form workflow (application, lease signing)?** Embed initially; revisit at scale.

## Theming constraints

Rentvine's embedded widgets and hosted pages allow limited theming:

| Element | Themeable | How |
|---|---|---|
| Logo | Yes | Upload Cedar-on-Cream wordmark PNG/SVG |
| Primary accent color | Yes | Set to Cedar `#2D6A4F` |
| Secondary accent | Limited | Set to Clay `#A95C42` if Rentvine supports |
| Font | No (or limited) | Rentvine uses its own typeface; embedded widgets won't match Geist |
| Layout | No | Rentvine controls layout |
| Microcopy | No | Rentvine controls button labels and form messages |

### Mitigating font and microcopy mismatch

The embedded widgets will not match brand typography or voice. Two mitigations:

1. **Visual buffer.** Place a clearly Brand-themed Astro header above the embed; the user understands they've entered a tool, not left the brand
2. **Custom-pull where possible.** For surfaces where custom feels worth the engineering effort, pull from the API instead of embedding (e.g., display statement summary in branded Astro; link "Full statement in Rentvine" only when needed)

## Data field mapping

Rentvine maintains the source of truth for operational data. When the same field appears in multiple places (e.g., listing data in Rentvine and Sanity), Rentvine is authoritative and Sanity mirrors.

### Property

| Concept | Rentvine field | Sanity (listing) field | Postgres |
|---|---|---|---|
| Address | property.address | listing.address | n/a |
| Beds | property.bedrooms | listing.bedrooms | n/a |
| Baths | property.bathrooms | listing.bathrooms | n/a |
| Square footage | property.sqft | listing.sqft | n/a |
| Year built | property.year_built | listing.yearBuilt | n/a |
| Listing rent | unit.rent | listing.rent | n/a |
| Availability date | unit.available_date | listing.availableDate | n/a |
| Photos | property.photos | listing.photos (CDN URLs) | n/a |
| Description | unit.description | listing.description | n/a |

Listings publish workflow: Megan edits in Sanity for marketing-quality copy; she also enters core data into Rentvine for operational tracking. A future enhancement could sync one to the other; at launch, dual entry is acceptable.

### Lease

| Concept | Source | Notes |
|---|---|---|
| Lease start, end, rent, deposit | Rentvine | Authoritative |
| Lease PDF | Rentvine | Stored as document |
| Lease parties | Rentvine | Owner, resident, manager |
| Lease compliance state (HB 1217 cap applied?) | Rentvine | Maintained by Megan |

### Resident

| Concept | Source | Notes |
|---|---|---|
| Identity (legal name, DOB, ID) | Rentvine | Captured at application |
| Contact info | Rentvine | Email, phone |
| Portal sign-in | Clerk (separate identity) | Linked to Rentvine resident ID |
| Communication preferences | Postgres | Portal extension |
| Notification log | Postgres | Read/unread state |

### Owner

| Concept | Source | Notes |
|---|---|---|
| Identity | Rentvine | Captured at agreement |
| Contact info | Rentvine | Email, phone, address |
| Banking (payout) | Rentvine | ACH details |
| Portal sign-in | Clerk | Linked to Rentvine owner ID |

### Financials

All financial state lives in Rentvine:

- Rent collected
- Late fees
- Management fee
- Vendor expenses
- Reserve activity
- Owner payouts
- 1099 totals

The portal reads and presents; never duplicates.

## AppFolio migration plan

Trigger: portfolio crosses 50 doors, or Rentvine's feature gaps become operationally costly.

### Pre-migration checklist

1. Six months of clean Rentvine data (statements, ledgers, lease records)
2. AppFolio account provisioned and billed
3. AppFolio onboarding specialist engaged
4. Data export from Rentvine validated (run a test export and review)
5. Communication plan for owners and residents (one month notice)
6. Cutover date set (typically first of a month, after that month's statements close)
7. Portal API integration updated for AppFolio endpoints (custom adapter)

### Migration steps

| Step | Action | Owner | Risk |
|---|---|---|---|
| 1 | Export from Rentvine | Megan + Rentvine support | Low |
| 2 | Import to AppFolio | Megan + AppFolio onboarding | Medium |
| 3 | Validate every property, lease, ledger balance | Megan | High (any miss is expensive) |
| 4 | Reconfigure embedded widgets on Astro to point to AppFolio | Engineering | Medium |
| 5 | Update portal API integration to AppFolio endpoints | Engineering | Medium |
| 6 | Update email templates with new portal URLs | Engineering | Low |
| 7 | Resident communication: portal URL change, what to expect | Megan | Low |
| 8 | Owner communication: same | Megan | Low |
| 9 | Cutover date: turn off Rentvine, turn on AppFolio | Engineering + Megan | High |
| 10 | Monitor for two weeks; keep Rentvine in read-only access for audit purposes | Engineering | Low |

### Migration timeline estimate

- Planning and pre-migration: 60 days
- Active migration: 14 to 30 days
- Post-migration monitoring: 30 to 60 days
- Total: 4 to 6 months calendar

## Pre-launch checklist

Before the brand goes live with Rentvine and the portal:

- [ ] Rentvine account provisioned
- [ ] Rentvine branding configured (logo, color, URL)
- [ ] Rentvine email sender configured and DKIM/SPF verified
- [ ] Payment processor set up with Rentvine
- [ ] First test property added in Rentvine
- [ ] First test resident added; portal access tested
- [ ] First test rent payment processed
- [ ] First test statement generated
- [ ] First test repair request submitted and worked through to "Complete"
- [ ] API key generated and stored in Cloudflare Workers Secrets
- [ ] Astro portal pages built and consuming Rentvine API
- [ ] Clerk to Rentvine identity mapping tested
- [ ] Portal sign-in flow tested for both owner and resident
- [ ] Cache behavior verified (5-minute statement cache, 1-minute ledger cache)
- [ ] Error states tested (Rentvine outage simulation)
- [ ] Email notifications fire on the right triggers
- [ ] Megan trained on Rentvine's day-to-day UI
- [ ] Megan trained on resident-side and owner-side portal experience

## Operational handoff to Megan

Megan should be able to:

- Add a property in Rentvine
- Add an owner in Rentvine
- Add a resident, lease, and unit in Rentvine
- Generate a monthly statement
- Process a payment manually (rare; usually automated)
- Log a repair, assign a vendor, mark complete
- Run an application screening
- Generate a lease document
- Generate a formal notice
- Pull a year-end report for 1099s

Most of this lives in Rentvine's UI. The brand portal is a presentation layer; operational work happens in Rentvine for Megan.

## Forbidden integration patterns

- Synchronous Rentvine API calls in the critical render path
- Storing Rentvine API tokens in the browser
- Duplicating Rentvine data in Postgres without a defined sync mechanism
- Building custom payment processing (regulatory and PCI scope)
- Custom-storing rent ledger entries outside Rentvine
- Bypassing Rentvine's lease compliance logic (HB 1217 caps, notice periods)
- Migrating to AppFolio without a documented cutover plan
- Migrating to AppFolio without resident and owner communication
- Custom-building screening (use Rentvine's vetted screening provider)
- Embedding Rentvine widgets without a brand-themed wrapper page

## Acceptance

This doc is acceptable when:

- An engineer can configure Rentvine from scratch using these specs
- Every PMS field has a documented owner (Rentvine, Sanity, or Postgres)
- Embed vs custom decision is unambiguous for any new surface
- The AppFolio migration plan is executable when triggered
- Megan can perform her daily operations using Rentvine's UI
- Forbidden patterns are flaggable during architectural review
