import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import SectionContact from "~/components/pages/HomePage/section-contact/SectionContact";
import SectionHero from "~/components/pages/HomePage/section-hero/SectionHero";
import SectionHowItWork from "~/components/pages/HomePage/section-hiw/SectionHowItWork";
import SectionProjects from "~/components/pages/HomePage/section-projects/SectionProjects";
import Services from "~/components/pages/HomePage/section-services/Services";
import SectionTitle from "~/components/pages/HomePage/section-title/SectionTitle";
import { Project } from "~/types/project.type";
import SchemaSeoScripts from "~/utils/SchemaSeoScripts";
import { fetchProjects } from "~/utils/projects";
import { buildSeoMeta, getAlternateLinks } from "~/utils/seo";

export const useLocalLoader = routeLoader$(({ locale }) => locale);
export const useFetchProjects = routeLoader$(async ({ cacheControl }) => {
  try {
    const projects = await fetchProjects();

    cacheControl({
      public: true,
      maxAge: 60 * 60,
      sMaxAge: 60 * 60 * 24,
      staleWhileRevalidate: 60,
    });

    return {
      status: true as boolean,
      message: "successful fetch" as string,
      data: projects as Project[],
    };
  } catch (error) {
    cacheControl({
      noCache: true,
      noStore: true,
      maxAge: 0,
    });

    return { status: false as boolean, message: `error : ${error}`, data: [] as Project[] };
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

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.home.title@@Full-cycle web agency for fast SEO websites & web apps | {{name}}", {
    name: "OBRIYM",
  });
  const description = t(
    "app.head.home.description@@OBRIYM is a full-cycle web agency building fast SEO-ready websites, multilingual platforms and web apps for ambitious brands across Europe.",
  );

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname }),
    links: getAlternateLinks(url.pathname),
  };
};
