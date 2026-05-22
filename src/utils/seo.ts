import type { DocumentLink } from "@builder.io/qwik-city";
import { config } from "~/speak-config";

export const SITE = "https://obriym.com";
export const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;

export const DEFAULT_LOCALE_PREFIX = "";
const toPrefix = (lang: string) =>
  lang === config.defaultLocale.lang ? DEFAULT_LOCALE_PREFIX : `/${lang}`;
const toHreflang = (lang: string) => (lang === config.defaultLocale.lang ? "en" : lang);

const localeSegmentPattern = config.supportedLocales.map(({ lang }) => lang).join("|");
const LOCALE_PREFIX_PATTERN = new RegExp(`^\\/(${localeSegmentPattern})(?=\\/|$)`);
const normalizePath = (pathname: string) => (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));

export const SEO_LOCALES = config.supportedLocales.map(({ lang }) => ({
  hreflang: toHreflang(lang),
  prefix: toPrefix(lang),
}));

export const getPathWithoutLocale = (pathname: string) =>
  normalizePath(pathname).replace(LOCALE_PREFIX_PATTERN, "") || "/";

export const getLocalizedPath = (pathname: string, prefix: string) => {
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  if (pathWithoutLocale === "/") {
    return prefix || "/";
  }

  return `${prefix}${pathWithoutLocale}`.replace(/\/{2,}/g, "/");
};

export const getCanonicalUrl = (pathname: string) => {
  return `${SITE}${normalizePath(pathname)}`;
};

export const getAlternateLinks = (pathname: string): DocumentLink[] => {
  const normalizedPath = normalizePath(pathname);

  return [
    ...SEO_LOCALES.map(({ hreflang, prefix }) => ({
      rel: "alternate" as const,
      hreflang,
      href: getCanonicalUrl(getLocalizedPath(normalizedPath, prefix)),
    })),
    {
      rel: "alternate" as const,
      hreflang: "x-default",
      href: getCanonicalUrl(getLocalizedPath(normalizedPath, DEFAULT_LOCALE_PREFIX)),
    },
    { rel: "canonical", href: getCanonicalUrl(normalizedPath) },
  ];
};
