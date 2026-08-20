import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import { buildProductPageSchemas } from "~/lib/structuredData";
import JsonLd from "~/components/common/json-ld/JsonLd";
import ProductsPage from "~/components/pages/ProductsPage/ProductsPage";

type PageProps = { params: Promise<{ locale: string }> };

const PATHNAME = "/products/obriym-tools/";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("products.tools.head.title"),
    description: t("products.tools.head.description"),
    pathname: PATHNAME,
    locale: locale as Locale,
  });
}

export default async function ObriymTools({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const schemas = buildProductPageSchemas(
    {
      homeName: t("breadcrumb.home"),
      productsName: t("products.common.allProducts"),
      productsPath: "/products/",
      productPath: PATHNAME,
      product: {
        name: "Obriym Tools",
        description: t("products.tools.head.description"),
        productUrl: "https://tools.obriym.com/",
        applicationCategory: "MultimediaApplication",
        isFree: true,
      },
    },
    locale as Locale,
  );

  return (
    <>
      <ProductsPage kind="tools" />
      <JsonLd id="schema-software-product" data={schemas[0]} />
      <JsonLd id="schema-breadcrumb" data={schemas[1]} />
    </>
  );
}
