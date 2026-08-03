import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import ProductsPage from "~/components/pages/ProductsPage/ProductsPage";
import { buildSeoMeta, getAlternateLinks, getPathWithoutLocale } from "~/utils/seo";
import { buildProductPageScripts } from "~/utils/structuredData";

export default component$(() => <ProductsPage kind="crm" />);

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t(
    "products.crm.head.title@@Obriym CRM | CRM and e-commerce customer flow workspace",
  );
  const description = t(
    "products.crm.head.description@@Manage leads, deals, products, orders, tasks and retention in one role-aware CRM workspace for B2B sales and e-commerce teams.",
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
        name: "Obriym CRM",
        description,
        productUrl: "https://obriym-crm.com/",
        applicationCategory: "BusinessApplication",
      },
    }),
  };
};
