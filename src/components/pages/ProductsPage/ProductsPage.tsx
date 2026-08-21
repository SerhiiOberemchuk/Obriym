import { useLocale, useTranslations } from "next-intl";
import { Link, homeSectionHref } from "~/i18n/navigation";
import type { Locale } from "~/i18n/routing";
import styles from "./products-page.module.css";

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

export default function ProductsPage({ kind }: { kind: ProductPageKind }) {
  const t = useTranslations();
  const lang = useLocale();

  const productsPath = "/products/";
  const crmPath = "/products/obriym-crm/";
  const toolsPath = "/products/obriym-tools/";
  const contactPath = homeSectionHref("contact", lang as Locale);
  const crmUrl = externalProductUrl("crm", lang);
  const toolsUrl = externalProductUrl("tools", lang);

  if (kind === "overview") {
    return (
      <section className={styles["products-page"]}>
        <div className="container">
          <div className={styles["products-hero"]}>
            <span className={`${styles["products-eyebrow"]} btn_body`}>
              {t("products.overview.eyebrow")}
            </span>
            <h1 className={styles["products-title"]}>{t("products.overview.h1")}</h1>
            <p className={styles["products-lead"]}>{t("products.overview.lead")}</p>
          </div>

          <div className={styles["products-grid"]}>
            <article className={`${styles["product-card"]} ${styles["product-card--crm"]}`}>
              <div className={styles["product-card__content"]}>
                <span className={`${styles["product-kicker"]} btn_body`}>
                  {t("products.overview.crm.kicker")}
                </span>
                <h2>Obriym CRM</h2>
                <p className={styles["product-card__description"]}>
                  {t("products.overview.crm.description")}
                </p>
                <ul className={`${styles["product-feature-list"]} btn_body`}>
                  <li>{t("products.overview.crm.feature1")}</li>
                  <li>{t("products.overview.crm.feature2")}</li>
                  <li>{t("products.overview.crm.feature3")}</li>
                </ul>
              </div>
              <div className={`${styles["product-card__footer"]} ${styles["product-actions"]}`}>
                <a
                  className={`${styles["product-button"]} ${styles["product-button--primary"]}`}
                  href={crmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("products.common.openProduct")} ↗
                </a>
                <Link className={styles["product-button"]} href={crmPath}>
                  {t("products.common.learnMore")}
                </Link>
              </div>
            </article>

            <article className={`${styles["product-card"]} ${styles["product-card--tools"]}`}>
              <div className={styles["product-card__content"]}>
                <span className={`${styles["product-kicker"]} btn_body`}>
                  {t("products.overview.tools.kicker")}
                </span>
                <h2>Obriym Tools</h2>
                <p className={styles["product-card__description"]}>
                  {t("products.overview.tools.description")}
                </p>
                <ul className={`${styles["product-feature-list"]} btn_body`}>
                  <li>{t("products.overview.tools.feature1")}</li>
                  <li>{t("products.overview.tools.feature2")}</li>
                  <li>{t("products.overview.tools.feature3")}</li>
                </ul>
              </div>
              <div className={`${styles["product-card__footer"]} ${styles["product-actions"]}`}>
                <a
                  className={`${styles["product-button"]} ${styles["product-button--primary"]}`}
                  href={toolsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("products.common.openProduct")} ↗
                </a>
                <Link className={styles["product-button"]} href={toolsPath}>
                  {t("products.common.learnMore")}
                </Link>
              </div>
            </article>
          </div>

          <section className={styles["products-section"]}>
            <h2 className={styles["section-heading"]}>{t("products.overview.flow.title")}</h2>
            <p className={styles["section-intro"]}>{t("products.overview.flow.lead")}</p>
            <div className={styles["workflow-grid"]}>
              {[1, 2, 3, 4].map(step => (
                <article className={styles["workflow-card"]} key={step}>
                  <span className={styles["workflow-card__number"]}>0{step}</span>
                  <h3>{t(`products.overview.flow.step${step}.title`)}</h3>
                  <p>{t(`products.overview.flow.step${step}.text`)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles["products-section"]} ${styles["promo-card"]}`}>
            <div>
              <h2>{t("products.overview.cta.title")}</h2>
              <p>{t("products.overview.cta.text")}</p>
            </div>
            <a
              className={`${styles["product-button"]} ${styles["product-button--primary"]}`}
              href={contactPath}
            >
              {t("products.overview.cta.button")}
            </a>
          </section>
        </div>
      </section>
    );
  }

  if (kind === "crm") {
    return (
      <section className={styles["products-page"]}>
        <div className="container">
          <div className={styles["products-hero"]}>
            <span className={`${styles["products-eyebrow"]} btn_body`}>
              {t("products.crm.eyebrow")}
            </span>
            <h1 className={styles["products-title"]}>{t("products.crm.h1")}</h1>
            <p className={styles["products-lead"]}>{t("products.crm.lead")}</p>
            <div className={`${styles["product-tags"]} btn_body`}>
              <span className={styles["product-tag"]}>{t("products.crm.tag1")}</span>
              <span className={styles["product-tag"]}>{t("products.crm.tag2")}</span>
              <span className={styles["product-tag"]}>{t("products.crm.tag3")}</span>
            </div>
            <div className={styles["product-actions"]}>
              <a
                className={`${styles["product-button"]} ${styles["product-button--primary"]}`}
                href={crmUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("products.crm.cta")} ↗
              </a>
              <a className={styles["product-button"]} href={contactPath}>
                {t("products.common.contact")}
              </a>
            </div>
          </div>

          <section className={styles["products-section"]}>
            <h2 className={styles["section-heading"]}>{t("products.crm.why.title")}</h2>
            <div className={styles["value-grid"]}>
              {[1, 2, 3].map(item => (
                <article className={styles["value-card"]} key={item}>
                  <span className={styles["value-card__number"]}>0{item}</span>
                  <h3>{t(`products.crm.why.item${item}.title`)}</h3>
                  <p>{t(`products.crm.why.item${item}.text`)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles["products-section"]}>
            <h2 className={styles["section-heading"]}>{t("products.crm.workflow.title")}</h2>
            <p className={styles["section-intro"]}>{t("products.crm.workflow.lead")}</p>
            <div className={styles["workflow-grid"]}>
              {[1, 2, 3, 4].map(step => (
                <article className={styles["workflow-card"]} key={step}>
                  <span className={styles["workflow-card__number"]}>0{step}</span>
                  <h3>{t(`products.crm.workflow.step${step}.title`)}</h3>
                  <p>{t(`products.crm.workflow.step${step}.text`)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles["products-section"]} ${styles["promo-card"]}`}>
            <div>
              <h2>{t("products.crm.toolsPromo.title")}</h2>
              <p>{t("products.crm.toolsPromo.text")}</p>
            </div>
            <Link className={styles["product-button"]} href={toolsPath}>
              {t("products.crm.toolsPromo.button")}
            </Link>
          </section>

          <section className={styles["products-section"]}>
            <h2 className={styles["section-heading"]}>{t("products.crm.faq.title")}</h2>
            <dl className={styles["faq-list"]}>
              {[1, 2].map(item => (
                <div className={styles["faq-card"]} key={item}>
                  <dt>{t(`products.crm.faq.item${item}.q`)}</dt>
                  <dd>{t(`products.crm.faq.item${item}.a`)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <nav
            className={`${styles["related-links"]} btn_body`}
            aria-label={t("products.common.related")}
          >
            <span>{t("products.common.related")}:</span>
            <Link href={productsPath}>{t("products.common.allProducts")}</Link>
            <Link href="/ecommerce-development/">{t("products.common.ecommerce")}</Link>
            <Link href="/web-development/">{t("products.common.webdev")}</Link>
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
    <section className={styles["products-page"]}>
      <div className="container">
        <div className={styles["products-hero"]}>
          <span className={`${styles["products-eyebrow"]} btn_body`}>
            {t("products.tools.eyebrow")}
          </span>
          <h1 className={styles["products-title"]}>{t("products.tools.h1")}</h1>
          <p className={styles["products-lead"]}>{t("products.tools.lead")}</p>
          <div className={styles["product-actions"]}>
            <a
              className={`${styles["product-button"]} ${styles["product-button--primary"]}`}
              href={toolsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("products.tools.cta")} ↗
            </a>
          </div>
        </div>

        <div className={styles["stats-grid"]}>
          <div className={styles["stat-card"]}>
            <strong>9</strong>
            <span>{t("products.tools.stats.platforms")}</span>
          </div>
          <div className={styles["stat-card"]}>
            <strong>50</strong>
            <span>{t("products.tools.stats.batch")}</span>
          </div>
          <div className={styles["stat-card"]}>
            <strong>€0</strong>
            <span>{t("products.tools.stats.price")}</span>
          </div>
          <div className={styles["stat-card"]}>
            <strong>0</strong>
            <span>{t("products.tools.stats.uploaded")}</span>
          </div>
        </div>

        <section className={styles["products-section"]}>
          <h2 className={styles["section-heading"]}>{t("products.tools.marketplaces.title")}</h2>
          <p className={styles["section-intro"]}>{t("products.tools.marketplaces.lead")}</p>
          <div className={styles["tool-grid"]}>
            {tools.map(([name, path, size]) => (
              <article className={styles["tool-card"]} key={name}>
                <span className={`${styles["product-kicker"]} btn_body`}>{size}</span>
                <h3>
                  {name} {t("products.tools.marketplaces.resizer")}
                </h3>
                <p>{t("products.tools.marketplaces.cardText")}</p>
                <a href={toolPath(path, lang)} target="_blank" rel="noopener noreferrer">
                  {t("products.tools.marketplaces.open")} ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles["products-section"]}>
          <h2 className={styles["section-heading"]}>{t("products.tools.more.title")}</h2>
          <div className={styles["value-grid"]}>
            {[1, 2, 3].map(item => (
              <article className={styles["value-card"]} key={item}>
                <span className={styles["value-card__number"]}>0{item}</span>
                <h3>{t(`products.tools.more.item${item}.title`)}</h3>
                <p>{t(`products.tools.more.item${item}.text`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles["products-section"]} ${styles["promo-card"]}`}>
          <div>
            <h2>{t("products.tools.crmPromo.title")}</h2>
            <p>{t("products.tools.crmPromo.text")}</p>
          </div>
          <Link className={styles["product-button"]} href={crmPath}>
            {t("products.tools.crmPromo.button")}
          </Link>
        </section>

        <section className={styles["products-section"]}>
          <h2 className={styles["section-heading"]}>{t("products.tools.faq.title")}</h2>
          <dl className={styles["faq-list"]}>
            {[1, 2].map(item => (
              <div className={styles["faq-card"]} key={item}>
                <dt>{t(`products.tools.faq.item${item}.q`)}</dt>
                <dd>{t(`products.tools.faq.item${item}.a`)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav
          className={`${styles["related-links"]} btn_body`}
          aria-label={t("products.common.related")}
        >
          <span>{t("products.common.related")}:</span>
          <Link href={productsPath}>{t("products.common.allProducts")}</Link>
          <Link href="/ecommerce-development/">{t("products.common.ecommerce")}</Link>
          <Link href="/crm-development/">{t("navigation.crmDevelopment")}</Link>
        </nav>
      </div>
    </section>
  );
}
