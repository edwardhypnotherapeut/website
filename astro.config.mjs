import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Deployment is configured entirely through environment variables:
 *
 *   SITE_URL   Full public URL of the deployment, e.g. https://edwardhazebroek.nl
 *              or https://username.github.io/astro-test
 *   BASE_PATH  Path the site is served from, e.g. / or /astro-test
 *
 * Both default to a root deployment on the production domain.
 */
const rawSite = process.env.SITE_URL ?? 'https://edwardhazebroek.nl';
const site = new URL(rawSite).origin;

let base = process.env.BASE_PATH ?? '/';
if (!base.startsWith('/')) base = `/${base}`;
base = base.replace(/\/+$/, '');
if (base === '') base = '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          nl: 'nl',
        },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
