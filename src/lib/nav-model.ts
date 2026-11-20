import { getCollection } from 'astro:content';
import { isActivePath } from './content';
import type { Lang } from './i18n';
import { primaryNav, footerNav, legalNav, type NavItem } from './nav';

export interface ResolvedNavItem {
  key: string;
  label: string;
  path: string;
  active: boolean;
  children?: ResolvedNavItem[];
}

export interface NavModel {
  primary: ResolvedNavItem[];
  footer: ResolvedNavItem[];
  legal: ResolvedNavItem[];
  book: ResolvedNavItem | null;
  contact: ResolvedNavItem | null;
}

export async function buildNav(lang: Lang, currentSlug: string): Promise<NavModel> {
  const pages = await getCollection('pages', (entry) => entry.data.lang === lang);
  const map = new Map(pages.map((page) => [page.data.translationKey, page]));

  const resolve = (key: string): ResolvedNavItem | null => {
    const page = map.get(key);
    if (!page) return null;
    const item = primaryNav.find((navItem) => navItem.translationKey === key);
    const children = item?.children
      ?.map((childKey) => resolve(childKey))
      .filter((child): child is ResolvedNavItem => child !== null);
    return {
      key,
      label: page.data.navTitle ?? page.data.title,
      path: page.data.urlSlug,
      active: isActivePath(currentSlug, page.data.urlSlug),
      ...(children && children.length > 0 ? { children } : {}),
    };
  };

  const resolveList = (keys: string[]): ResolvedNavItem[] =>
    keys
      .map((key) => resolve(key))
      .filter((item): item is ResolvedNavItem => item !== null);

  const primary = primaryNav
    .map((item: NavItem) => resolve(item.translationKey))
    .filter((item): item is ResolvedNavItem => item !== null);

  return {
    primary,
    footer: resolveList(footerNav),
    legal: resolveList(legalNav),
    book: resolve('book'),
    contact: resolve('contact'),
  };
}
