import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import ProductsPage from "~/components/pages/ProductsPage/ProductsPage";
import { buildSeoMeta, getAlternateLinks, getPathWithoutLocale } from "~/utils/seo";
import { buildProductPageScripts } from "~/utils/structuredData";

export default component$(() => <ProductsPage kind="tools" />);

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("products.tools.head.title@@Obriym Tools | Free tools for marketplace sellers");
  const description = t(
    "products.tools.head.description@@Free browser tools for marketplace photo resizing, HEIC conversion, cross-listing and supplier catalog preparation.",
  );
  const productsPath = url.pathname.replace(getPathWithoutLocale(url.pathname), "/products/");

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname }),
    links: getAlternateLinks(url.pathname),
    scripts: buildProductPageScripts({
      homeName: t("breadcrumb.home@@Home"),
      productsName: t("products.common.allProducts@@Products"),
      productsPath,
      productPath: url.pathname,
      product: {
        name: "Obriym Tools",
        description,
        productUrl: "https://tools.obriym.com/",
        applicationCategory: "MultimediaApplication",
        isFree: true,
      },
    }),
  };
};
