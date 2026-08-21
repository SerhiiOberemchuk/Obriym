import type { Metadata } from "next";
import { getPathname } from "~/i18n/navigation";
import { defaultLocale, locales, type Locale } from "~/i18n/routing";

export const SITE = "https://obriym.com";
export const SITE_NAME = "OBRIYM";
export const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;

/** Any internal route accepted by the navigation APIs. */
export type Href = Parameters<typeof getPathname>[0]["href"];

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
const withTrailingSlash = (pathname: string) =>
  pathname.endsWith("/") ? pathname : `${pathname}/`;

/** Absolute URL of an internal route in one locale, with its localized slug. */
export const canonicalUrl = (href: Href, locale: Locale) =>
  `${SITE}${withTrailingSlash(getPathname({ href, locale }))}`;

/** hreflang map for every locale plus x-default. */
export const languageAlternates = (href: Href) => {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[HREFLANG_BY_LOCALE[locale]] = canonicalUrl(href, locale);
  }
  languages["x-default"] = canonicalUrl(href, defaultLocale);

  return languages;
};

export interface SeoMetadataOptions {
  title: string;
  description: string;
  /** Internal route, e.g. `/team/` or `{ pathname: '/projects/[slug]/', params }`. */
  href: Href;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * Builds the canonical + hreflang + OpenGraph/Twitter set every route exposes,
 * resolved through next-intl so each locale points at its own localized slug.
 */
export const buildMetadata = ({
  title,
  description,
  href,
  locale,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: SeoMetadataOptions): Metadata => {
  const canonical = canonicalUrl(href, locale);
  const isDefaultImage = image === DEFAULT_OG_IMAGE;

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: languageAlternates(href),
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
