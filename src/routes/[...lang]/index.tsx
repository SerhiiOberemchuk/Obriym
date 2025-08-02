import { component$ } from "@qwik.dev/core";
import { DocumentHead, routeLoader$ } from "@qwik.dev/router"; //
import { inlineTranslate } from "qwik-speak";
import SectionContact from "~/components/sections/home-page/section-contact/SectionContact";

import SectionHero from "~/components/sections/home-page/section-hero/SectionHero";
import SectionHowItWork from "~/components/sections/home-page/section-hiw/SectionHowItWork";
import SectionProjects from "~/components/sections/home-page/section-projects/SectionProjects";
import Services from "~/components/sections/home-page/section-services/Services";
import SectionTitle from "~/components/sections/home-page/section-title/SectionTitle";
import { faqSchemaEN } from "~/seo/schemas/faq/faq.en";
import { faqSchemaIT } from "~/seo/schemas/faq/faq.it";
import { faqSchemaUA } from "~/seo/schemas/faq/faq.ua";
import { howToWorkSchemaEN } from "~/seo/schemas/howToWork/howToSchema.en";
import { howToWorkSchemaIT } from "~/seo/schemas/howToWork/howToSchema.it";
import { howToWorkSchemaUA } from "~/seo/schemas/howToWork/howToSchema.ua";
import { organizationSchemaEN } from "~/seo/schemas/organization/organization.en";
import { organizationSchemaIT } from "~/seo/schemas/organization/organization.it";
import { organizationSchemaUA } from "~/seo/schemas/organization/organization.ua";
import { Project } from "~/types/project.type";

export const useLocalLoader = routeLoader$(({ locale }) => locale);
export const useFetchProjects = routeLoader$(async () => {
  try {
    const url = import.meta.env.PUBLIC_URL_PROJECTS;
    const response = await fetch(`${url}/api/projects`);
    const projects = await response.json();
    return {
      status: true as boolean,
      message: "successful fetch" as string,
      data: projects.data as Project[],
    };
  } catch (error) {
    return { status: false as boolean, message: `error : ${error}` };
  }
});

export default component$(() => {
  return (
    <>
      <SectionTitle />
      <SectionHero />
      <Services />
      <SectionProjects />
      <SectionHowItWork />
      <SectionContact />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const t = inlineTranslate();
  let schemaHOW;
  let schemaOrganization;
  let schemaFAQ;
  const lang = resolveValue(useLocalLoader);

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

  return {
    title: t("app.head.home.title@@{{name}}", { name: "Obriym" }),
    meta: [
      {
        name: "description",
        content: t("app.head.home.description@@Localized routing"),
      },
    ],
    scripts: [
      {
        props: { type: "application/ld+json", children: JSON.stringify(schemaHOW) },
      },
      {
        props: { type: "application/ld+json", children: JSON.stringify(schemaOrganization) },
      },
      {
        props: { type: "application/ld+json", children: JSON.stringify(schemaFAQ) },
      },
    ],
  };
};
