import { describe, expect, it } from 'vitest';
import { site } from '../src/config/site';

describe('site config', () => {
  it('uses the canonical brand + domain', () => {
    expect(site.name).toBe('Green Property Management');
    expect(site.shortName).toBe('Green PM');
    expect(site.domain).toBe('greenpmpnw.com');
    expect(site.url).toBe('https://greenpmpnw.com');
  });

  it('has the locked pricing facts', () => {
    expect(site.pricing.managementFee).toMatch(/9%/);
    expect(site.pricing.leasingFee).toMatch(/60%/);
    expect(site.pricing.maintenanceMarkup).toBe('None');
  });

  it('names the designated broker and service area', () => {
    expect(site.broker.name).toBe('Megan Green');
    expect(site.broker.title).toBe('Designated Broker');
    expect(site.serviceArea).toMatch(/King/);
    expect(site.serviceArea).toMatch(/Snohomish/);
  });

  it('exposes a contact email on the domain', () => {
    expect(site.email).toMatch(/@greenpmpnw\.com$/);
  });
});
