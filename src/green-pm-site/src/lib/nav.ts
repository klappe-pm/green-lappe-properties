/**
 * Navigation model. Route paths follow the routing spec
 * (product/design/uxd/design-system/docs/83-routing.md): lowercase,
 * hyphenated, no trailing slash. Only routes that exist in this scaffold are
 * listed; portal and blog routes are added as those features land.
 */
export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: 'Owners', href: '/owners' },
  { label: 'Rentals', href: '/rentals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const primaryCta: NavItem = {
  label: 'Request a proposal',
  href: '/owners/proposal',
};

export const footerNav: NavItem[] = [
  { label: 'Owners', href: '/owners' },
  { label: 'Rentals', href: '/rentals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** True for internal absolute paths we own (used for active-state + testing). */
export function isInternal(href: string): boolean {
  return href.startsWith('/');
}
