# Website build prompt

Act as a senior web designer and Astro developer. Build a complete, production-ready
bilingual (English/Dutch) static brochure website for a hypnotherapy practice called
"Edward Hazebroek Hypnotherapy", run by therapist "Edward Hazebroek" in Rotterdam, Netherlands.
Deliver the full working project, not snippets.

## Tech stack

- Astro 7 + TypeScript, static output.
- No React/Vue/Svelte, no Tailwind, no client-side JavaScript. Use native `<details>`
  for the mobile nav and FAQ accordions.
- Hand-written CSS in `src/styles/global.css` using CSS custom properties.
- Astro content collections with Zod schemas. Site-wide settings in `src/data/site.json`.
- Pages CMS config in `.pages.yml` so a non-technical editor can edit pages, services,
  FAQs, testimonials, site settings, and images.
- npm scripts: `dev`, `build`, `preview`, `check`. Node 22+.
- GitHub Pages-ready: configurable `site` and `base` via environment variables,
  GitHub Actions deploy workflow, sitemap, generated `robots.txt`, trailing slashes.

## Design direction

- Calm, premium, editorial, quietly confident — not clinical or "wellness cliché".
- Warm white background, dark green (`#008081`), sandcolour
  (`#dab48e`).
- Display font: Fraunces (serif). Body font: DM Sans (sans). Load via Google Fonts.
- Generous spacing, large rounded image cards, subtle shadows, restrained borders.
- Rounded buttons, clear hover/focus states, small uppercase eyebrows.
- Responsive from 320px to large desktop. No horizontal overflow at 320/360/390px.

## Localization

The website should sever versions in two languages, English (default) and Dutch

## Pages

This is the main menu:

Home
Therapies
- Hypnotherapy
- Regression therapy
- Family constellation
- Soul regression
Issues / Conditions
- Social Anxiety
- Abandonment issues
- Fear of commitment
- Insomnia & sleep problems
- Procrastination
- Low self-esteem or confidence
- Grief and adjustment difficulties
- Unhelpful emotional patterns
- Burnout
- Performance anxiety
Process
Prices
About Edward
- Testimonials
FAQ
Contact
Book now (highlighted)

This should be added to the footer as well, you can add a few social links as needed.

Privacy
Klachtenregeling

Plus a custom 404 page.

Each page needs a translated pair linked by `translationKey`. Include:

## Data model

- pages: `title`, `navTitle?`, `description`, `urlSlug`, `translationKey`, `eyebrow?`,
  `hero{heading, subheading, image?, imageAlt?}`, `seoTitle?`, `noindex`.
- services: `title`, `translationKey`, `summary`, `duration`, `price`, `order`,
  `image?`, `imageAlt?`.
- faqs: `question`, `answer`, `order`.
- testimonials: `quote`, `author`, `location?`, `service?`, `rating`, `order`.
- `site.json`: practice name, therapist, email, phone, WhatsApp, address, maps URL,
  opening hours, booking URL, form endpoint, social links.

Important: the frontmatter field must be `urlSlug`, not `slug`, because Astro reserves
`slug` for entry IDs.

## Site settings / placeholders

- Practice: Edward Hazebroek Hypnotherapy
- Therapist: Edward Hazebroek
- Email: info@edwardhazebroek.nl
- Phone: +31 6 34 04 04 03
- Address: Stoomloggerweg 8, 3133 KT Vlaardingen, Netherlands
- Hours: Mon–Fri 09:00–19:00, Sat by appointment
- Social links: placeholder Instagram/LinkedIn/Facebook
- All copy, credentials and testimonials are fictional placeholders and must be
  clearly flagged in the README for replacement/review.

## Components

- Sticky header: brand, desktop nav, language switch, booking CTA; mobile `<details>`
  nav. Hide the brand name at ≤359px to prevent overflow.
- Hero with optional image, eyebrow, heading, subheading, badges, primary/secondary CTA.
- PageHeader for pages without images.
- SectionHead, CTA band, ServiceCard, TestimonialCard, FaqList, ContactForm,
  ContactDetails, Footer, Icon set.
- Contact form: Formspree action, `_gotcha` honeypot, consent checkbox, and a visible
  setup note while the endpoint contains `REPLACE_ME`.
- Email links should wrap cleanly at the `@` on narrow screens using `<wbr>`.
- Footer: practice blurb, explore links, contact details, socials, legal links, copyright.

## SEO

- Per-page title and meta description, optional `seoTitle`.
- Canonical URLs, hreflang `en`/`nl`/`x-default`, Open Graph and Twitter cards.
- JSON-LD `LocalBusiness`/`HealthAndBeautyBusiness` with address, hours, `areaServed`,
  and `FAQPage` JSON-LD on FAQ pages.
- Sitemap integration, generated `robots.txt`, `noindex` on 404.
- `trailingSlash: 'always'`; internal URLs must match sitemap/canonical exactly.

## Accessibility

- Semantic landmarks, one H1 per page, logical heading order.
- Skip link, visible focus states, keyboard-operable nav/FAQ, aria labels where needed.
- Sufficient contrast (including ghost buttons on dark backgrounds).
- Respect `prefers-reduced-motion`.

## Acceptance criteria

- `npm run build` succeeds and generates all pages.
- `npm run check` reports 0 errors and 0 warnings.
- No broken internal links or missing images.
- No horizontal overflow at 320, 360, 390, or 1440px.
- Site builds correctly at both `/` and `/astro-test/`.
- Pages CMS loads and exposes editable page/service/FAQ/testimonial/site content.