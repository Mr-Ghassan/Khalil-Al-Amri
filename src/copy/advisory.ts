import type { Locale } from '@/i18n/routes';
import type { Intent } from './shared';

/**
 * "How I can help" — services described by need, not by product (IA §6).
 * Each service states what it is NOT: no financing approval, no promised return, no eligibility ruling.
 * Web microcopy, pending editorial review; consultation steps come from KHA_C90_CR_CNV_098.
 */
export interface Service { id: string; intent: Intent; title: string; when: string; bring: string; doWith: string; notThis: string; cta: string }

export const advisory: Record<Locale, {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; portraitAlt: string };
  labels: { when: string; bring: string; doWith: string; notThis: string };
  services: Service[];
  boundary: { title: string; items: string[] };
}> = {
  ar: {
    meta: {
      title: 'كيف أساعدك',
      description: 'استشارة عقارية تبدأ من هدفك: سكن لعائلتك، دخل واستثمار، مقارنة وحدتين، أو سؤال قبل القرار — بدون التزام وبدون ضغط.',
    },
    hero: {
      eyebrow: 'كيف أساعدك',
      title: 'أبدأ من هدفك، مو من عقار جاهز للبيع.',
      lead: 'اختر اللي يشبه وضعك. كل مسار يوضح متى يفيدك، وش تجهّز، وش نسوي مع بعض — ووش اللي ما أقدر أوعدك فيه.',
      portraitAlt: 'خليل العامري يمد يده بإشارة دعوة',
    },
    labels: { when: 'متى يفيدك', bring: 'وش تجهّز', doWith: 'وش نسوي مع بعض', notThis: 'وش اللي مو وعد' },
    services: [
      {
        id: 'home', intent: 'home', title: 'سكن لعائلتك',
        when: 'تدوّر أول بيت، أو تفكر تنتقل لبيت أنسب لعائلتك.',
        bring: 'ميزانيتك التقريبية، الدفعة الجاهزة، والمنطقة اللي تميل لها.',
        doWith: 'نحسب التكلفة الكاملة مو السعر بس، ونقارن الخيارات على مدة بقائك وهامش أمانك.',
        notThis: 'ما هي موافقة تمويل، ولا حكم بأهليتك لأي برنامج سكني.',
        cta: 'ابدأ بالسكن',
      },
      {
        id: 'investment', intent: 'investment', title: 'استثمار ودخل',
        when: 'تبي دخل شهري، أو قيمة تكبر مع الوقت، وتحتاج تفهم العائد والمخاطر.',
        bring: 'المبلغ، كم تقدر تنتظر، ووش يصير لو ما تأجّر العقار شهرين.',
        doWith: 'نوصل من الإجمالي إلى الصافي بندًا بندًا، ونفكر في الخروج قبل الدخول.',
        notThis: 'ما في عائد مضمون، والأمثلة توضيحية حتى نحسب على وحدتك بأرقامها.',
        cta: 'ابدأ بالاستثمار',
      },
      {
        id: 'compare', intent: 'compare', title: 'مقارنة قبل القرار',
        when: 'عندك وحدتين أو أكثر ومحتار بينهم.',
        bring: 'تفاصيل الوحدات: السعر، المساحة، خطة الدفع، والرسوم إن وُجدت.',
        doWith: 'نمر على السبع نقاط نفسها لكل وحدة، وتطلع بمقارنة واضحة.',
        notThis: 'ما في «درجة» وهمية — المقارنة منهج، والقرار لك.',
        cta: 'ابدأ بالمقارنة',
      },
      {
        id: 'general', intent: 'general', title: 'سؤال قبل ما تقرر',
        when: 'ما زلت تستكشف، أو عندك سؤال واحد يشغلك.',
        bring: 'سؤالك، وأي رقم أو إعلان تبي نفهمه مع بعض.',
        doWith: 'نرتب السؤال ونشوف وش اللي تحتاج تعرفه قبل أي خطوة — وأحيانًا الجواب: انتظر.',
        notThis: 'ما في التزام ولا ضغط للحجز.',
        cta: 'اسأل خليل',
      },
    ],
    boundary: {
      title: 'حدود واضحة',
      items: [
        'الاستشارة والمقارنة مو موافقة على تمويل أو دعم، ولا وعد بعائد.',
        'المعلومات الرسمية عن أي مبادرة أو قانون تُراجع من مصدرها الرسمي وبتاريخها.',
        'ما أعرض وحدات أو أسعار في هذا الموقع؛ نتكلم عنها في الاستشارة بمصادرها.',
      ],
    },
  },
  en: {
    meta: {
      title: 'How I help',
      description: 'Property advice that starts from your goal: a family home, income and investment, comparing two units, or a question before you decide — no commitment, no pressure.',
    },
    hero: {
      eyebrow: 'How I help',
      title: 'I start from your goal, not from a property I need to sell.',
      lead: 'Pick the one that sounds like you. Each path says when it helps, what to bring, what we do together — and what I can’t promise.',
      portraitAlt: 'Khalil Al Amri extending his hand in an inviting gesture',
    },
    labels: { when: 'When it helps', bring: 'What to bring', doWith: 'What we do together', notThis: 'What it isn’t' },
    services: [
      {
        id: 'home', intent: 'home', title: 'A home for your family',
        when: 'You’re looking for a first home, or a better fit for your family.',
        bring: 'A rough budget, the down payment you have ready, and the areas you lean towards.',
        doWith: 'We work out the full cost, not just the price, and compare options against how long you’ll stay and your safety margin.',
        notThis: 'It isn’t a financing approval, and it isn’t a ruling on your eligibility for any housing programme.',
        cta: 'Start with a home',
      },
      {
        id: 'investment', intent: 'investment', title: 'Investment & income',
        when: 'You want monthly income or long-term growth, and need to understand return and risk.',
        bring: 'The amount, how long you can wait, and what happens if the unit sits empty for two months.',
        doWith: 'We go from gross to net, line by line, and plan the exit before the entry.',
        notThis: 'No return is guaranteed; examples are illustrative until we run your unit’s real numbers.',
        cta: 'Start with investment',
      },
      {
        id: 'compare', intent: 'compare', title: 'Compare before you decide',
        when: 'You have two or more units and can’t choose.',
        bring: 'The details of each unit: price, size, payment plan and any fees.',
        doWith: 'We take every unit through the same seven points, so you leave with a clear comparison.',
        notThis: 'There’s no made-up score — it’s a method, and the decision is yours.',
        cta: 'Start a comparison',
      },
      {
        id: 'general', intent: 'general', title: 'A question before you decide',
        when: 'You’re still exploring, or one question keeps coming back.',
        bring: 'Your question, and any number or advert you’d like to understand together.',
        doWith: 'We untangle the question and see what you need to know before any step — sometimes the answer is: wait.',
        notThis: 'No commitment, and no pressure to book.',
        cta: 'Ask Khalil',
      },
    ],
    boundary: {
      title: 'Clear limits',
      items: [
        'Advice and comparisons are not an approval of financing or support, nor a promise of return.',
        'Official information about any initiative or law is checked against its official source, with a date.',
        'This site doesn’t list units or prices; we discuss them in a consultation, with their sources.',
      ],
    },
  },
};
