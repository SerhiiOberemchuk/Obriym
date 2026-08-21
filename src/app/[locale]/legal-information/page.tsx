import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { SITE, buildMetadata, canonicalUrl } from "~/lib/seo";
import { LEGAL_ENTITY } from "~/types/legal.info";
import JsonLd from "~/components/common/json-ld/JsonLd";
import LegalPage from "~/components/pages/LegalPage";

type PageProps = { params: Promise<{ locale: string }> };

const PATHNAME = "/legal-information/";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("app.head.legal.title"),
    description: t("app.head.legal.description"),
    href: PATHNAME,
    locale: locale as Locale,
  });
}

export default async function LegalInformation({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LegalPage />
      <JsonLd
        id="obriym-legal-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Legal Information",
          url: canonicalUrl(PATHNAME, locale as Locale),
          mainEntity: {
            "@type": "Organization",
            name: "OBRIYM Web Agency",
            url: SITE,
            logo: `${SITE}/logo.svg`,
            legalName: LEGAL_ENTITY.name,
            alternateName: LEGAL_ENTITY.nameEn || undefined,
            taxID: LEGAL_ENTITY.taxId,
            foundingDate: LEGAL_ENTITY.edrDate,
            identifier: {
              "@type": "PropertyValue",
              propertyID: "EDR registration record",
              value: LEGAL_ENTITY.edrRecord,
            },
            founder: {
              "@type": "Person",
              name: "Serhii Oberemchuk",
              jobTitle: "Founder & CEO",
              url: `${SITE}/team/`,
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: LEGAL_ENTITY.streetAddress,
              addressLocality: ` ${LEGAL_ENTITY.locality}`,
              addressRegion: `${LEGAL_ENTITY.region}, ${LEGAL_ENTITY.district}`,
              postalCode: LEGAL_ENTITY.postalCode,
              addressCountry: "UA",
            },
            telephone: LEGAL_ENTITY.phone,
            email: "info@obriym.com",
          },
        }}
      />
    </>
  );
}
