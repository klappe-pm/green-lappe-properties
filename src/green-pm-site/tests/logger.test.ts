import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildLog, logEvent } from '../src/lib/logger';

afterEach(() => vi.restoreAllMocks());

describe('buildLog', () => {
  it('includes level, event, ISO timestamp, and fields', () => {
    const r = buildLog('info', 'form_submitted', { form: 'owner-proposal', doors: 3 });
    expect(r.level).toBe('info');
    expect(r.event).toBe('form_submitted');
    expect(r.form).toBe('owner-proposal');
    expect(r.doors).toBe(3);
    expect(r.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T.*Z$/);
  });
});

describe('logEvent', () => {
  it('emits one JSON line and returns it', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const line = logEvent('info', 'ping', { ok: true });
    expect(() => JSON.parse(line)).not.toThrow();
    expect(JSON.parse(line)).toMatchObject({ level: 'info', event: 'ping', ok: true });
    expect(spy).toHaveBeenCalledWith(line);
  });

  it('routes errors to console.error and warns to console.warn', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logEvent('error', 'boom');
    logEvent('warn', 'careful');
    expect(err).toHaveBeenCalledOnce();
    expect(warn).toHaveBeenCalledOnce();
  });
});
