import { devices, expect, test } from '@playwright/test';

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
      for (const route of [
        '/',
        '/owners/pricing',
        '/rentals',
        '/portal/owner',
        '/portal/owner/properties',
      ]) {
        await page.goto(route);
        const { overflow, offenders } = await page.evaluate(() => {
          const cw = document.documentElement.clientWidth;
          const bad: string[] = [];
          for (const el of Array.from(document.body.querySelectorAll('*'))) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.right > cw + 1) {
              const cls = (el.getAttribute('class') ?? '').split(/\s+/).slice(0, 3).join('.');
              bad.push(`${el.tagName.toLowerCase()}.${cls} right=${Math.round(r.right)}`);
            }
          }
          return {
            overflow: document.documentElement.scrollWidth - cw,
            offenders: bad.slice(0, 6),
          };
        });
        expect(
          overflow,
          `overflow at ${width}px on ${route} — offenders: ${offenders.join(' | ')}`,
        ).toBeLessThanOrEqual(1);
      }
    });
  }
});

test.describe('redirects', () => {
  // Static builds emit a meta-refresh stub pointing at the absolute production
  // URL (and Cloudflare _redirects handles real 301s in prod). Assert the
  // target without following off-origin to greenpmpnw.com.
  for (const [from, to] of [
    ['/services', '/owners/services'],
    ['/pricing', '/owners/pricing'],
    ['/login', '/portal'],
  ] as const) {
    test(`${from} redirects to ${to}`, async ({ request }) => {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status()).toBeLessThan(400);
      expect(await res.text(), `redirect stub for ${from}`).toContain(to);
    });
  }
});

// Keep the devices import referenced for clarity of intent in CI logs.
void devices;
