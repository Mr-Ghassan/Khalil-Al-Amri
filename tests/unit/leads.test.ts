import { describe, expect, it } from 'vitest';
import { normalizePhone, formatE164 } from '../../src/lib/leads/phone';
import { validateLead, CONSENT_VERSION } from '../../src/lib/leads/schema';

describe('normalizePhone', () => {
  it.each([
    ['76788852', '+96876788852'],
    ['7678 8852', '+96876788852'],
    ['+968 76788852', '+96876788852'],
    ['00968-7678-8852', '+96876788852'],
    ['٧٦٧٨٨٨٥٢', '+96876788852'],
    ['96876788852', '+96876788852'],
    ['24123456', '+96824123456'],
    ['+971 50 123 4567', '+971501234567'],
    ['‎+968 9123 4567', '+96891234567'],
  ])('normalises %s → %s', (raw, out) => expect(normalizePhone(raw)).toBe(out));

  it.each(['', 'abc', '123', '56788852', '+968 1234', '+968 56788852', '+1234567', '7678885299'])('rejects %s', (raw) => {
    expect(normalizePhone(raw)).toBeNull();
  });

  it('formats Omani numbers for display', () => expect(formatE164('+96876788852')).toBe('+968 7678 8852'));
});

const base = { name: 'Test Person', phone: '91234567', intent: 'home', consentContact: true, elapsedMs: 10_000 };

describe('validateLead', () => {
  it('accepts the minimum valid request and never pre-sets marketing consent', () => {
    const r = validateLead(base);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.lead.phoneE164).toBe('+96891234567');
      expect(r.lead.consent).toEqual({ contact: true, marketing: false, version: CONSENT_VERSION });
    }
  });

  it('requires name, phone, intent and contact consent', () => {
    const r = validateLead({ elapsedMs: 10_000 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors).toMatchObject({ name: 'name.required', phone: 'phone.required', intent: 'intent.required', consentContact: 'consent.required' });
  });

  it('keeps marketing consent separate from contact consent', () => {
    const r = validateLead({ ...base, consentMarketing: true });
    expect(r.ok && r.lead.consent.marketing).toBe(true);
    const r2 = validateLead({ ...base, consentContact: false, consentMarketing: true });
    expect(r2.ok).toBe(false);
  });

  it('flags honeypot and too-fast submissions as spam', () => {
    expect(validateLead({ ...base, website: 'http://spam' })).toEqual({ ok: false, errors: { form: 'spam' } });
    expect(validateLead({ ...base, elapsedMs: 300 })).toEqual({ ok: false, errors: { form: 'spam' } });
  });

  it('requires an email only when email is the chosen channel', () => {
    const r = validateLead({ ...base, channel: 'email' });
    expect(!r.ok && r.errors.email).toBe('email.requiredForChannel');
    expect(validateLead({ ...base, channel: 'email', email: 'Me@Example.com' }).ok).toBe(true);
  });

  it('rejects unknown option values and WhatsApp (unverified channel)', () => {
    const r = validateLead({ ...base, channel: 'whatsapp', budget: 'x', intent: 'buy-now' });
    expect(!r.ok && r.errors).toMatchObject({ channel: 'option.invalid', budget: 'option.invalid', intent: 'intent.invalid' });
  });

  it('strips control characters and limits details length', () => {
    const r = validateLead({ ...base, name: '  Khalil\u0000  Test ', details: 'a'.repeat(1201) });
    expect(!r.ok && r.errors.details).toBe('details.length');
    const r2 = validateLead({ ...base, name: '  Khalil\u0000  Test ' });
    expect(r2.ok && r2.lead.name).toBe('Khalil Test');
  });
});
