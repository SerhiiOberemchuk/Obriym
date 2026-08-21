import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import { fetchProjects } from "~/lib/projects";
import type { Project } from "~/types/project.type";
import ProjectsPage from "~/components/pages/ProjectsPage/ProjectsPage";

type PageProps = { params: Promise<{ locale: string }> };

// The Qwik loader cached this list for an hour on the CDN.
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("projects.head.title", { name: "OBRIYM" }),
    description: t("projects.head.description"),
    href: "/projects/",
    locale: locale as Locale,
  });
}

export default async function Projects({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  let projects: Project[] = [];

  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error("[projects] Failed to load projects", error);
  }

  return <ProjectsPage projects={projects} />;
}
