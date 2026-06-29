import { describe, expect, it } from 'vitest';
import { fetchAllTags, fetchPosts } from '../src/features/blog/posts';
import { fetchFaqs } from '../src/features/faq/faqs';
import { fetchListings } from '../src/features/rentals/listings';
import { isSanityConfigured } from '../src/lib/sanity';

// In the test/build env no Sanity vars are set, so the integration must fall
// back to sample data — proving the seam is safe before credentials exist.
describe('sanity integration seam', () => {
  it('reports unconfigured without env vars', () => {
    expect(isSanityConfigured()).toBe(false);
  });

  it('fetchListings falls back to the sample set', async () => {
    const listings = await fetchListings();
    expect(listings.length).toBeGreaterThan(0);
    expect(listings[0]).toHaveProperty('slug');
  });

  it('fetchPosts / fetchAllTags fall back to sample data', async () => {
    const posts = await fetchPosts();
    expect(posts.length).toBeGreaterThan(0);
    const tags = await fetchAllTags();
    expect(tags.length).toBeGreaterThan(0);
  });

  it('fetchFaqs falls back and filters by audience', async () => {
    const owner = await fetchFaqs('owner');
    expect(owner.length).toBeGreaterThan(0);
    expect(owner.every((f) => f.audience === 'owner' || f.audience === 'both')).toBe(true);
  });
});
