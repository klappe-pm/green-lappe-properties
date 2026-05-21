// Title: lead.ts
// Summary: Sanity schema for inbound leads. Triple-written by form handlers (Sanity + HubSpot + Megan email).
// Usage: import into sanity.config.ts schema.types array.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact', default: true },
    { name: 'details', title: 'Details' },
    { name: 'tracking', title: 'Tracking' },
  ],
  fields: [
    defineField({
      name: 'type',
      title: 'Lead type',
      type: 'string',
      group: 'contact',
      options: {
        list: [
          { title: 'Owner proposal request', value: 'owner-proposal' },
          { title: 'Renter inquiry', value: 'renter-inquiry' },
          { title: 'General contact', value: 'general-contact' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      group: 'details',
      rows: 4,
    }),
    defineField({
      name: 'propertyDetails',
      title: 'Property details (for owner proposals)',
      type: 'object',
      group: 'details',
      hidden: ({ document }) => document?.type !== 'owner-proposal',
      fields: [
        { name: 'address', type: 'string', title: 'Property address' },
        { name: 'doors', type: 'number', title: 'Number of doors' },
        { name: 'propertyType', type: 'string', title: 'Type', options: { list: ['SFR', 'Duplex', 'Triplex', 'Fourplex', 'Small multifamily 5-20'] } },
        { name: 'currentRent', type: 'number', title: 'Current rent (if rented)' },
        { name: 'currentlyManaged', type: 'boolean', title: 'Currently with another PM?' },
        { name: 'currentPm', type: 'string', title: 'Current PM name (if applicable)' },
      ],
    }),
    defineField({
      name: 'rentalInterest',
      title: 'Rental interest (for renter inquiries)',
      type: 'object',
      group: 'details',
      hidden: ({ document }) => document?.type !== 'renter-inquiry',
      fields: [
        { name: 'listing', type: 'reference', to: [{ type: 'listing' }], title: 'Interested listing' },
        { name: 'moveDate', type: 'date', title: 'Desired move date' },
        { name: 'householdSize', type: 'number', title: 'Household size' },
        { name: 'hasPets', type: 'boolean', title: 'Pets?' },
        { name: 'petDetails', type: 'string', title: 'Pet details' },
      ],
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      group: 'tracking',
      description: 'Page or campaign where the lead originated',
      options: {
        list: [
          'landing-page', 'owner-page', 'rental-listing', 'about-page',
          'blog-post', 'yard-sign', 'referral', 'google-search', 'other',
        ],
      },
    }),
    defineField({
      name: 'sourceDetail',
      title: 'Source detail',
      type: 'string',
      group: 'tracking',
      description: 'Specific URL or listing or referrer name',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'tracking',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Converted', value: 'converted' },
          { title: 'Closed (lost)', value: 'closed-lost' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'hubspotContactId',
      title: 'HubSpot contact ID',
      type: 'string',
      group: 'tracking',
      readOnly: true,
      description: 'Populated by form handler. Links to HubSpot record.',
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted at',
      type: 'datetime',
      group: 'tracking',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal notes',
      type: 'text',
      group: 'tracking',
      rows: 4,
      description: 'Megan\'s notes from follow-up conversations.',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
      status: 'status',
      date: 'createdAt',
    },
    prepare({ name, type, status, date }) {
      const typeLabel = type ? type.replace(/-/g, ' ') : 'lead'
      const dateStr = date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
      return {
        title: name || 'Anonymous lead',
        subtitle: `${typeLabel} · ${status || 'new'} · ${dateStr}`,
      }
    },
  },
  orderings: [
    { title: 'Newest first', name: 'createdDesc', by: [{ field: 'createdAt', direction: 'desc' }] },
    { title: 'Status', name: 'status', by: [{ field: 'status', direction: 'asc' }] },
  ],
})
