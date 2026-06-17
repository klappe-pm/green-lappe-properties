import { defineConfig } from 'vitest/config';

// Static-HTML suite: builds the site (globalSetup) then asserts over dist/.
export default defineConfig({
  test: {
    include: ['tests/static/**/*.{test,spec}.ts'],
    globalSetup: ['tests/static/global-setup.ts'],
    environment: 'node',
    testTimeout: 30000,
    hookTimeout: 120000,
  },
});
