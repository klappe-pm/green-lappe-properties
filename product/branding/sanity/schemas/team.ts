// Title: team.ts
// Summary: Sanity schema for team members. Today: just Megan. Built to scale.
// Usage: import into sanity.config.ts schema.types array.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Designated Broker',
    }),
    defineField({
      name: 'licenseNumber',
      title: 'WA broker license #',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', validation: (Rule) => Rule.required() }],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'isPrimary',
      title: 'Primary contact?',
      type: 'boolean',
      description: 'Shows as the named operator in signatures and contact blocks.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
