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
import { DEFAULT_OG_IMAGE, getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

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
  const canonical = getCanonicalUrl(url.pathname);

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OBRIYM" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: getAlternateLinks(url.pathname),
  };
};
