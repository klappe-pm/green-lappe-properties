---
domain: brand
category: design-system
sub-category: sanity-schemas
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 80-system-architecture
produces:
  - schema-inventory
  - per-schema-spec
  - schema-relationships
  - sanity-studio-config
  - migration-and-versioning-rules
executor: engineering
aliases: []
tags: []
---

# 85-sanity-schemas

The Sanity content schema specification. Every document type, every field, every reference relationship, and how the Sanity Studio is organized. Consumed by the engineer building schemas, the editor (Megan) authoring content, and Astro at build time.

## Dependencies

- `80-system-architecture` for Sanity's role in the stack

## Outputs

1. Schema inventory (every document type)
2. Per-schema field specifications
3. Schema relationships (references between documents)
4. Sanity Studio desk structure (how Megan navigates)
5. Validation rules
6. Migration and versioning rules
7. Forbidden schema patterns

## Schema inventory

| Schema | Singular | Plural | Type | Purpose |
|---|---|---|---|---|
| `listing` | Listing | Listings | document | Rental property listing for `/rentals` |
| `blogPost` | Field note | Field notes | document | Editorial content for `/blog` |
| `faq` | FAQ | FAQs | document | Question-and-answer content |
| `page` | Page | Pages | document | Marketing pages (`/about`, custom landing pages) |
| `lead` | Lead | Leads | document | Captured from `/owners/proposal` and `/rentals/inquire` (or sync into HubSpot via webhook; the Sanity record is a local copy) |
| `team` | Team member | Team | document | People at Green PM (currently one: Megan) |
| `settings` | Settings | n/a | singleton | Site-wide settings (footer copy, social links, default OG image) |
| `tag` | Tag | Tags | document | Tags for blog posts and listings |
| `neighborhood` | Neighborhood | Neighborhoods | document | Geographic regions served (Ballard, Edmonds, Bothell, etc.) |

## Per-schema specifications

### `listing`

```typescript
export default defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Street address',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'address', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'reference',
      to: [{ type: 'neighborhood' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0).max(10),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule) => Rule.required().min(0.5).max(10).precision(1),
    }),
    defineField({
      name: 'sqft',
      title: 'Square footage',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(100).max(20000),
    }),
    defineField({
      name: 'rent',
      title: 'Monthly rent (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(500).max(50000),
    }),
    defineField({
      name: 'availableDate',
      title: 'Available date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Coming soon', value: 'coming-soon' },
          { title: 'Available now', value: 'available' },
          { title: 'Application pending', value: 'pending' },
          { title: 'Leased', value: 'leased' },
          { title: 'Off market', value: 'off-market' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Long description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Newsreader prose; describe the property in detail.',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [{
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string',
        }],
      }],
      validation: (Rule) => Rule.min(5).max(50),
      description: 'Exterior wide, living, kitchen, each bedroom, each bathroom, distinctive features.',
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Pet-friendly',
          'In-unit laundry',
          'Off-street parking',
          'Garage',
          'Yard',
          'Deck or patio',
          'Fireplace',
          'Air conditioning',
          'Dishwasher',
          'Hardwood floors',
          'Updated kitchen',
          'Updated bathroom',
          'Basement',
          'Storage',
          'Bike storage',
          'EV charging',
        ],
      },
    }),
    defineField({
      name: 'petPolicy',
      title: 'Pet policy',
      type: 'string',
      options: {
        list: [
          'No pets',
          'Cats only',
          'Dogs only',
          'Cats and dogs welcome',
          'Negotiable; case by case',
        ],
      },
    }),
    defineField({
      name: 'leaseTerms',
      title: 'Lease terms',
      type: 'string',
      options: {
        list: [
          '12 months',
          '24 months',
          '6 months',
          'Month to month',
        ],
      },
    }),
    defineField({
      name: 'utilitiesIncluded',
      title: 'Utilities included',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Water', 'Sewer', 'Garbage', 'Electric', 'Gas', 'Internet', 'Cable'],
      },
    }),
    defineField({
      name: 'depositAmount',
      title: 'Security deposit (USD)',
      type: 'number',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'rentvineId',
      title: 'Rentvine ID',
      type: 'string',
      description: 'Internal Rentvine property ID; used for sync.',
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'address', subtitle: 'rent', media: 'photos.0' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `$${subtitle}/mo` : 'Rent not set',
        media,
      };
    },
  },
});
```

### `blogPost`

```typescript
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (category label)',
      type: 'string',
      description: 'Short uppercased label shown above the title.',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [{
        name: 'caption',
        title: 'Caption',
        type: 'string',
      }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'One- or two-sentence summary; used in listings and meta description.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', type: 'string' }] },
        {
          type: 'object',
          name: 'pullQuote',
          fields: [{ name: 'quote', type: 'string' }, { name: 'attribution', type: 'string' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'relatedListings',
      title: 'Related listings (optional)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'listing' }] }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title (overrides if set)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description (overrides excerpt if set)',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    { name: 'publishedAtDesc', title: 'Published date, newest', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { name: 'publishedAtAsc', title: 'Published date, oldest', by: [{ field: 'publishedAt', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'heroImage' },
  },
});
```

### `faq`

