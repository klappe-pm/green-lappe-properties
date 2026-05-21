---
domain: brand
category: design-system
sub-category: user-flows
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 11-audience-modes
  - 80-system-architecture
produces:
  - owner-acquisition-flow
  - renter-acquisition-flow
  - resident-onboarding-flow
  - owner-onboarding-flow
  - rent-payment-flow
  - repair-request-flow
  - lease-renewal-flow
executor: engineering
aliases:
tags:
---

# 81-user-flows

The core user flows the system supports. Owner acquisition, renter acquisition, resident onboarding, owner onboarding, rent payment, repair request, and lease renewal. Each flow specifies the entry point, the steps, the data captured at each step, the success outcome, and the failure modes. Consumed by Astro page authors, the CRM pipeline, and operational runbooks.

## Dependencies

- `11-audience-modes` for which mode each flow operates in
- `80-system-architecture` for the services each flow touches

## Outputs

1. Owner acquisition flow (lead → proposal → agreement)
2. Renter acquisition flow (browse → inquiry → application → lease)
3. Resident onboarding flow (lease signed → portal access → first rent)
4. Owner onboarding flow (agreement signed → portal access → first statement)
5. Rent payment flow (notification → portal → payment → receipt)
6. Repair request flow (report → triage → vendor → resolution)
7. Lease renewal flow (90 days out → recommendation → owner approval → resident decision)
8. Forbidden flow patterns

## Owner acquisition flow

Entry: a prospective small landlord arrives at `greenpmpnw.com/owners` or the homepage.

### Steps

| Step | Action | System touchpoint | Audience mode |
|---|---|---|---|
| 1 | Lands on homepage or `/owners` | Astro page render | neutral-acquisition or owner-acquisition |
| 2 | Reads positioning, pricing, services | Astro static content | owner-acquisition |
| 3 | Clicks "Request a proposal" | Astro page route | owner-acquisition |
| 4 | Lands on proposal request form (`/owners/proposal`) | Astro page with HubSpot form embed | owner-acquisition |
| 5 | Fills form: name, email, phone, property address, number of doors, current PM (if any), message | HubSpot form | owner-acquisition |
| 6 | Submits | HubSpot creates contact and deal | owner-acquisition |
| 7 | Sees success state ("Got it. Megan will email you within one business day.") | Astro success page | owner-acquisition |
| 8 | Receives confirmation email immediately (`prospect-inquiry-received`) | Postmark via HubSpot or direct | n/a |
| 9 | Megan reviews lead in HubSpot; researches property | Manual (HubSpot UI) | n/a |
| 10 | Megan generates proposal document (per `72-document-templates.md`) | Manual + template fill | n/a |
| 11 | Megan sends proposal email with attached PDF | Postmark via HubSpot or manual | n/a |
| 12 | Prospect reviews proposal; replies or schedules a call | Email reply or scheduling link | n/a |
| 13 | Prospect agrees in principle; Megan sends management agreement | DocuSign or PandaDoc | n/a |
| 14 | Prospect signs agreement | DocuSign or PandaDoc | n/a |
| 15 | HubSpot deal moves to "Won"; triggers owner onboarding | HubSpot workflow + manual | n/a |

### Data captured

| Field | Required | Stored in |
|---|---|---|
| First name | yes | HubSpot |
| Last name | yes | HubSpot |
| Email | yes | HubSpot |
| Phone | optional | HubSpot |
| Property address | yes | HubSpot (deal property) |
| Number of doors | yes | HubSpot (deal property) |
| Current PM | optional | HubSpot (deal property) |
| Message | optional | HubSpot (deal note) |
| UTM source | auto | HubSpot |
| Page entered from | auto | HubSpot |

### Success outcome

Signed management agreement. Property added to Rentvine. Owner onboarding flow begins.

### Failure modes and recovery

| Failure | Recovery |
|---|---|
| Prospect submits form but never replies to proposal | HubSpot workflow: 7-day follow-up email; manual call attempt at 14 days; mark "Lost - no response" at 30 days |
| Prospect rejects proposal | Megan replies with thanks; tags reason in HubSpot for pattern analysis |
| Property is outside service area | Auto-response email politely declines and refers to a directory |
| Submission spam | HubSpot spam filter + honeypot field on form |
| Form fails to submit | Inline error; fallback `mailto:` link to Megan |

## Renter acquisition flow

Entry: a prospective renter arrives at `greenpmpnw.com/rentals` or via a listing aggregator (Zillow, Apartments.com, Craigslist).

### Steps

