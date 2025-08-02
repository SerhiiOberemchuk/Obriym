export const organizationSchemaIT = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OBRIYM Agenzia Web",
  legalName: "OBRIYM",
  url: "https://obriym.com",
  logo: "https://obriym.com/images/logo.png",
  description:
    "OBRIYM è un'agenzia di sviluppo web full-cycle con sede in Italia, che offre siti web SEO-friendly, design UX/UI e servizi di branding per aziende in tutta Europa.",
  inLanguage: "it",
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
    addressCountry: "Italia",
  },
};
