import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import { buildProductPageSchemas } from "~/lib/structuredData";
import JsonLd from "~/components/common/json-ld/JsonLd";
import ProductsPage from "~/components/pages/ProductsPage/ProductsPage";

type PageProps = { params: Promise<{ locale: string }> };

const PATHNAME = "/products/obriym-crm/";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("products.crm.head.title"),
    description: t("products.crm.head.description"),
    href: PATHNAME,
    locale: locale as Locale,
  });
}

export default async function ObriymCrm({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const schemas = buildProductPageSchemas(
    {
      homeName: t("breadcrumb.home"),
      productsName: t("products.common.allProducts"),
      productHref: PATHNAME,
      product: {
        name: "Obriym CRM",
        description: t("products.crm.head.description"),
        productUrl: "https://obriym-crm.com/",
        applicationCategory: "BusinessApplication",
      },
    },
    locale as Locale,
  );

  return (
    <>
      <ProductsPage kind="crm" />
      <JsonLd id="schema-software-product" data={schemas[0]} />
      <JsonLd id="schema-breadcrumb" data={schemas[1]} />
    </>
  );
}
