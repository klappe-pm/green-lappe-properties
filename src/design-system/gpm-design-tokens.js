/**
 * Green Property Management design tokens.
 *
 * This is the JavaScript contract for future components. CSS output uses
 * src/styles/green-pm-tokens.css; Tailwind mirrors the same token values in
 * tailwind.config.js.
 */

export const primitives = {
  cedar: '#2D6A4F',
  ink: '#1F2A2E',
  cream: '#FBF6EC',
  paper: '#F7F5F0',
  stone: '#D4D1CA',
  clay: '#A95C42',
  sky: '#7BA7B8',
};

export const derivedNeutrals = {
  ink80: '#3D4A4E',
  ink60: '#5C6A6E',
  ink40: '#8A9498',
  ink20: '#C2C8CA',
};

export const systemColors = {
  success: '#3E7A55',
  warning: '#A8741A',
  error: '#9C2D1F',
  info: '#3A6480',
};

export const semanticTokens = {
  colorBrand: primitives.cedar,
  colorBrandContrast: primitives.cream,
  colorAction: primitives.clay,
  colorActionContrast: primitives.cream,
  colorTextBody: primitives.ink,
  colorTextSecondary: derivedNeutrals.ink80,
  colorTextMeta: derivedNeutrals.ink60,
  colorTextDisabled: derivedNeutrals.ink40,
  colorSurfaceAcquisition: primitives.cream,
  colorSurfaceProduct: primitives.paper,
  colorSecondary: primitives.sky,
  colorSecondaryContrast: primitives.ink,
  colorDivider: derivedNeutrals.ink20,
  colorBorder: primitives.stone,
  colorSuccess: systemColors.success,
  colorWarning: systemColors.warning,
  colorError: systemColors.error,
  colorInfo: systemColors.info,
};

export const typography = {
  families: {
    work: 'Geist, system-ui, -apple-system, sans-serif',
    prose: 'Newsreader, Georgia, "Times New Roman", serif',
    accent: 'Fraunces, Georgia, "Times New Roman", serif',
  },
  scale: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    md: '1.125rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '1.875rem',
    '3xl': '2.25rem',
    display: '2.75rem',
    prose: '1.0625rem',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
};

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  pill: '999px',
};

export const shadows = {
  1: '0 1px 2px rgba(31, 42, 46, 0.06)',
  2: '0 4px 12px rgba(31, 42, 46, 0.08)',
  3: '0 12px 32px rgba(31, 42, 46, 0.12)',
};

export const focus = {
  outline: `2px solid ${primitives.cedar}`,
  outlineOffset: '2px',
};

export const audienceModes = {
  neutralAcquisition: {
    value: 'neutral-acquisition',
    surface: 'cream',
    density: 'low',
    tone: 'welcoming',
  },
  ownerAcquisition: {
    value: 'owner-acquisition',
    surface: 'paper',
    density: 'high',
    tone: 'procedural',
  },
  ownerProduct: {
    value: 'owner-product',
    surface: 'paper',
    density: 'high',
    tone: 'frictionless',
  },
  renterAcquisition: {
    value: 'renter-acquisition',
    surface: 'cream',
    density: 'low',
    tone: 'aspirational',
  },
  renterProduct: {
    value: 'renter-product',
    surface: 'paper',
    density: 'medium',
    tone: 'reliable-human',
  },
};

export const wordsToAvoid = [
  'solutions',
  'passionate',
  'dedicated',
  'trusted',
  'boutique',
  'concierge',
  'white-glove',
  'journey',
  'stakeholder',
  'leverage',
  'synergy',
  'bespoke',
  'curated',
  'unlock',
  'empower',
  'family of brands',
  'world-class',
  'value-add',
  'unbeatable',
];

export const governanceRules = {
  clay: 'Clay = click. Use Clay only for actionable controls and CTA states.',
  primitives: 'The seven brand primitives are locked.',
  terminology: 'Use renter before lease and resident after authentication.',
  operator: 'Megan signs the work on major surfaces.',
  state: 'State color must be paired with icon plus text label.',
};

export const components = {
  button: {
    primary: {
      background: semanticTokens.colorAction,
      color: semanticTokens.colorActionContrast,
      borderRadius: radius.md,
      minHeight: '44px',
    },
    secondary: {
      color: semanticTokens.colorBrand,
      border: `1px solid ${semanticTokens.colorBrand}`,
      borderRadius: radius.md,
      minHeight: '44px',
    },
    quiet: {
      color: semanticTokens.colorBrand,
      textDecoration: 'underline',
    },
  },
  card: {
    statement: {
      background: 'white',
      borderLeft: `4px solid ${semanticTokens.colorBrand}`,
      borderRadius: radius.md,
      boxShadow: shadows[1],
    },
  },
  callout: {
    success: { color: systemColors.success, label: 'Paid' },
    warning: { color: systemColors.warning, label: 'Pending' },
    error: { color: systemColors.error, label: 'Overdue' },
    info: { color: systemColors.info, label: 'Note' },
  },
};

export const gpm = {
  primitives,
  derivedNeutrals,
  systemColors,
  semanticTokens,
  typography,
  spacing,
  radius,
  shadows,
  focus,
  audienceModes,
  wordsToAvoid,
  governanceRules,
  components,
};

export default gpm;
