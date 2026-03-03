import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import ServicePageTemplate from "~/components/pages/ServicesPage/ServicePageTemplate";
import { SERVICE_PAGES, getServicePageBySlug } from "../service-pages.data";
import {
  OG_IMAGE,
  canonicalFromPathname,
  hreflangLinksForPath,
  ogLocaleFromPathname,
  pathWithoutLocaleFromPathname,
} from "../seo-utils";

export const useServicePage = routeLoader$(({ params, error }) => {
  const service = getServicePageBySlug(params.service);

  if (!service) {
    throw error(404, "Service page not found");
  }

  return service;
});

export default component$(() => {
  const service = useServicePage().value;
  const location = useLocation();
  const canonical = canonicalFromPathname(location.url.pathname);

  return (
    <>
      <ServicePageTemplate service={service} services={SERVICE_PAGES} />
      <script
        type="application/ld+json"
        id={`service-schema-${service.slug}`}
        dangerouslySetInnerHTML={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.navLabel,
          description: service.metaDescription,
          serviceType: service.navLabel,
          areaServed: "Europe",
          url: canonical,
          provider: {
            "@type": "Organization",
            name: "OBRIYM",
            url: "https://obriym.com",
          },
        })}
      />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const t = inlineTranslate();
  const service = resolveValue(useServicePage);
  const title = t(`services.page.${service.slug}.head.title@@${service.metaTitle} | OBRIYM`);
  const description = t(`services.page.${service.slug}.head.description@@${service.metaDescription}`);
  const canonical = canonicalFromPathname(url.pathname);
  const pathWithoutLocale = pathWithoutLocaleFromPathname(url.pathname);
  const ogLocale = ogLocaleFromPathname(url.pathname);

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { name: "keywords", content: service.keywords },
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
