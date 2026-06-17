import { expect, test } from '@playwright/test';
import { CONTENT_ROUTES, SURFACE_BY_ROUTE } from './routes';

test.describe('rendering', () => {
  for (const route of CONTENT_ROUTES) {
    test(`${route} renders with a single visible h1 and no horizontal overflow`, async ({
      page,
    }) => {
      const response = await page.goto(route);
      expect(response?.status(), `status for ${route}`).toBeLessThan(400);

      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();

      // No horizontal scroll at this viewport. Compare against clientWidth
      // (excludes the scrollbar) so a vertical scrollbar isn't a false positive.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(1);
    });
  }
});

test.describe('color correctness (computed surface tokens)', () => {
  for (const [route, expected] of Object.entries(SURFACE_BY_ROUTE)) {
    test(`${route} body surface is ${expected}`, async ({ page }) => {
      await page.goto(route);
      const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      expect(bg).toBe(expected);
    });
  }

  test('primary CTA uses the Clay action color', async ({ page }) => {
    await page.goto('/owners');
    const cta = page.getByRole('link', { name: 'Request a proposal' }).first();
    const bg = await cta.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(169, 92, 66)'); // clay #A95C42
  });
});

test.describe('accessibility basics', () => {
  test('skip link becomes visible on focus and targets main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    expect(await page.locator('#main').count()).toBe(1);
  });

  test('interactive controls meet the 44px touch target', async ({ page }) => {
    await page.goto('/owners');
    const cta = page.getByRole('link', { name: 'Request a proposal' }).first();
    const box = await cta.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });
});
