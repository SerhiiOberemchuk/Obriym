export const organizationSchemaUA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ОБРІУМ Веб Агенція",
  legalName: "ОБРІУМ",
  url: "https://obriym.com",
  logo: "https://obriym.com/images/logo.png",
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
    addressCountry: "Італія",
  },
};
