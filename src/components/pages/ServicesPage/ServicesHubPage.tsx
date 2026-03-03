import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { inlineTranslate, localizePath } from "qwik-speak";

import styles from "./services-hub.css?inline";
import type { ServicePageEntry } from "~/routes/[...lang]/services/service-pages.data";

interface ServicesHubPageProps {
  services: ServicePageEntry[];
}

export default component$(({ services }: ServicesHubPageProps) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const getPath = localizePath();
  const [contactPath] = getPath(["/#contact"]);
  const [teamPath] = getPath(["/team/"]);

  return (
    <article class="services-hub-page">
      <section class="services-hub-hero">
        <div class="container">
          <p class="btn_header services-hub-kicker">{t("services.hub.kicker@@Services directory")}</p>
          <h1 class="H3_uppercase services-hub-title">
            {t("services.hub.title@@Website, web app, UX UI, SEO and branding services")}
          </h1>
          <p class="btn_body services-hub-lead">
            {t(
              "services.hub.lead@@Choose a dedicated service page based on your current goal: launch, redesign, improve performance, or scale product delivery.",
            )}
          </p>
        </div>
      </section>

      <section class="services-hub-content">
        <div class="container">
          <ul class="services-hub-list" aria-label={t("services.hub.list@@Service pages list")}>
            {services.map(service => {
              const [servicePath] = getPath([`/services/${service.slug}/`]);
              return (
                <li key={service.slug} class="services-hub-card">
                  <h2 class="H5 services-hub-card-title">{service.navLabel}</h2>
                  <p class="btn_body services-hub-card-text">{service.lead}</p>
                  <Link href={servicePath} class="services-hub-card-link btn_body">
                    {t("services.hub.card.open@@Open service page")}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p class="btn_body services-hub-links">
            <Link href={teamPath}>{t("services.hub.links.team@@Meet the team")}</Link>
            <span aria-hidden="true"> · </span>
            <Link href={contactPath}>{t("services.hub.links.contact@@Request project estimate")}</Link>
          </p>
        </div>
      </section>
    </article>
  );
});
