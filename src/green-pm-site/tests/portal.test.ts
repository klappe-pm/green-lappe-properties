import { describe, it, expect } from 'vitest';
import {
  getOwnerProperties,
  getOwnerStatements,
  getResidentLease,
  getResidentRepairs,
} from '../src/features/portal/data';
import { ownerPortalNav, residentPortalNav, isInternal } from '../src/lib/nav';

describe('portal sample data', () => {
  it('owner properties carry a valid status and positive rent', () => {
    for (const p of getOwnerProperties()) {
      expect(['occupied', 'vacant', 'listed']).toContain(p.status);
      expect(p.monthlyRent).toBeGreaterThan(0);
    }
  });
  it('statements have a period and net', () => {
    for (const s of getOwnerStatements()) {
      expect(s.period.length).toBeGreaterThan(0);
      expect(typeof s.net).toBe('number');
    }
  });
  it('resident lease + repairs are well-formed', () => {
    expect(getResidentLease().rent).toBeGreaterThan(0);
    for (const r of getResidentRepairs()) {
      expect(['open', 'scheduled', 'complete']).toContain(r.status);
    }
  });
});

describe('portal navigation', () => {
  it('links to internal portal routes only', () => {
    for (const item of [...ownerPortalNav, ...residentPortalNav]) {
      expect(isInternal(item.href)).toBe(true);
      expect(item.href.startsWith('/portal/')).toBe(true);
    }
  });
});
