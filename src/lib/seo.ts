import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "~/i18n/routing";

export const SITE = "https://obriym.com";
export const SITE_NAME = "OBRIYM";
export const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;

// og:locale expects language_TERRITORY; "EU" is not a valid OG territory,
// so the default locale maps to the compatibility-safe en_US.
const OG_LOCALE_BY_LANG: Record<Locale, string> = {
  "en-EU": "en_US",
  "uk-UA": "uk_UA",
  "it-IT": "it_IT",
};

const HREFLANG_BY_LOCALE: Record<Locale, string> = {
  "en-EU": "en",
  "uk-UA": "uk-UA",
  "it-IT": "it-IT",
};

/**
 * The site is served with `trailingSlash: true`, so every canonical, alternate
 * and sitemap URL must keep the trailing slash to match the URLs actually
 * served and avoid canonical/redirect mismatches.
 */
export const normalizePath = (pathname: string) => {
  if (!pathname || pathname === "/") return "/";
  const trimmed = `/${pathname}`.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  return trimmed === "" ? "/" : `${trimmed}/`;
};

/** Prefixes an unlocalized path with the locale segment (default locale stays prefixless). */
export const localizedPath = (pathname: string, locale: Locale) => {
  const path = normalizePath(pathname);
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}/` : `/${locale}${path}`;
};

export const canonicalUrl = (pathname: string, locale: Locale) =>
  `${SITE}${localizedPath(pathname, locale)}`;

/** hreflang map for every locale plus x-default, as the Qwik build emitted. */
export const languageAlternates = (pathname: string) => {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[HREFLANG_BY_LOCALE[locale]] = canonicalUrl(pathname, locale);
  }
  languages["x-default"] = canonicalUrl(pathname, defaultLocale);

  return languages;
};

export interface SeoMetadataOptions {
  title: string;
  description: string;
  /** Path without the locale prefix, e.g. `/team/`. */
  pathname: string;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * Builds the canonical + hreflang + OpenGraph/Twitter set every route exposed
 * under Qwik, so the emitted `<head>` stays equivalent after the migration.
 */
export const buildMetadata = ({
  title,
  description,
  pathname,
  locale,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: SeoMetadataOptions): Metadata => {
  const canonical = canonicalUrl(pathname, locale);
  const isDefaultImage = image === DEFAULT_OG_IMAGE;

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: languageAlternates(pathname),
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: OG_LOCALE_BY_LANG[locale],
      alternateLocale: locales.filter(l => l !== locale).map(l => OG_LOCALE_BY_LANG[l]),
      images: [isDefaultImage ? { url: image, width: 1200, height: 630 } : { url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
};
