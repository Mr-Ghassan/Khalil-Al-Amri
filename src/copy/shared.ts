/**
 * Copy blocks reused across pages.
 * `src` = Content ID in the canonical campaign database (KHA_C90_Content_Database_v1.1, status VERIFIED,
 * EVERGREEN, not blocked). Arabic lines quoted from `caption_final` are Khalil's approved words.
 * Lines without `src` are web microcopy written for this site and await editorial review (see docs/CONTENT_SOURCES.md).
 * English is an original adaptation, not a mirror translation — pending approval as a whole.
 */
import type { Locale } from '@/i18n/routes';

export type Intent = 'home' | 'investment' | 'compare' | 'general';

export interface Question { n: string; title: string; test: string; src?: string }

export const sevenQuestions: Record<Locale, { eyebrow: string; title: string; lead: string; note: string; items: Question[]; src: string }> = {
  ar: {
    eyebrow: 'قيّم أي عقار',
    title: 'قبل أي عقار، اسأل سبعة أسئلة.',
    lead: 'هذا الإطار اللي أقارن فيه أي وحدة — نفس الأسئلة، على كل عقار، قبل أي قرار.',
    note: 'منهج نوعي، مو «درجة» وهمية: كل نقطة لها سؤال اختبار، والجواب يختلف من شخص لشخص.',
    src: 'KHA_C90_CR_INV_052',
    items: [
      { n: '01', title: 'الهدف', test: 'وش تبي من هذا المبلغ؟', src: 'KHA_C90_ST_INV_117' },
      { n: '02', title: 'سعر الدخول', test: 'السعر مو التكلفة — كم التكلفة الكاملة؟', src: 'KHA_C90_RL_BUY_006' },
      { n: '03', title: 'الدخل أو المنفعة', test: 'كم يبقى صافي بعد الرسوم والشهور الشاغرة؟', src: 'KHA_C90_CR_INV_036' },
      { n: '04', title: 'النمو', test: 'وش اللي بيُبنى حولك خلال السنين الجاية؟', src: 'KHA_C90_RL_BUY_156' },
      { n: '05', title: 'المخاطر', test: 'وش يصير لو ارتفعت الفائدة أو تغيّر وضعك؟', src: 'KHA_C90_RL_FIN_080' },
      { n: '06', title: 'القدرة على الاحتفاظ', test: 'هل يبقى لك هامش أمان بعد الدفعة؟', src: 'KHA_C90_RL_PER_076' },
      { n: '07', title: 'الخروج', test: 'مين المشتري بعد كم سنة؟ وهل التأجير بديل؟', src: 'KHA_C90_RL_BUY_046' },
    ],
  },
  en: {
    eyebrow: 'Weigh any property',
    title: 'Seven questions before any property.',
    lead: 'The same framework I use to compare any unit — the same questions, every time, before any decision.',
    note: 'A way of thinking, not a made-up “score”: each point has a test question, and the answer depends on you.',
    src: 'KHA_C90_CR_INV_052',
    items: [
      { n: '01', title: 'Your goal', test: 'What do you want this money to do?' },
      { n: '02', title: 'Entry price', test: 'Price isn’t cost — what is the full cost?' },
      { n: '03', title: 'Income or use', test: 'What is left, net of fees and empty months?' },
      { n: '04', title: 'Growth', test: 'What will be built around it in the coming years?' },
      { n: '05', title: 'Risk', test: 'What happens if rates rise or your situation changes?' },
      { n: '06', title: 'Staying power', test: 'Is there a safety margin left after the down payment?' },
      { n: '07', title: 'Exit', test: 'Who buys it from you in a few years — and is renting a real alternative?' },
    ],
  },
};

export interface Step { n: string; title: string; text: string }

export const consultSteps: Record<Locale, { eyebrow: string; title: string; lead: string; consent: string; prepTitle: string; prep: string[]; steps: Step[]; src: string[] }> = {
  ar: {
    eyebrow: 'كيف تبدو الاستشارة',
    title: 'استشارة بدون التزام — خطوة بخطوة.',
    lead: 'من أول رسالة إلى خلاصة واضحة، والقرار لك.',
    consent: 'وبياناتك ما تُحفظ إلا بموافقتك.',
    prepTitle: 'قبل الاستشارة، جهّز ثلاثة أشياء بس:',
    prep: ['هدفك', 'ميزانيتك', 'ومتى تبي تتحرك'],
    src: ['KHA_C90_CR_CNV_098', 'KHA_C90_RL_CNV_094', 'KHA_C90_ST_CNV_101'],
    steps: [
      { n: '01', title: 'رسالة', text: 'تبدأ برسالة أو طلب من الموقع، بالطريقة اللي تريحك.' },
      { n: '02', title: 'أسئلة قصيرة', text: 'نفهم هدفك وميزانيتك ووقتك.' },
      { n: '03', title: 'حساب أولي', text: 'نحسب قدامك — والأرقام كلها على الطاولة.' },
      { n: '04', title: 'جلسة', text: 'تطلع بخيارات… أو بـ«لا شيء الحين».' },
      { n: '05', title: 'ملخص مكتوب', text: 'خلاصة واضحة تقدر ترجع لها. والقرار لك.' },
    ],
  },
  en: {
    eyebrow: 'What a consultation looks like',
    title: 'No commitment — step by step.',
    lead: 'From your first message to a clear summary. The decision stays yours.',
    consent: 'Your details are only kept with your consent.',
    prepTitle: 'Before we talk, bring three things:',
    prep: ['your goal', 'your budget', 'when you want to move'],
    src: ['KHA_C90_CR_CNV_098', 'KHA_C90_RL_CNV_094', 'KHA_C90_ST_CNV_101'],
    steps: [
      { n: '01', title: 'A message', text: 'Start with a message or a request on this site — whichever is easier for you.' },
      { n: '02', title: 'A few questions', text: 'We get clear on your goal, your budget and your timing.' },
      { n: '03', title: 'First numbers', text: 'We calculate together, with every number on the table.' },
      { n: '04', title: 'A conversation', text: 'You leave with options — or with “nothing right now.”' },
      { n: '05', title: 'A written summary', text: 'Something clear to come back to. The decision is yours.' },
    ],
  },
};

