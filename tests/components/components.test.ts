import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import Button from '../../src/components/Button.astro';
import Footer from '../../src/components/Footer.astro';
import Header from '../../src/components/Header.astro';
import Field from '../../src/components/forms/Field.astro';
import PendingSubmit from '../../src/components/forms/PendingSubmit.astro';
import FaqList from '../../src/features/faq/FaqList.astro';
import PricingTable from '../../src/features/owners/PricingTable.astro';
import ListingCard from '../../src/features/rentals/ListingCard.astro';

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

describe('Button', () => {
  it('renders an anchor when href is set', async () => {
    const html = await container.renderToString(Button, {
      props: { href: '/owners/proposal', variant: 'primary' },
      slots: { default: 'Request a proposal' },
    });
    expect(html).toContain('<a');
    expect(html).toContain('href="/owners/proposal"');
    expect(html).toContain('Request a proposal');
    expect(html).toContain('bg-clay');
  });

  it('renders a button when href is absent', async () => {
    const html = await container.renderToString(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'Go' },
    });
    expect(html).toContain('<button');
    expect(html).toContain('border-cedar');
  });
});

describe('Field', () => {
  it('input: forwards required and renders the asterisk', async () => {
    const html = await container.renderToString(Field, {
      props: { id: 'email', label: 'Email', type: 'email', required: true },
    });
    expect(html).toContain('for="email"');
    expect(html).toContain('type="email"');
    expect(html).toContain('required');
    expect(html).toContain('*');
  });

  it('textarea: forwards required (regression for the PR review fix)', async () => {
    const html = await container.renderToString(Field, {
      props: { id: 'msg', label: 'Message', as: 'textarea', required: true },
    });
    expect(html).toContain('<textarea');
    expect(html).toContain('required');
  });

  it('select: renders options and forwards required', async () => {
    const html = await container.renderToString(Field, {
      props: { id: 'cat', label: 'Category', as: 'select', required: true, options: ['A', 'B'] },
    });
    expect(html).toContain('<select');
    expect(html).toContain('required');
    expect(html).toMatch(/<option[^>]*>A<\/option>/);
    expect(html).toMatch(/<option[^>]*>B<\/option>/);
  });
});

describe('PendingSubmit', () => {
  it('renders a disabled submit with the note slot', async () => {
    const html = await container.renderToString(PendingSubmit, {
      props: { label: 'Send', statusId: 's1' },
      slots: { default: 'Not connected yet' },
    });
    expect(html).toContain('type="submit"');
    expect(html).toContain('disabled');
    expect(html).toContain('id="s1"');
    expect(html).toContain('Not connected yet');
  });
});

describe('ListingCard', () => {
  it('shows address, specs, formatted rent, and status', async () => {
    const html = await container.renderToString(ListingCard, {
      props: {
        listing: {
          address: '1 Test St, Seattle',
          slug: '1-test-st-seattle',
          neighborhood: 'Ballard',
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1200,
          rent: 3200,
          status: 'available',
          availableDate: '2026-08-01',
          description: 'd',
          amenities: [],
          petPolicy: 'p',
        },
      },
    });
    expect(html).toContain('1 Test St, Seattle');
    expect(html).toContain('Ballard');
    expect(html).toContain('$3,200/mo');
    expect(html).toContain('3 bd · 2 ba · 1,200 sqft');
    expect(html).toContain('Available');
    // heading-order fix: card title is an h2
    expect(html).toContain('<h2');
  });
});

describe('FaqList', () => {
  it('renders each FAQ as a disclosure', async () => {
    const html = await container.renderToString(FaqList, {
      props: {
        faqs: [
          { question: 'How much?', answer: 'Nine percent.', audience: 'owner', displayOrder: 1 },
        ],
      },
    });
    expect(html).toContain('<details');
    expect(html).toContain('How much?');
    expect(html).toContain('Nine percent.');
  });
});

describe('PricingTable', () => {
  it('renders the locked pricing rows in a scroll-safe container', async () => {
    const html = await container.renderToString(PricingTable, {});
    expect(html).toContain('overflow-x-auto');
    expect(html).toMatch(/9%/);
    expect(html).toMatch(/60%/);
  });
});

describe('Header / Footer', () => {
  it('Header shows the brand and the proposal CTA', async () => {
    const html = await container.renderToString(Header, {});
    expect(html).toContain('Green PM');
    expect(html).toContain('href="/owners/proposal"');
  });

  it('Footer shows broker, email, and legal links', async () => {
    const html = await container.renderToString(Footer, {});
    expect(html).toContain('Megan Green');
    expect(html).toContain('mailto:megan@greenpmpnw.com');
    expect(html).toContain('href="/privacy"');
  });
});
