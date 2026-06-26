import { describe, expect, it, vi } from 'vitest';

// Exercise the Sanity-configured code paths in the feature data sources by
// mocking the sanity lib to report configured + return canned documents.
vi.mock('../src/lib/sanity', () => ({
  isSanityConfigured: () => true,
  sanityFetch: vi.fn(async (query: string) => {
    if (query.includes('"_type == \\"listing\\""') || query.includes('listing')) {
      return [
        {
          address: '100 Main St, Kirkland',
          neighborhood: 'Kirkland',
          bedrooms: 2,
          bathrooms: 1,
          sqft: 1000,
          rent: 3000,
          status: 'available',
          availableDate: '2026-09-01',
          description: 'From Sanity',
          amenities: ['Parking'],
          petPolicy: 'Cats ok',
        },
      ];
    }
    if (query.includes('blogPost')) {
      return [
        {
          title: 'CMS Post',
          slug: 'cms-post',
          eyebrow: 'News',
          publishedAt: '2026-06-15',
          author: 'Megan Green',
          excerpt: 'x',
          // body/tags intentionally omitted to cover the ?? [] defaults
        },
      ];
    }
    if (query.includes('faq')) {
      return [{ question: 'Q?', answer: 'A', audience: 'owner', displayOrder: 1 }];
    }
    return [];
  }),
}));

const { fetchListings, fetchListingBySlug } = await import('../src/features/rentals/listings');
const { fetchPosts, fetchAllTags, fetchPostsByTag, fetchPostBySlug } = await import(
  '../src/features/blog/posts'
);
const { fetchFaqs } = await import('../src/features/faq/faqs');

describe('Sanity-backed sources (configured)', () => {
  it('maps listings and derives a slug', async () => {
    const listings = await fetchListings();
    expect(listings).toHaveLength(1);
    expect(listings[0]?.slug).toBe('100-main-st-kirkland');
    expect(await fetchListingBySlug('100-main-st-kirkland')).toBeDefined();
  });

  it('maps posts and defaults missing tags/body', async () => {
    const posts = await fetchPosts();
    expect(posts[0]?.title).toBe('CMS Post');
    expect(posts[0]?.tags).toEqual([]);
    expect(posts[0]?.body).toEqual([]);
    expect(await fetchAllTags()).toEqual([]);
    expect(await fetchPostsByTag('news')).toEqual([]);
    expect(await fetchPostBySlug('cms-post')).toBeDefined();
  });

  it('returns FAQs from the CMS', async () => {
    const faqs = await fetchFaqs('owner');
    expect(faqs[0]?.question).toBe('Q?');
  });
});
