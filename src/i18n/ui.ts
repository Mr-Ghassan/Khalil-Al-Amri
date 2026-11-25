import type { Locale } from './routes';

/**
 * Interface strings. Arabic and English are written independently, not mirrored.
 * Calls to action are commands only (DS v1.1 — command-only CTA pills).
 */
export const ui = {
  ar: {
    skip: 'تخطَّ إلى المحتوى',
    nav: {
      label: 'التنقل الرئيسي',
      home: 'الرئيسية',
      about: 'عن خليل',
      advisory: 'كيف أساعدك',
      insights: 'المعرفة العقارية',
      contact: 'تواصل',
      interest: 'سجّل اهتمامك',
      menu: 'القائمة',
      close: 'إغلاق القائمة',
    },
    lang: { switchTo: 'English', switchLabel: 'Switch to English', current: 'العربية' },
    cta: {
      ask: 'اسأل خليل',
      meet: 'تعرّف عليّ',
      register: 'سجّل اهتمامك',
      readAll: 'تصفّح المعرفة',
      read: 'اقرأ',
      howIHelp: 'شوف كيف أساعدك',
      call: 'اتصل',
      email: 'راسلني بالبريد',
      instagram: 'تابع على إنستغرام',
      startWith: 'ابدأ بهذا الهدف',
    },
    footer: {
      tagline: 'أنا ما أقرر عنك. أنا أخليك تفهم قرارك.',
      explore: 'الموقع',
      legal: 'معلومات قانونية',
      privacy: 'الخصوصية',
      terms: 'الشروط وإخلاء المسؤولية',
      rights: 'جميع الحقوق محفوظة',
      contactLine: 'قنوات التواصل',
    },
    contactLabels: { instagram: 'إنستغرام', website: 'الموقع', phone: 'الهاتف', email: 'البريد' },
    draft: {
      badge: 'معاينة',
      banner:
        'نسخة معاينة غير منشورة. العناصر الموسومة «مسودة» تنتظر اعتماد خليل وفريقه، ولا تُرسل النماذج أي بيانات.',
      pending: 'بانتظار الاعتماد',
      unverifiedChannel: 'لم يُختبر تشغيليًا بعد',
    },
    breadcrumb: 'مسار التنقل',
    sourceId: 'مرجع المحتوى',
  },
  en: {
    skip: 'Skip to content',
    nav: {
      label: 'Main navigation',
      home: 'Home',
      about: 'About Khalil',
      advisory: 'How I help',
      insights: 'Insights',
      contact: 'Contact',
      interest: 'Register interest',
      menu: 'Menu',
      close: 'Close menu',
    },
    lang: { switchTo: 'العربية', switchLabel: 'التحويل إلى العربية', current: 'English' },
    cta: {
      ask: 'Ask Khalil',
      meet: 'Meet Khalil',
      register: 'Register interest',
      readAll: 'Browse insights',
      read: 'Read',
      howIHelp: 'See how I help',
      call: 'Call',
      email: 'Send an email',
      instagram: 'Follow on Instagram',
      startWith: 'Start with this goal',
    },
    footer: {
      tagline: 'I don’t decide for you. I help you understand your decision.',
      explore: 'Site',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms & disclaimer',
      rights: 'All rights reserved',
      contactLine: 'Contact channels',
    },
    contactLabels: { instagram: 'Instagram', website: 'Website', phone: 'Phone', email: 'Email' },
    draft: {
      badge: 'Preview',
      banner:
        'Unpublished preview. Items marked “Draft” await approval by Khalil and his team, and forms do not send any data.',
      pending: 'Pending approval',
      unverifiedChannel: 'Not yet operationally tested',
    },
    breadcrumb: 'Breadcrumb',
    sourceId: 'Content reference',
  },
} as const;

export type UI = (typeof ui)[Locale];
export const t = (lang: Locale): UI => ui[lang];
