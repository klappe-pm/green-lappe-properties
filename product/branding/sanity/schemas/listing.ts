// Title: listing.ts
// Summary: Sanity schema for rental property listings. Synced from Rentvine nightly + on-demand.
// Usage: import into sanity.config.ts schema.types array.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'listing',
  title: 'Rental listing',
  type: 'document',
  groups: [
    { name: 'core', title: 'Core details', default: true },
    { name: 'specs', title: 'Specifications' },
    { name: 'media', title: 'Photos & media' },
    { name: 'meta', title: 'Status & sync' },
  ],
  fields: [
    defineField({
      name: 'address',
      title: 'Street address',
      type: 'string',
      group: 'core',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'core',
      options: {
        source: 'address',
        maxLength: 80,
        slugify: (input) => input.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'string',
      group: 'core',
      description: 'e.g. Ballard, Greenwood, Bothell',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'core',
      options: {
        list: ['Seattle', 'Bothell', 'Kirkland', 'Edmonds', 'Shoreline', 'Lynnwood', 'Redmond', 'Mountlake Terrace', 'Other'],
      },
    }),
    defineField({
      name: 'beds',
      title: 'Bedrooms',
      type: 'number',
      group: 'specs',
      validation: (Rule) => Rule.required().min(0).max(10),
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'number',
      group: 'specs',
      validation: (Rule) => Rule.required().min(0).max(10),
    }),
    defineField({
      name: 'sqft',
      title: 'Square feet',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'rent',
      title: 'Monthly rent (USD)',
      type: 'number',
      group: 'core',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'deposit',
      title: 'Security deposit (USD)',
      type: 'number',
      group: 'core',
    }),
    defineField({
      name: 'availableDate',
      title: 'Available date',
      type: 'date',
      group: 'core',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      group: 'media',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() },
          { name: 'caption', type: 'string', title: 'Caption (optional)' },
        ],
      }],
      validation: (Rule) => Rule.min(1).warning('At least one photo recommended'),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
      options: {
        list: [
          'In-unit washer/dryer', 'Dishwasher', 'Hardwood floors', 'Carpet',
          'Off-street parking', 'Garage', 'Yard', 'Deck/patio',
          'Storage', 'Updated kitchen', 'Updated bath',
          'Pet-friendly', 'No pets', 'Cat OK', 'Small dog OK',
          'Heat included', 'Water/sewer/garbage included', 'All utilities included',
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'core',
      rows: 6,
      description: 'Written in Megan\'s voice. Direct, specific, no fluff.',
    }),
    defineField({
      name: 'petPolicy',
      title: 'Pet policy details',
      type: 'string',
      group: 'specs',
    }),
    defineField({
      name: 'status',
      title: 'Listing status',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Application pending', value: 'pending' },
          { title: 'Leased', value: 'leased' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'syncedFromRentvine',
      title: 'Rentvine listing ID',
      type: 'string',
      group: 'meta',
      readOnly: true,
      description: 'Populated automatically by nightly sync. Do not edit.',
    }),
    defineField({
      name: 'lastSyncedAt',
      title: 'Last sync timestamp',
      type: 'datetime',
      group: 'meta',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'address',
      subtitle: 'neighborhood',
      media: 'photos.0',
      status: 'status',
      rent: 'rent',
    },
    prepare({ title, subtitle, media, status, rent }) {
      const rentDisplay = rent ? `$${rent.toLocaleString()}/mo` : ''
      const statusLabel = status ? ` · ${status}` : ''
      return {
        title: title || 'Untitled listing',
        subtitle: `${subtitle || ''} ${rentDisplay}${statusLabel}`.trim(),
        media,
      }
    },
  },
  orderings: [
    { title: 'Available date (soonest first)', name: 'availableAsc', by: [{ field: 'availableDate', direction: 'asc' }] },
    { title: 'Rent (low to high)', name: 'rentAsc', by: [{ field: 'rent', direction: 'asc' }] },
    { title: 'Rent (high to low)', name: 'rentDesc', by: [{ field: 'rent', direction: 'desc' }] },
  ],
})
