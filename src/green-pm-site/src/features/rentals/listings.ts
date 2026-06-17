import { slugifyAddress } from '../../lib/format';

/**
 * Listing shape mirrors the Sanity `listing` schema
 * (product/design/uxd/design-system/docs/85-sanity-schemas.md). This module
 * returns SAMPLE data so /rentals is buildable before the Sanity content layer
 * is connected; replace `getListings()` with a Sanity query at that point.
 */
export interface Listing {
  address: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  sqft?: number;
  rent: number;
  status: 'available' | 'coming-soon' | 'pending' | 'leased';
  availableDate: string; // yyyy-MM-dd
  description: string;
  amenities: string[];
  petPolicy: string;
}

const SAMPLE: Listing[] = [
  {
    address: '1823 NW 65th St, Seattle',
    neighborhood: 'Ballard',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    rent: 3950,
    status: 'available',
    availableDate: '2026-07-01',
    description:
      'Updated Ballard craftsman two blocks from the farmers market. Gas range, ' +
      'fenced yard, off-street parking, and a finished basement bonus room.',
    amenities: ['In-unit laundry', 'Off-street parking', 'Fenced yard', 'Gas heat'],
    petPolicy: 'Cats and small dogs considered with deposit.',
  },
  {
    address: '412 228th Ave NE, Sammamish',
    neighborhood: 'Sammamish',
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2380,
    rent: 4600,
    status: 'coming-soon',
    availableDate: '2026-08-01',
    description:
      'Spacious Sammamish home in a top-rated school attendance area. Two-car ' +
      'garage, large kitchen island, and a primary suite with mountain views.',
    amenities: ['Two-car garage', 'Central A/C', 'Dishwasher', 'Walk-in closets'],
    petPolicy: 'Pet-friendly with deposit and pet rent.',
  },
  {
    address: '905 5th Ave S, Edmonds',
    neighborhood: 'Edmonds',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 980,
    rent: 2650,
    status: 'available',
    availableDate: '2026-07-15',
    description:
      'Bright Edmonds bungalow a short walk from the waterfront and ferry. ' +
      'Hardwood floors, updated bath, and a private back deck.',
    amenities: ['Hardwood floors', 'Private deck', 'Storage shed'],
    petPolicy: 'No pets.',
  },
];

export interface ListingWithSlug extends Listing {
  slug: string;
}

function withSlug(l: Listing): ListingWithSlug {
  return { ...l, slug: slugifyAddress(l.address) };
}

/** Returns listings shown on /rentals. Sample data until Sanity is wired. */
export function getListings(): ListingWithSlug[] {
  return SAMPLE.map(withSlug);
}

/** Listings a renter can act on now (available or coming soon). */
export function getBookableListings(): ListingWithSlug[] {
  return getListings().filter((l) => l.status === 'available' || l.status === 'coming-soon');
}

/** Find a single listing by its slug (for /rentals/[slug]). */
export function findListingBySlug(slug: string): ListingWithSlug | undefined {
  return getListings().find((l) => l.slug === slug);
}
