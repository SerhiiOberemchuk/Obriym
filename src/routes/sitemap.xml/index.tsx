import { RequestHandler } from "@builder.io/qwik-city";
import { routes } from "@qwik-city-plan";
import { createSitemap } from "./create-sitemap";
import { fetchProjects } from "~/utils/projects";
import { DEFAULT_LOCALE_PREFIX, SEO_LOCALES, getCanonicalUrl, getLocalizedPath, getPathWithoutLocale } from "~/utils/seo";

const STATIC_BASE_ROUTES = ["/", "/team", "/faq", "/privacy-policy", "/cookies-policy", "/projects"] as const;

const ROUTE_PRIORITY: Record<string, number> = {
  "/": 1,
  "/team": 0.8,
  "/faq": 0.7,
  "/projects": 0.85,
  "/privacy-policy": 0.3,
  "/cookies-policy": 0.3,
};

const ROUTE_CHANGEFREQ: Partial<Record<string, "weekly" | "monthly" | "yearly">> = {
  "/": "weekly",
  "/team": "monthly",
  "/faq": "monthly",
  "/projects": "weekly",
  "/privacy-policy": "yearly",
  "/cookies-policy": "yearly",
};

const ROUTE_LASTMOD: Partial<Record<string, string>> = {
  "/privacy-policy": "2025-07-21",
  "/cookies-policy": "2025-07-21",
};

export const onGet: RequestHandler = async ev => {
  const discoveredRoutes = Array.isArray(routes)
    ? routes
        .map(route => route?.[2])
        .filter(
          (routePath): routePath is string =>
            typeof routePath === "string" && routePath !== "/sitemap.xml" && !routePath.includes("[slug]"),
        )
    : [];

  if (discoveredRoutes.length === 0) {
    console.error(
      "[sitemap] Qwik City route plan returned no static routes. Falling back to explicit STATIC_BASE_ROUTES.",
    );
  }

  const normalizedRoutes = [
    ...new Set(
      [...STATIC_BASE_ROUTES, ...discoveredRoutes].map(routePath =>
        getPathWithoutLocale(routePath.replace("/[...lang]", DEFAULT_LOCALE_PREFIX) || "/"),
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
  } catch (error) {
    console.error("[sitemap] Failed to fetch projects for sitemap.xml", error);
    projectEntries = [];
  }

  const sitemapEntries = [...localizedEntries, ...projectEntries];

  if (localizedEntries.length === 0) {
    console.error("[sitemap] localizedEntries is empty. Check route discovery and STATIC_BASE_ROUTES.");
  }

  if (projectEntries.length === 0) {
    console.warn("[sitemap] projectEntries is empty. Projects API may be unavailable or returned no items.");
  }

  if (sitemapEntries.length === 0) {
    console.error("[sitemap] Generated an empty sitemap.xml response.");
  }

  const response = new Response(createSitemap(sitemapEntries), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
};
