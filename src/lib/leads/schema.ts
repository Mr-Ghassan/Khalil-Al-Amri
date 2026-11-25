/**
 * Lead intake contract — shared by the browser form and any future server endpoint
 * (docs/contracts/lead-intake.openapi.yaml). Pure functions, no I/O, unit tested.
 *
 * Minimum data (Leads & CRM §3): name, phone, intent, contact consent.
 * Never collected: ID documents, bank details, date of birth.
 * Marketing consent is separate, optional and never pre-checked (§4).
 */
import { normalizePhone } from './phone';

export const INTENTS = ['home', 'investment', 'compare', 'general'] as const;
export type Intent = (typeof INTENTS)[number];
export const CHANNELS = ['call', 'email'] as const; // WhatsApp is excluded until OPEN-04 is verified.
export const BUDGETS = ['lt40', '40-80', '80-150', 'gt150', 'discuss'] as const;
export const TIMEFRAMES = ['3m', '3-12m', 'gt12m', 'exploring'] as const;

/** Version of the consent wording shown to the user. Bump whenever the text changes. */
export const CONSENT_VERSION = 'draft-2026-11-25';

export interface LeadInput {
  name?: string | undefined;
  phone?: string | undefined;
  intent?: string | undefined;
  consentContact?: boolean | undefined;
  consentMarketing?: boolean | undefined;
  channel?: string | undefined;
  email?: string | undefined;
  budget?: string | undefined;
  timeframe?: string | undefined;
  details?: string | undefined;
  /** Honeypot: hidden from people; any value means automated submission. */
  website?: string | undefined;
  /** ms between form render and submit; under 2.5 s is treated as automated. */
  elapsedMs?: number | undefined;
}

export interface Lead {
  name: string;
  phoneE164: string;
  intent: Intent;
  consent: { contact: true; marketing: boolean; version: string };
  channel?: (typeof CHANNELS)[number] | undefined;
  email?: string | undefined;
  budget?: (typeof BUDGETS)[number] | undefined;
  timeframe?: (typeof TIMEFRAMES)[number] | undefined;
  details?: string | undefined;
}

export type ErrorCode =
  | 'name.required' | 'name.length'
  | 'phone.required' | 'phone.invalid'
  | 'intent.required' | 'intent.invalid'
  | 'consent.required'
  | 'email.invalid' | 'email.requiredForChannel'
  | 'details.length'
  | 'option.invalid'
  | 'spam';

export type FieldName = 'name' | 'phone' | 'intent' | 'consentContact' | 'email' | 'details' | 'channel' | 'budget' | 'timeframe' | 'form';
export type Errors = Partial<Record<FieldName, ErrorCode>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (s?: string) => (s ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
const oneOf = <T extends readonly string[]>(list: T, v?: string): v is T[number] => !!v && (list as readonly string[]).includes(v);

export function validateLead(input: LeadInput): { ok: true; lead: Lead } | { ok: false; errors: Errors } {
  const errors: Errors = {};

  if (clean(input.website) || (typeof input.elapsedMs === 'number' && input.elapsedMs < 2500)) {
    return { ok: false, errors: { form: 'spam' } };
  }

  const name = clean(input.name);
  if (!name) errors.name = 'name.required';
  else if (name.length < 2 || name.length > 80) errors.name = 'name.length';

  const rawPhone = clean(input.phone);
  const phoneE164 = rawPhone ? normalizePhone(rawPhone) : null;
  if (!rawPhone) errors.phone = 'phone.required';
  else if (!phoneE164) errors.phone = 'phone.invalid';

  if (!input.intent) errors.intent = 'intent.required';
  else if (!oneOf(INTENTS, input.intent)) errors.intent = 'intent.invalid';

  if (input.consentContact !== true) errors.consentContact = 'consent.required';

  const email = clean(input.email).toLowerCase();
  if (email && (!EMAIL.test(email) || email.length > 120)) errors.email = 'email.invalid';
  if (input.channel === 'email' && !email) errors.email = 'email.requiredForChannel';

  if (input.channel && !oneOf(CHANNELS, input.channel)) errors.channel = 'option.invalid';
  if (input.budget && !oneOf(BUDGETS, input.budget)) errors.budget = 'option.invalid';
  if (input.timeframe && !oneOf(TIMEFRAMES, input.timeframe)) errors.timeframe = 'option.invalid';

  const details = (input.details ?? '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim();
  if (details.length > 1200) errors.details = 'details.length';

  if (Object.keys(errors).length) return { ok: false, errors };

  const lead: Lead = {
    name,
    phoneE164: phoneE164 as string,
    intent: input.intent as Intent,
    consent: { contact: true, marketing: input.consentMarketing === true, version: CONSENT_VERSION },
  };
  if (oneOf(CHANNELS, input.channel)) lead.channel = input.channel;
  if (email) lead.email = email;
  if (oneOf(BUDGETS, input.budget)) lead.budget = input.budget;
  if (oneOf(TIMEFRAMES, input.timeframe)) lead.timeframe = input.timeframe;
  if (details) lead.details = details;
  return { ok: true, lead };
}

export const errorText: Record<'ar' | 'en', Record<ErrorCode, string>> = {
  ar: {
    'name.required': 'اكتب اسمك عشان نعرف كيف نناديك.',
    'name.length': 'الاسم لازم يكون بين حرفين و80 حرفًا.',
    'phone.required': 'اكتب رقم هاتفك عشان نقدر نرد عليك.',
    'phone.invalid': 'الرقم ما يبدو صحيحًا. للأرقام العُمانية اكتب 8 أرقام، ولغيرها ابدأ برمز الدولة مثل +971.',
    'intent.required': 'اختر الأقرب لهدفك — يساعدنا نجهّز للرد.',
    'intent.invalid': 'اختر خيارًا من القائمة.',
    'consent.required': 'نحتاج موافقتك على استخدام بياناتك للرد على طلبك فقط.',
    'email.invalid': 'البريد ما يبدو صحيحًا، مثال: name@example.com',
    'email.requiredForChannel': 'اخترت البريد للتواصل — اكتب بريدك، أو اختر الاتصال.',
    'details.length': 'التفاصيل طويلة؛ اختصرها إلى 1200 حرف.',
    'option.invalid': 'اختر خيارًا من القائمة.',
    spam: 'ما قدرنا نتحقق من الطلب. حدّث الصفحة وحاول مرة ثانية، أو تواصل مباشرة.',
  },
  en: {
    'name.required': 'Add your name so we know how to address you.',
    'name.length': 'Your name should be between 2 and 80 characters.',
    'phone.required': 'Add a phone number so we can get back to you.',
    'phone.invalid': 'That number doesn’t look right. For Omani numbers use 8 digits; otherwise start with the country code, e.g. +971.',
    'intent.required': 'Pick the closest goal — it helps us prepare the reply.',
    'intent.invalid': 'Pick one of the options.',
    'consent.required': 'We need your consent to use your details only to reply to your request.',
    'email.invalid': 'That email doesn’t look right, e.g. name@example.com',
    'email.requiredForChannel': 'You chose email — add your address, or choose a call instead.',
    'details.length': 'That’s a little long; please keep it under 1,200 characters.',
    'option.invalid': 'Pick one of the options.',
    spam: 'We couldn’t verify the request. Refresh the page and try again, or contact us directly.',
  },
};
