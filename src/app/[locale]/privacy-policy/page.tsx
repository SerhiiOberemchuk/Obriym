import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata, canonicalUrl } from "~/lib/seo";
import JsonLd from "~/components/common/json-ld/JsonLd";
import PrivacyPage from "~/components/pages/PrivacyPage";

type PageProps = { params: Promise<{ locale: string }> };

const PATHNAME = "/privacy-policy/";
const PRIVACY_OG_IMAGE = "https://obriym.com/images/privacy/og-image.png";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("app.head.privacy.title"),
    description: t("app.head.privacy.description"),
    href: PATHNAME,
    locale: locale as Locale,
    image: PRIVACY_OG_IMAGE,
  });
}

export default async function Privacy({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PrivacyPage />
      <JsonLd
        id="obriym-policy-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          description:
            "Privacy Policy of Obriym Web Agency. Learn how we collect, use, and protect your personal data.",
          dateModified: "2025-07-21",
          url: canonicalUrl(PATHNAME, locale as Locale),
          publisher: {
            "@type": "Organization",
            name: "Obriym Web Agency",
            url: "https://obriym.com",
            logo: "https://obriym.com/logo.svg",
          },
        }}
      />
    </>
  );
}
