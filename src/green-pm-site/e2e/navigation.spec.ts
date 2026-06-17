import { test, expect, devices } from '@playwright/test';

const isMobile = (name: string) => name === 'android' || name === 'ios';

test.describe('responsive navigation', () => {
  test('primary nav links are hidden on mobile, shown on desktop; CTA always shown', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    const navList = page.locator('header nav ul').first();
    const cta = page.getByRole('link', { name: 'Request a proposal' }).first();

    await expect(cta).toBeVisible();

    if (isMobile(testInfo.project.name)) {
      await expect(navList).toBeHidden();
    } else {
      await expect(navList).toBeVisible();
    }
  });

  test('header brand links home', async ({ page }) => {
    await page.goto('/owners');
    await page.locator('header a', { hasText: 'Green PM' }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('breakpoints have no overflow', () => {
  const widths = [320, 375, 414, 768, 1024, 1280, 1440];
  for (const width of widths) {
    test(`no horizontal overflow at ${width}px on key pages`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/', '/owners/pricing', '/rentals', '/portal/owner']) {
        await page.goto(route);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `overflow at ${width}px on ${route}`).toBeLessThanOrEqual(1);
      }
    });
  }
});

test.describe('redirects', () => {
  for (const [from, to] of [
    ['/services', '/owners/services'],
    ['/pricing', '/owners/pricing'],
    ['/login', '/portal'],
  ] as const) {
    test(`${from} lands on ${to}`, async ({ page }) => {
      await page.goto(from);
      await expect(page).toHaveURL(new RegExp(`${to.replace(/\//g, '\\/')}\\/?$`));
    });
  }
});

// Keep the devices import referenced for clarity of intent in CI logs.
void devices;
