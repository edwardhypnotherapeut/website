export interface NavItem {
  translationKey: string;
  children?: string[];
}

/** Primary navigation. Labels come from each page's navTitle/title. */
export const primaryNav: NavItem[] = [
  { translationKey: 'home' },
  {
    translationKey: 'therapies',
    children: ['hypnotherapy', 'regression-therapy', 'family-constellation', 'soul-regression'],
  },
  {
    translationKey: 'issues',
    children: [
      'social-anxiety',
      'abandonment-issues',
      'fear-of-commitment',
      'insomnia',
      'procrastination',
      'low-self-esteem',
      'grief',
      'emotional-patterns',
      'burnout',
      'performance-anxiety',
    ],
  },
  { translationKey: 'process' },
  { translationKey: 'prices' },
  { translationKey: 'about', children: ['testimonials'] },
  { translationKey: 'faq' },
  { translationKey: 'contact' },
];

export const footerNav: string[] = [
  'home',
  'therapies',
  'issues',
  'process',
  'prices',
  'about',
  'testimonials',
  'faq',
  'contact',
];

export const legalNav: string[] = ['privacy', 'complaints'];
