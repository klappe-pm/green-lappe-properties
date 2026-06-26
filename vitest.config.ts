import { defineConfig } from 'vitest/config';

// Fast unit tests over pure logic + data sources. Astro component tests run
// under vitest.components.config.ts (they need the Astro vite plugin). Static
// HTML tests run under vitest.static.config.ts.
export default defineConfig({
  test: {
    include: ['tests/*.{test,spec}.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/env.d.ts'],
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        statements: 95,
        branches: 90,
        functions: 95,
        lines: 95,
      },
    },
  },
});
