// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Canonical production domain per the locked design system (docs/uxd/design-system).
const SITE_URL = process.env.SITE_URL ?? 'https://greenpmpnw.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    tailwind({
      // The canonical reset lives in src/styles/base.css (design-system source).
      // Do not let the integration inject its own base layer.
      applyBaseStyles: false,
    }),
  ],
  build: {
    // Emit clean directory-style URLs (no .html), matching the routing spec
    // in docs/uxd/design-system/docs/83-routing.md.
    format: 'directory',
  },
});
