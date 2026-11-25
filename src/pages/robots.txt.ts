import type { APIRoute } from 'astro';
import { IS_PREVIEW } from '@/config/site';

/** Preview builds are never indexed (Engineering §9: staging must not be indexed). */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://www.khalilprop.com');
  const body = IS_PREVIEW
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', base).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
