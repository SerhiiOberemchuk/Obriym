import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import ProjectsPage from "~/components/pages/ProjectsPage/ProjectsPage";
import type { Project } from "~/types/project.type";
import { fetchProjects } from "~/utils/projects";
import { DEFAULT_OG_IMAGE, getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

export const useProjectsLoader = routeLoader$(async ({ cacheControl }) => {
  try {
    const projects = await fetchProjects();

    cacheControl({
      public: true,
      maxAge: 60 * 60,
      sMaxAge: 60 * 60 * 24,
      staleWhileRevalidate: 60,
    });

    return { status: true as const, data: projects };
  } catch (error) {
    cacheControl({
      noCache: true,
      noStore: true,
      maxAge: 0,
    });

    return { status: false as const, data: [] as Project[], message: String(error) };
  }
});

export default component$(() => {
  const projects = useProjectsLoader();
  return <ProjectsPage projects={projects.value.data} />;
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("projects.head.title@@Projects | SEO-ready websites and digital products | {{name}}", {
    name: "OBRIYM",
  });
  const description = t(
    "projects.head.description@@Explore OBRIYM projects: fast SEO-ready websites, multilingual platforms and digital products created for ambitious brands across Europe.",
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
