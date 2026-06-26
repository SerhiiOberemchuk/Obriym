import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import ProjectDetailPage from "~/components/pages/ProjectsPage/ProjectDetailPage";
import type { Project } from "~/types/project.type";
import { type ProjectLocale, fetchProjects, findProjectBySlug, getLocalizedProject } from "~/utils/projects";
import { SITE_NAME, buildSeoMeta, getAlternateLinks } from "~/utils/seo";

export const useProjectLoader = routeLoader$(async ({ cacheControl, params, locale, status }) => {
  try {
    const currentLocale = locale() as ProjectLocale;
    const projects = await fetchProjects();
    const project = findProjectBySlug(projects, params.slug);

    if (!project) {
      cacheControl({
        noCache: true,
        noStore: true,
        maxAge: 0,
      });

      status(404);
      return {
        status: false as const,
        project: null,
        related: [] as Project[],
      };
    }

    const related = projects.filter(item => item.slug !== params.slug).slice(0, 2);

    cacheControl({
      public: true,
      maxAge: 60 * 30,
      sMaxAge: 60 * 60 * 24,
      staleWhileRevalidate: 60,
    });

    return {
      status: true as const,
      project: getLocalizedProject(project, currentLocale),
      related: related.map(item => getLocalizedProject(item, currentLocale)),
    };
  } catch {
    cacheControl({
      noCache: true,
      noStore: true,
      maxAge: 0,
    });

    status(500);
    return {
      status: false as const,
      project: null,
      related: [] as Project[],
    };
  }
});

export default component$(() => {
  const projectData = useProjectLoader();
  const t = inlineTranslate();
  const { lang } = useSpeakLocale();
  const getPath = localizePath();

  if (!projectData.value.project) {
    return (
      <section style={{ padding: "8rem 0 5rem" }}>
        <div class="container">
          <h1 class="H4 black">{t("projects.detail.notFound.heading@@Project not found")}</h1>
          <p class="btn_body grey" style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            {t(
              "projects.detail.notFound.text@@The requested case page does not exist or is currently unavailable.",
            )}
          </p>
          <a
            href={getPath("/projects/", lang)}
            class="btn_body black"
            style={{
              display: "inline-flex",
              padding: "0.8rem 1.1rem",
              borderRadius: "999px",
              backgroundColor: "var(--pink)",
            }}
          >
            {t("projects.detail.notFound.back@@Back to projects")}
          </a>
        </div>
      </section>
    );
  }

  return (
    <ProjectDetailPage
      project={projectData.value.project}
      relatedProjects={projectData.value.related}
    />
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const t = inlineTranslate();
  const data = resolveValue(useProjectLoader);

  if (!data.project) {
    const title = t("projects.detail.notFound.title@@Project not found | {{name}}", {
      name: SITE_NAME,
    });
    return {
      title,
      meta: buildSeoMeta({
        title,
        description: t(
          "projects.detail.notFound.text@@The requested case page does not exist or is currently unavailable.",
        ),
        pathname: url.pathname,
        noindex: true,
      }),
      links: getAlternateLinks(url.pathname),
    };
  }

  const title = `${data.project.localizedTitle} | ${t(
    "projects.detail.head.suffix@@Project case by {{name}}",
    { name: SITE_NAME },
  )}`;
  const description = data.project.localizedDescription;

  return {
    title,
    meta: buildSeoMeta({
      title,
      description,
      pathname: url.pathname,
      image: data.project.image_src,
      type: "article",
    }),
    links: getAlternateLinks(url.pathname),
  };
};
