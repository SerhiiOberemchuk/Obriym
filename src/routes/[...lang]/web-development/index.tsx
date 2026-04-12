import { component$ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";
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
          {t("seo.webdev.h1@@Web Development Services for Fast, SEO-Ready Business Websites")}
        </h1>
        <p class="body_big grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.webdev.lead@@We design and develop high-performance websites and web apps focused on search visibility, conversion growth and stable Core Web Vitals.",
          )}
        </p>
        <p class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.webdev.intro2@@We work with service companies, B2B teams and product startups that need predictable delivery, clear ownership and measurable business impact.",
          )}
        </p>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.webdev.h2.stack@@What we build")}
        </h2>
        <ul class="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.webdev.p1@@Corporate websites with multilingual structure and technical SEO.")}</li>
          <li>{t("seo.webdev.p2@@High-converting landing pages for paid and organic traffic.")}</li>
          <li>{t("seo.webdev.p3@@Web apps and portals with clean architecture and scalable delivery.")}</li>
        </ul>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.webdev.h2.result@@Business outcomes")}
        </h2>
        <p class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.webdev.result@@Our process is aimed at ranking growth, lower acquisition cost and stronger lead quality by combining technical SEO, content structure and UX clarity.",
          )}
        </p>
        <ul class="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.webdev.result1@@Discovery aligned with business goals and keyword intent clusters.")}</li>
          <li>{t("seo.webdev.result2@@Technical implementation optimized for crawlability and indexation.")}</li>
          <li>{t("seo.webdev.result3@@Content structure designed for conversion, not only traffic.")}</li>
        </ul>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.webdev.h2.faq@@Frequently asked questions")}
        </h2>
        <dl class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          <dt>
            <strong>{t("seo.webdev.faq1.q@@How long does a standard project take?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.webdev.faq1.a@@Most projects take 2-6 weeks depending on integrations, content readiness and approval cycles.",
            )}
          </dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.webdev.faq2.q@@Do you support multilingual websites?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.webdev.faq2.a@@Yes, we implement localized routing, hreflang and content architecture for international search visibility.",
            )}
          </dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.webdev.faq3.q@@Can you improve an existing website instead of rebuilding it?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.webdev.faq3.a@@Yes, we run a technical audit first and then choose between targeted improvements or full rebuild based on ROI.",
            )}
          </dd>
        </dl>

        <p class="btn_body grey" style={{ marginTop: "1.2rem", maxWidth: "920px" }}>
          {t("seo.webdev.links.title@@Related pages:")}{" "}
          <Link href={getPath("/projects/", lang)}>
            {t("seo.webdev.links.projects@@Projects")}
          </Link>
          {" | "}
          <Link href={getPath("/faq/", lang)}>{t("seo.webdev.links.faq@@FAQ")}</Link>
          {" | "}
          <Link href={getPath("/team/", lang)}>{t("seo.webdev.links.team@@Team")}</Link>
        </p>

        <Link
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
          {t("seo.webdev.cta@@Discuss your project")}
        </Link>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t(
    "seo.webdev.head.title@@Web Development Services | SEO-ready websites and web apps | {{name}}",
    { name: "OBRIYM" },
  );
  const description = t(
    "seo.webdev.head.description@@Web development agency delivering fast SEO-ready websites and web apps with technical SEO, multilingual support and strong Core Web Vitals.",
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
