import { describe, it, expect } from 'vitest';
import { formatRent, formatSpecs, slugifyAddress } from '../src/lib/format';

describe('formatRent', () => {
  it('formats whole-dollar monthly rent', () => {
    expect(formatRent(2950)).toBe('$2,950/mo');
  });
  it('drops cents', () => {
    expect(formatRent(4600.75)).toBe('$4,601/mo');
  });
  it('rejects negative or non-finite input', () => {
    expect(() => formatRent(-1)).toThrow(RangeError);
    expect(() => formatRent(Number.NaN)).toThrow(RangeError);
  });
});

describe('formatSpecs', () => {
  it('includes sqft when present', () => {
    expect(formatSpecs(3, 2, 1450)).toBe('3 bd · 2 ba · 1,450 sqft');
  });
  it('omits sqft when absent', () => {
    expect(formatSpecs(2, 1)).toBe('2 bd · 1 ba');
  });
});

describe('slugifyAddress', () => {
  it('produces a kebab-case ascii slug', () => {
    expect(slugifyAddress('1823 NW 65th St, Seattle')).toBe('1823-nw-65th-st-seattle');
  });
  it('has no leading/trailing or doubled separators', () => {
    expect(slugifyAddress('  412  228th Ave NE,  Sammamish ')).toBe('412-228th-ave-ne-sammamish');
  });
});
