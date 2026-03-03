import { component$ } from "@builder.io/qwik";
import { useSpeakLocale } from "qwik-speak";

import { howToWorkSchemaEN } from "~/seo/schemas/howToWork/howToSchema.en";
import { howToWorkSchemaIT } from "~/seo/schemas/howToWork/howToSchema.it";
import { howToWorkSchemaUA } from "~/seo/schemas/howToWork/howToSchema.ua";
import { organizationSchemaEN } from "~/seo/schemas/organization/organization.en";
import { organizationSchemaIT } from "~/seo/schemas/organization/organization.it";
import { organizationSchemaUA } from "~/seo/schemas/organization/organization.ua";

export default component$(() => {
  let schemaHOW;
  let schemaOrganization;

  const { lang } = useSpeakLocale();

  switch (lang) {
    case "uk-UA":
      schemaHOW = howToWorkSchemaUA;
      schemaOrganization = organizationSchemaUA;
      break;
    case "it-IT":
      schemaHOW = howToWorkSchemaIT;
      schemaOrganization = organizationSchemaIT;

      break;

    default:
      schemaHOW = howToWorkSchemaEN;
      schemaOrganization = organizationSchemaEN;

      break;
  }

  const schemaWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OBRIYM",
    alternateName: "OBRIYM Web Agency",
    url: "https://obriym.com/",
    inLanguage: lang,
    publisher: {
      "@type": "Organization",
      name: "OBRIYM",
      url: "https://obriym.com/",
    },
  };

  const schemaServices = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website and Web App Development",
    serviceType: "Full-cycle web development and UX UI design services",
    provider: {
      "@type": "Organization",
      name: "OBRIYM Web Agency",
      url: "https://obriym.com/",
    },
    areaServed: "Europe",
    availableLanguage: ["English", "Italian", "Ukrainian"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website development",
            description: "Corporate websites, landing pages and marketing websites.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-commerce development",
            description: "Online store development and integrations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web application development",
            description: "Custom web apps for internal tools and client products.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UX UI design",
            description: "User research, wireframes, interfaces, and design systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO optimization",
            description: "Technical SEO setup and performance-first implementation.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        id="schema-how-it-work"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(schemaHOW)}
      ></script>

      <script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(schemaOrganization)}
      ></script>
      <script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(schemaWebSite)}
      ></script>
      <script
        id="schema-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(schemaServices)}
      ></script>
      <script
        id="schema-siteNavigation"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "SiteNavigationElement",
              position: 1,
              name: "Services",
              url: "https://obriym.com/services/",
            },
            {
              "@type": "SiteNavigationElement",
              position: 2,
              name: "Portfolio",
              url: "https://obriym.com/#portfolio",
            },
            {
              "@type": "SiteNavigationElement",
              position: 3,
              name: "Team",
              url: "https://obriym.com/team/",
            },
            {
              "@type": "SiteNavigationElement",
              position: 4,
              name: "About",
              url: "https://obriym.com/#about",
            },
            {
              "@type": "SiteNavigationElement",
              position: 5,
              name: "Contact",
              url: "https://obriym.com/#contact",
            },
            {
              "@type": "SiteNavigationElement",
              position: 6,
              name: "Cookies policy",
              url: "https://obriym.com/cookies-policy/",
            },
            {
              "@type": "SiteNavigationElement",
              position: 7,
              name: "Privacy policy",
              url: "https://obriym.com/privacy-policy/",
            },
          ],
        })}
      ></script>
    </>
  );
});

