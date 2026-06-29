import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

export const DIST = path.resolve(__dirname, '../../dist');

/** All built HTML files as absolute paths. */
export function htmlFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (full.endsWith('.html')) out.push(full);
    }
  };
  walk(DIST);
  return out;
}

/** Map a built HTML file path to its public route (directory URLs). */
export function routeForFile(file: string): string {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}`;
  // e.g. 404.html
  return `/${rel.replace(/\.html$/, '')}`;
}

/** Does a route resolve to a built file? Accepts '/x' -> dist/x/index.html. */
export function routeExists(route: string): boolean {
  const clean = route.split('#')[0]!.split('?')[0]!;
  if (clean === '/') return existsSync(path.join(DIST, 'index.html'));
  const noSlash = clean.replace(/^\/+|\/+$/g, '');
  return (
    existsSync(path.join(DIST, noSlash, 'index.html')) ||
    existsSync(path.join(DIST, `${noSlash}.html`)) ||
    existsSync(path.join(DIST, noSlash)) // static asset (e.g. sitemap.xml, robots.txt)
  );
}

export function load(file: string): cheerio.CheerioAPI {
  return cheerio.load(readFileSync(file, 'utf8'));
}

/** Astro generates minimal meta-refresh stubs for configured redirects. */
export function isRedirect($: cheerio.CheerioAPI): boolean {
  return $('meta[http-equiv="refresh"]').length > 0;
}

/** The destination route of a redirect stub, as a site-relative path. */
export function redirectTarget($: cheerio.CheerioAPI): string | null {
  const content = $('meta[http-equiv="refresh"]').attr('content') ?? '';
  const m = content.match(/url=(.+)$/i);
  if (!m) return null;
  return m[1]!.replace(/^https?:\/\/[^/]+/, '') || '/';
}

/** Internal hrefs (site-relative) found on a page, normalized, deduped. */
export function internalLinks($: cheerio.CheerioAPI): string[] {
  const links = new Set<string>();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    if (href.startsWith('/') && !href.startsWith('//')) {
      links.add(href.split('#')[0]!.split('?')[0]!);
    }
  });
  return [...links].filter(Boolean);
}
