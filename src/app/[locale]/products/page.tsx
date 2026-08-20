import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import { buildProductsOverviewSchemas } from "~/lib/structuredData";
import JsonLd from "~/components/common/json-ld/JsonLd";
import ProductsPage from "~/components/pages/ProductsPage/ProductsPage";

type PageProps = { params: Promise<{ locale: string }> };

const PATHNAME = "/products/";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("products.overview.head.title"),
    description: t("products.overview.head.description"),
    pathname: PATHNAME,
    locale: locale as Locale,
  });
}

export default async function Products({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const schemas = buildProductsOverviewSchemas(
    {
      homeName: t("breadcrumb.home"),
      productsName: t("products.common.allProducts"),
      pathname: PATHNAME,
      description: t("products.overview.head.description"),
    },
    locale as Locale,
  );

  return (
    <>
      <ProductsPage kind="overview" />
      <JsonLd id="schema-products-page" data={schemas[0]} />
      <JsonLd id="schema-breadcrumb" data={schemas[1]} />
    </>
  );
}
