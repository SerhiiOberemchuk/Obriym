import { component$ } from "@qwik.dev/core";
import { DocumentHead, routeLoader$ } from "@qwik.dev/router"; //
import { inlineTranslate } from "qwik-speak";
import SectionContact from "~/components/sections/home-page/section-contact/SectionContact";

import SectionHero from "~/components/sections/home-page/section-hero/SectionHero";
import SectionHowItWork from "~/components/sections/home-page/section-hiw/SectionHowItWork";
import SectionProjects from "~/components/sections/home-page/section-projects/SectionProjects";
import Services from "~/components/sections/home-page/section-services/Services";
import SectionTitle from "~/components/sections/home-page/section-title/SectionTitle";
import { Project } from "~/types/project.type";
import SchemaSeoScripts from "~/utils/SchemaSeoScripts";

export const useLocalLoader = routeLoader$(({ locale }) => locale);
export const useFetchProjects = routeLoader$(async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24,
    maxAge: 60 * 60,
  });
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
      <SchemaSeoScripts />
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
    // links: [
    //   {
    //     rel: "preload",
    //     as: "font",
    //     href: "/fonts/plus-jakarta-sans-v11-cyrillic-ext_latin-regular.woff2",
    //     type: "font/woff2",
    //     crossOrigin: "anonymous",
    //   },
    // ],
  };
};
