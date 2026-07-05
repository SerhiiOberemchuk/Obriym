import type { RequestHandler } from "@builder.io/qwik-city";
import { setSpeakContext } from "qwik-speak";

import { config } from "../speak-config";

const SUPPORTED_LANGS = new Set(config.supportedLocales.map(({ lang }) => lang));
const DEFAULT_LANG = config.defaultLocale.lang;
const DEFAULT_LANG_PREFIX = new RegExp(`^/${DEFAULT_LANG}(?=/|$)`);

/**
 * Runs on every request. Besides setting the locale it guards the `[...lang]`
 * catch-all: the rest param greedily matches unknown segments (e.g. `/garbage/`
 * or `/garbage/team/`), which would otherwise serve a 200 duplicate of a real
 * page — a soft-404 that hurts indexing.
 */
export const onRequest: RequestHandler = ({ params, locale, url, redirect, rewrite }) => {
  // undefined on non-[...lang] routes (robots.txt, sitemaps)
  const langParam = params.lang;

  if (langParam !== undefined && langParam !== "") {
    // The default locale is served without a prefix; `/en-EU/*` URLs are
    // crawlable duplicates of the prefixless pages -> permanent redirect.
    if (langParam === DEFAULT_LANG || langParam.startsWith(`${DEFAULT_LANG}/`)) {
      const stripped = url.pathname.replace(DEFAULT_LANG_PREFIX, "") || "/";
      throw redirect(301, `${stripped}${url.search}`);
    }

    // Unknown first segment -> localized 404 page (real 404 status).
    if (!SUPPORTED_LANGS.has(langParam)) {
      const first = url.pathname.split("/")[1];
      const prefix = SUPPORTED_LANGS.has(first) && first !== DEFAULT_LANG ? `/${first}` : "";
      throw rewrite(`${prefix}/not-found/`);
    }
  }

  // Set Speak context (optional: set the configuration on the server)
  setSpeakContext(config);

  // Set Qwik locale
  locale(langParam || DEFAULT_LANG);
};
