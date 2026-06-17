/**
 * Blog ("Field notes") data mirrors the Sanity `blogPost` + `tag` schemas
 * (product/design/uxd/design-system/docs/85-sanity-schemas.md). Sample data
 * until the content layer is wired; replace `getPosts()` with a Sanity query.
 */
export interface BlogPost {
  title: string;
  slug: string;
  eyebrow: string;
  publishedAt: string; // yyyy-MM-dd
  author: string;
  excerpt: string;
  /** Plain-paragraph body; becomes Portable Text blocks once Sanity is wired. */
  body: string[];
  tags: string[];
}

const POSTS: BlogPost[] = [
  {
    title: 'Why we cap our book of doors',
    slug: 'why-we-cap-our-book',
    eyebrow: 'Operating notes',
    publishedAt: '2026-06-01',
    author: 'Megan Green',
    excerpt:
      'Small on purpose: how a deliberately limited portfolio keeps response times short for both owners and residents.',
    body: [
      'Most managers grow until service slips. We do the opposite — we cap the number of doors so every owner keeps a direct line.',
      'That constraint shapes everything: how fast repairs get triaged, how quickly inquiries get answered, and how carefully we screen.',
    ],
    tags: ['operations'],
  },
  {
    title: 'What HB 1217 means for small landlords',
    slug: 'hb-1217-small-landlords',
    eyebrow: 'Compliance',
    publishedAt: '2026-05-20',
    author: 'Megan Green',
    excerpt:
      'A plain-language look at Washington’s rent-stabilization rules and the small-landlord exemption.',
    body: [
      'Washington’s HB 1217 introduced limits that every owner should understand before setting renewal terms.',
      'We track the rules so renewals stay compliant — and so owners are not surprised at lease-renewal time.',
    ],
    tags: ['compliance'],
  },
];

export function getPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function findPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/** All distinct tags across posts, sorted. */
export function getAllTags(): string[] {
  return [...new Set(getPosts().flatMap((p) => p.tags))].sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getPosts().filter((p) => p.tags.includes(tag));
}
