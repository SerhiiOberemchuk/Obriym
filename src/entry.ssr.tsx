import { isDev } from "@builder.io/qwik/build";
import {
  renderToStream,
  type RenderOptions,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { config } from "./speak-config";
import Root from "./root";

/**
 * Determine the base URL to use for loading the chunks in the browser.
 * The value set through Qwik 'locale()' in 'plugin.ts' is saved by Qwik in 'serverData.locale' directly.
 * Make sure the locale is among the 'supportedLocales'
 */
export function extractBase({ serverData }: RenderOptions): string {
  if (!isDev && serverData?.locale) {
    return "/build/" + serverData.locale;
  } else {
    return "/build";
  }
}

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    base: extractBase(opts),
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: opts.serverData?.locale || config.defaultLocale.lang,
      ...opts.containerAttributes,
    },
    serverData: {
      ...opts.serverData,
    },
  });
}
