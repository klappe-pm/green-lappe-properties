import { defineConfig } from 'vitest/config';

// Fast unit tests over pure logic. Static-HTML tests live in tests/static/ and
// run via vitest.static.config.ts (they build the site first).
export default defineConfig({
  test: {
    include: ['tests/*.{test,spec}.ts'],
    environment: 'node',
  },
});
