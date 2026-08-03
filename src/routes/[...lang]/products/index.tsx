import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import ProductsPage from "~/components/pages/ProductsPage/ProductsPage";
import { buildSeoMeta, getAlternateLinks } from "~/utils/seo";
import { buildProductsOverviewScripts } from "~/utils/structuredData";

export default component$(() => <ProductsPage kind="overview" />);

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t(
    "products.overview.head.title@@OBRIYM Products | CRM and free marketplace seller tools",
  );
  const description = t(
    "products.overview.head.description@@Explore Obriym CRM for sales and e-commerce operations and Obriym Tools for faster marketplace photos, catalogs and listings.",
  );

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname }),
    links: getAlternateLinks(url.pathname),
    scripts: buildProductsOverviewScripts({
      homeName: t("breadcrumb.home@@Home"),
      productsName: t("products.common.allProducts@@Products"),
      pathname: url.pathname,
      description,
    }),
  };
};
