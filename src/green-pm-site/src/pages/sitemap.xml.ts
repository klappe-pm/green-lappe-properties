import type { APIRoute } from 'astro';
import { getAllTags, getPosts } from '../features/blog/posts';
import { getListings } from '../features/rentals/listings';

/**
 * Build-time sitemap of public, indexable routes. Portal paths and error pages
 * are intentionally excluded (see 83-routing.md). Note: the whole site is
 * noindex until the public-launch gate clears; this exists so the route is in
 * place and correct when indexing is enabled.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://greenpmpnw.com')).origin;

  const staticPaths = [
    '/',
    '/owners',
    '/owners/services',
    '/owners/pricing',
    '/owners/proposal',
    '/owners/faq',
    '/rentals',
    '/rentals/apply',
    '/rentals/faq',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/accessibility',
  ];

  const dynamicPaths = [
    ...getListings().map((l) => `/rentals/${l.slug}`),
    ...getPosts().map((p) => `/blog/${p.slug}`),
    ...getAllTags().map((t) => `/blog/tag/${t}`),
  ];

  const urls = [...staticPaths, ...dynamicPaths]
    .map((path) => `  <url><loc>${origin}${path}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
