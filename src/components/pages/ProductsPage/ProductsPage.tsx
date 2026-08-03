import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import styles from "./products-page.css?inline";

export type ProductPageKind = "overview" | "crm" | "tools";

const externalProductUrl = (product: "crm" | "tools", lang: string) => {
  const locale =
    lang === "uk-UA" ? "/uk" : lang === "it-IT" ? "/it" : product === "crm" ? "/en" : "";
  return product === "crm"
    ? `https://obriym-crm.com${locale}`
    : `https://tools.obriym.com${locale}`;
};

const toolPath = (path: string, lang: string) => {
  const locale = lang === "uk-UA" ? "/uk" : lang === "it-IT" ? "/it" : "";
  return `https://tools.obriym.com${locale}${path}`;
};

export default component$<{ kind: ProductPageKind }>(({ kind }) => {
  const t = inlineTranslate();
  const { lang } = useSpeakLocale();
  const getPath = localizePath();
  useStylesScoped$(styles);

  const productsPath = getPath("/products/", lang);
  const crmPath = getPath("/products/obriym-crm/", lang);
  const toolsPath = getPath("/products/obriym-tools/", lang);
  const contactPath = `${getPath("/", lang)}#contact`;
  const crmUrl = externalProductUrl("crm", lang);
  const toolsUrl = externalProductUrl("tools", lang);

  if (kind === "overview") {
    return (
      <section class="products-page">
        <div class="container">
          <div class="products-hero">
            <span class="products-eyebrow btn_body">
              {t("products.overview.eyebrow@@OBRIYM products")}
            </span>
            <h1 class="products-title">
              {t("products.overview.h1@@Digital products that turn busy work into growth")}
            </h1>
            <p class="products-lead">
              {t(
                "products.overview.lead@@We build practical software for sales teams and marketplace sellers — from the first product photo to the next customer order.",
              )}
            </p>
          </div>

          <div class="products-grid">
            <article class="product-card product-card--crm">
              <div class="product-card__content">
                <span class="product-kicker btn_body">
                  {t("products.overview.crm.kicker@@Sales & commerce")}
                </span>
                <h2>Obriym CRM</h2>
                <p class="product-card__description">
                  {t(
                    "products.overview.crm.description@@One role-aware workspace for leads, contacts, companies, deals, tasks, products, orders and retention.",
                  )}
                </p>
                <ul class="product-feature-list btn_body">
                  <li>
                    {t(
                      "products.overview.crm.feature1@@CRM pipeline and e-commerce backend together",
                    )}
                  </li>
                  <li>
                    {t(
                      "products.overview.crm.feature2@@Next actions, stale-record alerts and team ownership",
                    )}
                  </li>
                  <li>
                    {t(
                      "products.overview.crm.feature3@@Widget, REST API and platform integrations",
                    )}
                  </li>
                </ul>
              </div>
              <div class="product-card__footer product-actions">
                <a
                  class="product-button product-button--primary"
                  href={crmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("products.common.openProduct@@Open product")} ↗
                </a>
                <a class="product-button" href={crmPath}>
                  {t("products.common.learnMore@@Learn more")}
                </a>
              </div>
            </article>

            <article class="product-card product-card--tools">
              <div class="product-card__content">
                <span class="product-kicker btn_body">
                  {t("products.overview.tools.kicker@@Marketplace productivity")}
                </span>
                <h2>Obriym Tools</h2>
                <p class="product-card__description">
                  {t(
                    "products.overview.tools.description@@Free browser tools for resizing marketplace photos, converting supplier catalogs and preparing listings faster.",
                  )}
                </p>
                <ul class="product-feature-list btn_body">
                  <li>
                    {t(
                      "products.overview.tools.feature1@@Image presets for nine selling platforms",
                    )}
                  </li>
                  <li>
                    {t("products.overview.tools.feature2@@Batch processing for up to 50 photos")}
                  </li>
                  <li>
                    {t(
                      "products.overview.tools.feature3@@Standard processing stays in your browser",
                    )}
                  </li>
                </ul>
              </div>
              <div class="product-card__footer product-actions">
                <a
                  class="product-button product-button--primary"
                  href={toolsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("products.common.openProduct@@Open product")} ↗
                </a>
                <a class="product-button" href={toolsPath}>
                  {t("products.common.learnMore@@Learn more")}
                </a>
              </div>
            </article>
          </div>

          <section class="products-section">
            <h2 class="section-heading">
              {t("products.overview.flow.title@@One ecosystem for the whole commerce flow")}
            </h2>
            <p class="section-intro">
              {t(
                "products.overview.flow.lead@@Use focused utilities to prepare product data and images, then keep products, stock, orders and customer relationships organized in Obriym CRM.",
              )}
            </p>
            <div class="workflow-grid">
              {[1, 2, 3, 4].map(step => (
                <article class="workflow-card" key={step}>
                  <span class="workflow-card__number">0{step}</span>
                  <h3>{t(`products.overview.flow.step${step}.title`)}</h3>
                  <p>{t(`products.overview.flow.step${step}.text`)}</p>
                </article>
              ))}
            </div>
          </section>

          <section class="products-section promo-card">
            <div>
              <h2>
                {t("products.overview.cta.title@@Need a product built around your workflow?")}
              </h2>
              <p>
                {t(
                  "products.overview.cta.text@@OBRIYM also designs and develops custom web apps, e-commerce systems and integrations for growing businesses.",
                )}
              </p>
            </div>
            <a class="product-button product-button--primary" href={contactPath}>
              {t("products.overview.cta.button@@Discuss your idea")}
            </a>
          </section>
        </div>
      </section>
    );
  }

  if (kind === "crm") {
    return (
      <section class="products-page">
        <div class="container">
          <div class="products-hero">
            <span class="products-eyebrow btn_body">
              {t("products.crm.eyebrow@@Obriym CRM · customer flow workspace")}
            </span>
            <h1 class="products-title">
              {t("products.crm.h1@@CRM and e-commerce in one workspace")}
            </h1>
            <p class="products-lead">
              {t(
                "products.crm.lead@@Manage every step from first lead to loyal customer with shared sales, catalog, order and retention context.",
              )}
            </p>
            <div class="product-tags btn_body">
              <span class="product-tag">{t("products.crm.tag1@@B2B sales")}</span>
              <span class="product-tag">{t("products.crm.tag2@@E-commerce operations")}</span>
              <span class="product-tag">{t("products.crm.tag3@@Role-aware workspace")}</span>
            </div>
            <div class="product-actions">
              <a
                class="product-button product-button--primary"
                href={crmUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("products.crm.cta@@Start for free")} ↗
              </a>
              <a class="product-button" href={contactPath}>
                {t("products.common.contact@@Talk to OBRIYM")}
              </a>
            </div>
          </div>

          <section class="products-section">
            <h2 class="section-heading">
              {t("products.crm.why.title@@Built around the habits that move revenue")}
            </h2>
            <div class="value-grid">
              {[1, 2, 3].map(item => (
                <article class="value-card" key={item}>
                  <span class="value-card__number">0{item}</span>
                  <h3>{t(`products.crm.why.item${item}.title`)}</h3>
                  <p>{t(`products.crm.why.item${item}.text`)}</p>
                </article>
              ))}
            </div>
          </section>

          <section class="products-section">
            <h2 class="section-heading">
              {t("products.crm.workflow.title@@From lead capture to repeat purchase")}
            </h2>
            <p class="section-intro">
              {t(
                "products.crm.workflow.lead@@A single customer flow connects pipeline work with the commercial reality behind every order.",
              )}
            </p>
            <div class="workflow-grid">
              {[1, 2, 3, 4].map(step => (
                <article class="workflow-card" key={step}>
                  <span class="workflow-card__number">0{step}</span>
                  <h3>{t(`products.crm.workflow.step${step}.title`)}</h3>
                  <p>{t(`products.crm.workflow.step${step}.text`)}</p>
                </article>
              ))}
            </div>
          </section>

          <section class="products-section promo-card">
            <div>
              <h2>{t("products.crm.toolsPromo.title@@Preparing marketplace content first?")}</h2>
              <p>
                {t(
                  "products.crm.toolsPromo.text@@Use Obriym Tools to resize listing photos and convert supplier data, then manage products and orders in the CRM.",
                )}
              </p>
            </div>
            <a class="product-button" href={toolsPath}>
              {t("products.crm.toolsPromo.button@@Explore Obriym Tools")}
            </a>
          </section>

          <section class="products-section">
            <h2 class="section-heading">
              {t("products.crm.faq.title@@Questions about Obriym CRM")}
            </h2>
            <dl class="faq-list">
              {[1, 2].map(item => (
                <div class="faq-card" key={item}>
                  <dt>{t(`products.crm.faq.item${item}.q`)}</dt>
                  <dd>{t(`products.crm.faq.item${item}.a`)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <nav
            class="related-links btn_body"
            aria-label={t("products.common.related@@Related pages")}
          >
            <span>{t("products.common.related@@Related pages")}:</span>
            <a href={productsPath}>{t("products.common.allProducts@@All products")}</a>
            <a href={getPath("/ecommerce-development/", lang)}>
              {t("products.common.ecommerce@@E-commerce development")}
            </a>
            <a href={getPath("/web-development/", lang)}>
              {t("products.common.webdev@@Web development")}
            </a>
          </nav>
        </div>
      </section>
    );
  }

  const tools = [
    ["Vinted", "/vinted-image-resizer", "1080 × 1350"],
    ["Depop", "/depop-image-resizer", "1280 × 1280"],
    ["eBay", "/ebay-image-resizer", "1600 px"],
    ["Etsy", "/etsy-image-resizer", "2000 × 2000"],
    ["Amazon", "/amazon-image-resizer", "2000 × 2000"],
    ["OLX", "/olx-image-resizer", "Marketplace ready"],
  ];

  return (
    <section class="products-page">
      <div class="container">
        <div class="products-hero">
          <span class="products-eyebrow btn_body">
            {t("products.tools.eyebrow@@Obriym Tools · marketplace productivity")}
          </span>
          <h1 class="products-title">
            {t("products.tools.h1@@Free tools for marketplace sellers")}
          </h1>
          <p class="products-lead">
            {t(
              "products.tools.lead@@Prepare product photos and supplier price lists in your browser, with ready-made formats for the platforms where you sell.",
            )}
          </p>
          <div class="product-actions">
            <a
              class="product-button product-button--primary"
              href={toolsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("products.tools.cta@@Use the tools for free")} ↗
            </a>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <strong>9</strong>
            <span>{t("products.tools.stats.platforms@@platforms covered")}</span>
          </div>
          <div class="stat-card">
            <strong>50</strong>
            <span>{t("products.tools.stats.batch@@photos per batch")}</span>
          </div>
          <div class="stat-card">
            <strong>€0</strong>
            <span>{t("products.tools.stats.price@@standard tools")}</span>
          </div>
          <div class="stat-card">
            <strong>0</strong>
            <span>{t("products.tools.stats.uploaded@@files uploaded in Standard mode")}</span>
          </div>
        </div>

        <section class="products-section">
          <h2 class="section-heading">
            {t("products.tools.marketplaces.title@@Resize a complete listing in one pass")}
          </h2>
          <p class="section-intro">
            {t(
              "products.tools.marketplaces.lead@@Choose a marketplace preset instead of checking dimensions, ratios and upload limits every time.",
            )}
          </p>
          <div class="tool-grid">
            {tools.map(([name, path, size]) => (
              <article class="tool-card" key={name}>
                <span class="product-kicker btn_body">{size}</span>
                <h3>
                  {name} {t("products.tools.marketplaces.resizer@@image resizer")}
                </h3>
                <p>
                  {t(
                    "products.tools.marketplaces.cardText@@Batch-ready product photos sized for a cleaner, faster listing workflow.",
                  )}
                </p>
                <a href={toolPath(path, lang)} target="_blank" rel="noopener noreferrer">
                  {t("products.tools.marketplaces.open@@Open tool")} ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section class="products-section">
          <h2 class="section-heading">
            {t("products.tools.more.title@@More than image resizing")}
          </h2>
          <div class="value-grid">
            {[1, 2, 3].map(item => (
              <article class="value-card" key={item}>
                <span class="value-card__number">0{item}</span>
                <h3>{t(`products.tools.more.item${item}.title`)}</h3>
                <p>{t(`products.tools.more.item${item}.text`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section class="products-section promo-card">
          <div>
            <h2>
              {t("products.tools.crmPromo.title@@Ready to organize products, stock and orders?")}
            </h2>
            <p>
              {t(
                "products.tools.crmPromo.text@@Move from listing preparation to day-to-day sales operations with Obriym CRM — the shared workspace for customer flow and commerce.",
              )}
            </p>
          </div>
          <a class="product-button" href={crmPath}>
            {t("products.tools.crmPromo.button@@Explore Obriym CRM")}
          </a>
        </section>

        <section class="products-section">
          <h2 class="section-heading">
            {t("products.tools.faq.title@@Questions about Obriym Tools")}
          </h2>
          <dl class="faq-list">
            {[1, 2].map(item => (
              <div class="faq-card" key={item}>
                <dt>{t(`products.tools.faq.item${item}.q`)}</dt>
                <dd>{t(`products.tools.faq.item${item}.a`)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav
          class="related-links btn_body"
          aria-label={t("products.common.related@@Related pages")}
        >
          <span>{t("products.common.related@@Related pages")}:</span>
          <a href={productsPath}>{t("products.common.allProducts@@All products")}</a>
          <a href={getPath("/ecommerce-development/", lang)}>
            {t("products.common.ecommerce@@E-commerce development")}
          </a>
          <a href={getPath("/seo-optimization/", lang)}>
            {t("products.common.seo@@SEO optimization")}
          </a>
        </nav>
      </div>
    </section>
  );
});
