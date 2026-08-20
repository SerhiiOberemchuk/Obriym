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

export const routing = defineRouting({
  locales,
  defaultLocale,
  // The default locale keeps the prefixless URLs the site is already indexed on.
  localePrefix: "as-needed",
  localeDetection: false,
});
