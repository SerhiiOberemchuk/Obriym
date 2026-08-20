import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "~/i18n/navigation";
import type { Locale } from "~/i18n/routing";
import { SITE_NAME, buildMetadata } from "~/lib/seo";
import {
  fetchProjects,
  findProjectBySlug,
  getLocalizedProject,
  type LocalizedProject,
  type ProjectLocale,
} from "~/lib/projects";
import ProjectDetailPage from "~/components/pages/ProjectsPage/ProjectDetailPage";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 1800;

type LoadedProject = {
  project: LocalizedProject | null;
  related: LocalizedProject[];
};

const loadProject = async (slug: string, locale: ProjectLocale): Promise<LoadedProject> => {
  try {
    const projects = await fetchProjects();
    const project = findProjectBySlug(projects, slug);

    if (!project) {
      return { project: null, related: [] };
    }

    return {
      project: getLocalizedProject(project, locale),
      related: projects
        .filter(item => item.slug !== slug)
        .slice(0, 2)
        .map(item => getLocalizedProject(item, locale)),
    };
  } catch (error) {
    console.error("[project] Failed to load project", error);
    return { project: null, related: [] };
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const pathname = `/projects/${slug}/`;
  const { project } = await loadProject(slug, locale as ProjectLocale);

  if (!project) {
    return buildMetadata({
      title: t("projects.detail.notFound.title", { name: SITE_NAME }),
      description: t("projects.detail.notFound.text"),
      pathname,
      locale: locale as Locale,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${project.localizedTitle} | ${t("projects.detail.head.suffix", { name: SITE_NAME })}`,
    description: project.localizedDescription,
    pathname,
    locale: locale as Locale,
    image: project.image_src,
    type: "article",
  });
}

export default async function ProjectDetail({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const { project, related } = await loadProject(slug, locale as ProjectLocale);

  if (!project) {
    return (
      <section style={{ padding: "8rem 0 5rem" }}>
        <div className="container">
          <h1 className="H4 black">{t("projects.detail.notFound.heading")}</h1>
          <p className="btn_body grey" style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            {t("projects.detail.notFound.text")}
          </p>
          <Link
            href="/projects/"
            className="btn_body black"
            style={{
              display: "inline-flex",
              padding: "0.8rem 1.1rem",
              borderRadius: "999px",
              backgroundColor: "var(--pink)",
            }}
          >
            {t("projects.detail.notFound.back")}
          </Link>
        </div>
      </section>
    );
  }

  return <ProjectDetailPage project={project} relatedProjects={related} />;
}
