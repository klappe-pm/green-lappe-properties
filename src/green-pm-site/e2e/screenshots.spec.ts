import { test } from '@playwright/test';
import { CONTENT_ROUTES } from './routes';

/**
 * Captures a full-page screenshot of every content route on every device
 * project (desktop, Android, iOS). These are uploaded as a CI artifact for
 * pixel-level human visual review — the automated colour/overflow/a11y checks
 * live in rendering.spec.ts / Lighthouse.
 */
test.describe('visual screenshots', () => {
  for (const route of CONTENT_ROUTES) {
    test(`screenshot ${route}`, async ({ page }, testInfo) => {
      await page.goto(route);
      // Let fonts/layout settle.
      await page.waitForLoadState('networkidle').catch(() => {});
      const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
      await page.screenshot({
        path: `screenshots/${testInfo.project.name}/${slug}.png`,
        fullPage: true,
      });
    });
  }
});
