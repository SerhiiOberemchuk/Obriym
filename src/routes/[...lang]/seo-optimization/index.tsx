import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import { DEFAULT_OG_IMAGE, getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

export default component$(() => {
  const t = inlineTranslate();
  const { lang } = useSpeakLocale();
  const getPath = localizePath();

  return (
    <section style={{ padding: "7rem 0 5rem" }}>
      <div class="container">
        <h1 class="H1_extra_light">
          {t("seo.optimization.h1@@SEO Optimization Services for Sustainable Organic Growth")}
        </h1>
        <p class="body_big grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.optimization.lead@@We improve rankings and lead quality through technical SEO, structured content architecture and measurable on-page optimization.",
          )}
        </p>
        <p class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.optimization.intro2@@Our SEO work is execution-first: we prioritize fixes by impact, implement changes and validate the result in Search Console and analytics.",
          )}
        </p>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.optimization.h2.scope@@Scope of work")}
        </h2>
        <ul class="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.optimization.p1@@Technical audits: indexability, canonicals, sitemap, robots and schema.")}</li>
          <li>{t("seo.optimization.p2@@On-page improvements: title, metadata, heading hierarchy and internal linking.")}</li>
          <li>{t("seo.optimization.p3@@Performance optimization for stronger Core Web Vitals.")}</li>
        </ul>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.optimization.h2.analytics@@Reporting and analytics")}
        </h2>
        <p class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.optimization.analytics@@We align Search Console, GA4 and conversion tracking to connect rankings with real pipeline impact.",
          )}
        </p>
        <ul class="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.optimization.r1@@Index coverage monitoring and crawl issue resolution.")}</li>
          <li>{t("seo.optimization.r2@@Landing-page level KPI tracking for leads and conversions.")}</li>
          <li>{t("seo.optimization.r3@@Monthly roadmap with prioritized implementation backlog.")}</li>
        </ul>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.optimization.h2.faq@@Frequently asked questions")}
        </h2>
        <dl class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          <dt>
            <strong>{t("seo.optimization.faq1.q@@When should we expect first SEO results?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.optimization.faq1.a@@You can typically see early movement in 4-8 weeks, while stronger growth usually requires a 3-6 month execution window.",
            )}
          </dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.optimization.faq2.q@@Do you only provide strategy or also implementation?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.optimization.faq2.a@@We do both: audit, prioritization, implementation and post-release validation.",
            )}
          </dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.optimization.faq3.q@@Can SEO be done without changing design?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.optimization.faq3.a@@In many cases yes, especially for technical SEO, metadata and information architecture; UX changes are proposed only when needed.",
            )}
          </dd>
        </dl>

        <p class="btn_body grey" style={{ marginTop: "1.2rem", maxWidth: "920px" }}>
          {t("seo.optimization.links.title@@Related pages:")}{" "}
          <a href={getPath("/web-development/", lang)}>
            {t("seo.optimization.links.webdev@@Web Development")}
          </a>
          {" | "}
          <a href={getPath("/projects/", lang)}>
            {t("seo.optimization.links.projects@@Projects")}
          </a>
          {" | "}
          <a href={getPath("/faq/", lang)}>{t("seo.optimization.links.faq@@FAQ")}</a>
        </p>

        <a
          href={`${getPath("/", lang)}#contact`}
          class="btn_body black"
          style={{
            display: "inline-flex",
            marginTop: "1.75rem",
            padding: "0.8rem 1.1rem",
            borderRadius: "999px",
            backgroundColor: "var(--pink)",
          }}
        >
          {t("seo.optimization.cta@@Request SEO audit")}
        </a>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("seo.optimization.head.title@@SEO Optimization Services | Technical and On-page SEO | {{name}}", {
    name: "OBRIYM",
  });
  const description = t(
    "seo.optimization.head.description@@Technical and on-page SEO services focused on indexability, Core Web Vitals, metadata quality and conversion-oriented organic traffic.",
  );
  const canonical = getCanonicalUrl(url.pathname);

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OBRIYM" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: getAlternateLinks(url.pathname),
  };
};
