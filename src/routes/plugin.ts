import type { RequestHandler } from "@qwik.dev/router";
import { setSpeakContext, validateLocale } from "qwik-speak";

import { config } from "../speak-config";

/**
 * This middleware function must only contain the logic to set the locale,
 * because it is invoked on every request to the server.
 * Avoid redirecting or throwing errors here, and prefer layouts or pages
 */
export const onRequest: RequestHandler = ({ params, error, locale }) => {
  let lang: string | undefined = undefined;

  if (params.lang && validateLocale(params.lang)) {
    // Check supported locales
    lang = config.supportedLocales.find(
      (value) => value.lang === params.lang
    )?.lang;
  } else {
    lang = config.defaultLocale.lang;
  }

  // Set Speak context (optional: set the configuration on the server)
  setSpeakContext(config);

  // Set Qwik locale
  locale(lang);

  if (!locale()) throw error(404, "Page not found for requested locale");

  // E.g. Redirect
  // if (!locale()) {
  //   const getPath = localizePath();
  //   throw redirect(302, getPath('/page', 'en-US')); // Let the server know the language to use
  // }
};
