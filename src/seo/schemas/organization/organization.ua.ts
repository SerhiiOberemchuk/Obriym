import { LEGAL_ENTITY } from "~/types/legal.info";

export const organizationSchemaUA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ОБРІУМ Веб Агенція",
  legalName: LEGAL_ENTITY.name,
  taxID: LEGAL_ENTITY.taxId,
  foundingDate: LEGAL_ENTITY.edrDate,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Номер запису в ЄДР",
    value: LEGAL_ENTITY.edrRecord,
  },
  founder: {
    "@type": "Person",
    name: "Сергій Оберемчук",
    jobTitle: "Засновник і CEO",
    url: "https://obriym.com/uk-UA/team/",
  },
  url: "https://obriym.com",
  logo: "https://obriym.com/logo.svg",
  description:
    "ОБРІУМ — веб-агенція повного циклу з Італії, яка створює SEO-оптимізовані сайти, UX/UI дизайн та брендинг для бізнесів по всій Європі.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+39-351-664-84-98",
      contactType: "підтримка клієнтів",
      email: "info@obriym.com",
      areaServed: "Європа",
      availableLanguage: ["Українська", "Англійська", "Італійська"],
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
