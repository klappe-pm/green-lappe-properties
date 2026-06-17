import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the Sanity SDK so we can drive the client's success and error paths.
const { fetchMock } = vi.hoisted(() => ({ fetchMock: vi.fn() }));
vi.mock('@sanity/client', () => ({
  createClient: vi.fn(() => ({ fetch: fetchMock })),
}));

describe('sanity client (configured via env)', () => {
  beforeEach(() => {
    vi.resetModules();
    fetchMock.mockReset();
    vi.stubEnv('SANITY_PROJECT_ID', 'test-project');
    vi.stubEnv('SANITY_DATASET', 'production');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('reports configured and returns query results', async () => {
    fetchMock.mockResolvedValue([{ ok: true }]);
    const mod = await import('../src/lib/sanity');
    expect(mod.isSanityConfigured()).toBe(true);
    await expect(mod.sanityFetch('*[_type=="x"]', [])).resolves.toEqual([{ ok: true }]);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('degrades to the fallback when a query throws', async () => {
    fetchMock.mockRejectedValue(new Error('boom'));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const mod = await import('../src/lib/sanity');
    await expect(mod.sanityFetch('*', ['fallback'])).resolves.toEqual(['fallback']);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe('sanity client (unconfigured)', () => {
  beforeEach(() => {
    vi.resetModules();
    fetchMock.mockReset();
    vi.unstubAllEnvs();
  });

  it('returns the fallback without calling the client', async () => {
    const mod = await import('../src/lib/sanity');
    expect(mod.isSanityConfigured()).toBe(false);
    await expect(mod.sanityFetch('*', ['fb'])).resolves.toEqual(['fb']);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
