import { useLocale, useTranslations } from "next-intl";
import JsonLd from "~/components/common/json-ld/JsonLd";
import { SITE, localizedPath } from "~/lib/seo";
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

  const localizedHref = (path: string) => {
    const [pathname, hash] = path.split("#");
    return `${SITE}${localizedPath(pathname || "/", locale)}${hash ? `#${hash}` : ""}`;
  };

  const navigation = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { name: t("navigation.services"), url: localizedHref("/#services") },
      { name: t("home.sectionProject.title"), url: localizedHref("/projects/") },
      { name: t("navigation.team"), url: localizedHref("/team/") },
      { name: t("navigation.about"), url: localizedHref("/#about") },
      { name: t("navigation.contact"), url: localizedHref("/#contact") },
      { name: t("cookies.title"), url: localizedHref("/cookies-policy/") },
      { name: t("privacy.title"), url: localizedHref("/privacy-policy/") },
      { name: t("legal.title"), url: localizedHref("/legal-information/") },
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
