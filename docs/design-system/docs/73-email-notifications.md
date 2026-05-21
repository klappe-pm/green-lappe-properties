---
domain: brand
category: design-system
sub-category: email-notifications
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 03-voice
  - 04-microcopy
  - 22-typography-usage
  - 30-design-tokens
  - 52-component-grammar
produces:
  - email-architecture-rules
  - transactional-template-specs
  - subject-line-rules
  - email-html-implementation
  - inbox-rendering-rules
  - forbidden-email-patterns
executor: engineering
aliases:
tags:
---

# 73-email-notifications

The complete email template system. Every transactional email Green PM sends, with subject line, body structure, HTML implementation that survives every major email client, and the rules that govern when emails fire. Consumed by the email pipeline (Postmark or AWS SES) and the template author.

## Dependencies

- `03-voice` for the named-operator, direct, calm tone
- `04-microcopy` for the approved subject line bank
- `22-typography-usage` for email typography (with email-safe fallbacks)
- `30-design-tokens` for colors (with hex values that work in email)
- `52-component-grammar` for button patterns adapted to email HTML

## Outputs

1. Email architecture rules (structure every email follows)
2. Transactional template catalog (every email the system sends)
3. Subject line rules and approved bank
4. Email HTML implementation (table-based for client compatibility)
5. Mobile rendering rules
6. Sender identity rules (from, reply-to, signing)
7. Forbidden email patterns

## Design rationale

Email is the channel where the brand voice meets the inbox. Most emails are read in two seconds; subject lines decide whether they're opened. The brand voice principles (direct, specific, calm) apply more strictly to email than anywhere else.

Two operational considerations override design preference:

1. **Email clients render HTML inconsistently.** Gmail, Outlook, Apple Mail, and Yahoo each interpret CSS differently. The template strategy is table-based HTML with inline styles, falling back gracefully when CSS is stripped.
2. **Custom fonts often don't load in email.** Geist and Newsreader are linked, but the email must read correctly in Georgia (body fallback) and system-ui (display fallback).

## Email architecture

Every email follows this structure:

1. **Preheader** (first ~80 characters; shows in inbox preview)
2. **Header bar** (Cream background; wordmark left; small operator photo right)
3. **Body** (Newsreader text where possible, Geist for headings)
4. **Primary action** (single button; Clay)
5. **Sign-off** (Megan, named operator)
6. **Footer** (legal, unsubscribe where applicable, contact)

### Preheader

The text after the subject line in inbox preview. Set via hidden text at the very top of the body:

```html
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
  Your November statement is ready. Net to owner: $2,268.50.
</div>
```

The preheader is concrete and informative, not promotional.

### Header bar

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="background-color:#FBF6EC; padding:24px 32px;">
      <table role="presentation" width="100%">
        <tr>
          <td>
            <span style="font-family:'Geist',Georgia,'Times New Roman',serif; font-size:18px; font-weight:600; color:#2D6A4F; letter-spacing:-0.02em;">
              Green Property Management
            </span>
          </td>
          <td align="right">
            <img src="https://greenpmpnw.com/megan-avatar.jpg" alt="Megan Green" width="40" height="40" style="border-radius:50%; display:block;" />
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

### Body container

```html
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:600px; margin:0 auto;">
  <tr>
    <td style="padding:32px; background-color:#F7F5F0;">
      <!-- content -->
    </td>
  </tr>
</table>
```

600px is the most reliable email body width across clients. Wider widths break in Outlook and some Gmail variants.

### Primary action button

Email buttons must be styled as bulletproof buttons (no CSS-only buttons; Outlook strips them):

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" style="margin:24px 0;">
  <tr>
    <td bgcolor="#A95C42" style="border-radius:8px; padding:14px 24px;">
      <a href="https://greenpmpnw.com/portal/owner/statements/2026-11" style="display:inline-block; font-family:'Geist',Georgia,serif; font-size:16px; font-weight:600; color:#FBF6EC; text-decoration:none;">
        View statement
      </a>
    </td>
  </tr>
</table>
```

### Sign-off

```html
<p style="font-family:'Geist',Georgia,serif; font-size:16px; color:#1F2A2E; margin:24px 0 0;">
  Megan
</p>
```

For high-trust emails (statement, proposal follow-up), use the Fraunces italic signature when supported:

```html
<p style="font-family:'Fraunces',Georgia,'Times New Roman',serif; font-style:italic; font-weight:600; font-size:24px; color:#2D6A4F; margin:24px 0 0; line-height:1;">
  Megan
</p>
<p style="font-family:'Geist',Georgia,serif; font-size:12px; color:#5C6A6E; text-transform:uppercase; letter-spacing:0.08em; margin:8px 0 0;">
  Megan Green, Designated Broker
