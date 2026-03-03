import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { inlineTranslate, localizePath } from "qwik-speak";

import styles from "./service-page.css?inline";
import type { ServicePageEntry } from "~/routes/[...lang]/services/service-pages.data";

interface ServicePageTemplateProps {
  service: ServicePageEntry;
  services: ServicePageEntry[];
}

export default component$(({ service, services }: ServicePageTemplateProps) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const getPath = localizePath();
  const [contactPath] = getPath(["/#contact"]);
  const [servicesPath] = getPath(["/services/"]);
  const [faqPath] = getPath(["/faq/"]);

  const relatedServices = services.filter(item => item.slug !== service.slug).slice(0, 4);

  return (
    <article class="service-page">
      <section class="service-hero">
        <div class="container">
          <p class="btn_header service-kicker">
            {t("services.page.kicker@@Specialized service page")}
          </p>
          <h1 class="H3_uppercase service-title">{service.h1}</h1>
          <p class="btn_body service-lead">{service.lead}</p>
          <div class="service-actions">
            <Link href={contactPath} class="service-action service-action-primary btn_body">
              {t("services.page.cta.start@@Start your project")}
            </Link>
            <Link href={servicesPath} class="service-action service-action-secondary btn_body">
              {t("services.page.cta.all@@All service pages")}
            </Link>
          </div>
        </div>
      </section>

      <section class="service-content">
        <div class="container service-grid">
          <section class="service-block">
            <h2 class="H5 service-block-title">{t("services.page.block.deliverables@@What you get")}</h2>
            <ul class="service-list">
              {service.deliverables.map((item, index) => (
                <li key={`deliverable-${index}`} class="service-list-item btn_body">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section class="service-block">
            <h2 class="H5 service-block-title">{t("services.page.block.process@@How we work")}</h2>
            <ol class="service-list">
              {service.process.map((item, index) => (
                <li key={`step-${index}`} class="service-list-item btn_body">
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <section class="service-block service-block-wide">
            <h2 class="H5 service-block-title">
              {t("services.page.block.faq@@Frequently asked questions")}
            </h2>
            <div class="service-faq">
              {service.faqs.map((faq, index) => (
                <details key={`faq-${index}`} class="service-faq-item">
                  <summary class="btn_body service-faq-question">{faq.question}</summary>
                  <p class="btn_body service-faq-answer">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section class="service-block service-block-wide">
            <h2 class="H5 service-block-title">{t("services.page.block.related@@Related services")}</h2>
            <ul class="service-related-list">
              {relatedServices.map(item => {
                const [servicePath] = getPath([`/services/${item.slug}/`]);
                return (
                  <li key={item.slug}>
                    <Link href={servicePath} class="service-related-link btn_body">
                      {item.navLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p class="btn_body service-support-links">
              <Link href={faqPath}>{t("services.page.support.faq@@Read FAQ")}</Link>
              <span aria-hidden="true"> · </span>
              <Link href={contactPath}>{t("services.page.support.contact@@Request estimate")}</Link>
            </p>
          </section>
        </div>
      </section>
    </article>
  );
});