export const sayNo: Record<Locale, { eyebrow: string; title: string; items: string[]; close: string; quote: string; src: string[] }> = {
  ar: {
    eyebrow: 'متى أقول «لا»',
    title: 'ثلاث حالات أقول فيها لعميلي: لا تشتري.',
    items: ['ما في هامش أمان بعد الدفعة.', 'الهدف مو واضح.', 'العقار ما يناسب الهدف.'],
    close: '«لا» اليوم جزء من الثقة.',
    quote: 'إذا ما عرفت متى أقول لك «لا»، ما أقدر أقول لك «نعم».',
    src: ['KHA_C90_RL_PER_076', 'KHA_C90_RL_PER_047'],
  },
  en: {
    eyebrow: 'When I say no',
    title: 'Three situations where I tell a client: don’t buy.',
    items: ['There’s no safety margin left after the down payment.', 'The goal isn’t clear yet.', 'The property doesn’t fit the goal.'],
    close: 'A “no” today is part of trust.',
    quote: 'If I can’t tell you when to say no, I can’t honestly tell you yes.',
    src: ['KHA_C90_RL_PER_076', 'KHA_C90_RL_PER_047'],
  },
};

export interface IntentCopy { id: string; formIntent: Intent; label: string; summary: string; checks: string[]; src?: string }

export const intents: Record<Locale, { eyebrow: string; title: string; lead: string; footnote: string; items: IntentCopy[]; src: string[] }> = {
  ar: {
    eyebrow: 'قبل «وش أشتري؟»',
    title: 'وش تبي من العقار؟',
    lead: 'العقار وسيلة، مو هدف. جوابك يحدد نوع العقار — مو العكس.',
    footnote: 'عقار ممتاز بس مو لهدفك… يبقى قرار غلط.',
    src: ['KHA_C90_CR_INV_004', 'KHA_C90_ST_INV_117', 'KHA_C90_CR_INV_115'],
    items: [
      {
        id: 'family', formIntent: 'home', label: 'بيت لعائلتك',
        summary: 'نبدأ من حياتك أنت: كم سنة بتسكن، وش تحتاج العائلة حولها، وكم يبقى لك بعد الدفعة.',
        checks: ['مدة بقائك ودفعتك', 'الخدمات والوصول حول البيت', 'هامش أمان بعد الدفعة'],
      },
      {
        id: 'income', formIntent: 'investment', label: 'دخل شهري',
        summary: 'العائد اللي تشوفه في الإعلان غالبًا إجمالي. نوصل للصافي — بندًا بندًا.',
        checks: ['الرسوم والصيانة', 'الشهور الشاغرة', 'طلب المستأجر في المنطقة'],
      },
      {
        id: 'growth', formIntent: 'investment', label: 'قيمة تكبر مع الوقت',
        summary: 'فكّر في الخروج قبل الدخول: مين يشتري منك بعد سنوات، وكم تقدر تنتظر.',
        checks: ['اللي بيُبنى حولك', 'العرض المشابه مستقبلًا', 'قدرتك على الانتظار'],
      },
      {
        id: 'live-rent', formIntent: 'compare', label: 'تسكنه الحين وتأجّره بعدين',
        summary: 'نوازن بين راحتك اليوم وطلب المستأجر بكرة — لأن العقار الممتاز لهدف غيرك ممكن يتعبك.',
        checks: ['ملاءمته لك الآن', 'جاذبيته للمستأجر لاحقًا', 'التكلفة في الحالتين'],
      },
    ],
  },
  en: {
    eyebrow: 'Before “what should I buy?”',
    title: 'What do you want from property?',
    lead: 'Property is a means, not the goal. Your answer decides the kind of property — not the other way round.',
    footnote: 'An excellent property that doesn’t fit your goal is still the wrong decision.',
    src: ['KHA_C90_CR_INV_004', 'KHA_C90_ST_INV_117', 'KHA_C90_CR_INV_115'],
    items: [
      {
        id: 'family', formIntent: 'home', label: 'A home for your family',
        summary: 'We start from your life: how long you’ll stay, what the family needs nearby, and what’s left after the down payment.',
        checks: ['How long you’ll stay, and your down payment', 'Services and access around the home', 'A safety margin after you pay'],
      },
      {
        id: 'income', formIntent: 'investment', label: 'Monthly income',
        summary: 'The yield in an advert is usually gross. We work down to the net — line by line.',
        checks: ['Fees and maintenance', 'Months without a tenant', 'Tenant demand in the area'],
      },
      {
        id: 'growth', formIntent: 'investment', label: 'Value that grows over time',
        summary: 'Think about the exit before the entry: who buys from you in a few years, and how long you can wait.',
        checks: ['What’s being built around it', 'Similar supply coming later', 'How long you can hold'],
      },
      {
        id: 'live-rent', formIntent: 'compare', label: 'Live in it now, rent it later',
        summary: 'We weigh your comfort today against a tenant’s needs tomorrow — a great property for someone else’s goal can wear you down.',
        checks: ['How well it suits you now', 'How it appeals to tenants later', 'The cost in both scenarios'],
      },
    ],
  },
};
