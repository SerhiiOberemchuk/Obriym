import { component$ } from "@builder.io/qwik";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";

import { howToWorkSchemaEN } from "~/seo/schemas/howToWork/howToSchema.en";
import { howToWorkSchemaIT } from "~/seo/schemas/howToWork/howToSchema.it";
import { howToWorkSchemaUA } from "~/seo/schemas/howToWork/howToSchema.ua";
import { organizationSchemaEN } from "~/seo/schemas/organization/organization.en";
import { organizationSchemaIT } from "~/seo/schemas/organization/organization.it";
import { organizationSchemaUA } from "~/seo/schemas/organization/organization.ua";
import { SITE, getLocalePrefixFromLang } from "./seo";

export default component$(() => {
  let schemaHOW;
  let schemaOrganization;

  const { lang } = useSpeakLocale();
  const t = inlineTranslate();
  const localePrefix = getLocalePrefixFromLang(lang);
  const localizedHref = (path: string) => `${SITE}${`${localePrefix}${path}`.replace(/\/{2,}/g, "/")}`;

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
              name: t("navigation.services@@Services"),
              url: localizedHref("/#services"),
            },
            {
              "@type": "SiteNavigationElement",
              position: 2,
              name: t("home.sectionProject.title@@Projects"),
              url: localizedHref("/projects"),
            },
            {
              "@type": "SiteNavigationElement",
              position: 3,
              name: t("navigation.team@@Team"),
              url: localizedHref("/team"),
            },
            {
              "@type": "SiteNavigationElement",
              position: 4,
              name: t("navigation.about@@About"),
              url: localizedHref("/#about"),
            },
            {
              "@type": "SiteNavigationElement",
              position: 5,
              name: t("navigation.contact@@Contact"),
              url: localizedHref("/#contact"),
            },
            {
              "@type": "SiteNavigationElement",
              position: 6,
              name: t("cookies.title@@Cookies Policy"),
              url: localizedHref("/cookies-policy"),
            },
            {
              "@type": "SiteNavigationElement",
              position: 7,
              name: t("privacy.title@@Privacy Policy"),
              url: localizedHref("/privacy-policy"),
            },
          ],
        })}
      ></script>
    </>
  );
});