| Step | Action | System touchpoint | Audience mode |
|---|---|---|---|
| 1 | Lands on `/rentals` listings index | Astro page with listings from Sanity | renter-acquisition |
| 2 | Filters by neighborhood, beds, rent range | Astro client-side filter | renter-acquisition |
| 3 | Clicks a listing card | Astro page route | renter-acquisition |
| 4 | Lands on listing detail page (`/rentals/[slug]`) | Astro page | renter-acquisition |
| 5 | Reviews photos, address, rent, features | n/a | renter-acquisition |
| 6 | Clicks "Inquire about this home" | Astro page route | renter-acquisition |
| 7 | Lands on inquiry form | Astro page with HubSpot form | renter-acquisition |
| 8 | Fills: name, email, phone, move-in date, message | HubSpot form | renter-acquisition |
| 9 | Submits | HubSpot creates contact and deal | renter-acquisition |
| 10 | Sees success state | Astro success page | renter-acquisition |
| 11 | Receives confirmation email | Postmark | n/a |
| 12 | Megan replies within one business day (manual or templated) | Email | n/a |
| 13 | Megan schedules showing (in person or video tour) | Email + calendar link | n/a |
| 14 | Showing happens; renter decides to apply | n/a | n/a |
| 15 | Megan sends application link (`/rentals/apply`) | Email | n/a |
| 16 | Renter completes application: ID, employment, references, prior addresses, credit auth | Rentvine application portal (initially) | renter-product |
| 17 | Megan reviews application; runs background and credit; checks references | Rentvine + manual | n/a |
| 18 | Megan approves or declines | Manual | n/a |
| 19 | If approved: Megan generates lease; sends for signature | Rentvine or DocuSign | n/a |
| 20 | Renter signs; Megan countersigns on behalf of owner | DocuSign or Rentvine | n/a |
| 21 | Resident onboarding flow begins | n/a | n/a |

### Data captured

| Field | When | Stored in |
|---|---|---|
| Name, email, phone, move-in date, message | At inquiry | HubSpot |
| ID document, employment, income, references | At application | Rentvine |
| Background check, credit check results | At screening | Rentvine |
| Signed lease | At lease execution | Rentvine + Sanity (metadata only) |

### Success outcome

Signed lease. Resident becomes a customer. Property moves from "vacant" to "leased" in Rentvine and the listing is delisted from `/rentals`.

### Failure modes and recovery

| Failure | Recovery |
|---|---|
| Renter inquiry without follow-up | One-time follow-up email after 48 hours; close lead at 14 days if no response |
| Application declined | Megan emails decision with no specific reasons (per FCRA compliance, point to adverse action letter from screening provider) |
| Application withdrawn | Mark as "Withdrawn"; archive |
| Listing leased before application submitted | Auto-email update + offer to notify on future listings |

## Resident onboarding flow

Entry: lease signed.

### Steps

| Step | Action | System touchpoint | Audience mode |
|---|---|---|---|
| 1 | Lease signed by both parties | Rentvine | n/a |
| 2 | Welcome email sent (`resident-welcome`) | Postmark | n/a |
| 3 | Resident clicks portal sign-in link in welcome email | Email link | n/a |
| 4 | Resident creates Clerk account or signs in via magic link | Clerk auth | renter-product |
| 5 | Lands on resident portal dashboard (`/portal/resident`) | Astro authenticated route | renter-product |
| 6 | Sees: property info, lease summary, next rent due, no open repairs (empty state), notifications | Astro + Postgres + Rentvine API | renter-product |
| 7 | Optionally completes profile (preferred contact method, emergency contact) | Form | renter-product |
| 8 | Optionally enrolls in autopay | Rentvine payment portal | renter-product |
| 9 | Move-in day: Megan inspects property with resident; documents condition with photos | Manual + Rentvine | n/a |
| 10 | Move-in inspection report uploaded to portal | Rentvine | renter-product |
| 11 | First rent due notification scheduled per lease terms | Postmark + portal | n/a |

### Success outcome

Resident has portal access, has acknowledged move-in inspection, and is prepared for first rent payment.

### Failure modes and recovery

| Failure | Recovery |
|---|---|
| Resident never signs into portal | Megan calls to walk through portal setup |
| Resident loses portal access (forgot login) | Clerk's magic-link sign-in handles most cases; Megan can reset manually |
| Move-in inspection disputes | Megan reviews photos and resident notes; resolves before first rent due |

## Owner onboarding flow

Entry: management agreement signed.

### Steps

| Step | Action | System touchpoint |
|---|---|---|
| 1 | Agreement signed | DocuSign or PandaDoc |
| 2 | Welcome email sent (`owner-welcome`) | Postmark |
| 3 | Owner clicks portal sign-in link | Email link |
| 4 | Owner creates Clerk account | Clerk auth |
| 5 | Lands on owner portal dashboard (`/portal/owner`) | Astro authenticated route |
| 6 | Property added to Rentvine | Manual + Rentvine API |
| 7 | If property is occupied: existing lease and resident data migrated | Manual + Rentvine |
| 8 | If property is vacant: listing prep begins (photos, copy, listing on Zillow and Apartments.com syndication) | Manual + Rentvine |
| 9 | First statement issues on the 10th of the month following first rent collection | Rentvine + Postmark |

