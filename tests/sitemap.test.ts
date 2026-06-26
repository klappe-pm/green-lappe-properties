import { describe, expect, it } from 'vitest';
import { GET } from '../src/pages/sitemap.xml';

describe('sitemap.xml endpoint', () => {
  it('emits valid XML with public routes and excludes portals', async () => {
    const res = await GET({ site: new URL('https://greenpmpnw.com') } as never);
    expect(res.headers.get('Content-Type')).toContain('application/xml');
    const xml = await res.text();

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<loc>https://greenpmpnw.com/</loc>');
    expect(xml).toContain('<loc>https://greenpmpnw.com/owners</loc>');
    // dynamic entries from the sample data
    expect(xml).toContain('/rentals/1823-nw-65th-st-seattle');
    expect(xml).toMatch(/\/blog\/[a-z-]+</);
    // never list portal or error routes
    expect(xml).not.toContain('/portal');
    expect(xml).not.toContain('/404');
  });

  it('falls back to a default origin when site is undefined', async () => {
    const res = await GET({ site: undefined } as never);
    const xml = await res.text();
    expect(xml).toContain('<loc>https://greenpmpnw.com/</loc>');
  });
});
