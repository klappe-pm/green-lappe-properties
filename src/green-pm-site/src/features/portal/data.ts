/**
 * Portal sample data, shaped after the Rentvine entities the portals read
 * (properties, statements, leases, repairs). This is PREVIEW data only — the
 * live portals authenticate via Clerk and read from Rentvine
 * (see 84-pms-integration.md). Replace these getters with cached Rentvine API
 * calls behind a verified Clerk session.
 */

export interface OwnerProperty {
  id: string;
  address: string;
  status: 'occupied' | 'vacant' | 'listed';
  monthlyRent: number;
  resident?: string;
}

export interface OwnerStatement {
  id: string;
  period: string; // e.g. "May 2026"
  net: number;
  status: 'ready' | 'processing';
}

export interface Repair {
  id: string;
  summary: string;
  category: 'plumbing' | 'electrical' | 'heating' | 'appliance' | 'other';
  status: 'open' | 'scheduled' | 'complete';
  reportedAt: string; // yyyy-MM-dd
}

export interface ResidentLease {
  property: string;
  rent: number;
  nextDueDate: string; // yyyy-MM-dd
  balance: number;
}

const OWNER_PROPERTIES: OwnerProperty[] = [
  { id: 'p-101', address: '1823 NW 65th St, Seattle', status: 'occupied', monthlyRent: 3950, resident: 'A. Patel' },
  { id: 'p-102', address: '905 5th Ave S, Edmonds', status: 'listed', monthlyRent: 2650 },
];

const OWNER_STATEMENTS: OwnerStatement[] = [
  { id: 's-2026-05', period: 'May 2026', net: 3604, status: 'ready' },
  { id: 's-2026-04', period: 'April 2026', net: 3604, status: 'ready' },
];

const RESIDENT_LEASE: ResidentLease = {
  property: '1823 NW 65th St, Seattle',
  rent: 3950,
  nextDueDate: '2026-07-01',
  balance: 0,
};

const RESIDENT_REPAIRS: Repair[] = [
  { id: 'r-501', summary: 'Kitchen faucet drips', category: 'plumbing', status: 'scheduled', reportedAt: '2026-06-10' },
];

export const getOwnerProperties = (): OwnerProperty[] => [...OWNER_PROPERTIES];
export const getOwnerStatements = (): OwnerStatement[] => [...OWNER_STATEMENTS];
export const getResidentLease = (): ResidentLease => ({ ...RESIDENT_LEASE });
export const getResidentRepairs = (): Repair[] => [...RESIDENT_REPAIRS];
