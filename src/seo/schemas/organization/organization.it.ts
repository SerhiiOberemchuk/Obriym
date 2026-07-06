import { LEGAL_ENTITY } from "~/types/legal.info";

export const organizationSchemaIT = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OBRIYM Agenzia Web",
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
    url: "https://obriym.com/it-IT/team/",
  },
  url: "https://obriym.com",
  logo: "https://obriym.com/logo.svg",
  description:
    "OBRIYM è un'agenzia di sviluppo web full-cycle con sede in Italia, che offre siti web SEO-friendly, design UX/UI e servizi di branding per aziende in tutta Europa.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+39-351-664-84-98",
      contactType: "assistenza clienti",
      email: "info@obriym.com",
      areaServed: "Europa",
      availableLanguage: ["Italiano", "Inglese", "Ucraino"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/obriym",
    "https://www.instagram.com/obriym",
    "https://www.linkedin.com/company/obriym",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IT",
  },
};
