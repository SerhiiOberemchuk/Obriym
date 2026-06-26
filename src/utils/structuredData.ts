import type { DocumentScript } from "@builder.io/qwik-city";
import { SITE, SITE_NAME, getCanonicalUrl } from "./seo";

const jsonLdScript = (id: string, data: unknown): DocumentScript => ({
  key: id,
  props: {
    id,
    type: "application/ld+json",
    dangerouslySetInnerHTML: JSON.stringify(data),
  },
});

export interface BreadcrumbItem {
  name: string;
  /** Page pathname (canonical, locale-aware). */
  pathname: string;
}

export const buildBreadcrumbList = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: getCanonicalUrl(item.pathname),
  })),
});

export interface ServiceSchemaOptions {
  name: string;
  description: string;
  /** Service page pathname (used for canonical url). */
  pathname: string;
  serviceType: string;
}

export const buildServiceSchema = ({
  name,
  description,
  pathname,
  serviceType,
}: ServiceSchemaOptions) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  url: getCanonicalUrl(pathname),
  provider: {
    "@type": "Organization",
    name: `${SITE_NAME} Web Agency`,
    url: SITE,
  },
  areaServed: "Europe",
});

/**
 * Builds the JSON-LD `scripts` for a service landing page:
 * a Service entity plus a BreadcrumbList (Home → Service).
 */
export const buildServicePageScripts = (options: {
  homeName: string;
  homePath: string;
  service: ServiceSchemaOptions;
}): DocumentScript[] => [
  jsonLdScript("schema-service", buildServiceSchema(options.service)),
  jsonLdScript(
    "schema-breadcrumb",
    buildBreadcrumbList([
      { name: options.homeName, pathname: options.homePath },
      { name: options.service.name, pathname: options.service.pathname },
    ]),
  ),
];
