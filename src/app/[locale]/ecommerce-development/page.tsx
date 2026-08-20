import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "~/i18n/navigation";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import { buildServicePageSchemas } from "~/lib/structuredData";
import JsonLd from "~/components/common/json-ld/JsonLd";

type PageProps = { params: Promise<{ locale: string }> };

const PATHNAME = "/ecommerce-development/";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("seo.ecom.head.title", { name: "OBRIYM" }),
    description: t("seo.ecom.head.description"),
    pathname: PATHNAME,
    locale: locale as Locale,
  });
}

export default async function EcommerceDevelopmentPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const schemas = buildServicePageSchemas(
    {
      homeName: t("breadcrumb.home"),
      service: {
        name: t("seo.ecom.schema.name"),
        description: t("seo.ecom.head.description"),
        pathname: PATHNAME,
        serviceType: "E-commerce development",
      },
    },
    locale as Locale,
  );

  return (
    <section style={{ padding: "7rem 0 5rem" }}>
      <div className="container">
        <h1 className="H1_extra_light">{t("seo.ecom.h1")}</h1>
        <p className="body_big grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t("seo.ecom.lead")}
        </p>
        <p className="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t("seo.ecom.intro2")}
        </p>

        <h2 className="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.ecom.h2.delivery")}
        </h2>
        <ul className="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.ecom.p1")}</li>
          <li>{t("seo.ecom.p2")}</li>
          <li>{t("seo.ecom.p3")}</li>
        </ul>

        <h2 className="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.ecom.h2.value")}
        </h2>
        <p className="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t("seo.ecom.value")}
        </p>
        <ul className="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.ecom.r1")}</li>
          <li>{t("seo.ecom.r2")}</li>
          <li>{t("seo.ecom.r3")}</li>
        </ul>

        <h2 className="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.ecom.h2.faq")}
        </h2>
        <dl className="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          <dt>
            <strong>{t("seo.ecom.faq1.q")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>{t("seo.ecom.faq1.a")}</dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.ecom.faq2.q")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>{t("seo.ecom.faq2.a")}</dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.ecom.faq3.q")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>{t("seo.ecom.faq3.a")}</dd>
        </dl>

        <p className="btn_body grey" style={{ marginTop: "1.2rem", maxWidth: "920px" }}>
          {t("seo.ecom.links.title")} <Link href="/projects/">{t("seo.ecom.links.projects")}</Link>
          {" | "}
          <Link href="/seo-optimization/">{t("seo.ecom.links.seo")}</Link>
          {" | "}
          <Link href="/faq/">{t("seo.ecom.links.faq")}</Link>
          {" | "}
          <Link href="/products/">{t("navigation.products")}</Link>
          {" | "}
          <Link href="/products/obriym-crm/">Obriym CRM</Link>
        </p>

        <Link
          href="/#contact"
          className="btn_body black"
          style={{
            display: "inline-flex",
            marginTop: "1.75rem",
            padding: "0.8rem 1.1rem",
            borderRadius: "999px",
            backgroundColor: "var(--pink)",
          }}
        >
          {t("seo.ecom.cta")}
        </Link>
      </div>

      <JsonLd id="schema-service" data={schemas[0]} />
      <JsonLd id="schema-breadcrumb" data={schemas[1]} />
    </section>
  );
}
