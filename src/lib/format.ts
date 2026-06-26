/** Formatting helpers for listing data. Pure functions; unit-tested. */

/** Format a monthly rent in whole USD, e.g. 2950 -> "$2,950/mo". */
export function formatRent(amountUsd: number): string {
  if (!Number.isFinite(amountUsd) || amountUsd < 0) {
    throw new RangeError('rent must be a non-negative finite number');
  }
  const dollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amountUsd);
  return `${dollars}/mo`;
}

/** "2 bd · 1 ba · 900 sqft" summary line for a listing card. */
export function formatSpecs(beds: number, baths: number, sqft?: number): string {
  const parts = [`${beds} bd`, `${baths} ba`];
  if (typeof sqft === 'number' && sqft > 0) {
    parts.push(`${new Intl.NumberFormat('en-US').format(sqft)} sqft`);
  }
  return parts.join(' · ');
}

/** Slugify an address for /rentals/[slug] (kebab-case, ascii). */
export function slugifyAddress(address: string): string {
  return address
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
