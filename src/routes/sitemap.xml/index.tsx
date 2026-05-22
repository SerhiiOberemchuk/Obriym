import type { RequestHandler } from "@builder.io/qwik-city";
import { fetchProjects } from "~/utils/projects";
import { SEO_LOCALES, getLocalizedPath } from "~/utils/seo";
import { createSitemap, type SitemapEntry } from "./create-sitemap";

const STATIC_BASE_ROUTES = [
  "/",
  "/team",
  "/faq",
  "/privacy-policy",
  "/cookies-policy",
  "/projects",
  "/web-development",
  "/seo-optimization",
  "/ecommerce-development",
] as const;

const ROUTE_PRIORITY: Record<string, number> = {
  "/": 1,
  "/team": 0.8,
  "/faq": 0.7,
  "/projects": 0.85,
  "/web-development": 0.9,
  "/seo-optimization": 0.9,
  "/ecommerce-development": 0.9,
  "/privacy-policy": 0.3,
  "/cookies-policy": 0.3,
};

const toDateString = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
};

const createLocalizedEntries = (pathname: string, priority: number, lastmod?: string): SitemapEntry[] => {
  const alternates = [
    ...SEO_LOCALES.map(({ hreflang, prefix }) => ({
      hreflang,
      href: getLocalizedPath(pathname, prefix),
    })),
    { hreflang: "x-default", href: getLocalizedPath(pathname, "") },
  ];

  return SEO_LOCALES.map(({ prefix }) => ({
    loc: getLocalizedPath(pathname, prefix),
    priority,
    lastmod,
    alternates,
  }));
};

export const onGet: RequestHandler = async ({ cacheControl, headers, send }) => {
  const staticEntries = STATIC_BASE_ROUTES.flatMap(pathname =>
    createLocalizedEntries(pathname, ROUTE_PRIORITY[pathname] ?? 0.6),
  );

  let projectEntries: SitemapEntry[] = [];

  try {
    const projects = await fetchProjects();
    projectEntries = projects.flatMap(project =>
      createLocalizedEntries(`/projects/${project.slug}`, 0.75, toDateString(project.updated_at)),
    );
  } catch (error) {
    console.error("[dynamic-sitemap] Failed to load projects", error);
  }

  const sitemap = createSitemap([...staticEntries, ...projectEntries]);

  cacheControl({
    public: true,
    maxAge: 60 * 60,
    sMaxAge: 60 * 60,
    staleWhileRevalidate: 60,
  });

  headers.set("Content-Type", "application/xml; charset=utf-8");
  send(200, sitemap);
};
