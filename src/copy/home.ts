import type { Locale } from '@/i18n/routes';

/** Home page copy. See src/copy/shared.ts for the sourcing convention. */
export const home: Record<Locale, {
  meta: { title: string; description: string };
  hero: { descriptor: string; statement: [string, string]; lead: string; src: string[]; portraitAlt: string };
  beside: { eyebrow: string; title: string; body: string[]; caption: string; link: string; src: string[]; portraitAlt: string };
  insights: { eyebrow: string; title: string; lead: string };
  anchor: { eyebrow: string; title: string; lead: string; src: string[]; portraitAlt: string; secondary: string };
}> = {
  ar: {
    meta: {
      title: 'خليل العامري — مستشار عقاري',
      description: 'خليل العامري، مستشار عقاري في عُمان. أنا ما أقرر عنك — أخليك تفهم قرارك: نحسبها مع بعض، والأرقام كلها على الطاولة.',
    },
    hero: {
      descriptor: 'مستشار عقاري',
      statement: ['أنا ما أقرر عنك.', 'أنا أخليك تفهم قرارك.'],
      lead: 'منهجي في ثلاث خطوات: افهم الفرصة، احسبها صح، ثم قرّر.',
      src: ['KHA_C90_ST_PER_017', 'KHA_C90_ST_BUY_118'],
      portraitAlt: 'خليل العامري بالدشداشة العُمانية والكمّة، ينظر إلى الكاميرا بهدوء',
    },
    beside: {
      eyebrow: 'بجانبك، مو مقابلك',
      title: 'ما أبيعك ولا أقرر عنك — أجلس جنبك ونحسبها مع بعض.',
      body: [
        'وإذا العقار ما يناسب هدفك، أقول لك «لا».',
        'طريقتي بسيطة: أحط الأرقام كلها على الطاولة. السعر، الرسوم، وكل اللي يتكرر كل سنة. وبعدها القرار لك — مو لي.',
      ],
      caption: 'بجانب العميل، لا مقابله.',
      link: 'تعرّف عليّ أكثر',
      src: ['KHA_C90_RL_PER_001', 'KHA_C90_ST_PER_074'],
      portraitAlt: 'خليل العامري واقفًا خلف كرسي فارغ، يداه متشابكتان على ظهر الكرسي',
    },
    insights: {
      eyebrow: 'المعرفة العقارية',
      title: 'افهم قبل ما تقرر.',
      lead: 'مواد قصيرة تشرح الأرقام والأسئلة اللي تهمك قبل أي قرار عقاري.',
    },
    anchor: {
      eyebrow: 'اسأل خليل',
      title: 'اسألني أنت.',
      lead: 'أرسل لي وضعك… وأقول لك بصراحة.',
      src: ['KHA_C90_RL_BUY_049', 'KHA_C90_RL_PER_076'],
      portraitAlt: 'خليل العامري يمد يده بإشارة دعوة',
      secondary: 'قنوات التواصل',
    },
  },
  en: {
    meta: {
      title: 'Khalil Al Amri — Real Estate Consultant',
      description: 'Khalil Al Amri is a real estate consultant in Oman. He doesn’t decide for you — he helps you understand your decision, with every number on the table.',
    },
    hero: {
      descriptor: 'Real Estate Consultant',
      statement: ['I don’t decide for you.', 'I help you understand your decision.'],
      lead: 'My method has three steps: understand the opportunity, run the numbers properly, then decide.',
      src: ['KHA_C90_ST_PER_017', 'KHA_C90_ST_BUY_118'],
      portraitAlt: 'Khalil Al Amri in a white Omani dishdasha and kumma, looking calmly at the camera',
    },
    beside: {
      eyebrow: 'Beside you, not across the table',
      title: 'I’m not here to sell to you or decide for you. I sit beside you and we work it out together.',
      body: [
        'And if a property doesn’t fit your goal, I’ll tell you: no.',
        'My way is simple: every number goes on the table — the price, the fees, everything that recurs each year. Then the decision is yours, not mine.',
      ],
      caption: 'Beside the client, not across the table.',
      link: 'More about Khalil',
      src: ['KHA_C90_RL_PER_001', 'KHA_C90_ST_PER_074'],
      portraitAlt: 'Khalil Al Amri standing behind an empty chair, hands resting on its back',
    },
    insights: {
      eyebrow: 'Insights',
      title: 'Understand first. Decide after.',
      lead: 'Short pieces on the numbers and questions that matter before any property decision.',
    },
    anchor: {
      eyebrow: 'Ask Khalil',
      title: 'Ask me.',
      lead: 'Tell me where you stand — and I’ll tell you honestly.',
      src: ['KHA_C90_RL_BUY_049', 'KHA_C90_RL_PER_076'],
      portraitAlt: 'Khalil Al Amri extending his hand in an inviting gesture',
      secondary: 'Contact channels',
    },
  },
};
