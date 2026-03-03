import { RequestHandler } from "@builder.io/qwik-city";
import { routes } from "@qwik-city-plan";
import { createSitemap } from "./create-sitemap";
import { SERVICE_PAGES } from "../[...lang]/services/service-pages.data";

const sitemapLocales = ["", "/uk-UA", "/it-IT"] as const;

const ensureLeadingSlash = (route: string) => (route.startsWith("/") ? route : `/${route}`);

const ensureTrailingSlash = (route: string) => (route.endsWith("/") ? route : `${route}/`);

const normalizeRoute = (route: string) => ensureTrailingSlash(ensureLeadingSlash(route));

const isIndexableRoute = (route: string) =>
  !route.startsWith("dynamic") && !route.includes("[") && !route.includes("]");

export const onGet: RequestHandler = ev => {
  const staticRoutes = sitemapLocales.flatMap(localePrefix =>
    routes
      .map(([route]) => {
        let localizedRoute = route.replace("[...lang]", localePrefix);

        if (localizedRoute === localePrefix) {
          localizedRoute = `${localizedRoute}/`;
        }

        return localizedRoute;
      })
      .filter(isIndexableRoute)
      .map(normalizeRoute),
  );

  const serviceRoutes = sitemapLocales.flatMap(localePrefix =>
    SERVICE_PAGES.map(service => normalizeRoute(`${localePrefix}/services/${service.slug}/`)),
  );

  const routesWithLang = [...new Set([...staticRoutes, ...serviceRoutes])];

  const sitemap = createSitemap([
    ...routesWithLang.map(route => {
      if (route === "/") {
        return {
          loc: "",
          priority: 1,
        };
      }

      return {
        loc: route,
        priority: route.includes("/services/") ? 0.8 : 0.9,
      };
    }),
  ]);

  const response = new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
};
