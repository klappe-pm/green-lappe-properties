import { type SanityClient, createClient } from '@sanity/client';

/**
 * Sanity client, configured from environment variables. The site builds and
 * runs WITHOUT Sanity (content falls back to sample data) until these are set,
 * so this seam goes live the moment credentials are provided — no code change.
 *
 * Required to enable Sanity-backed content:
 *   SANITY_PROJECT_ID
 *   SANITY_DATASET           (e.g. production)
 * Optional:
 *   SANITY_API_VERSION       (default 2024-01-01)
 *   SANITY_API_TOKEN         (only for draft/preview reads; public data needs none)
 */
const projectId = import.meta.env.SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET ?? process.env.SANITY_DATASET;
const apiVersion =
  import.meta.env.SANITY_API_VERSION ?? process.env.SANITY_API_VERSION ?? '2024-01-01';
const token = import.meta.env.SANITY_API_TOKEN ?? process.env.SANITY_API_TOKEN;

/** True when enough config exists to talk to Sanity. */
export function isSanityConfigured(): boolean {
  return Boolean(projectId && dataset);
}

let client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!client) {
    client = createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion,
      token,
      useCdn: !token, // CDN for public reads; skip when using a token (drafts)
      perspective: 'published',
    });
  }
  return client;
}

/**
 * Run a GROQ query when Sanity is configured; otherwise return the provided
 * fallback. Any query error also degrades to the fallback so a CMS hiccup never
 * breaks the build.
 */
export async function sanityFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!isSanityConfigured()) return fallback;
  try {
    return await getClient().fetch<T>(query, params);
  } catch (err) {
    // Build-time content must never hard-fail on a CMS error.
    console.warn('[sanity] query failed; using fallback:', (err as Error).message);
    return fallback;
  }
}
