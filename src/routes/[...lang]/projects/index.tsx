import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import ProjectsPage from "~/components/pages/ProjectsPage/ProjectsPage";
import type { Project } from "~/types/project.type";
import { fetchProjects } from "~/utils/projects";
import { buildSeoMeta, getAlternateLinks } from "~/utils/seo";

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

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname }),
    links: getAlternateLinks(url.pathname),
  };
};
