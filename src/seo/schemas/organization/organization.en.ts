export const organizationSchemaEN = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OBRIYM Web Agency",
  legalName: "OBRIYM",
  url: "https://obriym.com",
  logo: "https://obriym.com/images/logo.png",
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
    addressCountry: "Italy",
  },
};
