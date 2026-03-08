import type { DocumentLink } from "@builder.io/qwik-city";

export const SITE = "https://obriym.com";
export const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;

export const DEFAULT_LOCALE_PREFIX = "";
export const LOCALE_PREFIXES = ["", "/uk-UA", "/it-IT"] as const;

export const SEO_LOCALES = [
  { hreflang: "en", prefix: DEFAULT_LOCALE_PREFIX },
  { hreflang: "uk-UA", prefix: "/uk-UA" },
  { hreflang: "it-IT", prefix: "/it-IT" },
] as const;

type LocalePrefix = (typeof LOCALE_PREFIXES)[number];

const LOCALE_PREFIX_PATTERN = /^\/(uk-UA|it-IT|en-EU)(?=\/|$)/;
const normalizePath = (pathname: string) => (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));

export const getPathWithoutLocale = (pathname: string) =>
  normalizePath(pathname).replace(LOCALE_PREFIX_PATTERN, "") || "/";

export const getLocalizedPath = (pathname: string, prefix: LocalePrefix) => {
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  if (pathWithoutLocale === "/") {
    return prefix || "/";
  }

  return `${prefix}${pathWithoutLocale}`.replace(/\/{2,}/g, "/");
};

export const getLocalePrefixFromLang = (lang?: string): LocalePrefix => {
  if (lang === "uk-UA") return "/uk-UA";
  if (lang === "it-IT") return "/it-IT";
  return DEFAULT_LOCALE_PREFIX;
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
