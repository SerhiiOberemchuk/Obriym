import { component$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import LegalPage from "~/components/pages/LegalPage";
import { LEGAL_ENTITY } from "~/types/legal.info";
import { buildSeoMeta, getAlternateLinks, getCanonicalUrl, SITE } from "~/utils/seo";

export default component$(() => {
  const loc = useLocation();
  const canonical = getCanonicalUrl(loc.url.pathname);

  return (
    <>
      <LegalPage />
      <script
        type="application/ld+json"
        id="obriym-legal-schema"
        dangerouslySetInnerHTML={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Legal Information",
          url: canonical,
          mainEntity: {
            "@type": "Organization",
            name: "OBRIYM Web Agency",
            url: SITE,
            logo: `${SITE}/logo.svg`,
            legalName: LEGAL_ENTITY.nameEn || LEGAL_ENTITY.name,
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
              addressLocality: LEGAL_ENTITY.localityEn || LEGAL_ENTITY.locality,
              addressRegion: LEGAL_ENTITY.regionEn || LEGAL_ENTITY.region,
              postalCode: LEGAL_ENTITY.postalCode,
              addressCountry: "UA",
            },
            telephone: LEGAL_ENTITY.phone,
            email: "info@obriym.com",
          },
        })}
      ></script>
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.legal.title@@Legal Information | Obriym");
  const description = t(
    "app.head.legal.description@@Official business details of OBRIYM web agency: legal name, registration data, tax ID and registered address of the entity operating obriym.com.",
  );

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname }),
    links: getAlternateLinks(url.pathname),
  };
};
