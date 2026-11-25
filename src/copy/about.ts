import type { Locale } from '@/i18n/routes';

/**
 * About Khalil. Only verified statements are published (sources = KHA_C90 Content IDs).
 * The biography itself does NOT exist yet (OPEN-03): its fields are listed as drafts and render
 * only in preview builds. Nothing here invents experience, licences, clients or results.
 */
export const about: Record<Locale, {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; portraitAlt: string; src: string };
  why: { eyebrow: string; quote: string[]; src: string };
  principles: { eyebrow: string; title: string; items: { title: string; text: string; src: string }[] };
  prepare: { eyebrow: string; title: string; text: string; quote: string; src: string; photoAlt: string };
  bio: { title: string; note: string; fields: string[] };
  media: { eyebrow: string; title: string; text: string };
  gallery: { alt: [string, string, string] };
}> = {
  ar: {
    meta: {
      title: 'عن خليل',
      description: 'خليل العامري، مستشار عقاري. طريقته بسيطة: الأرقام كلها على الطاولة، و«لا» عندما لا يناسبك العقار، والقرار لك.',
    },
    hero: {
      eyebrow: 'عن خليل',
      title: 'خليل العامري، مستشار عقاري.',
      lead: 'العقار يعيش معك سنين، وقرارك أطول من أي حماس.',
      portraitAlt: 'خليل العامري ينظر إلى الأفق، بالدشداشة العُمانية والكمّة',
      src: 'KHA_C90_RL_PER_020',
    },
    why: {
      eyebrow: 'لماذا أشتغل بهذه الطريقة',
      quote: [
        'كثير يسألني: ليش ما تقول للناس «اشترِ الحين»؟',
        'لأن العقار يعيش معك سنين، وقرارك أطول من أي حماس.',
        'أبيك تدخل فاهم أرقامك — والثقة تنبني بالحساب، مو بالاستعجال.',
      ],
      src: 'KHA_C90_RL_PER_020',
    },
    principles: {
      eyebrow: 'مبادئ ما أتنازل عنها',
      title: 'ثلاثة أشياء تلقاها معي في كل مرة.',
      items: [
        {
          title: 'الأرقام كلها على الطاولة',
          text: 'لو في رقم ما يناسبك، تعرفه مني قبل التوقيع… مو بعده.',
          src: 'KHA_C90_RL_PER_161',
        },
        {
          title: 'بدون استعجال',
          text: 'حتى لو أنت جاهز، يومين تفكير قبل الحجز تخلي القرار أهدأ… والندم أقل.',
          src: 'KHA_C90_RL_PER_104',
        },
        {
          title: '«لا» جزء من الثقة',
          text: 'إذا ما في هامش أمان بعد الدفعة، أو الهدف مو واضح، أو العقار ما يناسب الهدف — أقول لك: لا تشتري.',
          src: 'KHA_C90_RL_PER_076',
        },
      ],
    },
    prepare: {
      eyebrow: 'قبل أي اجتماع',
      title: 'هذي الورقة اللي أجهزها لكل عميل.',
      text: 'أسئلة الهدف، التكلفة الكاملة، بديلين للمقارنة — وسطر «متى لا؟».',
      quote: 'إذا ما عرفت متى أقول لك «لا»، ما أقدر أقول لك «نعم».',
      src: 'KHA_C90_RL_PER_047',
      photoAlt: 'خليل العامري جالسًا يشرح بيده أثناء حديث',
    },
    bio: {
      title: 'النبذة الشخصية',
      note: 'هذا القسم ينتظر مقابلة موثّقة مع خليل (OPEN-03). لا يُكتب شيء منه بالنيابة عنه، ولا يظهر في النسخة المنشورة قبل اعتماده.',
      fields: [
        'نبذة بصيغة المتكلم — من المقابلة',
        'مدة الخبرة الموثّقة (إن وُجدت)',
        'مجالات الاختصاص',
        'الترخيص أو الاعتماد المهني (إن وُجد، مع مرجعه)',
        'صياغة الدعم المهني من وصول للاستثمار (OPEN-02)',
      ],
    },
    media: {
      eyebrow: 'للتعاون الإعلامي والمؤسسي',
      title: 'مقابلة، محتوى مشترك، أو دعوة للحديث؟',
      text: 'راسلني بالبريد مع فكرة مختصرة والجهة والموعد المقترح.',
    },
    gallery: {
      alt: [
        'خليل العامري واقفًا بثبات، يداه إلى جانبيه',
        'خليل العامري عاقد الذراعين بابتسامة هادئة',
        'خليل العامري جالسًا ويداه متشابكتان، في وضع استماع',
      ],
    },
  },
  en: {
    meta: {
      title: 'About Khalil',
      description: 'Khalil Al Amri is a real estate consultant. His way is simple: every number on the table, a clear “no” when a property doesn’t fit, and the decision stays yours.',
    },
    hero: {
      eyebrow: 'About Khalil',
      title: 'Khalil Al Amri, real estate consultant.',
      lead: 'A property stays with you for years. Your decision should outlast any excitement.',
      portraitAlt: 'Khalil Al Amri looking toward the horizon, in a white Omani dishdasha and kumma',
      src: 'KHA_C90_RL_PER_020',
    },
    why: {
      eyebrow: 'Why I work this way',
      quote: [
        'People often ask me: why don’t you just tell them “buy now”?',
        'Because a property stays with you for years, and your decision should outlast any excitement.',
        'I want you to walk in understanding your numbers. Trust is built by calculating — not by rushing.',
      ],
      src: 'KHA_C90_RL_PER_020',
    },
    principles: {
      eyebrow: 'Principles I don’t bend',
      title: 'Three things you’ll get from me, every time.',
      items: [
        { title: 'Every number on the table', text: 'If there’s a number that doesn’t suit you, you hear it from me before you sign — not after.', src: 'KHA_C90_RL_PER_161' },
        { title: 'No rushing', text: 'Even if you’re ready, two days of thinking before booking makes the decision calmer — and regret smaller.', src: 'KHA_C90_RL_PER_104' },
        { title: 'A “no” is part of trust', text: 'No safety margin after the down payment, an unclear goal, or a property that doesn’t fit it — I’ll tell you: don’t buy.', src: 'KHA_C90_RL_PER_076' },
      ],
    },
    prepare: {
      eyebrow: 'Before any meeting',
      title: 'The page I prepare for every client.',
      text: 'Questions about your goal, the full cost, two alternatives to compare — and a line called “when not?”.',
      quote: 'If I can’t tell you when to say no, I can’t honestly tell you yes.',
      src: 'KHA_C90_RL_PER_047',
      photoAlt: 'Khalil Al Amri seated, explaining with an open hand',
    },
    bio: {
      title: 'Biography',
      note: 'This section is waiting for a recorded interview with Khalil (OPEN-03). Nothing in it is written on his behalf, and it does not appear on the published site until approved.',
      fields: [
        'First-person introduction — from the interview',
        'Verified years of experience (if any)',
        'Areas of focus',
        'Professional licence or accreditation (if any, with its reference)',
        'Approved wording for WUSOOL for Investment’s professional support (OPEN-02)',
      ],
    },
    media: {
      eyebrow: 'Media & partnerships',
      title: 'An interview, a collaboration, or an invitation to speak?',
      text: 'Send an email with a short brief, your organisation and a proposed date.',
    },
    gallery: {
      alt: [
        'Khalil Al Amri standing upright, arms at his sides',
        'Khalil Al Amri with arms folded and a calm smile',
        'Khalil Al Amri seated with hands clasped, listening',
      ],
    },
  },
};
