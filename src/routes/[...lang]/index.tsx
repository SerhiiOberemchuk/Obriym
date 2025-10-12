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
    public: true,
    maxAge: 60 * 60,
    sMaxAge: 60 * 60 * 24,
    staleWhileRevalidate: 60,
  });
  try {
    const url = import.meta.env.PUBLIC_URL_PROJECTS;
    const response = await fetch(`${url}/api/projects`, {
      headers: { accept: "application/json" },
    });
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

export const SITE = "https://obriym.com";

export const OG_IMAGE = `${SITE}/og-image.jpg`;

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.home.title@@Full-cycle web agency — fast SEO sites & apps | {{name}}", {
    name: "OBRIYM",
  });
  const description = t("app.head.home.description@@Localized routing");
  const path = url.pathname.replace(/^\/(uk-UA|en-EU|it-IT)(?=\/|$)/, "") || "/";
  const canonical = `${SITE}${path}`;
  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OBRIYM" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  };
};
