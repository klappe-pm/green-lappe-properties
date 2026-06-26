/** Canonical content routes exercised by the E2E suite. */
export const CONTENT_ROUTES = [
  '/',
  '/owners',
  '/owners/services',
  '/owners/pricing',
  '/owners/proposal',
  '/owners/faq',
  '/rentals',
  '/rentals/apply',
  '/rentals/faq',
  '/rentals/1823-nw-65th-st-seattle',
  '/blog',
  '/blog/why-we-cap-our-book',
  '/blog/tag/operations',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
  '/portal',
  '/portal/owner',
  '/portal/owner/properties',
  '/portal/owner/statements',
  '/portal/resident',
  '/portal/resident/rent',
  '/portal/resident/repairs',
  '/portal/resident/repairs/new',
];

/** Expected computed body background per audience surface (modes.css). */
export const SURFACE_BY_ROUTE: Record<string, string> = {
  '/': 'rgb(251, 246, 236)', // cream (neutral-acquisition)
  '/owners': 'rgb(247, 245, 240)', // paper (owner-acquisition)
  '/rentals': 'rgb(251, 246, 236)', // cream (renter-acquisition)
  '/portal/owner': 'rgb(247, 245, 240)', // paper (owner-product)
  '/portal/resident': 'rgb(247, 245, 240)', // paper (renter-product)
};
