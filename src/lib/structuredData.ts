import { SITE, SITE_NAME, canonicalUrl } from "./seo";
import type { Locale } from "~/i18n/routing";

export interface SoftwareProductSchemaOptions {
  name: string;
  description: string;
  productUrl: string;
  applicationCategory: "BusinessApplication" | "MultimediaApplication";
  isFree?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  /** Path without the locale prefix. */
  pathname: string;
}

export const buildBreadcrumbList = (items: BreadcrumbItem[], locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: canonicalUrl(item.pathname, locale),
  })),
});

export interface ServiceSchemaOptions {
  name: string;
  description: string;
  /** Service page path without the locale prefix. */
  pathname: string;
  serviceType: string;
}

export const buildServiceSchema = (
  { name, description, pathname, serviceType }: ServiceSchemaOptions,
  locale: Locale,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  url: canonicalUrl(pathname, locale),
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
 * JSON-LD for a service landing page: a Service entity plus a
 * BreadcrumbList (Home -> Service).
 */
export const buildServicePageSchemas = (
  options: { homeName: string; service: ServiceSchemaOptions },
  locale: Locale,
) => [
  buildServiceSchema(options.service, locale),
  buildBreadcrumbList(
    [
      { name: options.homeName, pathname: "/" },
      { name: options.service.name, pathname: options.service.pathname },
    ],
    locale,
  ),
];

export const buildProductsOverviewSchemas = (
  options: {
    homeName: string;
    productsName: string;
    pathname: string;
    description: string;
  },
  locale: Locale,
) => [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.productsName,
    description: options.description,
    url: canonicalUrl(options.pathname, locale),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Obriym CRM",
          url: canonicalUrl(`${options.pathname}/obriym-crm/`, locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Obriym Tools",
          url: canonicalUrl(`${options.pathname}/obriym-tools/`, locale),
        },
      ],
    },
  },
  buildBreadcrumbList(
    [
      { name: options.homeName, pathname: "/" },
      { name: options.productsName, pathname: options.pathname },
    ],
    locale,
  ),
];

export const buildProductPageSchemas = (
  options: {
    homeName: string;
    productsName: string;
    productsPath: string;
    product: SoftwareProductSchemaOptions;
    productPath: string;
  },
  locale: Locale,
) => [
  buildSoftwareProductSchema(options.product),
  buildBreadcrumbList(
    [
      { name: options.homeName, pathname: "/" },
      { name: options.productsName, pathname: options.productsPath },
      { name: options.product.name, pathname: options.productPath },
    ],
    locale,
  ),
];
