/**
 * Site-wide configuration.
 *
 * Values mirror the locked brand foundation in the design system
 * (product/design/uxd/design-system). Treat the design system + Sanity
 * `settings` document as the long-term source of truth; this file is the
 * build-time default until the Sanity content layer is wired up.
 */
export const site = {
  name: 'Green Property Solutions',
  shortName: 'Green PS',
  domain: 'greenpmpnw.com',
  url: 'https://greenpmpnw.com',
  tagline: 'Boutique property management for King and Snohomish County owners.',
  description:
    'Owner-first residential property management across King and Snohomish ' +
    'counties, Washington. Transparent pricing, no maintenance markup, ' +
    'multilingual screening.',
  broker: {
    name: 'Megan Green',
    title: 'Designated Broker',
    // License number is a blocked/external fact — leave as TBD, do not invent.
    license: 'WA · TBD',
  },
  serviceArea: 'King & Snohomish counties, Washington',
  email: 'megan@greenpmpnw.com',
  // Pricing per the locked design-system brand foundation.
  pricing: {
    managementFee: '9% of collected rent',
    leasingFee: '60% of one month’s rent on placement',
    maintenanceMarkup: 'None',
  },
} as const;

export type Site = typeof site;
