import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import style from "./styles.css?inline";
import { routes } from "@qwik-city-plan";
import { createSitemap } from "./create-sitemap";

export const onGet: RequestHandler = (ev) => {
  const siteRoutes = routes
    .map(([route]) => route as string)
    .filter(route => route !== "/");  // Exclude the '/' route
 
  const sitemap = createSitemap([
    { loc: "/", priority: 1 },  // Manually include the root route
    ...siteRoutes.map((route) => ({
      loc: route,
      priority: 0.9,  // Default priority, adjust as needed
    })),
  ]);
 
  const response = new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
 
  ev.send(response);
};


export default component$(() => {
  useStylesScoped$(style)
  return (
    <section class="placeholder">
      <div class="container">
        <h1>OBRIYM Web Agency</h1>
        <p class="tagline">From first spark to full launch.</p>

        <div class="text-block">
          <p>
            <strong>OBRIYM</strong> — from insight to execution. We plan, design, develop, and launch products that make a real impact.
          </p>
          <p>
            We are a team of experienced professionals passionate about crafting innovative solutions to help businesses grow.
          </p>
        </div>

        <a href="mailto:serhiioberemchuk@gmail.com" class="email">
          serhiioberemchuk@gmail.com
        </a>

        <div class="status">🚧 Site under development</div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Obriym",
  meta: [
    {
      name: "description",
      content: "Obriym web agency - We create web products, mobile apps, and design solutions.",
    },
    { property: "og:title", content: "Welcome to Obriym Web Agency." },
    { property: "og:description", content: "Obriym web agency" },
    { property: "og:image", content: "/og-image.png" },
    { name: "twitter:title", content: "Welcome to Obriym" },
    { name: "twitter:description", content: "Obriym web agency" },
    { name: "twitter:image", content: "/og-image.png" },
  ],
};
