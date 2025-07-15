import type { SpeakConfig } from "qwik-speak";

export const config: SpeakConfig = {
  defaultLocale: {
    lang: "en-EU",
    currency: "EUR",
    timeZone: "Europe/Rome",
  },
  supportedLocales: [
    { lang: "uk-UA", currency: "UAH", timeZone: "Europe/Kyiv" },
    { lang: "it-IT", currency: "EUR", timeZone: "Europe/Rome" },
    { lang: "en-EU", currency: "EUR", timeZone: "Europe/Rome" },
  ],
  // Translations available in the whole app
  assets: ["app", "footer", "logo", "navigation", "home"],
  // Translations with dynamic keys available in the whole app
  runtimeAssets: ["runtime", "errors", "services"],
};
