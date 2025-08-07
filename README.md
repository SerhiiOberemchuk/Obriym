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

- **Front-end**: `React`, `Next.js`, `Qwik`, `Tailwind CSS`, `Framer Motion`
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

---

## 🚀 Getting Started

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.mts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.mts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `npm run build.server` and `npm run build.client`:

```shell
npm run build
```

[Read the full guide here](https://github.com/QwikDev/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
npm run deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.
