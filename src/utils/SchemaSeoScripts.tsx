import { component$ } from "@qwik.dev/core";
import { useSpeakLocale } from "qwik-speak";
import { faqSchemaEN } from "~/seo/schemas/faq/faq.en";
import { faqSchemaIT } from "~/seo/schemas/faq/faq.it";
import { faqSchemaUA } from "~/seo/schemas/faq/faq.ua";
import { howToWorkSchemaEN } from "~/seo/schemas/howToWork/howToSchema.en";
import { howToWorkSchemaIT } from "~/seo/schemas/howToWork/howToSchema.it";
import { howToWorkSchemaUA } from "~/seo/schemas/howToWork/howToSchema.ua";
import { organizationSchemaEN } from "~/seo/schemas/organization/organization.en";
import { organizationSchemaIT } from "~/seo/schemas/organization/organization.it";
import { organizationSchemaUA } from "~/seo/schemas/organization/organization.ua";

export default component$(() => {
  let schemaHOW;
  let schemaOrganization;
  let schemaFAQ;
  const { lang } = useSpeakLocale();

  switch (lang) {
    case "uk-UA":
      schemaHOW = howToWorkSchemaUA;
      schemaFAQ = faqSchemaUA;
      schemaOrganization = organizationSchemaUA;
      break;
    case "it-IT":
      schemaHOW = howToWorkSchemaIT;
      schemaFAQ = faqSchemaIT;
      schemaOrganization = organizationSchemaIT;

      break;

    default:
      schemaHOW = howToWorkSchemaEN;
      schemaFAQ = faqSchemaEN;
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
        id="schema-FAQ"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(schemaFAQ)}
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
          "@type": "SiteNavigationElement",
          name: [
            "Services",
            "Portfolio",
            "Team",
            "About",
            "Contact",
            "Cookies policy",
            "Privacy policy",
          ],
          url: [
            "https://obriym.com/#services",
            "https://obriym.com/#portfolio",
            "https://obriym.com/team/",
            "https://obriym.com/cookies-policy/",
            "https://obriym.com/privacy-policy/",
            "https://obriym.com/#about",
            "https://obriym.com/#contact",
          ],
        })}
      ></script>
    </>
  );
});
