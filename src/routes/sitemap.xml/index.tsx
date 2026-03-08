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

const escapeXmlComment = (value: unknown) =>
  String(value)
    .replace(/--/g, "__")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "?");

export const onGet: RequestHandler = async ev => {
  console.info("[sitemap] Request started", {
    pathname: ev.url.pathname,
    method: ev.request.method,
  });

  console.info("[sitemap] Route plan raw state", {
    isArray: Array.isArray(routes),
    length: Array.isArray(routes) ? routes.length : -1,
    preview: Array.isArray(routes) ? routes.slice(0, 10) : routes,
  });

  const discoveredRoutes = Array.isArray(routes)
    ? routes
        .map(route => route?.[2])
        .filter(
          (routePath): routePath is string =>
            typeof routePath === "string" && routePath !== "/sitemap.xml" && !routePath.includes("[slug]"),
        )
    : [];

  console.info("[sitemap] Discovered static routes", {
    count: discoveredRoutes.length,
    routes: discoveredRoutes,
  });

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

  console.info("[sitemap] Normalized routes", {
    count: normalizedRoutes.length,
    routes: normalizedRoutes,
  });

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

  console.info("[sitemap] Localized static entries built", {
    count: localizedEntries.length,
    preview: localizedEntries.slice(0, 12).map(entry => entry.loc),
  });

  let projectEntries: Array<{
    loc: string;
    priority: number;
    changefreq: "monthly";
    lastmod?: string;
    alternates: Array<{ hreflang: string; href: string }>;
  }> = [];

  try {
    const projects = await fetchProjects();
    console.info("[sitemap] Projects API success", {
      count: projects.length,
      slugs: projects.slice(0, 20).map(project => project.slug),
    });

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

  console.info("[sitemap] Project entries built", {
    count: projectEntries.length,
    preview: projectEntries.slice(0, 12).map(entry => entry.loc),
  });

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

  const debugComment = [
    "sitemap-debug",
    `pathname=${ev.url.pathname}`,
    `routePlanIsArray=${Array.isArray(routes)}`,
    `routePlanLength=${Array.isArray(routes) ? routes.length : -1}`,
    `discoveredRoutes=${discoveredRoutes.length}`,
    `normalizedRoutes=${normalizedRoutes.length}`,
    `localizedEntries=${localizedEntries.length}`,
    `projectEntries=${projectEntries.length}`,
    `totalEntries=${sitemapEntries.length}`,
    `normalizedPreview=${normalizedRoutes.slice(0, 10).join(",") || "none"}`,
    `projectPreview=${projectEntries
      .slice(0, 5)
      .map(entry => entry.loc)
      .join(",") || "none"}`,
  ]
    .map(escapeXmlComment)
    .join(" | ");

  const xml = `<!-- ${debugComment} -->\n${createSitemap(sitemapEntries)}`;

  console.info("[sitemap] Final sitemap state", {
    totalEntries: sitemapEntries.length,
    xmlLength: xml.length,
    xmlPreview: xml.slice(0, 500),
  });

  const response = new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "text/xml",
      "X-Sitemap-Debug-Entries": String(sitemapEntries.length),
      "X-Sitemap-Debug-Static": String(localizedEntries.length),
      "X-Sitemap-Debug-Projects": String(projectEntries.length),
    },
  });

  ev.send(response);
};
