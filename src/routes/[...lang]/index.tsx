import { component$ } from "@qwik.dev/core";
import { DocumentHead, routeLoader$ } from "@qwik.dev/router"; //
import { inlineTranslate } from "qwik-speak";
import SectionContact from "~/components/sections/home-page/section-contact/SectionContact";

import SectionHero from "~/components/sections/home-page/section-hero/SectionHero";
import SectionHowItWork from "~/components/sections/home-page/section-hiw/SectionHowItWork";
import SectionProjects from "~/components/sections/home-page/section-projects/SectionProjects";
import Services from "~/components/sections/home-page/section-services/Services";
import SectionTitle from "~/components/sections/home-page/section-title/SectionTitle";
import { faqSchema } from "~/seo/schemas/faq/faq";
import { howToWorkSchemaEN } from "~/seo/schemas/howToWork/howToSchema.en";
import { organizationSchema } from "~/seo/schemas/organization/organization";
import { Project } from "~/types/project.type";

// export const useContactFormLoader = routeLoader$(() => ({
//   services: [],
//   budget: "",
//   name: "",
//   email: "",
//   message: "",
// }));
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

export const head: DocumentHead = () => {
  const t = inlineTranslate();

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
        props: { type: "application/ld+json", children: JSON.stringify(howToWorkSchemaEN) },
      },
      {
        props: { type: "application/ld+json", children: JSON.stringify(organizationSchema) },
      },
      {
        props: { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      },
    ],
  };
};
