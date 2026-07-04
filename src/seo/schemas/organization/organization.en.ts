import { LEGAL_ENTITY } from "~/types/legal.info";

export const organizationSchemaEN = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OBRIYM Web Agency",
  legalName: LEGAL_ENTITY.nameEn || LEGAL_ENTITY.name,
  taxID: LEGAL_ENTITY.taxId,
  foundingDate: LEGAL_ENTITY.edrDate,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "EDR registration record",
    value: LEGAL_ENTITY.edrRecord,
  },
  url: "https://obriym.com",
  logo: "https://obriym.com/logo.svg",
  description:
    "OBRIYM is a full-cycle web development agency based in Italy, providing SEO-optimized websites, UX/UI design, and branding services for businesses across Europe.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+39-351-664-84-98",
      contactType: "customer service",
      email: "info@obriym.com",
      areaServed: "Europe",
      availableLanguage: ["English", "Italian", "Ukrainian"],
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
