import { component$ } from "@qwik.dev/core";
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
              url: "https://obriym.com/#services",
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
