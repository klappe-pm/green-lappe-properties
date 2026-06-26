import { describe, expect, it } from 'vitest';
import { htmlFiles, internalLinks, isRedirect, load, routeForFile } from './helpers';

const files = htmlFiles();
const contentFiles = files.filter((f) => !isRedirect(load(f)));

describe('images', () => {
  for (const file of contentFiles) {
    const route = routeForFile(file);
    const $ = load(file);
    it(`${route}: every <img> has alt, dimensions, and lazy loading`, () => {
      const problems: string[] = [];
      $('img').each((_, el) => {
        const $el = $(el);
        const src = $el.attr('src') ?? '(no src)';
        if ($el.attr('alt') === undefined) problems.push(`${src}: missing alt`);
        if (!$el.attr('width') || !$el.attr('height'))
          problems.push(`${src}: missing width/height`);
        if (!$el.attr('loading')) problems.push(`${src}: missing loading`);
      });
      expect(problems, `image problems on ${route}`).toEqual([]);
    });
  }
});

describe('content quality', () => {
  // Case-insensitive substrings that are never legitimate copy.
  const SUBSTRINGS = ['lorem ipsum', '[object object]', '{{', '}}'];
  // Code-literal leaks: match as whole words, case-sensitive, to avoid false
  // positives like "NaN" inside "maintenance" or "null" inside "fully".
  const TOKENS = /\b(undefined|null|NaN|TODO|FIXME)\b/;

  for (const file of contentFiles) {
    const route = routeForFile(file);
    const $ = load(file);
    // Visible text = body text minus script/style.
    $('script, style, noscript').remove();
    const text = $('main').text().replace(/\s+/g, ' ').trim();
    const lower = text.toLowerCase();

    it(`${route}: main has substantive copy`, () => {
      expect(text.length, `main text length on ${route}`).toBeGreaterThan(120);
    });

    it(`${route}: no placeholder/leaked tokens in copy`, () => {
      const hits = SUBSTRINGS.filter((p) => lower.includes(p));
      if (TOKENS.test(text)) hits.push(TOKENS.exec(text)![0]);
      expect(hits, `placeholder leakage on ${route}`).toEqual([]);
    });

    it(`${route}: has a non-empty meta description`, () => {
      const desc = $('meta[name="description"]').attr('content') ?? '';
      expect(desc.trim().length, `meta description on ${route}`).toBeGreaterThan(20);
    });
  }
});

describe('link hygiene', () => {
  for (const file of contentFiles) {
    const route = routeForFile(file);
    const $ = load(file);
    it(`${route}: no empty or '#' anchors`, () => {
      const bad: string[] = [];
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href') ?? '';
        if (href === '' || href === '#') bad.push($(el).text().trim() || '(empty)');
      });
      expect(bad, `placeholder anchors on ${route}`).toEqual([]);
    });

    it(`${route}: every link has discernible text or aria-label`, () => {
      const bad: string[] = [];
      $('a').each((_, el) => {
        const $el = $(el);
        const text = $el.text().replace(/\s+/g, ' ').trim();
        const aria = $el.attr('aria-label');
        const hasImg = $el.find('img[alt]').length > 0;
        if (!text && !aria && !hasImg) bad.push($el.attr('href') ?? '(no href)');
      });
      expect(bad, `inaccessible links on ${route}`).toEqual([]);
    });
  }
});

// Keep the internalLinks helper covered (used elsewhere) — sanity check the home page.
describe('home links', () => {
  it('home exposes the core journeys', () => {
    const home = contentFiles.find((f) => routeForFile(f) === '/')!;
    const links = internalLinks(load(home));
    for (const target of ['/owners', '/rentals', '/owners/proposal']) {
      expect(links, `home links to ${target}`).toContain(target);
    }
  });
});
