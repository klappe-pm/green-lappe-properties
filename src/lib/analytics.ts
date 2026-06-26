/**
 * Privacy-respecting analytics seam.
 *
 * Web analytics is Plausible (cookieless, no PII) per the design system's
 * observability stack (80-system-architecture.md). This module is the single
 * typed entry point for custom events ("goals"). It is a no-op until
 * PUBLIC_PLAUSIBLE_DOMAIN is set and the Plausible script is loaded, so it is
 * always safe to call (including during SSR/build and in tests).
 *
 * Hard rule: never send PII (names, emails, phones, addresses). Event props are
 * sanitized and PII-looking keys are dropped.
 */

/** Canonical custom events, tied to the funnels in 81-user-flows.md. */
export const ANALYTICS_EVENTS = {
  ctaClicked: 'cta_clicked',
  ownerProposalStarted: 'owner_proposal_started',
  ownerProposalSubmitted: 'owner_proposal_submitted',
  renterInquiryStarted: 'renter_inquiry_started',
  renterInquirySubmitted: 'renter_inquiry_submitted',
  rentalViewed: 'rental_viewed',
  rentalsFiltered: 'rentals_filtered',
  portalSignInStarted: 'portal_signin_started',
  outboundClick: 'outbound_click',
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type PropValue = string | number | boolean;
export type EventProps = Record<string, PropValue>;

const PII_KEY = /(email|phone|name|address|ssn|dob|birth|password|token|secret)/i;

/** True when a prop key looks like it could carry PII (and must be dropped). */
export function isPiiKey(key: string): boolean {
  return PII_KEY.test(key);
}

/** Drop PII-looking keys and non-primitive values; returns the safe subset. */
export function sanitizeProps(props: EventProps = {}): EventProps {
  const safe: EventProps = {};
  for (const [key, value] of Object.entries(props)) {
    if (isPiiKey(key)) continue;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      safe[key] = value;
    }
  }
  return safe;
}

interface PlausibleWindow {
  plausible?: (event: string, options?: { props?: EventProps }) => void;
}

/**
 * Send a custom event. No-ops safely when there is no browser or Plausible
 * isn't loaded. PII props are stripped before sending.
 */
export function track(event: AnalyticsEvent, props: EventProps = {}): void {
  const w = globalThis as unknown as PlausibleWindow;
  if (typeof w.plausible !== 'function') return;
  const safe = sanitizeProps(props);
  w.plausible(event, Object.keys(safe).length ? { props: safe } : undefined);
}
