import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n/routes';
import { SITE_MODE } from '@/config/site';
import { isPublishable } from './publish';

export type Insight = CollectionEntry<'insights'>;

export const categoryLabel: Record<Locale, Record<Insight['data']['category'], string>> = {
  ar: { calc: 'احسبها مع خليل', 'before-buying': 'قبل أن تشتري', 'home-invest': 'سكن واستثمار', myths: 'صح أم يعتمد؟' },
  en: { calc: 'Run the numbers', 'before-buying': 'Before you buy', 'home-invest': 'Home & investment', myths: 'True, or it depends?' },
};

export const formatLabel: Record<Locale, Record<Insight['data']['format'], string>> = {
  ar: { article: 'مقال', guide: 'دليل', checklist: 'قائمة فحص' },
  en: { article: 'Article', guide: 'Guide', checklist: 'Checklist' },
};

/** Insights for one locale, gated by publish state for the current build mode, in editorial order. */
export async function getInsights(lang: Locale): Promise<Insight[]> {
  const all = await getCollection('insights', (e) => e.data.lang === lang && isPublishable(e.data.publishState, SITE_MODE));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function formatDate(d: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-OM-u-nu-latn' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}