## Rent payment flow

Entry: rent due date approaches.

### Steps

| Step | Action | System touchpoint |
|---|---|---|
| 1 | 5 days before due date: reminder email sent (`resident-rent-reminder`) | Postmark |
| 2 | Day of due date: due-today email sent (`resident-rent-due-today`) | Postmark |
| 3 | Resident clicks "Pay rent" CTA | Email link → portal |
| 4 | Lands on payment page in portal | Rentvine payment widget embedded in Astro page |
| 5 | Selects payment method (ACH, debit, credit) | Rentvine |
| 6 | Submits payment | Rentvine processor |
| 7 | Sees confirmation; receives receipt email (`resident-payment-received`) | Rentvine + Postmark |
| 8 | Payment posts to ledger; owner's running balance updates | Rentvine |
| 9 | If rent not received by grace period end (typically day 5): late notice email (`resident-rent-overdue`) | Postmark |
| 10 | Late fee posts per lease terms | Rentvine |
| 11 | If unpaid by day 14: Megan calls resident | Manual |
| 12 | If unpaid by day 21: 14-day pay-or-vacate notice prepared per WA RCW 59.12 | Manual + `72-document-templates.md` |

## Repair request flow

Entry: resident or Megan identifies a repair need.

### Steps

| Step | Action | System touchpoint |
|---|---|---|
| 1 | Resident reports via portal or text | Portal + Rentvine API |
| 2 | Repair logged in Rentvine | Rentvine |
| 3 | Resident receives confirmation email (`resident-repair-logged`) | Postmark |
| 4 | Megan triages: severity, vendor needed, owner approval threshold (typically $500) | Manual |
| 5 | If under threshold: Megan dispatches vendor | Manual + Rentvine |
| 6 | If over threshold: Megan emails owner for approval (`owner-approval-needed`) | Postmark |
| 7 | Owner approves or declines via email reply or portal | Postmark or portal |
| 8 | Vendor scheduled | Manual + Rentvine |
| 9 | Resident notified (`resident-repair-scheduled`) | Postmark |
| 10 | Owner notified (`owner-repair-update`) | Postmark |
| 11 | Vendor completes work | Manual |
| 12 | Megan verifies (photos, possibly site visit) | Manual |
| 13 | Repair marked complete in Rentvine | Rentvine |
| 14 | Resident and owner receive completion emails (`resident-repair-complete`, `owner-repair-update`) | Postmark |
| 15 | Expense posts to property ledger; reflects on next statement | Rentvine |

## Lease renewal flow

Entry: lease end date is 120 days away.

### Steps

| Step | Action | System touchpoint |
|---|---|---|
| 1 | Day −120: Rentvine flags upcoming renewal | Rentvine |
| 2 | Megan reviews resident history (payment record, repair record, communication tone) | Manual |
| 3 | Megan analyzes market: comps in neighborhood, HB 1217 cap, owner preferences | Manual |
| 4 | Megan prepares renewal recommendation for owner | Per `72-document-templates.md` letter template |
| 5 | Day −110: Megan sends recommendation email to owner (`owner-lease-renewal-recommendation`) | Postmark |
| 6 | Owner replies with decision: accept recommendation, adjust price, decline to renew | Email |
| 7 | Day −95: Megan sends renewal offer to resident (with required notice; 90 days minimum) | Postmark + `72-document-templates.md` |
| 8 | Resident has 60 days to accept or decline | n/a |
| 9 | If accepted: renewal lease executed | DocuSign or Rentvine |
| 10 | If declined: turnover process begins (move-out coordination, vacancy preparation, re-listing) | Manual + Rentvine |
| 11 | New lease term begins; first new-term rent due as scheduled | Rentvine |

## Forbidden flow patterns

- Synchronous PMS API calls during user-facing requests (always cache or queue)
- Forms without explicit success and failure states
- Email-only notification of legally-required actions (statutory notices must be physically delivered)
- Skipping the named-operator signature on any owner or resident communication
- Letting a lead languish in HubSpot without a defined next-step due date
- Initiating onboarding before signed agreement
- Posting a listing before move-out cleaning and turnover are confirmed
- Approving a repair over the threshold without owner consent
- Charging late fees before the grace period ends
- Letting a renewal recommendation skip the 90-day notice window

## Acceptance

This doc is acceptable when:

- Every flow has explicit entry, steps, success outcome, and failure recovery
- Every flow names the system touchpoints (Astro, HubSpot, Rentvine, Postmark, Clerk, Postgres)
- An engineer can implement any flow from these specs without ambiguity
- An operational runbook can be derived from these flows
- Forbidden patterns are flaggable during review
