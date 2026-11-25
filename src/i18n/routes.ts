export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ar';

export const dir = (lang: Locale): 'rtl' | 'ltr' => (lang === 'ar' ? 'rtl' : 'ltr');

/** Stable page keys shared by both locales. Every page has a functional equivalent in the other language. */
export type PageKey =
  | 'home'
  | 'about'
  | 'advisory'
  | 'insights'
  | 'interest'
  | 'contact'
  | 'privacy'
  | 'terms';

const PATHS: Record<PageKey, string> = {
  home: '/',
  about: '/about/',
  advisory: '/advisory/',
  insights: '/insights/',
  interest: '/interest/',
  contact: '/contact/',
  privacy: '/privacy/',
  terms: '/terms/',
};

/** Arabic is served at the root (Arabic-first); English under /en/. */
export function href(lang: Locale, page: PageKey, hash = ''): string {
  const base = PATHS[page];
  const path = lang === 'ar' ? base : `/en${base}`;
  return hash ? `${path}#${hash}` : path;
}

export function insightHref(lang: Locale, slug: string): string {
  return lang === 'ar' ? `/insights/${slug}/` : `/en/insights/${slug}/`;
}

/** Maps any path to its counterpart in the other locale (used by the language switch and hreflang). */
export function alternatePath(pathname: string, to: Locale): string {
  const clean = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const isEn = clean === '/en/' || clean.startsWith('/en/');
  const neutral = isEn ? clean.slice(3) || '/' : clean;
  if (to === 'ar') return neutral;
  return neutral === '/' ? '/en/' : `/en${neutral}`;
}

export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ar';
}
