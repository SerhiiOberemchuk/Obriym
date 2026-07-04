import type { RequestHandler } from "@builder.io/qwik-city";
import { routes } from "@qwik-city-plan";
import { fetchProjects } from "~/utils/projects";
import { SEO_LOCALES, getLocalizedPath } from "~/utils/seo";
import { createSitemap, type SitemapEntry } from "./create-sitemap";

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
  "/legal-information": 0.3,
};

type QwikCityRoute = [routeName: string, loaders: unknown, pathname?: string];

const SITE_ENDPOINTS = new Set(["/robots.txt", "/sitemap.xml", "/dynamic-sitemap.xml"]);
const DYNAMIC_ROUTE_SEGMENT = /\[[^\]]+\]/;
const LOCALE_ROUTE_PREFIX = /^\/\[\.\.\.lang\](?=\/|$)/;

const normalizeRoutePath = (pathname: string) => {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "") || "/";
};

const toSitemapPath = (route: QwikCityRoute) => {
  const routePathname = route[2] ?? `/${route[0]}`;
  const normalizedPathname = normalizeRoutePath(routePathname);

  if (SITE_ENDPOINTS.has(normalizedPathname)) {
    return null;
  }

  const withoutLocale = normalizeRoutePath(normalizedPathname.replace(LOCALE_ROUTE_PREFIX, "") || "/");

  if (DYNAMIC_ROUTE_SEGMENT.test(withoutLocale)) {
    return null;
  }

  return withoutLocale;
};

const getStaticBaseRoutes = () =>
  Array.from(
    new Set(
      (routes as QwikCityRoute[])
        .map(toSitemapPath)
        .filter((pathname): pathname is string => pathname !== null),
    ),
  ).sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

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
  const staticEntries = getStaticBaseRoutes().flatMap(pathname =>
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
