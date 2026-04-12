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
          {t("seo.ecom.h1@@E-commerce Development Services for Growth-Focused Stores")}
        </h1>
        <p class="body_big grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.ecom.lead@@We build ecommerce experiences on Shopify and custom stacks with high performance, SEO-ready category structure and conversion-driven UX.",
          )}
        </p>
        <p class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.ecom.intro2@@Our focus is long-term store growth: better product discoverability, cleaner checkout flow and analytics you can trust for scaling decisions.",
          )}
        </p>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.ecom.h2.delivery@@What we deliver")}
        </h2>
        <ul class="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.ecom.p1@@Product and category SEO architecture with scalable URL strategy.")}</li>
          <li>{t("seo.ecom.p2@@Checkout, payments and analytics integrations for clean attribution.")}</li>
          <li>{t("seo.ecom.p3@@Performance-first storefronts with optimized media and low JS overhead.")}</li>
        </ul>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.ecom.h2.value@@Why it matters")}
        </h2>
        <p class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t(
            "seo.ecom.value@@A technically strong ecommerce stack improves crawlability, product discoverability and conversion consistency across paid and organic channels.",
          )}
        </p>
        <ul class="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.ecom.r1@@SEO-first taxonomy for scalable category and filter pages.")}</li>
          <li>{t("seo.ecom.r2@@Conversion-focused product and checkout journey.")}</li>
          <li>{t("seo.ecom.r3@@Tracking setup for revenue attribution and channel efficiency.")}</li>
        </ul>

        <h2 class="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.ecom.h2.faq@@Frequently asked questions")}
        </h2>
        <dl class="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          <dt>
            <strong>{t("seo.ecom.faq1.q@@Do you work with Shopify only?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.ecom.faq1.a@@No, we work with Shopify and custom storefronts when business logic or integrations require more flexibility.",
            )}
          </dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.ecom.faq2.q@@Can you migrate our current store?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.ecom.faq2.a@@Yes, we migrate catalog, content and key SEO signals while preserving URL logic and redirect integrity.",
            )}
          </dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.ecom.faq3.q@@Do you optimize for SEO and ads together?")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>
            {t(
              "seo.ecom.faq3.a@@Yes, we align technical SEO with conversion tracking so paid and organic channels support each other.",
            )}
          </dd>
        </dl>

        <p class="btn_body grey" style={{ marginTop: "1.2rem", maxWidth: "920px" }}>
          {t("seo.ecom.links.title@@Related pages:")}{" "}
          <Link href={getPath("/projects/", lang)}>
            {t("seo.ecom.links.projects@@Projects")}
          </Link>
          {" | "}
          <Link href={getPath("/seo-optimization/", lang)}>
            {t("seo.ecom.links.seo@@SEO Optimization")}
          </Link>
          {" | "}
          <Link href={getPath("/faq/", lang)}>{t("seo.ecom.links.faq@@FAQ")}</Link>
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
          {t("seo.ecom.cta@@Plan ecommerce build")}
        </Link>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t(
    "seo.ecom.head.title@@E-commerce Development Services | Shopify and custom storefronts | {{name}}",
    { name: "OBRIYM" },
  );
  const description = t(
    "seo.ecom.head.description@@E-commerce development for Shopify and custom storefronts with technical SEO, optimized checkout flows and Core Web Vitals performance.",
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
