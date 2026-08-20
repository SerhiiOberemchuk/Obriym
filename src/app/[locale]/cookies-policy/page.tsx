import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata, canonicalUrl } from "~/lib/seo";
import JsonLd from "~/components/common/json-ld/JsonLd";
import CookiesSection from "~/components/pages/CoociesPage/CookiesSection";

type PageProps = { params: Promise<{ locale: string }> };

const PATHNAME = "/cookies-policy/";
const COOKIES_OG_IMAGE = "https://obriym.com/images/cookies/og-image.png";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("app.head.cookies.title"),
    description: t("app.head.cookies.description"),
    pathname: PATHNAME,
    locale: locale as Locale,
    image: COOKIES_OG_IMAGE,
  });
}

export default async function Cookies({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CookiesSection />
      <JsonLd
        id="obriym-cookies-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Cookies Policy",
          description:
            "Cookies Policy of Obriym Web Agency. Learn what cookies we use and how to manage them.",
          dateModified: "2025-07-21",
          url: canonicalUrl(PATHNAME, locale as Locale),
          publisher: {
            "@type": "Organization",
            name: "Obriym Web Agency",
            url: "https://obriym.com",
            logo: "https://obriym.com/logo.svg",
          },
          mainEntity: {
            "@type": "WebPageElement",
            name: "Cookies Policy",
            description: "Details about the types of cookies used by Obriym Web Agency.",
          },
        }}
      />
    </>
  );
}
