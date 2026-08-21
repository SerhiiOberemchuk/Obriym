import { getRequestConfig } from "next-intl/server";
import { defaultLocale, localeSettings, routing, type Locale } from "./routing";

/**
 * One file per page or section, each with its own top-level namespace. Messages
 * are combined by spreading the files together, as next-intl documents for
 * split message files; the default locale is spread first so a namespace that
 * has not been translated yet falls back to English instead of breaking.
 */
const NAMESPACE_FILES = [
  "alert",
  "app",
  "breadcrumb",
  "budget",
  "cookies",
  "errors",
  "faq",
  "footer",
  "home",
  "legal",
  "logo",
  "navigation",
  "privacy",
  "products",
  "projects",
  "service-crm",
  "service-ecommerce",
  "service-saas",
  "service-web-development",
  "services",
  "team",
] as const;

const loadMessages = async (locale: string) => {
  const files = await Promise.all(
    NAMESPACE_FILES.map(name => import(`../../messages/${locale}/${name}.json`)),
  );

  return files.reduce((messages, file) => ({ ...messages, ...file.default }), {});
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (
    routing.locales.includes(requested as Locale) ? requested : routing.defaultLocale
  ) as Locale;

  const messages =
    locale === defaultLocale
      ? await loadMessages(defaultLocale)
      : { ...(await loadMessages(defaultLocale)), ...(await loadMessages(locale)) };

  return {
    locale,
    messages,
    timeZone: localeSettings[locale].timeZone,
    // A missing key renders the key path instead of throwing, so one gap in a
    // translation file can never take a page down.
    onError() {},
    getMessageFallback({ key }) {
      return key;
    },
  };
});
