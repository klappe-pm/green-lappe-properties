import { expect, test } from '@playwright/test';
import { CONTENT_ROUTES } from './routes';

/**
 * Crawl every internal link reachable from the content routes and assert each
 * resolves (status < 400) and renders an h1. Runs once (desktop) to keep the
 * matrix fast.
 */
test.describe('link integrity', () => {
  test('all internal links resolve and render', async ({ page, request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'desktop only');
    const seen = new Set<string>();
    const queue = [...CONTENT_ROUTES];
    const broken: string[] = [];

    while (queue.length) {
      const route = queue.shift()!;
      if (seen.has(route)) continue;
      seen.add(route);

      const res = await request.get(route);
      if (res.status() >= 400) {
        broken.push(`${route} -> ${res.status()}`);
        continue;
      }

      await page.goto(route);
      await expect(page.locator('h1'), `h1 on ${route}`).toHaveCount(1);

      const hrefs = await page.$$eval('a[href]', (els) =>
        els
          .map((a) => a.getAttribute('href') || '')
          .filter((h) => h.startsWith('/') && !h.startsWith('//')),
      );
      for (const href of hrefs) {
        const clean = href.split('#')[0]!.split('?')[0]!;
        if (clean && !seen.has(clean)) queue.push(clean);
      }
    }

    expect(broken, 'broken internal links').toEqual([]);
  });
});
