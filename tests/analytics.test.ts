import { afterEach, describe, expect, it, vi } from 'vitest';
import { ANALYTICS_EVENTS, isPiiKey, sanitizeProps, track } from '../src/lib/analytics';

afterEach(() => {
  // biome-ignore lint/performance/noDelete: test cleanup of the global stub
  delete (globalThis as { plausible?: unknown }).plausible;
});

describe('event taxonomy', () => {
  it('uses snake_case goal names', () => {
    for (const name of Object.values(ANALYTICS_EVENTS)) {
      expect(name).toMatch(/^[a-z]+(_[a-z]+)*$/);
    }
  });
});

describe('PII protection', () => {
  it('flags PII-looking keys', () => {
    for (const k of ['email', 'phone', 'firstName', 'property_address', 'ssn']) {
      expect(isPiiKey(k), k).toBe(true);
    }
  });
  it('allows safe keys', () => {
    for (const k of ['location', 'neighborhood', 'count', 'variant']) {
      expect(isPiiKey(k), k).toBe(false);
    }
  });
  it('sanitizeProps drops PII and non-primitives', () => {
    const out = sanitizeProps({
      neighborhood: 'Ballard',
      count: 3,
      ok: true,
      email: 'a@b.com',
      nested: { x: 1 } as never,
    });
    expect(out).toEqual({ neighborhood: 'Ballard', count: 3, ok: true });
  });
});

describe('track', () => {
  it('no-ops safely when Plausible is absent', () => {
    expect(() => track(ANALYTICS_EVENTS.ctaClicked, { location: 'hero' })).not.toThrow();
  });

  it('forwards sanitized props to plausible when present', () => {
    const spy = vi.fn();
    (globalThis as { plausible?: unknown }).plausible = spy;
    track(ANALYTICS_EVENTS.rentalViewed, { neighborhood: 'Ballard', email: 'a@b.com' });
    expect(spy).toHaveBeenCalledWith('rental_viewed', { props: { neighborhood: 'Ballard' } });
  });

  it('omits the options object when no safe props remain', () => {
    const spy = vi.fn();
    (globalThis as { plausible?: unknown }).plausible = spy;
    track(ANALYTICS_EVENTS.portalSignInStarted, { email: 'a@b.com' });
    expect(spy).toHaveBeenCalledWith('portal_signin_started', undefined);
  });
});
