# OBRIYM – Full-Cycle Web Agency

👋 Welcome to the official repository of **OBRIYM** — a full-cycle web agency specializing in fast, modern, and scalable websites.  
We combine design, development, animation, SEO, and thoughtful user experience to deliver complete digital products from concept to deployment.

---

## 🌐 What We Do

- Custom websites from scratch (design → development → deployment)
- UI/UX design in Figma
- Animated landing pages and corporate sites
- Multi-language websites with top performance
- CMS integrations (WordPress, Prismic, Sanity, Shopify)
- SEO optimization, accessibility, and Lighthouse audits

---

## 🧠 Technologies

- **Front-end**: `React`, `Next.js`, `Tailwind CSS`, `Framer Motion`
- **Back-end**: `Node.js`, `Express`, `MongoDB`, `PostgreSQL`, `Firebase`
- **DevOps**: `Vercel`, `Render`, `GitHub Actions`
- **Design Tools**: `Figma`, `Framer`, `Webflow`
- **Integrations**: WayForPay, Stripe, Telegram Bots, SendGrid, and more

---

## 👥 Our Team

| 👤                    | Role                           | Description                                                                                  |
| --------------------- | ------------------------------ | -------------------------------------------------------------------------------------------- |
| **Serhii Oberemchuk** | Founder / Full Stack Developer | Leads project architecture, backend logic, integrations, and deployment                      |
| **Olga**              | Lead Designer                  | Creates UI/UX concepts, designs in Figma, and ensures visual quality                         |
| **Ganna**             | Team Lead / Project Manager    | Oversees the team, manages timelines, handles client communication and internal coordination |

## 🏗 This site

Built with **Next.js 16 (App Router)**, React 19 and TypeScript.

- **i18n**: `next-intl` with three locales — `en-EU` (default, no URL prefix), `it-IT`, `uk-UA`.
  Messages live in `i18n/<locale>/*.json`; each file nests its own namespace, and
  `src/i18n/messages.ts` merges them, falling back to the default locale key by key.
- **Routing**: locale-aware routes under `src/app/[locale]`, with `trailingSlash: true`
  so every URL matches what the site was indexed on. Localized links go through
  `Link` from `src/i18n/navigation.ts` — never hand-build a locale prefix.
- **SEO**: canonical + hreflang, OpenGraph/Twitter and JSON-LD are produced by
  `src/lib/seo.ts` and `src/lib/structuredData.ts`; `src/app/sitemap.ts` and
  `src/app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- **Styling**: plain CSS. Component styles are CSS Modules (`*.module.css`);
  the shared typography, colors and layout primitives are global in `src/styles/`.
- **Assets**: SVGs are React components via SVGR (configured in `next.config.ts`);
  raster images go through `next/image`.
- **Forms**: the contact form uses `react-hook-form` + valibot and submits through the
  `submitContactForm` server action, which sends mail with Resend.

## Local development

```shell
npm install
cp .env.local.example .env.local   # fill in the values
npm run dev
```

Useful scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`, `npm run fmt`.

### Environment variables

| Variable              | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| `RESEND_API_KEY`      | Resend API key used to send contact-form email |
| `EMAIL_RECEIVER`      | Inbox that receives contact-form submissions   |
| `EMAIL_FROM`          | Sender address (defaults to `EMAIL_RECEIVER`)  |
| `PUBLIC_URL_PROJECTS` | Base URL of the API serving the projects list  |

## Deployment

The project deploys to Vercel as a standard Next.js app; pushing to the default
branch triggers a production deploy.
