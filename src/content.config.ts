import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Insight content model (Content Model & Governance §2 "Insight").
 * Workflow: Idea → Draft → Fact Check → Editorial Review → Brand Review → Approved → Published.
 * Only `published` entries reach a production build (src/lib/content.ts).
 */
export const CATEGORIES = ['calc', 'before-buying', 'home-invest', 'myths'] as const;

const insights = defineCollection({
  // id = "<lang>/<file>" so both locales can share the same public slug.
  loader: glob({ pattern: '**/*.md', base: './src/content/insights', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    lang: z.enum(['ar', 'en']),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(4),
    excerpt: z.string().min(20).max(240),
    category: z.enum(CATEGORIES),
    format: z.enum(['article', 'guide', 'checklist']),
    /** Canonical campaign Content IDs this entry is adapted from (KHA_C90_*). */
    sourceIds: z.array(z.string().regex(/^KHA_C90_[A-Z]{2}_[A-Z]{3}_\d{3}$/)).min(1),
    /** Date the source item was last verified in the canonical database. */
    sourceVerified: z.coerce.date(),
    /** Refresh trigger from the database (`refresh_due`). */
    reviewDue: z.string(),
    publishState: z.enum(['draft', 'fact-check', 'approved', 'published']),
    updated: z.coerce.date(),
    order: z.number().int(),
    keyword: z.string().max(14),
    assumptions: z.array(z.string()).optional(),
    cta: z.enum(['interest', 'compare', 'ask']),
  }),
});

export const collections = { insights };
