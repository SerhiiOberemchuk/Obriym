import { getTranslations } from "next-intl/server";
import { Link, homeSectionHref } from "~/i18n/navigation";
import type { Locale } from "~/i18n/routing";
import JsonLd from "~/components/common/json-ld/JsonLd";
import type { Href } from "~/lib/seo";
import { buildBreadcrumbList, buildFaqSchema, buildServiceSchema } from "~/lib/structuredData";
import styles from "./service-page.module.css";

/** The four commercial services, each backed by its own message namespace. */
export const SERVICES = {
  webDevelopment: { namespace: "webDevelopment", href: "/web-development/" },
  ecommerceDevelopment: { namespace: "ecommerceDevelopment", href: "/ecommerce-development/" },
  crmDevelopment: { namespace: "crmDevelopment", href: "/crm-development/" },
  saasDevelopment: { namespace: "saasDevelopment", href: "/saas-development/" },
} as const;

export type ServiceKey = keyof typeof SERVICES;

/** Navigation labels, so the cross-links between services stay in one place. */
const SERVICE_NAV_KEY: Record<ServiceKey, string> = {
  webDevelopment: "navigation.webDevelopment",
  ecommerceDevelopment: "navigation.ecommerceDevelopment",
  crmDevelopment: "navigation.crmDevelopment",
  saasDevelopment: "navigation.saasDevelopment",
};

type ProcessStep = { title: string; text: string };
type FaqItem = { q: string; a: string };

type Props = {
  service: ServiceKey;
  locale: Locale;
};

export default async function ServicePage({ service, locale }: Props) {
  const { namespace, href } = SERVICES[service];
  const t = await getTranslations({ locale, namespace });
  const tShared = await getTranslations({ locale });

  const offerItems = t.raw("offer.items") as string[];
  const audienceItems = t.raw("audience.items") as string[];
  const processSteps = t.raw("process.steps") as ProcessStep[];
  const outcomeItems = t.raw("outcomes.items") as string[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  const otherServices = (Object.keys(SERVICES) as ServiceKey[]).filter(key => key !== service);
  const description = t("meta.description");

  return (
    <section className={styles.service}>
      <div className="container">
        <header className={styles.intro}>
          <h1 className="H1_extra_light">{t("h1")}</h1>
          <p className={`body_big grey ${styles.lead}`}>{t("lead")}</p>
          <p className={`btn_body grey ${styles.text}`}>{t("intro")}</p>
          <a href={homeSectionHref("contact", locale)} className={`btn_body ${styles.cta}`}>
            {t("cta")}
          </a>
        </header>

        <div className={styles.block}>
          <h2 className="H4 black">{t("offer.title")}</h2>
          <ul className={`btn_body grey ${styles.list}`}>
            {offerItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h2 className="H4 black">{t("audience.title")}</h2>
          <ul className={`btn_body grey ${styles.list}`}>
            {audienceItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h2 className="H4 black">{t("process.title")}</h2>
          <ol className={styles.steps}>
            {processSteps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={`H5 ${styles.step_number}`} aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="H5 black">{step.title}</h3>
                <p className={`btn_body grey ${styles.text}`}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.block}>
          <h2 className="H4 black">{t("outcomes.title")}</h2>
          <p className={`btn_body grey ${styles.text}`}>{t("outcomes.text")}</p>
          <ul className={`btn_body grey ${styles.list}`}>
            {outcomeItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h2 className="H4 black">{t("stack.title")}</h2>
          <p className={`btn_body grey ${styles.text}`}>{t("stack.text")}</p>
        </div>

        <div className={styles.block}>
          <h2 className="H4 black">{t("faq.title")}</h2>
          <dl className={styles.faq}>
            {faqItems.map(item => (
              <div key={item.q} className={styles.faq_item}>
                <dt className="H6 black">{item.q}</dt>
                <dd className={`btn_body grey ${styles.text}`}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav className={styles.related} aria-label={t("links.title")}>
          <h2 className="H5 black">{t("links.title")}</h2>
          <ul className={`btn_body ${styles.related_list}`}>
            {otherServices.map(key => (
              <li key={key}>
                <Link href={SERVICES[key].href}>{tShared(SERVICE_NAV_KEY[key])}</Link>
              </li>
            ))}
            <li>
              <Link href="/projects/">{tShared("navigation.portfolio")}</Link>
            </li>
            <li>
              <Link href="/products/">{tShared("navigation.products")}</Link>
            </li>
            <li>
              <Link href="/faq/">FAQ</Link>
            </li>
          </ul>
        </nav>

        <a href={homeSectionHref("contact", locale)} className={`btn_body ${styles.cta}`}>
          {t("cta")}
        </a>
      </div>

      <JsonLd
        id="schema-service"
        data={buildServiceSchema(
          {
            name: t("schema.name"),
            description,
            href,
            serviceType: t("schema.serviceType"),
          },
          locale,
        )}
      />
      <JsonLd
        id="schema-breadcrumb"
        data={buildBreadcrumbList(
          [
            { name: tShared("breadcrumb.home"), href: "/" },
            { name: t("schema.name"), href },
          ],
          locale,
        )}
      />
      <JsonLd id="schema-faq" data={buildFaqSchema(faqItems)} />
    </section>
  );
}

/** Shared by every service route so the metadata stays consistent. */
export const buildServiceMetadataInput = async (service: ServiceKey, locale: Locale) => {
  const { namespace, href } = SERVICES[service];
  const t = await getTranslations({ locale, namespace });

  return {
    title: t("meta.title", { name: "OBRIYM" }),
    description: t("meta.description"),
    href: href as Href,
    locale,
  };
};
