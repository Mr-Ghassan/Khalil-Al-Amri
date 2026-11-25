import type { Locale } from '@/i18n/routes';

interface Doc {
  eyebrow: string; title: string; lead: string; description: string;
  draftTitle: string; draftBody: string; version: string;
  sections: { h: string; p: string[]; list?: string[] }[];
}

/**
 * Statements under "What this site does today" are true for the current build:
 * no cookies, no analytics, no third-party scripts or fonts, and a lead form that transmits nothing.
 * Everything that depends on an operational decision is marked as pending, never assumed.
 */
export const legal: Record<Locale, { privacy: Doc; terms: Doc }> = {
  ar: {
    privacy: {
      eyebrow: 'معلومات قانونية', title: 'سياسة الخصوصية',
      lead: 'نجمع أقل قدر ممكن من البيانات، ولا نستخدمها إلا للغرض اللي وافقت عليه.',
      description: 'كيف يتعامل موقع خليل العامري مع بياناتك: ما يُجمع اليوم، وما يتغير عند تفعيل استقبال الطلبات.',
      draftTitle: 'صياغة غير نهائية',
      draftBody: 'هذه الصفحة تصف ما يفعله الموقع فعلًا الآن. الصياغة القانونية النهائية (جهة التحكم بالبيانات، مدة الاحتفاظ، قناة طلبات الحقوق) تنتظر مراجعة مختص وفق القانون العُماني (OPEN-05 وOPEN-06).',
      version: 'نسخة مسودة — 25 نوفمبر 2026.',
      sections: [
        { h: 'ما يفعله الموقع اليوم', p: ['هذه النسخة من الموقع:'], list: [
          'لا تستخدم ملفات تعريف الارتباط (Cookies) ولا أدوات تحليلات أو تتبّع.',
          'لا تحمّل خطوطًا أو سكربتات من جهات خارجية؛ كل الملفات تُخدم من نطاق الموقع.',
          'نموذج «سجّل اهتمامك» تجريبي: يتحقق من المدخلات داخل متصفحك فقط، ولا يرسل أو يحفظ أي بيانات.',
          'سجلات الخادم التقنية الاعتيادية (مثل عنوان IP ووقت الطلب) قد تُحفظ لدى مزوّد الاستضافة لأغراض الأمان والتشغيل.',
        ] },
        { h: 'عند تفعيل استقبال الطلبات', p: ['لن يُفعّل الاستقبال قبل اعتماد هذه السياسة. وعند تفعيله سنطلب فقط:'], list: [
          'الاسم ورقم الهاتف والغرض من التواصل، وموافقتك الصريحة على استخدامها للرد على طلبك.',
          'معلومات اختيارية تختار مشاركتها (البريد، الميزانية التقريبية، الإطار الزمني، التفاصيل).',
          'موافقة تسويقية منفصلة واختيارية وغير محددة مسبقًا، يمكنك سحبها دون أن يتأثر طلبك.',
        ] },
        { h: 'ما لا نطلبه أبدًا', p: ['لا نطلب في الموقع صورة هوية أو بيانات بنكية أو تاريخ ميلاد، ولا نرسل بيانات التعريف الشخصية إلى أدوات التحليلات.'] },
        { h: 'حقوقك', p: ['يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها، وسحب موافقتك التسويقية في أي وقت. قناة تقديم هذه الطلبات ومدد الرد تُحدد في النسخة المعتمدة من هذه السياسة.'] },
        { h: 'التواصل بشأن الخصوصية', p: ['يُحدَّد في النسخة المعتمدة عنوان مخصص لطلبات الخصوصية والجهة المسؤولة عن معالجة البيانات.'] },
      ],
    },
    terms: {
      eyebrow: 'معلومات قانونية', title: 'الشروط وإخلاء المسؤولية',
      lead: 'المحتوى هنا يساعدك تفهم قبل ما تقرر — والقرار يبقى لك.',
      description: 'شروط استخدام موقع خليل العامري وإخلاء المسؤولية عن المحتوى التعليمي.',
      draftTitle: 'صياغة غير نهائية',
      draftBody: 'هذه الشروط مسودة تحتاج مراجعة قانونية قبل الاعتماد (OPEN-06).',
      version: 'نسخة مسودة — 25 نوفمبر 2026.',
      sections: [
        { h: 'محتوى تعليمي عام', p: ['المواد المنشورة في هذا الموقع تعليمية وعامة، ولا تُعد نصيحة مالية أو قانونية أو ضريبية لحالتك الخاصة. الأرقام والأمثلة توضيحية ما لم يُذكر مصدرها وتاريخها.'] },
        { h: 'لا وعود بعائد أو أهلية', p: ['الاستشارة والمقارنة ليستا موافقة على تمويل أو دعم، ولا وعدًا بعائد، ولا حكمًا بأهليتك لأي مبادرة أو برنامج. المعلومات الرسمية تُراجع من مصدرها الرسمي وبتاريخها.'] },
        { h: 'لا عروض بيع في الموقع', p: ['لا يعرض الموقع وحدات أو أسعارًا للبيع، ولا يتم عبره أي حجز أو دفع.'] },
        { h: 'الملكية والهوية', p: ['اسم خليل العامري ومخطوطته وصوره الشخصية عناصر هوية محمية، ولا يجوز نسخها أو تعديلها أو استخدامها بما يوحي بتمثيله دون إذن.'] },
        { h: 'التحديثات', p: ['قد تُحدَّث هذه الشروط، ويظهر تاريخ آخر تحديث أسفل الصفحة.'] },
      ],
    },
  },
  en: {
    privacy: {
      eyebrow: 'Legal', title: 'Privacy policy',
      lead: 'We collect as little as possible, and use it only for the purpose you agreed to.',
      description: 'How Khalil Al Amri’s website handles your data: what is collected today, and what changes once request intake is switched on.',
      draftTitle: 'Not final wording',
      draftBody: 'This page describes what the site actually does today. Final legal wording (data controller, retention period, rights-request channel) awaits review by a qualified adviser under Omani law (OPEN-05 and OPEN-06).',
      version: 'Draft version — 25 November 2026.',
      sections: [
        { h: 'What this site does today', p: ['This version of the site:'], list: [
          'uses no cookies and no analytics or tracking tools;',
          'loads no third-party fonts or scripts — every file is served from the site’s own domain;',
          'has a prototype “Register interest” form that checks your input inside your browser only and never sends or stores any data;',
          'may produce ordinary technical server logs (such as IP address and request time) kept by the hosting provider for security and operations.',
        ] },
        { h: 'When request intake is switched on', p: ['Intake will not be switched on before this policy is approved. When it is, we will only ask for:'], list: [
          'your name, phone number and reason for getting in touch, with your explicit consent to use them to reply to your request;',
          'optional information you choose to share (email, approximate budget, timeframe, details);',
          'a separate, optional, never pre-ticked marketing consent that you can withdraw without affecting your request.',
        ] },
        { h: 'What we never ask for', p: ['The site never asks for ID documents, bank details or date of birth, and never sends personal identifiers to analytics tools.'] },
        { h: 'Your rights', p: ['You can ask to access, correct or delete your data, and withdraw marketing consent at any time. The channel for these requests and the response times will be set out in the approved version of this policy.'] },
        { h: 'Privacy contact', p: ['The approved version will name a dedicated privacy contact and the party responsible for processing.'] },
      ],
    },
    terms: {
      eyebrow: 'Legal', title: 'Terms & disclaimer',
      lead: 'What’s here helps you understand before you decide — the decision stays yours.',
      description: 'Terms of use for Khalil Al Amri’s website and the disclaimer for its educational content.',
      draftTitle: 'Not final wording',
      draftBody: 'These terms are a draft and need legal review before approval (OPEN-06).',
      version: 'Draft version — 25 November 2026.',
      sections: [
        { h: 'General educational content', p: ['Material on this site is general and educational. It is not financial, legal or tax advice for your particular situation. Figures and examples are illustrative unless their source and date are stated.'] },
        { h: 'No promise of return or eligibility', p: ['A consultation or comparison is not an approval of financing or support, not a promise of return, and not a ruling on your eligibility for any initiative or programme. Official information is checked against its official source, with a date.'] },
        { h: 'No sales listings on this site', p: ['The site does not list units or prices for sale, and no booking or payment takes place through it.'] },
        { h: 'Name and identity', p: ['Khalil Al Amri’s name, signature and portraits are protected identity elements and may not be copied, altered or used in a way that suggests he is represented, without permission.'] },
        { h: 'Updates', p: ['These terms may be updated; the date of the latest version appears at the bottom of the page.'] },
      ],
    },
  },
};