```typescript
export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      options: {
        list: [
          { title: 'Owner', value: 'owner' },
          { title: 'Renter', value: 'renter' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Pricing', 'Services', 'Application process', 'Lease', 'Rent and payments', 'Maintenance', 'Compliance', 'Other'],
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first within a category.',
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'audience' },
  },
});
```

### `page`

For one-off marketing pages outside the standard routes.

```typescript
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'audienceMode', type: 'string', options: { list: ['neutral-acquisition', 'owner-acquisition', 'renter-acquisition'] } }),
    defineField({
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      of: [
        { type: 'object', name: 'heroSection', fields: [/* hero fields */] },
        { type: 'object', name: 'prosSection', fields: [/* prose fields */] },
        { type: 'object', name: 'ctaSection', fields: [/* CTA fields */] },
      ],
    }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text' }),
  ],
});
```

### `lead`

A local mirror of CRM leads; primary record lives in HubSpot.

```typescript
export default defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({ name: 'firstName', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'lastName', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'email', type: 'string', validation: (Rule) => Rule.required().email() }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'type', type: 'string', options: { list: ['Owner proposal', 'Renter inquiry'] }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'propertyAddress', type: 'string' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({ name: 'hubspotId', type: 'string', readOnly: true }),
    defineField({ name: 'submittedAt', type: 'datetime', readOnly: true }),
  ],
});
```

### `team`

```typescript
export default defineType({
  name: 'team',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'credential', type: 'string', description: 'e.g., Designated Broker · WA #XXXXXX' }),
    defineField({ name: 'bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
  ],
});
```

### `settings` (singleton)

```typescript
export default defineType({
  name: 'settings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', type: 'string', initialValue: 'Green Property Management' }),
    defineField({ name: 'shortName', type: 'string', initialValue: 'Green PM' }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'serviceArea', type: 'string', initialValue: 'King and Snohomish counties, Washington' }),
    defineField({ name: 'brokerName', type: 'string', initialValue: 'Megan Green' }),
    defineField({ name: 'brokerLicense', type: 'string' }),
    defineField({ name: 'defaultOgImage', type: 'image' }),
    defineField({ name: 'footerCopy', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', type: 'string' },
          { name: 'url', type: 'string' },
        ],
      }],
    }),
  ],
});
```

### `tag`

```typescript
export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'label' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
  ],
});
```

### `neighborhood`

```typescript
export default defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'county', type: 'string', options: { list: ['King', 'Snohomish'] } }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
  ],
});
```

## Sanity Studio configuration

### Desk structure

Sanity Studio organizes content into a custom desk:

```
Sanity Studio
├── Listings (by status)
│   ├── Available
│   ├── Coming soon
│   ├── Pending
│   ├── Leased
│   └── Off market
├── Field notes (by date desc)
├── FAQs (by audience)
│   ├── Owner
│   ├── Renter
│   └── Both
├── Pages
├── Leads (by type, recent first)
├── Settings (singleton)
└── Taxonomy
    ├── Tags
    ├── Neighborhoods
    └── Team
```

### Editor user roles

| Role | Permissions |
|---|---|
| Administrator | Megan: full read/write |
| Editor | (Future contractor): read/write listings, blog posts, FAQs; read-only on settings |
| Viewer | (Future): read-only |

## Validation rules summary

- Required fields enforced at schema level
- Email fields validated as email
- Slugs auto-generated from source field; editable
- Image uploads validated for type (JPEG, PNG, WebP)
- Block content allows headings (H2 to H4), bold, italic, links, lists, images, pull quotes
- Listings require minimum 5 photos
- Slugs cannot exceed 96 characters
- Phone field stored as string, not number (preserves formatting)

## Migration and versioning

Schema changes go through a migration process:

1. Make the change in `sanity/schemas/[schema].ts`
2. Test locally with the dev dataset
3. If the change is destructive (renaming a field, deleting a field), write a migration script using Sanity's CLI `sanity dataset import` or `@sanity/migrate`
4. Run migration on preview dataset first
5. Verify
6. Run migration on production dataset
7. Update Astro queries that reference the changed field
8. Deploy

Never delete fields from production without:

- Backing up the dataset
- Migrating existing data
- Updating consumers

## Forbidden schema patterns

- Renaming a field without a migration plan
- Deleting required-field validation without verifying existing data complies
- Adding mandatory fields to existing documents without backfilling
- Storing booleans as strings ("true", "false")
- Storing dates as strings (use `date` or `datetime` type)
- Storing prices in dollars and cents in separate fields (use a single number in dollars; display formatting at the view layer)
- Free-text fields where a constrained `list` is appropriate
- Schema files outside `sanity/schemas/`
- References without `validation: required` where the relationship is mandatory
- Image fields without `options: { hotspot: true }`
- Documents larger than typical (split into smaller documents when content exceeds reasonable editor scope)

## Acceptance

This doc is acceptable when:

- Every Astro page that reads from Sanity has a corresponding schema documented here
- Every field has a type, validation rule, and editor-friendly title
- The desk structure matches the editor's mental model
- A new schema can be added by an engineer using the patterns here
- Migration and versioning rules are explicit
- Forbidden patterns are flaggable in code review
