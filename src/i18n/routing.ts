import { defineRouting } from "next-intl/routing";

// Order matters: the language switcher renders the list in this order, and the
// Qwik `speak-config.ts` listed uk-UA first.
export const locales = ["uk-UA", "it-IT", "en-EU"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-EU";

/** Locale metadata that used to live in `speak-config.ts`. */
export const localeSettings: Record<Locale, { currency: string; timeZone: string }> = {
  "en-EU": { currency: "EUR", timeZone: "Europe/Rome" },
  "it-IT": { currency: "EUR", timeZone: "Europe/Rome" },
  "uk-UA": { currency: "UAH", timeZone: "Europe/Kyiv" },
};

/**
 * Internal route -> the URL each locale is served on.
 *
 * The commercial service pages carry translated slugs, because the slug is one
 * of the strongest relevance signals for a query like "sviluppo siti web".
 * The rest keep a single slug across locales: they are already indexed on those
 * URLs and a localized slug would win nothing for a page nobody searches by name.
 */
export const pathnames = {
  "/": "/",
  "/team/": "/team/",
  "/faq/": "/faq/",
  "/projects/": "/projects/",
  "/projects/[slug]/": "/projects/[slug]/",
  "/products/": "/products/",
  "/products/obriym-crm/": "/products/obriym-crm/",
  "/products/obriym-tools/": "/products/obriym-tools/",
  "/privacy-policy/": "/privacy-policy/",
  "/cookies-policy/": "/cookies-policy/",
  "/legal-information/": "/legal-information/",

  "/web-development/": {
    "en-EU": "/web-development/",
    "it-IT": "/sviluppo-siti-web/",
    "uk-UA": "/rozrobka-saitiv/",
  },
  "/ecommerce-development/": {
    "en-EU": "/ecommerce-development/",
    "it-IT": "/sviluppo-ecommerce/",
    "uk-UA": "/rozrobka-internet-magazyniv/",
  },
  "/crm-development/": {
    "en-EU": "/crm-development/",
    "it-IT": "/sviluppo-crm/",
    "uk-UA": "/rozrobka-crm/",
  },
  "/saas-development/": {
    "en-EU": "/saas-development/",
    "it-IT": "/sviluppo-saas/",
    "uk-UA": "/rozrobka-saas/",
  },
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  // The default locale keeps the prefixless URLs the site is already indexed on.
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames,
});
