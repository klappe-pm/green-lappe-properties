// Title: blog-post.ts
// Summary: Sanity schema for field notes blog. Megan writes; Astro renders at greenpmpnw.com/blog/[slug].
// Usage: import into sanity.config.ts schema.types array.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Field note',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'One or two sentences. Shown on the blog index and in email previews.',
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Compliance', value: 'compliance' },
          { title: 'Market notes', value: 'market' },
          { title: 'Operations', value: 'operations' },
          { title: 'For owners', value: 'for-owners' },
          { title: 'For residents', value: 'for-residents' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audience',
      title: 'Primary audience',
      type: 'string',
      options: {
        list: [
          { title: 'Owners', value: 'owner' },
          { title: 'Renters/residents', value: 'renter' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'both',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Body', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() },
            { name: 'caption', type: 'string', title: 'Caption (optional)' },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout',
          fields: [
            {
              name: 'tone',
              type: 'string',
              options: {
                list: ['note', 'heads-up', 'warning', 'success'],
              },
              initialValue: 'note',
            },
            { name: 'title', type: 'string' },
            { name: 'body', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'team' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
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
    select: {
      title: 'title',
      category: 'category',
      date: 'publishDate',
      media: 'featuredImage',
    },
    prepare({ title, category, date, media }) {
      const dateStr = date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
      return {
        title,
        subtitle: `${category || 'uncategorized'} · ${dateStr}`,
        media,
      }
    },
  },
  orderings: [
    { title: 'Newest first', name: 'publishDesc', by: [{ field: 'publishDate', direction: 'desc' }] },
    { title: 'Oldest first', name: 'publishAsc', by: [{ field: 'publishDate', direction: 'asc' }] },
  ],
})
