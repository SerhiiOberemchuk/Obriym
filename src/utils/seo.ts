import type { DocumentLink } from "@builder.io/qwik-city";

export const SITE = "https://obriym.com";
export const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;

const DEFAULT_LOCALE_PREFIX = "";

export const getCanonicalUrl = (pathname: string) => {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return `${SITE}${normalizedPath}`;
};

export const getAlternateLinks = (pathname: string): DocumentLink[] => {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const pathWithoutLocale = normalizedPath.replace(/^\/(uk-UA|it-IT|en-EU)(?=\/|$)/, "") || "/";

  const localizedHref = (prefix: "" | "/uk-UA" | "/it-IT") => {
    const localizedPath =
      pathWithoutLocale === "/"
        ? prefix || "/"
        : `${prefix}${pathWithoutLocale}`.replace(/\/{2,}/g, "/");

    return getCanonicalUrl(localizedPath);
  };

  return [
    { rel: "alternate", hreflang: "en", href: localizedHref(DEFAULT_LOCALE_PREFIX) },
    { rel: "alternate", hreflang: "uk-UA", href: localizedHref("/uk-UA") },
    { rel: "alternate", hreflang: "it-IT", href: localizedHref("/it-IT") },
    { rel: "alternate", hreflang: "x-default", href: localizedHref(DEFAULT_LOCALE_PREFIX) },
    { rel: "canonical", href: getCanonicalUrl(normalizedPath) },
  ];
};