</p>
```

Note that Fraunces will fall back to Georgia italic when the font fails to load. Georgia italic is acceptable; it reads as a serif italic and preserves the signature pattern intent.

### Footer

```html
<table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding:24px 32px; background-color:#2D6A4F; color:#FBF6EC; font-family:'Geist',Georgia,serif; font-size:12px;">
      <p style="margin:0 0 8px;">
        Green Property Management · Megan Green, Designated Broker · WA #XXXXXX
      </p>
      <p style="margin:0 0 8px;">
        (425) XXX-XXXX · <a href="mailto:megan@greenpmpnw.com" style="color:#FBF6EC; text-decoration:underline;">megan@greenpmpnw.com</a> · <a href="https://greenpmpnw.com" style="color:#FBF6EC; text-decoration:underline;">greenpmpnw.com</a>
      </p>
      <p style="margin:16px 0 0; color:rgba(251,246,236,0.6); font-size:11px;">
        You're receiving this because you have an account with Green Property Management.
        <a href="{{unsubscribe_url}}" style="color:rgba(251,246,236,0.6); text-decoration:underline;">Manage email preferences</a>
      </p>
    </td>
  </tr>
</table>
```

## Transactional template catalog

Every email the system sends, with subject, preheader, primary action, and send conditions.

### Owner-facing emails

| Template | Subject | Preheader | Primary action | Send trigger |
|---|---|---|---|---|
| `owner-welcome` | `Welcome to Green PM` | `Your account is ready. Here's how to get started.` | `View dashboard` | Owner agreement signed |
| `owner-statement-ready` | `Your November statement is ready` | `Net to owner: $2,268.50` | `View statement` | Monthly statement generated |
| `owner-repair-update` | `Repair update: 1823 NW 65th St` | `Plumbing scheduled for Tuesday, Nov 14.` | `View repair` | Repair status change |
| `owner-approval-needed` | `Approval needed: 1823 NW 65th St` | `Boiler replacement, $3,500 estimate.` | `Approve or reply` | Repair exceeds approval threshold |
| `owner-lease-renewal-recommendation` | `Lease renewal: 1823 NW 65th St` | `Recommendation for May 2027 renewal.` | `View recommendation` | Lease 120 days from end |
| `owner-application-received` | `Application received for 1823 NW 65th St` | `Smith family, screening underway.` | `View application` | Renter submits application |
| `owner-application-approved` | `Application approved for 1823 NW 65th St` | `Smith family. Move-in March 1.` | `View lease` | Application approved by Megan |
| `owner-year-end-summary` | `2026 year-end summary` | `Your annual operating summary and 1099 info.` | `View summary` | January 15 annually |

### Resident-facing emails

| Template | Subject | Preheader | Primary action | Send trigger |
|---|---|---|---|---|
| `resident-welcome` | `Welcome home: 1823 NW 65th St` | `Your portal is ready. Here's what's next.` | `Sign in` | Lease signed, move-in within 7 days |
| `resident-rent-reminder` | `Rent reminder: 1823 NW 65th St, due Nov 1` | `$2,850 due in 5 days. Pay through the portal.` | `Pay rent` | 5 days before rent due |
| `resident-rent-due-today` | `Rent due today: 1823 NW 65th St` | `$2,850 due today.` | `Pay rent` | Day rent is due |
| `resident-rent-overdue` | `Late notice: 1823 NW 65th St, rent due Nov 1` | `Rent is now late. Late fee posts today.` | `Pay rent` | Day after late grace period |
| `resident-payment-received` | `Payment received: November rent` | `Thanks. Receipt attached.` | `View receipt` | Payment posts |
| `resident-repair-logged` | `Repair logged: 1823 NW 65th St` | `Vendor will reach out within one business day.` | `View repair status` | Resident submits repair |
| `resident-repair-scheduled` | `Repair scheduled: 1823 NW 65th St` | `Anderson Plumbing, Tuesday Nov 14, 10am-noon.` | `View repair status` | Vendor scheduled |
| `resident-repair-complete` | `Repair complete: 1823 NW 65th St` | `Plumbing work done. Let me know if anything's not right.` | `View repair status` | Vendor marks complete |
| `resident-lease-ending-90-day` | `Lease renewal options: 1823 NW 65th St` | `Your lease ends May 31. Here are your options.` | `View options` | Lease 90 days from end |
| `resident-formal-notice` | `Notice from Green PM: 1823 NW 65th St` | (notice-specific) | `View notice` | Notice generated |

### Prospect-facing emails

| Template | Subject | Preheader | Primary action | Send trigger |
|---|---|---|---|---|
| `prospect-proposal-follow-up` | `Proposal for [property address]` | `Recommended rent and management terms.` | `View proposal` | Megan sends proposal |
| `prospect-inquiry-follow-up` | `Following up on 1823 NW 65th St` | `Megan here. Let me know if you have questions.` | `Reply` | 2 days after inquiry, no reply |
| `prospect-listing-alert` | `New rental in Ballard: 1823 NW 65th St` | `2 bed, 1 bath, $2,400. Available March 1.` | `View listing` | Subscriber-matching listing posts |

## Subject line rules

