import { describe, expect, it } from 'vitest';
import { alternatePath, href, insightHref, localeFromPath } from '../../src/i18n/routes';
import { isPublishable } from '../../src/lib/publish';

describe('locale routing', () => {
  it('serves Arabic at the root and English under /en/', () => {
    expect(href('ar', 'home')).toBe('/');
    expect(href('en', 'home')).toBe('/en/');
    expect(href('ar', 'about')).toBe('/about/');
    expect(href('en', 'interest', 'form')).toBe('/en/interest/#form');
    expect(insightHref('en', 'buy-or-rent')).toBe('/en/insights/buy-or-rent/');
  });

  it.each([
    ['/', 'en', '/en/'],
    ['/en/', 'ar', '/'],
    ['/about/', 'en', '/en/about/'],
    ['/en/insights/buy-or-rent/', 'ar', '/insights/buy-or-rent/'],
    ['/insights/buy-or-rent', 'en', '/en/insights/buy-or-rent/'],
    ['/en/contact/', 'en', '/en/contact/'],
  ] as const)('maps %s to its %s counterpart', (from, to, out) => expect(alternatePath(from, to)).toBe(out));

  it('detects the locale from the path', () => {
    expect(localeFromPath('/en/about/')).toBe('en');
    expect(localeFromPath('/about/')).toBe('ar');
    expect(localeFromPath('/enquiry/')).toBe('ar');
  });
});

describe('publication gate', () => {
  it('production includes only published content', () => {
    expect(isPublishable('published', 'production')).toBe(true);
    expect(isPublishable('approved', 'production')).toBe(false);
    expect(isPublishable('draft', 'production')).toBe(false);
  });
  it('preview shows every state (labelled in the UI)', () => {
    expect(isPublishable('draft', 'preview')).toBe(true);
  });
});
