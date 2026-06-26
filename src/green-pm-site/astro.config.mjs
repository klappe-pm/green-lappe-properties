import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// Canonical production domain per the locked design system (docs/uxd/design-system).
const SITE_URL = process.env.SITE_URL ?? 'https://greenpmpnw.com';
// BASE_PATH is set when deploying to a subpath (e.g. GitHub Pages: /green-lappe-properties).
const BASE_PATH = process.env.BASE_PATH ?? '';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
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
  // 301 redirects from the routing spec (only those pointing at pages that
  // exist today; portal/login redirects are added with the portal feature).
  redirects: {
    '/home': '/',
    '/services': '/owners/services',
    '/pricing': '/owners/pricing',
    '/contact-us': '/contact',
    '/rental': '/rentals',
    '/listings': '/rentals',
    '/properties': '/rentals',
    '/login': '/portal',
    '/signin': '/portal',
  },
});
