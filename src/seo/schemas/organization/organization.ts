export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OBRIYM Web Agency",
  url: "https://obriym.com",
  logo: "https://obriym.com/logo.svg",
  sameAs: [
    "https://www.facebook.com/obriym",
    "https://www.instagram.com/obriym",
    "https://www.linkedin.com/company/obriym",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+39-351-664-84-98",
    contactType: "customer service",
    availableLanguage: ["English", "Italian", "Ukrainian"],
  },
};
