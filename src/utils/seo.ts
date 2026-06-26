import type { DocumentLink, DocumentMeta } from "@builder.io/qwik-city";
import { config } from "~/speak-config";

export const SITE = "https://obriym.com";
export const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;
export const SITE_NAME = "OBRIYM";

export const DEFAULT_LOCALE_PREFIX = "";
const toPrefix = (lang: string) =>
  lang === config.defaultLocale.lang ? DEFAULT_LOCALE_PREFIX : `/${lang}`;
const toHreflang = (lang: string) => (lang === config.defaultLocale.lang ? "en" : lang);

const localeSegmentPattern = config.supportedLocales.map(({ lang }) => lang).join("|");
const LOCALE_PREFIX_PATTERN = new RegExp(`^\\/(${localeSegmentPattern})(?=\\/|$)`);

// The site is served with `trailingSlash: true` (Qwik City default), so every
// canonical/alternate/sitemap URL must keep the trailing slash to match the
// actually served URLs and avoid canonical/redirect mismatches.
const normalizePath = (pathname: string) => {
  if (pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : `${trimmed}/`;
};

export const SEO_LOCALES = config.supportedLocales.map(({ lang }) => ({
  hreflang: toHreflang(lang),
  prefix: toPrefix(lang),
}));

export const getPathWithoutLocale = (pathname: string) =>
  normalizePath(pathname).replace(LOCALE_PREFIX_PATTERN, "") || "/";

/** Returns the locale-aware home path for the current pathname (e.g. `/uk-UA/`). */
export const getLocaleHomePath = (pathname: string) => {
  const match = normalizePath(pathname).match(LOCALE_PREFIX_PATTERN);
  return match ? `${match[0]}/` : "/";
};

export const getLocalizedPath = (pathname: string, prefix: string) => {
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  if (pathWithoutLocale === "/") {
    return prefix ? `${prefix}/` : "/";
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

export interface SeoMetaOptions {
  title: string;
  description: string;
  /** Page pathname (usually `url.pathname`); used to build the canonical og:url. */
  pathname: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * Builds a consistent set of OpenGraph + Twitter meta tags for any page,
 * so every route exposes the same shape (incl. og:image dimensions for the
 * default share image).
 */
export const buildSeoMeta = ({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: SeoMetaOptions): DocumentMeta[] => {
  const canonical = getCanonicalUrl(pathname);
  const isDefaultImage = image === DEFAULT_OG_IMAGE;

  return [
    { name: "description", content: description },
    { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: image },
    ...(isDefaultImage
      ? [
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
        ]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
};
