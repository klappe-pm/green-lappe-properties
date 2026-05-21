// Title: faq.ts
// Summary: Sanity schema for FAQ entries shown on owner and renter pages.
// Usage: import into sanity.config.ts schema.types array.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['fees', 'process', 'compliance', 'maintenance', 'leasing', 'payments', 'other'],
      },
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      options: {
        list: [
          { title: 'Owners', value: 'owner' },
          { title: 'Renters/residents', value: 'renter' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'audience' },
  },
  orderings: [
    { title: 'Sort order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
