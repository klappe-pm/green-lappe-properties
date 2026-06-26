import { getViteConfig } from 'astro/config';

// Component tests render .astro components via the Astro Container API, so they
// need the Astro vite plugin (getViteConfig provides it).
export default getViteConfig({
  test: {
    include: ['tests/components/**/*.{test,spec}.ts'],
    environment: 'node',
  },
});
