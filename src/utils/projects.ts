import type { Project } from "~/types/project.type";
import { DEFAULT_LOCALE_PREFIX, getLocalePrefixFromLang } from "./seo";

export type ProjectLocale = "en-EU" | "uk-UA" | "it-IT";

export type LocalizedProject = Project & {
  locale: ProjectLocale;
  localizedTitle: string;
  localizedDescription: string;
  localizedCategory: string;
  localizedClient: string;
  localizedFeatures: string[];
  detailPath: string;
};

export const getProjectsApiBase = () => import.meta.env.PUBLIC_URL_PROJECTS || process.env.PUBLIC_URL_PROJECTS || "";

export const fetchProjects = async (): Promise<Project[]> => {
  const baseUrl = getProjectsApiBase();

  if (!baseUrl) {
    throw new Error("PUBLIC_URL_PROJECTS is not configured");
  }

  const response = await fetch(`${baseUrl}/api/projects`, {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Projects API request failed with status ${response.status}`);
  }

  const projects = await response.json();
  return (projects.data ?? []) as Project[];
};

export const getLocalizedProject = (
  project: Project,
  lang: ProjectLocale = "en-EU",
): LocalizedProject => {
  const localePrefix = getLocalePrefixFromLang(lang);
  const localizedTitle = lang === "it-IT" ? project.titleIT : lang === "uk-UA" ? project.title : project.titleEN;
  const localizedDescription =
    lang === "it-IT"
      ? project.descriptionIT
      : lang === "uk-UA"
        ? project.description
        : project.descriptionEN;
  const localizedCategory =
    lang === "it-IT" ? project.categoryIT : lang === "uk-UA" ? project.category : project.categoryEN;
  const localizedClient = lang === "it-IT" ? project.clientIT : lang === "uk-UA" ? project.client : project.clientEN;
  const localizedFeatures =
    lang === "it-IT" ? project.featuresIT : lang === "uk-UA" ? project.features : project.featuresEN;

  return {
    ...project,
    locale: lang,
    localizedTitle,
    localizedDescription,
    localizedCategory,
    localizedClient,
    localizedFeatures,
    detailPath: `${localePrefix || DEFAULT_LOCALE_PREFIX}/projects/${project.slug}`.replace(/\/{2,}/g, "/"),
  };
};

export const findProjectBySlug = (projects: Project[], slug: string) =>
  projects.find(project => project.slug === slug) ?? null;
