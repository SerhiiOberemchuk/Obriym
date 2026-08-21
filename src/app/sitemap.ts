import type { MetadataRoute } from "next";
import { locales } from "~/i18n/routing";
import { canonicalUrl, languageAlternates, type Href } from "~/lib/seo";
import { fetchProjects } from "~/lib/projects";

/** Every static route, keyed by its internal pathname. */
const STATIC_ROUTES: Array<[Href, number]> = [
  ["/", 1],
  ["/web-development/", 0.9],
  ["/ecommerce-development/", 0.9],
  ["/crm-development/", 0.9],
  ["/saas-development/", 0.9],
  ["/products/", 0.95],
  ["/products/obriym-crm/", 0.9],
  ["/products/obriym-tools/", 0.9],
  ["/projects/", 0.85],
  ["/team/", 0.8],
  ["/faq/", 0.7],
  ["/privacy-policy/", 0.3],
  ["/cookies-policy/", 0.3],
  ["/legal-information/", 0.3],
];

const toDate = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

/** One entry per locale, each carrying the full hreflang alternate set. */
const localizedEntries = (
  href: Href,
  priority: number,
  lastModified?: Date,
): MetadataRoute.Sitemap =>
  locales.map(locale => ({
    url: canonicalUrl(href, locale),
    priority,
    ...(lastModified ? { lastModified } : {}),
    alternates: { languages: languageAlternates(href) },
  }));

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = STATIC_ROUTES.flatMap(([href, priority]) => localizedEntries(href, priority));

  try {
    const projects = await fetchProjects();
    entries.push(
      ...projects.flatMap(project =>
        localizedEntries(
          { pathname: "/projects/[slug]/", params: { slug: project.slug } },
          0.75,
          toDate(project.updated_at),
        ),
      ),
    );
  } catch (error) {
    console.error("[sitemap] Failed to load projects", error);
  }

  return entries;
}
