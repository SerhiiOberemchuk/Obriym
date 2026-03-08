import { RequestHandler } from "@builder.io/qwik-city";
import { routes } from "@qwik-city-plan";
import { createSitemap } from "./create-sitemap";
import { fetchProjects } from "~/utils/projects";
import { DEFAULT_LOCALE_PREFIX, SEO_LOCALES, getCanonicalUrl, getLocalizedPath, getPathWithoutLocale } from "~/utils/seo";

const ROUTE_PRIORITY: Record<string, number> = {
  "/": 1,
  "/team": 0.8,
  "/faq": 0.7,
  "/privacy-policy": 0.3,
  "/cookies-policy": 0.3,
};

const ROUTE_CHANGEFREQ: Partial<Record<string, "weekly" | "monthly" | "yearly">> = {
  "/": "weekly",
  "/team": "monthly",
  "/faq": "monthly",
  "/privacy-policy": "yearly",
  "/cookies-policy": "yearly",
};

const ROUTE_LASTMOD: Partial<Record<string, string>> = {
  "/privacy-policy": "2025-07-21",
  "/cookies-policy": "2025-07-21",
};

export const onGet: RequestHandler = async ev => {
  const staticRoutes = routes
    .map(([, , routePath]) => routePath)
    .filter(routePath => routePath !== "/sitemap.xml" && !routePath.includes("[slug]"));

  const normalizedRoutes = [
    ...new Set(
      staticRoutes.map(routePath =>
        getPathWithoutLocale((routePath || "/").replace("/[...lang]", DEFAULT_LOCALE_PREFIX) || "/"),
      ),
    ),
  ];

  const buildAlternates = (basePath: string) => [
    ...SEO_LOCALES.map(locale => ({
      hreflang: locale.hreflang,
      href: getCanonicalUrl(getLocalizedPath(basePath, locale.prefix)),
    })),
    {
      hreflang: "x-default",
      href: getCanonicalUrl(getLocalizedPath(basePath, DEFAULT_LOCALE_PREFIX)),
    },
  ];

  const localizedEntries = normalizedRoutes.flatMap(basePath =>
    SEO_LOCALES.map(({ prefix }) => ({
      loc: getCanonicalUrl(getLocalizedPath(basePath, prefix)),
      priority: ROUTE_PRIORITY[basePath] ?? 0.6,
      changefreq: ROUTE_CHANGEFREQ[basePath],
      lastmod: ROUTE_LASTMOD[basePath],
      alternates: buildAlternates(basePath),
    })),
  );

  let projectEntries: Array<{
    loc: string;
    priority: number;
    changefreq: "monthly";
    lastmod?: string;
    alternates: Array<{ hreflang: string; href: string }>;
  }> = [];

  try {
    const projects = await fetchProjects();
    projectEntries = projects.flatMap(project => {
      const basePath = `/projects/${project.slug}`;

      return SEO_LOCALES.map(({ prefix }) => ({
        loc: getCanonicalUrl(getLocalizedPath(basePath, prefix)),
        priority: 0.75,
        changefreq: "monthly" as const,
        lastmod: project.updated_at ? new Date(project.updated_at).toISOString().split("T")[0] : undefined,
        alternates: buildAlternates(basePath),
      }));
    });
  } catch {
    projectEntries = [];
  }

  const response = new Response(createSitemap([...localizedEntries, ...projectEntries]), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
};
