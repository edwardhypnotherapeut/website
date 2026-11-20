# Edward Hazebroek Hypnotherapy

A bilingual (English / Dutch), static brochure website built with Astro 7 and TypeScript. No UI framework, no client-side framework, no Tailwind; styling is hand-written CSS and the only interactive UI uses native `<details>` elements.

## Requirements

- Node.js 22 or newer (Node 26 works)
- npm

## Local development

```bash
npm install
npm run dev
```

The site is then available at `http://localhost:4321/`.

## Production build

```bash
npm run check       # Astro + TypeScript diagnostics
npm run build       # static output in dist/
npm run preview     # preview the built site
```

Two environment variables control deployment URLs:

| Variable    | Default                                    | Purpose                                                          |
| ----------- | ------------------------------------------ | ---------------------------------------------------------------- |
| `SITE_URL`  | `https://edwardhypnotherapeut.github.io`   | Public origin used for canonical URLs, Open Graph and the sitemap |
| `BASE_PATH` | `/website`                                 | Path prefix when the site is served from a subdirectory          |

These defaults publish at `https://edwardhypnotherapeut.github.io/website/`. To use a custom domain at the root instead, set:

```bash
SITE_URL=https://your-domain.com
BASE_PATH=/
```

Copy `.env.example` to `.env` for local production builds. Internal links, assets, canonical URLs, alternates, the sitemap and `robots.txt` are all base-path aware.

## Deploying

The included `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on pushes to `main`. Its defaults target `https://edwardhypnotherapeut.github.io/website/`; in GitHub's **Settings → Pages**, choose **GitHub Actions** as the source. If you later switch to a custom domain, set `SITE_URL` and `BASE_PATH` as repository **Variables** (Settings → Secrets and variables → Actions → Variables) to override the defaults.

## Editing content

Content lives in Astro content collections:

- `src/content/pages/en/` and `src/content/pages/nl/` — all pages
- `src/content/services/` — the four therapy cards
- `src/content/faqs/` — FAQ questions and answers
- `src/content/testimonials/` — client quotes
- `src/data/site.json` — practice details, opening hours, booking link, social links, contact form endpoint and legal numbers
- `src/data/credentials.ts` — professional credential list used in the About layout

Every page has a `translationKey` shared with its translation and a full public `urlSlug` (for example `/nl/therapieen/hypnotherapie/`). English is the default language; Dutch pages live under `/nl/`.

[Pages CMS](https://pagescms.org/) is configured in `.pages.yml` so a non-technical editor can manage all of the above, including images in `public/images/`. The configuration has been validated against Pages CMS's own `ConfigSchema` and covers all 52 page files, the service, FAQ and testimonial collections, `site.json` and the media folder.

To use it:

1. Push the project to a GitHub repository (the folder is not a Git repository yet).
2. Go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub and install the GitHub App on that repository.
3. Open the repository in Pages CMS; it will detect `.pages.yml` at the root and show the editable collections.

Pages CMS edits the Markdown and JSON files in place and commits them to GitHub, which triggers the `.github/workflows/deploy.yml` build. Markdown bodies are stored as Markdown (the default for rich-text fields), so Astro's content collections read them without conversion. When adding a translation, keep `translationKey` identical in both languages and set `urlSlug` to the full public path including the `/nl/` prefix.

## Artwork

The illustrations in `public/images/` are generated from hand-written SVGs in `src/art/`:

```bash
npm run images
```

This requires `sharp` (installed with Astro) and regenerates the WebP images plus `og.png`. `public/favicon.svg` is hand-written.

## Before going live — placeholder checklist

All of the following details are **fictional placeholders** and must be replaced with real information:

- **Contact details** in `src/data/site.json`: phone number, WhatsApp number, email address and street address.
- **Booking URL**: `https://cal.com/edwardhazebroek/intake` is illustrative; replace it with a real calendar.
- **Social links**: the Instagram, LinkedIn and Facebook URLs are illustrative.
- **Form endpoint**: replace `REPLACE_ME` in `formEndpoint` with a real Formspree form ID. Until then, a visible setup note is shown on the contact form.
- **Legal numbers**: `KvK`, `AGB` and the complaints body are `REPLACE_ME` values. They are hidden in the footer until filled in; update the complaints procedure text with the real body and address.
- **Credentials and experience**: the twelve years of practice, 900+ sessions, 4.9 rating and all training claims on the About and Prices pages are fictional and need verification.
- **Testimonials**: every quote, name and location in `src/content/testimonials/` is fictional. Replace them with real, permissioned, anonymised accounts.
- **Legal copy**: the privacy policy and complaints procedure are general templates. Have them reviewed for the actual practice, its professional body and Dutch law.
- **Practice statistics** in `src/lib/i18n.ts` (12+ years, 900+ sessions, 4.9 rating) are placeholders.

Neither the site nor the contact form is suitable for emergencies. Crisis resources are named on the Issues, Contact and FAQ pages.

## Structure

```
src/
  art/          SVG sources for the generated artwork
  components/   Header, Footer, Hero, cards, FAQ, contact form, icons, etc.
  content/      Pages, services, FAQs and testimonials (en / nl)
  data/         Practice settings and generated credential list
  layouts/      BaseLayout: head, SEO, JSON-LD, header, footer
  lib/          i18n strings, navigation model, content helpers
  pages/        Home, catch-all routes, 404, robots.txt
  styles/       Design tokens, components and responsive rules
public/
  images/       Generated WebP and OG images
  favicon.svg
scripts/
  build-images.mjs   SVG → WebP/PNG
  check-links.mjs    Post-build internal link verification
```

## Accessibility and SEO

- Semantic landmarks, one `h1` per page, skip link, visible focus states and `prefers-reduced-motion` support.
- Per-page title/description, canonical URLs, `en` / `nl` / `x-default` alternates, Open Graph and Twitter cards.
- `LocalBusiness` / `HealthAndBeautyBusiness` JSON-LD and `FAQPage` JSON-LD on pages with FAQs.
- XML sitemap (with language alternates where the paths match), generated `robots.txt`, `noindex` on the custom 404 page.
- `trailingSlash: 'always'` and directory output; internal links match canonical URLs exactly.
