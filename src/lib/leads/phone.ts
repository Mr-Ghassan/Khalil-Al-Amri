/**
 * Phone normalisation to E.164 with +968 (Oman) as the default country (Leads & CRM §3).
 * Accepts Arabic-Indic and Persian digits, spaces, dashes, dots, parentheses and a 00 prefix.
 * Omani national numbers are 8 digits starting with 2 (fixed), 7 or 9 (mobile).
 * International numbers must start with + / 00 and have 8–15 digits (ITU E.164).
 */
const DIGIT_MAP: Record<string, string> = {
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
};

const OMAN_NATIONAL = /^[279]\d{7}$/;

export function normalizePhone(raw: string, defaultCountry = '968'): string | null {
  let s = raw.replace(/[٠-٩۰-۹]/g, (d) => DIGIT_MAP[d] ?? d).replace(/[\s\-.()‎‏‪-‮]/g, '');
  if (!s) return null;
  if (s.startsWith('00')) s = `+${s.slice(2)}`;

  if (s.startsWith('+')) {
    const digits = s.slice(1);
    if (!/^\d{8,15}$/.test(digits)) return null;
    if (digits.startsWith('968')) return OMAN_NATIONAL.test(digits.slice(3)) ? `+${digits}` : null;
    return `+${digits}`;
  }
  if (!/^\d+$/.test(s)) return null;
  if (defaultCountry === '968') {
    if (OMAN_NATIONAL.test(s)) return `+968${s}`;
    if (s.startsWith('968') && OMAN_NATIONAL.test(s.slice(3))) return `+${s}`;
    return null;
  }
  return /^\d{6,14}$/.test(s) ? `+${defaultCountry}${s}` : null;
}

/** Display form for confirmation screens: "+968 7678 8852". */
export function formatE164(e164: string): string {
  if (e164.startsWith('+968') && e164.length === 12) return `+968 ${e164.slice(4, 8)} ${e164.slice(8)}`;
  return e164;
}
