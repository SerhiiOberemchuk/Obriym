import { getRequestConfig } from "next-intl/server";
import { getMessages } from "./messages";
import { localeSettings, routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (
    routing.locales.includes(requested as Locale) ? requested : routing.defaultLocale
  ) as Locale;

  return {
    locale,
    messages: await getMessages(locale),
    timeZone: localeSettings[locale].timeZone,
    // A missing key renders the key path instead of throwing, so one gap in a
    // translation file can never take a page down.
    onError() {},
    getMessageFallback({ key }) {
      return key;
    },
  };
});
