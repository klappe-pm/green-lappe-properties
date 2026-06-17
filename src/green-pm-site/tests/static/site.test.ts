import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import {
  DIST,
  htmlFiles,
  routeForFile,
  routeExists,
  load,
  internalLinks,
  isRedirect,
  redirectTarget,
} from './helpers';

const AUDIENCE_MODES = [
  'neutral-acquisition',
  'owner-acquisition',
  'owner-product',
  'renter-acquisition',
  'renter-product',
];

const files = htmlFiles();
// Content pages get the full document contract; redirect stubs are validated
// separately (they are minimal meta-refresh pages by design).
const contentFiles = files.filter((f) => !isRedirect(load(f)));
const redirectFiles = files.filter((f) => isRedirect(load(f)));

// Expected audience mode for representative routes.
const EXPECTED_AUDIENCE: Record<string, string> = {
  '/': 'neutral-acquisition',
  '/owners': 'owner-acquisition',
  '/owners/proposal': 'owner-acquisition',
  '/rentals': 'renter-acquisition',
  '/about': 'neutral-acquisition',
  '/portal/owner': 'owner-product',
  '/portal/resident': 'renter-product',
};

function allCss(): string {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir)) {
      const full = path.join(dir, e);
      if (statSync(full).isDirectory()) walk(full);
      else if (full.endsWith('.css')) out.push(readFileSync(full, 'utf8'));
    }
  };
  walk(DIST);
  return out.join('\n');
}

describe('build output', () => {
  it('produced HTML pages', () => {
    expect(files.length).toBeGreaterThan(20);
  });
});

describe('document structure (every content page)', () => {
  for (const file of contentFiles) {
    const route = routeForFile(file);
    const $ = load(file);
    it(`${route} has lang, viewport, title, canonical, exactly one h1`, () => {
      expect($('html').attr('lang'), 'html lang').toBe('en');
      expect($('meta[name="viewport"]').attr('content'), 'viewport').toContain('width=device-width');
      expect(($('title').text() || '').trim().length, 'title').toBeGreaterThan(0);
      expect($('link[rel="canonical"]').length, 'canonical').toBe(1);
      expect($('h1').length, 'h1 count').toBe(1);
    });
  }
});

describe('audience modes', () => {
  for (const file of contentFiles) {
    const route = routeForFile(file);
    const $ = load(file);
    const mode = $('html').attr('data-audience');
    it(`${route} declares a valid data-audience`, () => {
      expect(mode, `data-audience on ${route}`).toBeTruthy();
      expect(AUDIENCE_MODES).toContain(mode);
    });
  }

  for (const [route, mode] of Object.entries(EXPECTED_AUDIENCE)) {
    it(`${route} uses ${mode}`, () => {
      const file = files.find((f) => routeForFile(f) === route);
      expect(file, `built page for ${route}`).toBeTruthy();
      expect(load(file!)('html').attr('data-audience')).toBe(mode);
    });
  }
});

describe('no broken internal links', () => {
  for (const file of contentFiles) {
    const route = routeForFile(file);
    const $ = load(file);
    const links = internalLinks($);
    it(`${route}: all ${links.length} internal links resolve`, () => {
      const broken = links.filter((l) => !routeExists(l));
      expect(broken, `broken links on ${route}`).toEqual([]);
    });
  }
});

describe('redirects', () => {
  it('emitted at least the configured redirect stubs', () => {
    expect(redirectFiles.length).toBeGreaterThanOrEqual(7);
  });
  for (const file of redirectFiles) {
    const route = routeForFile(file);
    const target = redirectTarget(load(file));
    it(`${route} redirects to an existing route`, () => {
      expect(target, `redirect target on ${route}`).toBeTruthy();
      expect(routeExists(target!), `target ${target} exists`).toBe(true);
    });
  }
});

describe('pre-public boundary', () => {
  for (const file of files) {
    const route = routeForFile(file);
    const $ = load(file);
    it(`${route} is noindex until launch`, () => {
      // Both content pages (BaseLayout default) and redirect stubs carry noindex.
      expect($('meta[name="robots"]').attr('content'), `robots on ${route}`).toContain('noindex');
    });
  }

  it('robots.txt disallows crawling and references the sitemap', () => {
    const robots = readFileSync(path.join(DIST, 'robots.txt'), 'utf8');
    expect(robots).toMatch(/Disallow:\s*\//);
    expect(robots).toMatch(/Disallow:\s*\/portal\//);
    expect(robots).toMatch(/Sitemap:\s*https:\/\/greenpmpnw\.com\/sitemap\.xml/);
  });
});

describe('design-system color wiring', () => {
  const css = allCss();
  it('bundles the Cedar brand token', () => {
    expect(css.toLowerCase()).toContain('#2d6a4f');
  });
  it('defines a surface override for all five audience modes', () => {
    for (const mode of AUDIENCE_MODES) {
      // Minified CSS may drop attribute-value quotes; accept quoted or not.
      const re = new RegExp(`\\[data-audience=("?)${mode}\\1\\]`);
      expect(re.test(css), `modes.css rule for ${mode}`).toBe(true);
    }
  });
  it('contains no forbidden pure black/white on brand surfaces (surface tokens)', () => {
    // Surface tokens must use Cream/Paper/Ink, never #fff/#000.
    expect(css).not.toMatch(/--surface:\s*#fff(f{0,3})?\b/i);
    expect(css).not.toMatch(/--surface:\s*#000(0{0,3})?\b/i);
  });
});

describe('sitemap', () => {
  it('lists only existing public routes and excludes portals', () => {
    const xml = readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(locs.length).toBeGreaterThan(10);
    for (const loc of locs) {
      const route = loc.replace('https://greenpmpnw.com', '') || '/';
      expect(routeExists(route), `sitemap route ${route} exists`).toBe(true);
      expect(route.startsWith('/portal'), `sitemap excludes ${route}`).toBe(false);
    }
  });
});
