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

export interface SoftwareProductSchemaOptions {
  name: string;
  description: string;
  productUrl: string;
  applicationCategory: "BusinessApplication" | "MultimediaApplication";
  isFree?: boolean;
}

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

export const buildSoftwareProductSchema = ({
  name,
  description,
  productUrl,
  applicationCategory,
  isFree = false,
}: SoftwareProductSchemaOptions) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  url: productUrl,
  applicationCategory,
  operatingSystem: "Any",
  creator: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE,
  },
  ...(isFree
    ? {
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
      }
    : {}),
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

export const buildProductsOverviewScripts = (options: {
  homeName: string;
  productsName: string;
  pathname: string;
  description: string;
}): DocumentScript[] => [
  jsonLdScript("schema-products-page", {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.productsName,
    description: options.description,
    url: getCanonicalUrl(options.pathname),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Obriym CRM",
          url: getCanonicalUrl(`${options.pathname.replace(/\/$/, "")}/obriym-crm/`),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Obriym Tools",
          url: getCanonicalUrl(`${options.pathname.replace(/\/$/, "")}/obriym-tools/`),
        },
      ],
    },
  }),
  jsonLdScript(
    "schema-breadcrumb",
    buildBreadcrumbList([
      { name: options.homeName, pathname: getLocaleHomePathFromProductPath(options.pathname) },
      { name: options.productsName, pathname: options.pathname },
    ]),
  ),
];

const getLocaleHomePathFromProductPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0]?.includes("-") ? `/${segments[0]}/` : "/";
};

export const buildProductPageScripts = (options: {
  homeName: string;
  productsName: string;
  productsPath: string;
  product: SoftwareProductSchemaOptions;
  productPath: string;
}): DocumentScript[] => [
  jsonLdScript("schema-software-product", buildSoftwareProductSchema(options.product)),
  jsonLdScript(
    "schema-breadcrumb",
    buildBreadcrumbList([
      { name: options.homeName, pathname: getLocaleHomePathFromProductPath(options.productPath) },
      { name: options.productsName, pathname: options.productsPath },
      { name: options.product.name, pathname: options.productPath },
    ]),
  ),
];
