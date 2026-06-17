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
  { label: 'Field notes', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const primaryCta: NavItem = {
  label: 'Request a proposal',
  href: '/owners/proposal',
};

export const footerNav: NavItem[] = [
  { label: 'Owners', href: '/owners' },
  { label: 'Services', href: '/owners/services' },
  { label: 'Pricing', href: '/owners/pricing' },
  { label: 'Owner FAQ', href: '/owners/faq' },
  { label: 'Rentals', href: '/rentals' },
  { label: 'Renter FAQ', href: '/rentals/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Legal / policy links, grouped separately in the footer. */
export const legalNav: NavItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
];

/** True for internal absolute paths we own (used for active-state + testing). */
export function isInternal(href: string): boolean {
  return href.startsWith('/');
}
