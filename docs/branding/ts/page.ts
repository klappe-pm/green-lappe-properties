// Title: page.ts
// Summary: Sanity schema for generic editorial pages (about, accessibility, privacy, terms).
// Usage: import into sanity.config.ts schema.types array.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audienceMode',
      title: 'Audience mode',
      type: 'string',
      options: {
        list: [
          { title: 'Neutral (landing)', value: 'neutral-acquisition' },
          { title: 'Owner acquisition', value: 'owner-acquisition' },
          { title: 'Renter acquisition', value: 'renter-acquisition' },
        ],
      },
      initialValue: 'neutral-acquisition',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', validation: (Rule) => Rule.required() }] },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) },
        { name: 'metaDescription', type: 'text', rows: 2, validation: (Rule) => Rule.max(160) },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? `/${slug}` : '' }),
  },
})
