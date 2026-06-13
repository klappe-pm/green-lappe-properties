// Title: settings.ts
// Summary: Sanity singleton for site-wide settings: contact info, social, footer copy.
// Usage: import into sanity.config.ts. Mark as singleton in structure.ts.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company name',
      type: 'string',
      initialValue: 'Green Property Management',
    }),
    defineField({
      name: 'shortName',
      title: 'Short name',
      type: 'string',
      initialValue: 'Green PM',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Used in hero sections and meta titles.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'officeAddress',
      title: 'Office address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'brokerLicense',
      title: 'WA broker license #',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url' },
        { name: 'instagram', type: 'url' },
        { name: 'facebook', type: 'url' },
        { name: 'nextdoor', type: 'url' },
      ],
    }),
    defineField({
      name: 'portalUrls',
      title: 'Portal URLs',
      type: 'object',
      fields: [
        { name: 'owner', type: 'url', title: 'Owner portal URL' },
        { name: 'resident', type: 'url', title: 'Resident portal URL' },
      ],
    }),
    defineField({
      name: 'footerLegal',
      title: 'Footer legal text',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