1. **Specific.** Include the property address when applicable.
2. **Direct.** State what the email is about. No teasers.
3. **No emoji.** Never.
4. **No urgency unless real.** "Urgent" and "Important" are reserved for actual urgent communications (overdue rent, formal notice).
5. **Title case off; sentence case on.** "Your November statement is ready" not "Your November Statement is Ready".
6. **No marketing language.** No "Don't miss", no "Limited time", no "Special offer".
7. **Under 70 characters** when possible (truncation in mobile clients).

### Approved subject line bank

Match every template to one of these patterns or document a new one:

- `[Subject] for [property address]` (proposal, application received, repair update)
- `Your [period] statement is ready`
- `[Action] needed: [property address]` (approval needed)
- `Rent reminder: [property address], due [date]`
- `Late notice: [property address], rent due [date]`
- `Repair [status]: [property address]` (logged, scheduled, complete)
- `Welcome to Green PM` (owner) / `Welcome home: [property address]` (resident)
- `Following up on [property address]`
- `New rental in [neighborhood]: [property address]`

## Email HTML implementation

### Required HTML structure

Email HTML uses tables for layout, inline styles for everything visual, and an embedded `<style>` block in the `<head>` for fallbacks.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{subject}}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .stack { display: block !important; width: 100% !important; }
      h1 { font-size: 24px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#FBF6EC; font-family:'Geist',Georgia,'Times New Roman',serif;">
  <div style="display:none; max-height:0; overflow:hidden;">
    {{preheader}}
  </div>
  <!-- email body -->
</body>
</html>
```

### Font loading

Web fonts in email rarely work. Provide robust fallbacks:

| Role | Stack |
|---|---|
| Display (headings, buttons) | `'Geist', Georgia, 'Times New Roman', serif` (Georgia is a sturdy serif fallback that reads acceptably; system serif is the second fallback) |
| Body | `'Newsreader', Georgia, 'Times New Roman', serif` |
| Accent (signature) | `'Fraunces', Georgia, 'Times New Roman', serif` |

When Geist fails (most clients), Georgia displays. Georgia is a serif, not a sans, which is a noticeable shift from the brand's display Geist. This is acceptable because:

1. The brand is anchored by other elements (color, voice, layout)
2. The font shift only affects clients that strip web fonts; most modern clients (Apple Mail, iOS Mail, recent Outlook for Mac) render Geist correctly
3. Georgia is a high-quality serif that reads competent

### Image hosting

Images (Megan's avatar, header wordmark image if used) must be hosted at a stable URL on the brand domain or CDN. Use absolute URLs with HTTPS.

### Dark mode handling

Many email clients invert colors in dark mode. To prevent unintended inversion of brand colors:

```html
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
```

This forces light mode rendering. Some clients ignore the directive; verify in dark mode previews before launch.

## Mobile rendering rules

- Body width 600px max; collapses to 100% under 600px
- Single column layout always
- Buttons at least 44px tall
- Body text at least 14px
- Side padding at least 16px
- Header and footer stack on mobile

## Sender identity rules

| Field | Value |
|---|---|
| From name | `Megan Green` (transactional, personal) or `Green Property Management` (system, broadcast) |
| From address | `megan@greenpmpnw.com` (personal) or `hello@greenpmpnw.com` (system) |
| Reply-to | `megan@greenpmpnw.com` (always replies go to Megan) |
| Return-path | `bounces@greenpmpnw.com` (handled by mail provider) |

DKIM, SPF, and DMARC must be configured. Set DMARC to `p=quarantine` initially, then `p=reject` after monitoring period.

### Sender voice by template

- **Personal emails** (proposal follow-up, repair update, lease recommendation): `From: Megan Green <megan@greenpmpnw.com>`, speaks as "I"
- **System emails** (rent reminder, statement notification, payment receipt): `From: Green Property Management <hello@greenpmpnw.com>`, speaks neutrally; ends with Megan's signature

## Forbidden email patterns

- Subject lines with emoji
- Subject lines with all-caps words
- Subject lines beginning with "Re:" without an actual reply
- "Don't miss" or "Limited time" or any marketing urgency
- Animated GIFs (heavy, often blocked)
- Background videos
- Web fonts assumed to work without fallback
- Single-image-only emails (entire body as one image)
- Email body wider than 600px
- Buttons styled as plain `<a>` tags (must use table-based bulletproof button)
- "Oops!", "Whoops!", apology-prefix subjects
- Subjects without specific reference (e.g., "Update" instead of "Repair update: 1823 NW 65th St")
- Stripping the operator signature block from any non-system email
- Sending transactional emails from a no-reply address
- Embedded tracking pixels without a documented purpose
- Color contrast below WCAG AA inside the email body

## Acceptance

This doc is acceptable when:

- An engineer can implement any template from the catalog with HTML that renders consistently across Gmail, Apple Mail, Outlook 365, and iOS Mail
- Every email has a documented send trigger
- Every subject line matches the approved bank or is documented as a new pattern
- Sender identity rules are configured at the email service provider level
- Forbidden patterns can be flagged in code review
