import { RequestHandler } from "@builder.io/qwik-city";
import { routes } from "@qwik-city-plan";
import { createSitemap } from "./create-sitemap";

const localePrefixes = ["", "/uk-UA", "/it-IT"];

export const onGet: RequestHandler = ev => {
  const staticRoutes = routes
    .map(([, , routePath]) => routePath)
    .filter(routePath => routePath !== "/sitemap.xml");

  const localizedRoutes = localePrefixes.flatMap(localePrefix =>
    staticRoutes.map(routePath => {
      const localizedRoute = routePath.replace("/[...lang]", localePrefix).replace(/\/{2,}/g, "/");
      return localizedRoute || "/";
    }),
  );

  const routesWithLang = [...new Set(localizedRoutes)];

  const sitemap = createSitemap(
    routesWithLang.map(route => ({
      loc: route === "/" ? "" : route,
      priority: route === "/" ? 1 : 0.9,
    })),
  );

  const response = new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
};
