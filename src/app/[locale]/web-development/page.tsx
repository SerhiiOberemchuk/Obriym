import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "~/i18n/navigation";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import { buildServicePageSchemas } from "~/lib/structuredData";
import JsonLd from "~/components/common/json-ld/JsonLd";

type PageProps = { params: Promise<{ locale: string }> };

const PATHNAME = "/web-development/";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("seo.webdev.head.title", { name: "OBRIYM" }),
    description: t("seo.webdev.head.description"),
    pathname: PATHNAME,
    locale: locale as Locale,
  });
}

export default async function WebDevelopmentPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const schemas = buildServicePageSchemas(
    {
      homeName: t("breadcrumb.home"),
      service: {
        name: t("seo.webdev.schema.name"),
        description: t("seo.webdev.head.description"),
        pathname: PATHNAME,
        serviceType: "Web development",
      },
    },
    locale as Locale,
  );

  return (
    <section style={{ padding: "7rem 0 5rem" }}>
      <div className="container">
        <h1 className="H1_extra_light">{t("seo.webdev.h1")}</h1>
        <p className="body_big grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t("seo.webdev.lead")}
        </p>
        <p className="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t("seo.webdev.intro2")}
        </p>

        <h2 className="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.webdev.h2.stack")}
        </h2>
        <ul className="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.webdev.p1")}</li>
          <li>{t("seo.webdev.p2")}</li>
          <li>{t("seo.webdev.p3")}</li>
        </ul>

        <h2 className="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.webdev.h2.result")}
        </h2>
        <p className="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          {t("seo.webdev.result")}
        </p>
        <ul className="btn_body grey" style={{ marginTop: "1rem" }}>
          <li>{t("seo.webdev.result1")}</li>
          <li>{t("seo.webdev.result2")}</li>
          <li>{t("seo.webdev.result3")}</li>
        </ul>

        <h2 className="H4 black" style={{ marginTop: "2rem" }}>
          {t("seo.webdev.h2.faq")}
        </h2>
        <dl className="btn_body grey" style={{ marginTop: "1rem", maxWidth: "920px" }}>
          <dt>
            <strong>{t("seo.webdev.faq1.q")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>{t("seo.webdev.faq1.a")}</dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.webdev.faq2.q")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>{t("seo.webdev.faq2.a")}</dd>
          <dt style={{ marginTop: "0.8rem" }}>
            <strong>{t("seo.webdev.faq3.q")}</strong>
          </dt>
          <dd style={{ marginTop: "0.35rem" }}>{t("seo.webdev.faq3.a")}</dd>
        </dl>

        <p className="btn_body grey" style={{ marginTop: "1.2rem", maxWidth: "920px" }}>
          {t("seo.webdev.links.title")}{" "}
          <Link href="/projects/">{t("seo.webdev.links.projects")}</Link>
          {" | "}
          <Link href="/faq/">{t("seo.webdev.links.faq")}</Link>
          {" | "}
          <Link href="/team/">{t("seo.webdev.links.team")}</Link>
          {" | "}
          <Link href="/products/">{t("navigation.products")}</Link>
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
          {t("seo.webdev.cta")}
        </Link>
      </div>

      <JsonLd id="schema-service" data={schemas[0]} />
      <JsonLd id="schema-breadcrumb" data={schemas[1]} />
    </section>
  );
}
