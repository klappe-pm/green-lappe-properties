/**
 * Audience modes drive the `data-audience` attribute on <html>, which
 * modes.css uses to override surface tokens. See the design system's
 * 11-audience-modes.md.
 */
export const AUDIENCE_MODES = [
  'neutral-acquisition',
  'owner-acquisition',
  'owner-product',
  'renter-acquisition',
  'renter-product',
] as const;

export type AudienceMode = (typeof AUDIENCE_MODES)[number];

export function isAudienceMode(value: string): value is AudienceMode {
  return (AUDIENCE_MODES as readonly string[]).includes(value);
}
