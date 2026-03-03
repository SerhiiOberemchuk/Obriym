import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import ServicesHubPage from "~/components/pages/ServicesPage/ServicesHubPage";
import { SERVICE_PAGES } from "./service-pages.data";
import {
  OG_IMAGE,
  canonicalFromPathname,
  hreflangLinksForPath,
  ogLocaleFromPathname,
  pathWithoutLocaleFromPathname,
} from "./seo-utils";

export default component$(() => {
  const itemListElement = SERVICE_PAGES.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.navLabel,
    url: `https://obriym.com/services/${service.slug}/`,
  }));

  return (
    <>
      <ServicesHubPage services={SERVICE_PAGES} />
      <script
        type="application/ld+json"
        id="services-hub-schema"
        dangerouslySetInnerHTML={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "OBRIYM service pages",
          itemListElement,
        })}
      />
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("services.hub.head.title@@Service pages for websites and web apps | OBRIYM");
  const description = t(
    "services.hub.head.description@@Explore dedicated service pages: website development, e-commerce, web app development, UX UI design, technical SEO, branding and product strategy.",
  );
  const canonical = canonicalFromPathname(url.pathname);
  const pathWithoutLocale = pathWithoutLocaleFromPathname(url.pathname);
  const ogLocale = ogLocaleFromPathname(url.pathname);

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      {
        name: "keywords",
        content:
          "website development services, ecommerce development, web app development, UX UI design services, technical SEO services, branding services, product strategy",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OBRIYM" },
      { property: "og:locale", content: ogLocale },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: canonical }, ...hreflangLinksForPath(pathWithoutLocale)],
  };
};
