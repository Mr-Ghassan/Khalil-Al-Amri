// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Site URL is the identity domain listed in the brand package. It is used for
 * canonical/hreflang/sitemap generation only; ownership and DNS are still
 * open (OPEN-01) — see docs/GAPS_AND_APPROVALS.md.
 */
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.khalilprop.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    routing: { prefixDefaultLocale: false },
  },
  prefetch: false,
  devToolbar: { enabled: false },
});
