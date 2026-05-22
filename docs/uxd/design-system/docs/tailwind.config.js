// Title: tailwind.config.js
// Summary: Tailwind configuration for Green Property Management v3. Mirrors green-pm-tokens.css.
// Version: 3.0.0
// Usage: Astro reads this at build time. Single source of truth for utility class generation.
//
// v3 typography pivot:
//   - display: Geist (was Fraunces)
//   - body:    Newsreader (was Inter)
//   - accent:  Fraunces (new; italic signature use only)
//   - mono:    Removed entirely
//
// See docs/21-typography-tokens.md and docs/23-typography-migration.md.

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx,jsx,tsx,ts,js}'],
  theme: {
    extend: {
      colors: {
        // Primitives
        cedar: '#2D6A4F',
        ink:   '#1F2A2E',
        cream: '#FBF6EC',
        paper: '#F7F5F0',
        stone: '#D4D1CA',
        clay:  '#A95C42',
        sky:   '#7BA7B8',

        // Derived neutrals
        'ink-80': '#3D4A4E',
        'ink-60': '#5C6A6E',
        'ink-40': '#8A9498',
        'ink-20': '#C2C8CA',

        // System
        success: '#3E7A55',
        warning: '#A8741A',
        error:   '#9C2D1F',
        info:    '#3A6480',

        // Semantic aliases
        brand:        '#2D6A4F',
        'brand-deep': '#1F2A2E',
        action:       '#A95C42',
        'accent-cool': '#7BA7B8',
      },

      // v3 typography
      fontFamily: {
        display: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        body:    ['Newsreader', 'Georgia', '"Times New Roman"', 'serif'],
        accent:  ['Fraunces', 'Georgia', '"Times New Roman"', 'serif'],
        // mono removed in v3
      },

      // Mobile-first scale (matches base.css media query strategy)
      fontSize: {
        xs:      ['0.75rem',   { lineHeight: '1.5' }],
        sm:      ['0.875rem',  { lineHeight: '1.5' }],
        base:    ['1rem',      { lineHeight: '1.55' }],
        md:      ['1.125rem',  { lineHeight: '1.5' }],
        lg:      ['1.25rem',   { lineHeight: '1.4' }],
        xl:      ['1.5rem',    { lineHeight: '1.35' }],
        '2xl':   ['1.875rem',  { lineHeight: '1.3' }],
        '3xl':   ['2.25rem',   { lineHeight: '1.2' }],
        display: ['2.75rem',   { lineHeight: '1.05' }],
        prose:   ['1.0625rem', { lineHeight: '1.6' }],  // 17px Newsreader body
      },

      fontWeight: {
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
        // Forbidden in v3: 100, 200, 300, 800, 900
      },

      letterSpacing: {
        tight:  '-0.02em',
        normal: '0',
        wide:   '0.08em',
      },

      lineHeight: {
        tight:   '1.15',
        snug:    '1.35',
        normal:  '1.55',
        relaxed: '1.6',
      },

      borderRadius: {
        sm:      '4px',
        DEFAULT: '8px',
        md:      '8px',
        lg:      '16px',
        pill:    '999px',
      },

      boxShadow: {
        1: '0 1px 2px rgba(31, 42, 46, 0.06)',
        2: '0 4px 12px rgba(31, 42, 46, 0.08)',
        3: '0 12px 32px rgba(31, 42, 46, 0.12)',
      },

      screens: {
        sm:   '640px',
        md:   '768px',
        lg:   '1024px',
        xl:   '1280px',
        '2xl': '1536px',
      },

      maxWidth: {
        prose: '65ch',
        form:  '40ch',
        card:  '40ch',
        modal: '480px',
      },

      minHeight: {
        touch: '44px',
      },

      minWidth: {
        touch: '44px',
      },

      zIndex: {
        base:     '1',
        dropdown: '10',
        sticky:   '20',
        skip:     '25',
        modal:    '30',
        popover:  '40',
        toast:    '50',
        tooltip:  '60',
      },

      transitionDuration: {
        DEFAULT: '200ms',
        fast:    '100ms',
        quick:   '150ms',
        slow:    '250ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      backgroundImage: {
        // Cedar gradient used for image placeholders
        'cedar-gradient': 'linear-gradient(135deg, #3D7A52 0%, #2D6A4F 60%, #1F4A36 100%)',
      },
    },
  },
  plugins: [
    // Optional: official Tailwind plugins
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
