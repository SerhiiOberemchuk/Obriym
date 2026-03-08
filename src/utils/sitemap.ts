import type { Project } from "~/types/project.type";
import { fetchProjects } from "~/utils/projects";
import { SEO_LOCALES, SITE, getCanonicalUrl, getLocalizedPath } from "~/utils/seo";

type SitemapEntry = {
  loc: string;
  alternates: Array<{
    hreflang: string;
    href: string;
  }>;
  lastmod?: string;
  changefreq?: string;
  priority: number;
};

const STATIC_BASE_ROUTES = ["/", "/team", "/faq", "/privacy-policy", "/cookies-policy", "/projects"] as const;

const ROUTE_PRIORITY: Record<string, number> = {
  "/": 1,
  "/team": 0.8,
  "/faq": 0.7,
  "/projects": 0.85,
  "/privacy-policy": 0.3,
  "/cookies-policy": 0.3,
};

const ROUTE_CHANGEFREQ: Record<string, string> = {
  "/": "weekly",
  "/team": "monthly",
  "/faq": "monthly",
  "/projects": "weekly",
  "/privacy-policy": "yearly",
  "/cookies-policy": "yearly",
};

const ROUTE_LASTMOD: Record<string, string> = {
  "/privacy-policy": "2025-07-21",
  "/cookies-policy": "2025-07-21",
};

const normalizeLastmod = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString().split("T")[0];
};

const buildAlternates = (pathname: string) => [
  ...SEO_LOCALES.map(({ hreflang, prefix }) => ({
    hreflang,
    href: getCanonicalUrl(getLocalizedPath(pathname, prefix)),
  })),
  {
    hreflang: "x-default",
    href: getCanonicalUrl(getLocalizedPath(pathname, "")),
  },
];

const createEntriesForPath = (
  pathname: string,
  metadata: Pick<SitemapEntry, "priority" | "changefreq" | "lastmod">,
) =>
  SEO_LOCALES.map(({ prefix }) => ({
    loc: getCanonicalUrl(getLocalizedPath(pathname, prefix)),
    alternates: buildAlternates(pathname),
    priority: metadata.priority,
    changefreq: metadata.changefreq,
    lastmod: metadata.lastmod,
  }));

const getStaticEntries = () =>
  STATIC_BASE_ROUTES.flatMap(pathname =>
    createEntriesForPath(pathname, {
      priority: ROUTE_PRIORITY[pathname] ?? 0.6,
      changefreq: ROUTE_CHANGEFREQ[pathname],
      lastmod: ROUTE_LASTMOD[pathname],
    }),
  );

const getProjectEntries = (projects: Project[]) =>
  projects.flatMap(project =>
    createEntriesForPath(`/projects/${project.slug}`, {
      priority: 0.75,
      changefreq: "monthly",
      lastmod: normalizeLastmod(project.updated_at),
    }),
  );

const renderSitemapXml = (entries: SitemapEntry[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    entry => `  <url>
    <loc>${entry.loc}</loc>
    ${entry.alternates
      .map(
        alternate =>
          `<xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`,
      )
      .join("\n    ")}
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ""}
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

export const buildSitemapXml = async () => {
  const staticEntries = getStaticEntries();
  let projectEntries: SitemapEntry[] = [];

  try {
    const projects = await fetchProjects();
    projectEntries = getProjectEntries(projects);
  } catch (error) {
    console.error("[sitemap] Failed to load project entries", error);
  }

  return renderSitemapXml([...staticEntries, ...projectEntries]);
};

export const SITEMAP_URL = `${SITE}/sitemap.xml`;
