---
domain: brand
category: design-system
sub-category: microcopy
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - 03-voice
produces:
  - microcopy-patterns-table
  - banned-microcopy-phrases
  - cta-copy-bank
executor: content
aliases:
tags:
---

# 04-microcopy

Microcopy patterns for the most-repeated surface text on the site and in products. Consumed by form authors, button label authors, empty-state authors, error-message authors, and email subject-line authors.

## Dependencies

- `03-voice` for the principles every microcopy choice must respect

## Outputs

1. CTA copy bank with approved labels
2. Form label and helper text patterns
3. Empty, loading, error, success state copy
4. Email subject line patterns
5. Banned microcopy phrases

## 4.1 CTA copy bank

| Action | Approved label | Avoid |
|---|---|---|
| Request a proposal (owner) | `Request a proposal` | "Get started", "Get a quote", "Learn more" |
| Inquire about a listing (renter) | `Inquire about this home` | "Apply now", "Get info", "Contact us" |
| Submit application (renter) | `Submit application` | "Apply now", "Start your application" |
| Pay rent | `Pay rent` | "Make a payment", "Submit payment" |
| Report a repair | `Report a repair` | "Submit a ticket", "Open a request" |
| View statement | `View statement` | "Open statement", "See details" |
| Approve a recommendation (owner) | `Approve` | "Confirm", "Submit", "OK" |
| Decline | `Decline` | "Reject", "Cancel" |
| Read more | `Continue reading` | "Read more", "Learn more" |
| Schedule a call | `Schedule a call with Megan` | "Book now", "Get on the calendar" |
| Send message | `Send message` | "Submit", "Send" |

## 4.2 Form labels

- Always sentence case, never Title Case
- Always specific to the data requested
- No placeholder-only labels (label must always be visible above or beside the input)

| Field | Approved label | Helper text pattern |
|---|---|---|
| Property address | `Property address` | `Street address; city; ZIP` |
| Number of doors | `Number of doors` | `Total rental units on the property` |
| Move-in date | `Desired move-in date` | none |
| Email | `Email` | none |
| Phone | `Phone` | `Optional, used only for urgent follow-up` |
| Message | `Message` | `Tell me about the property and what you need` |
| Current PM | `Current property manager (if any)` | `Skip if self-managed` |

## 4.3 Empty states

- Lead with the fact, then the next action
- Never lead with apology or apology-adjacent phrasing
- One sentence, optional one-action CTA

| Surface | Approved copy |
|---|---|
| No open repair requests | `No open repair requests. Report a repair if something comes up.` |
| No listings available | `No listings available right now. New homes are posted as they come up.` |
| No statements yet | `Your first statement posts on the 10th of the month after your first collected rent.` |
| No blog posts in category | `No field notes in this category yet. Check the latest field notes for what's new.` |
| Empty inbox | `No new messages.` |

## 4.4 Loading states

- One sentence, present continuous tense
- No "Loading..." with ellipsis
- Skeletons preferred over copy for in-page content

| Context | Approved copy |
|---|---|
| Initial page load | (skeleton, no text) |
| Form submission | `Sending` (with spinner) |
| Statement generation | `Generating your statement` |
| Listing search | `Finding homes` |
| Payment processing | `Processing your payment` |

## 4.5 Error states

- Name what went wrong
- Name the user action that fixes it
- Never blame the user
- Never use "Oops!" or "Uh oh!"

| Error | Approved copy |
|---|---|
| Required field missing | `[Field name] is required` |
| Invalid email | `That email format doesn't look right. Check for typos.` |
| Invalid phone | `Use 10 digits, like (425) 555-0100` |
| Payment failed | `Payment didn't go through. Check your card details and try again.` |
| Listing no longer available | `This home is no longer available. Browse current listings.` |
| Form submission failed | `Couldn't send your message. Try again, or email megan@greenpmpnw.com directly.` |
| Page not found (404) | `That page doesn't exist. Try the home page or get in touch.` |
| Server error (500) | `Something went wrong on our end. Try again in a minute.` |

## 4.6 Success states

- One sentence, past tense or simple confirmation
- Specific to what happened
- Include next-step preview where helpful

| Action | Approved copy |
|---|---|
| Proposal request submitted | `Got it. Megan will email you within one business day.` |
| Inquiry submitted | `Got it. Megan will follow up about this home shortly.` |
| Application submitted | `Application received. You'll hear back within three business days.` |
| Rent payment successful | `Payment posted. Receipt sent to your email.` |
| Repair reported | `Repair logged. You'll get an update once a vendor is scheduled.` |
| Message sent | `Message sent.` |

## 4.7 Email subject lines

Direct. Specific. No emojis. No urgency unless real.

| Email | Approved subject |
|---|---|
| Proposal follow-up | `Proposal for [property address]` |
| Statement available | `Your November statement is ready` |
| Repair update | `Repair update: [property address]` |
| Rent reminder | `Rent reminder: [property address], due [date]` |
| Late notice | `Late notice: [property address], rent due [date]` |
| Application received | `Application received for [listing address]` |
| Welcome (owner) | `Welcome to Green PM` |
| Welcome (resident) | `Welcome home: [property address]` |

## 4.8 Banned microcopy phrases

- "Oops!"
- "Uh oh!"
- "Whoops!"
- "Hooray!"
- "Awesome!"
- "Click here"
- "Learn more" (use specific labels)
- "Sign up today"
- "Don't miss out"
- "Hurry"
- "Limited time"
- "Just a moment"
- "We're sorry to inform you"
- Generic "Please" prefacing every instruction

## Acceptance

This doc is acceptable when:

- A form author can label and supply helper text for any standard field using only this doc
- Every CTA button label on the site appears in the approved bank or has a documented exception
- Error and empty state copy never apologizes, never blames the user, and always names the next action
