/**
 * FAQ data mirrors the Sanity `faq` schema (question, answer, audience,
 * category, displayOrder). Sample data until the content layer is wired.
 */
import { isSanityConfigured, sanityFetch } from '../../lib/sanity';

export type FaqAudience = 'owner' | 'renter' | 'both';

export interface Faq {
  question: string;
  answer: string;
  audience: FaqAudience;
  displayOrder: number;
}

const FAQS: Faq[] = [
  {
    question: 'What does management cost?',
    answer:
      'Nine percent of collected rent, plus a placement fee of 60% of one month’s rent when we lease a home. No setup fees and no markup on maintenance.',
    audience: 'owner',
    displayOrder: 1,
  },
  {
    question: 'Which areas do you serve?',
    answer: 'King and Snohomish counties, Washington — with a focus on the Eastside and Seattle.',
    audience: 'both',
    displayOrder: 2,
  },
  {
    question: 'How many properties do you manage?',
    answer:
      'We keep the book small on purpose so owners get a direct line and residents get fast responses.',
    audience: 'owner',
    displayOrder: 3,
  },
  {
    question: 'How do I apply for a rental?',
    answer:
      'Inquire on the home you’re interested in. After a showing, Megan sends a secure application link covering identity, income, references, and a credit/background check.',
    audience: 'renter',
    displayOrder: 4,
  },
  {
    question: 'How fast are repairs handled?',
    answer:
      'Report a repair and you’ll get a confirmation right away. Routine items are scheduled with vetted vendors; emergencies are triaged immediately.',
    audience: 'renter',
    displayOrder: 5,
  },
];

/** FAQs for an audience surface, including shared ('both') entries, ordered. */
export function getFaqs(audience: Exclude<FaqAudience, 'both'>): Faq[] {
  return FAQS.filter((f) => f.audience === audience || f.audience === 'both').sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
}

// --- Sanity-backed source (build-time), with sample fallback ---------------

const FAQS_QUERY = `*[_type == "faq" && (audience == $audience || audience == "both")] | order(displayOrder asc){
  question,
  "answer": pt::text(answer),
  audience,
  displayOrder
}`;

export async function fetchFaqs(audience: Exclude<FaqAudience, 'both'>): Promise<Faq[]> {
  if (!isSanityConfigured()) return getFaqs(audience);
  return sanityFetch<Faq[]>(FAQS_QUERY, [], { audience });
}
