import { describe, it, expect } from 'vitest';
import { primaryNav, primaryCta, footerNav, isInternal } from '../src/lib/nav';
import { getListings, getBookableListings } from '../src/features/rentals/listings';
import { AUDIENCE_MODES, isAudienceMode } from '../src/config/audience';

describe('navigation', () => {
  it('only links to internal absolute paths', () => {
    for (const item of [...primaryNav, primaryCta, ...footerNav]) {
      expect(isInternal(item.href), `${item.label} -> ${item.href}`).toBe(true);
    }
  });
  it('exposes the proposal CTA', () => {
    expect(primaryCta.href).toBe('/owners/proposal');
  });
});

describe('audience modes', () => {
  it('matches the design-system five-mode set', () => {
    expect(AUDIENCE_MODES).toContain('neutral-acquisition');
    expect(AUDIENCE_MODES).toHaveLength(5);
  });
  it('validates known and rejects unknown modes', () => {
    expect(isAudienceMode('owner-product')).toBe(true);
    expect(isAudienceMode('nope')).toBe(false);
  });
});

describe('rentals sample data', () => {
  it('gives every listing a slug', () => {
    for (const l of getListings()) {
      expect(l.slug.length).toBeGreaterThan(0);
    }
  });
  it('bookable listings exclude leased/pending', () => {
    for (const l of getBookableListings()) {
      expect(['available', 'coming-soon']).toContain(l.status);
    }
  });
});
