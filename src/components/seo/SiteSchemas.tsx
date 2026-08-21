import { useLocale, useTranslations } from "next-intl";
import JsonLd from "~/components/common/json-ld/JsonLd";
import { SITE, canonicalUrl } from "~/lib/seo";
import { homeSectionHref } from "~/i18n/navigation";
import type { Locale } from "~/i18n/routing";

import { howToWorkSchemaEN } from "~/seo/schemas/howToWork/howToSchema.en";
import { howToWorkSchemaIT } from "~/seo/schemas/howToWork/howToSchema.it";
import { howToWorkSchemaUA } from "~/seo/schemas/howToWork/howToSchema.ua";
import { organizationSchemaEN } from "~/seo/schemas/organization/organization.en";
import { organizationSchemaIT } from "~/seo/schemas/organization/organization.it";
import { organizationSchemaUA } from "~/seo/schemas/organization/organization.ua";

/** Home-page JSON-LD: HowTo, Organization and the site navigation item list. */
export default function SiteSchemas() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  const howTo =
    locale === "uk-UA"
      ? howToWorkSchemaUA
      : locale === "it-IT"
        ? howToWorkSchemaIT
        : howToWorkSchemaEN;
  const organization =
    locale === "uk-UA"
      ? organizationSchemaUA
      : locale === "it-IT"
        ? organizationSchemaIT
        : organizationSchemaEN;

  const sectionUrl = (hash: string) => `${SITE}${homeSectionHref(hash, locale)}`;

  const navigation = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { name: t("navigation.services"), url: sectionUrl("services") },
      { name: t("navigation.webDevelopment"), url: canonicalUrl("/web-development/", locale) },
      {
        name: t("navigation.ecommerceDevelopment"),
        url: canonicalUrl("/ecommerce-development/", locale),
      },
      { name: t("navigation.crmDevelopment"), url: canonicalUrl("/crm-development/", locale) },
      { name: t("navigation.saasDevelopment"), url: canonicalUrl("/saas-development/", locale) },
      { name: t("navigation.products"), url: canonicalUrl("/products/", locale) },
      { name: t("home.sectionProject.title"), url: canonicalUrl("/projects/", locale) },
      { name: t("navigation.team"), url: canonicalUrl("/team/", locale) },
      { name: t("navigation.about"), url: sectionUrl("about") },
      { name: t("navigation.contact"), url: sectionUrl("contact") },
      { name: t("cookies.title"), url: canonicalUrl("/cookies-policy/", locale) },
      { name: t("privacy.title"), url: canonicalUrl("/privacy-policy/", locale) },
      { name: t("legal.title"), url: canonicalUrl("/legal-information/", locale) },
    ].map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      ...item,
    })),
  };

  return (
    <>
      <JsonLd id="schema-how-it-work" data={howTo} />
      <JsonLd id="schema-organization" data={organization} />
      <JsonLd id="schema-siteNavigation" data={navigation} />
    </>
  );
}
