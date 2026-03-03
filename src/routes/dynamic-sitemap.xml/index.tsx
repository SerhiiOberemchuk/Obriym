import { RequestHandler } from "@qwik.dev/router";
import { routes } from "@qwik-router-config";
import { createSitemap } from "./create-sitemap";
const speackRoute = ["", "/uk-UA", "/it-IT"];

export const onGet: RequestHandler = ev => {
  const filteredRoutes = speackRoute.map(lang => {
    return routes
      .map(([route]) => {
        let dynamicRoute = route.replace("[...lang]", lang);

        if (dynamicRoute === lang) {
          dynamicRoute = dynamicRoute + "/";
        }
        return dynamicRoute;
      })
      .filter(route => !route.startsWith("dynamic"));
  });
  const routesWithLang = [...new Set(filteredRoutes.flat())];

  const sitemap = createSitemap([
    ...routesWithLang.map(route => {
      if (route === "/") {
        return {
          loc: "",
          priority: 1,
        };
      } else
        return {
          loc: route,
          priority: 0.9,
        };
    }),
  ]);

  const response = new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
};
