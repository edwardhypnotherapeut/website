import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type PageEntry = CollectionEntry<'pages'>;
export type ServiceEntry = CollectionEntry<'services'>;
export type FaqEntry = CollectionEntry<'faqs'>;
export type TestimonialEntry = CollectionEntry<'testimonials'>;

const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix an internal, root-relative path with the configured base path. */
export function href(path: string): string {
  return `${basePath}${path}` || '/';
}

export function isActivePath(current: string, target: string): boolean {
  if (target === '/') return current === '/';
  return current === target || current.startsWith(`${target.replace(/\/$/, '')}/`);
}

export async function getPages(lang: Lang): Promise<PageEntry[]> {
  const pages = await getCollection('pages', (entry) => entry.data.lang === lang);
  return pages.sort((a, b) => a.data.order - b.data.order);
}

export async function getPageMap(lang: Lang): Promise<Map<string, PageEntry>> {
  const pages = await getPages(lang);
  return new Map(pages.map((page) => [page.data.translationKey, page]));
}

export async function getPageByKey(lang: Lang, key: string): Promise<PageEntry | undefined> {
  const pages = await getPages(lang);
  return pages.find((page) => page.data.translationKey === key);
}

export async function getAlternate(page: PageEntry): Promise<PageEntry | undefined> {
  const otherLang: Lang = page.data.lang === 'en' ? 'nl' : 'en';
  const pages = await getPages(otherLang);
  return pages.find((item) => item.data.translationKey === page.data.translationKey);
}

export async function getServices(lang: Lang): Promise<ServiceEntry[]> {
  const services = await getCollection('services', (entry) => entry.data.lang === lang);
  return services.sort((a, b) => a.data.order - b.data.order);
}

export async function getFaqs(lang: Lang): Promise<FaqEntry[]> {
  const faqs = await getCollection('faqs', (entry) => entry.data.lang === lang);
  return faqs.sort((a, b) => a.data.order - b.data.order);
}

export async function getTestimonials(lang: Lang): Promise<TestimonialEntry[]> {
  const testimonials = await getCollection('testimonials', (entry) => entry.data.lang === lang);
  return testimonials.sort((a, b) => a.data.order - b.data.order);
}

export function pageHref(page: PageEntry): string {
  return href(page.data.urlSlug);
}
