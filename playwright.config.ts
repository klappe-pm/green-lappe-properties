import { defineConfig, devices } from '@playwright/test';

/**
 * E2E config. Browser binaries can't be downloaded in the dev sandbox (network
 * policy blocks the CDN), so this suite runs in CI (GitHub Actions), which has
 * open network. Projects cover desktop, Android (Pixel/Chromium), and
 * iOS (iPhone/WebKit) to validate rendering, computed colors, and breakpoints.
 */
const PORT = 4321;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'android', use: { ...devices['Pixel 7'] } },
    { name: 'ios', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
