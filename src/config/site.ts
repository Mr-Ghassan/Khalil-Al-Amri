/**
 * Central, type-safe site configuration.
 * Fixed identity data comes from Brand Package v1.2 FINAL ("Fixed data") and
 * Design System v1.1 `contact.*` tokens. Listing a channel in the identity does
 * NOT prove it works in production (decision KHA-004) — see `verified` flags and
 * scripts/launch-gate.mjs.
 */

export type SiteMode = 'preview' | 'production';
export type LeadMode = 'prototype';

const rawMode = import.meta.env.PUBLIC_SITE_MODE;
export const SITE_MODE: SiteMode = rawMode === 'production' ? 'production' : 'preview';
export const IS_PREVIEW = SITE_MODE === 'preview';

/** Only the non-submitting prototype exists. Live intake needs OPEN-05/06/07/09 resolved. */
export const LEAD_MODE: LeadMode = 'prototype';

export const LICENSED_FONTS = import.meta.env.PUBLIC_LICENSED_FONTS === '1';

export const person = {
  nameAr: 'خليل العامري',
  nameArVocalised: 'خَلِيلٌ الْعَامِرِيّ',
  nameEn: 'Khalil Al Amri',
  descriptorAr: 'مستشار عقاري',
  descriptorEn: 'Real Estate Consultant',
} as const;

export interface Channel {
  /** true only after an operational test is recorded in docs/GAPS_AND_APPROVALS.md */
  verified: boolean;
  /** Decision-log reference that blocks verification. */
  openItem?: string;
}

export const contact = {
  instagram: {
    handle: 'Khalil_alamrii',
    url: 'https://www.instagram.com/Khalil_alamrii/',
    verified: false,
    openItem: 'KHA-004',
  },
  website: { display: 'www.khalilprop.com', verified: false, openItem: 'OPEN-01' },
  phone: { display: '+968 76788852', e164: '+96876788852', verified: false, openItem: 'KHA-004' },
  email: { address: 'info@khalilprop.com', verified: false, openItem: 'OPEN-01 / OPEN-09' },
  /** Never rendered as a link until OPEN-04 confirms WhatsApp Business on this number. */
  whatsapp: { enabled: false, verified: false, openItem: 'OPEN-04' },
} as const satisfies Record<string, Channel & Record<string, unknown>>;

/** Order and rule from DS v1.1 `contact.order` / `contact.rule`. */
export const CONTACT_ORDER = ['instagram', 'website', 'phone'] as const;
