import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lang = z.enum(['en', 'nl']);

const pageLayouts = [
  'home',
  'standard',
  'services',
  'issues',
  'prices',
  'process',
  'about',
  'testimonials',
  'faq',
  'contact',
  'book',
  'legal',
] as const;

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    navTitle: z.string().optional(),
    description: z.string(),
    urlSlug: z.string().regex(/^\/(?:[a-z0-9-]+\/)*$/, 'urlSlug must start and end with a slash'),
    translationKey: z.string(),
    lang,
    eyebrow: z.string().optional(),
    hero: z.object({
      heading: z.string(),
      subheading: z.string(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
    }),
    seoTitle: z.string().optional(),
    noindex: z.boolean().default(false),
    layout: z.enum(pageLayouts).default('standard'),
    faq: z.boolean().default(false),
    testimonials: z.boolean().default(false),
    cta: z
      .object({
        heading: z.string(),
        body: z.string().optional(),
        primaryLabel: z.string().optional(),
        secondaryLabel: z.string().optional(),
      })
      .optional(),
    order: z.number().default(0),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    translationKey: z.string(),
    lang,
    summary: z.string(),
    duration: z.string(),
    price: z.string(),
    order: z.number().default(0),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    lang,
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    location: z.string().optional(),
    service: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    order: z.number().default(0),
    lang,
  }),
});

export const collections = { pages, services, faqs, testimonials };
