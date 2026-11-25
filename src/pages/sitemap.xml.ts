import type { APIRoute } from 'astro';
import { getInsights } from '@/lib/content';
import { alternatePath, href, insightHref, type PageKey } from '@/i18n/routes';

/** sitemap.xml with hreflang alternates (ar = x-default). Pages only; drafts follow the publication gate. */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://www.khalilprop.com');
  const pages: PageKey[] = ['home', 'about', 'advisory', 'insights', 'interest', 'contact', 'privacy', 'terms'];
  const arPaths = [...pages.map((p) => href('ar', p)), ...(await getInsights('ar')).map((e) => insightHref('ar', e.data.slug))];
  const urls = arPaths.flatMap((ar) => [ar, alternatePath(ar, 'en')]).map((path) => {
    const ar = new URL(alternatePath(path, 'ar'), base).href;
    const en = new URL(alternatePath(path, 'en'), base).href;
    return `  <url><loc>${new URL(path, base).href}</loc>` +
      `<xhtml:link rel="alternate" hreflang="ar" href="${ar}"/>` +
      `<xhtml:link rel="alternate" hreflang="en" href="${en}"/>` +
      `<xhtml:link rel="alternate" hreflang="x-default" href="${ar}"/></url>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
