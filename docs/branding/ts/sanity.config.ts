// Title: sanity.config.ts
// Summary: Sanity Studio configuration. Lives at studio.greenpmpnw.com.
// Usage: `npm run dev` in sanity/ folder starts local Studio; deploy via `sanity deploy`.

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import listing from './schemas/listing'
import blogPost from './schemas/blog-post'
import lead from './schemas/lead'
import page from './schemas/page'
import faq from './schemas/faq'
import team from './schemas/team'
import settings from './schemas/settings'

export default defineConfig({
  name: 'green-pm',
  title: 'Green Property Management',

  // TODO: Kevin to provide projectId after Sanity project creation
  projectId: 'TODO_PROJECT_ID',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: settings
            S.listItem()
              .title('Site settings')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
              ),
            S.divider(),
            S.listItem().title('Rental listings').child(S.documentTypeList('listing').title('Rental listings')),
            S.listItem().title('Field notes (blog)').child(S.documentTypeList('blogPost').title('Field notes')),
            S.listItem().title('Pages').child(S.documentTypeList('page').title('Pages')),
            S.listItem().title('FAQs').child(S.documentTypeList('faq').title('FAQs')),
            S.divider(),
            S.listItem().title('Leads').child(S.documentTypeList('lead').title('Leads')),
            S.divider(),
            S.listItem().title('Team').child(S.documentTypeList('team').title('Team')),
          ]),
    }),
    visionTool(), // GROQ query playground; Kevin tool only
  ],

  schema: {
    types: [
      listing,
      blogPost,
      page,
      faq,
      team,
      lead,
      settings,
    ],
    templates: (templates) =>
      // Prevent creating new "settings" docs (singleton)
      templates.filter((t) => t.schemaType !== 'settings'),
  },
})
