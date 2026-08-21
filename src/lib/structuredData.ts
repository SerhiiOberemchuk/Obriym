import { SITE, SITE_NAME, canonicalUrl, type Href } from "./seo";
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
  href: Href;
}

export const buildBreadcrumbList = (items: BreadcrumbItem[], locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: canonicalUrl(item.href, locale),
  })),
});

export interface ServiceSchemaOptions {
  name: string;
  description: string;
  href: Href;
  serviceType: string;
}

export const buildServiceSchema = (
  { name, description, href, serviceType }: ServiceSchemaOptions,
  locale: Locale,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  url: canonicalUrl(href, locale),
  provider: {
    "@type": "Organization",
    name: `${SITE_NAME} Web Agency`,
    url: SITE,
  },
  areaServed: "Europe",
});

/** FAQPage markup, which lets the questions surface directly in search results. */
export const buildFaqSchema = (items: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(item => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
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

export const buildProductsOverviewSchemas = (
  options: {
    homeName: string;
    productsName: string;
    description: string;
  },
  locale: Locale,
) => [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.productsName,
    description: options.description,
    url: canonicalUrl("/products/", locale),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Obriym CRM",
          url: canonicalUrl("/products/obriym-crm/", locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Obriym Tools",
          url: canonicalUrl("/products/obriym-tools/", locale),
        },
      ],
    },
  },
  buildBreadcrumbList(
    [
      { name: options.homeName, href: "/" },
      { name: options.productsName, href: "/products/" },
    ],
    locale,
  ),
];

export const buildProductPageSchemas = (
  options: {
    homeName: string;
    productsName: string;
    product: SoftwareProductSchemaOptions;
    productHref: Href;
  },
  locale: Locale,
) => [
  buildSoftwareProductSchema(options.product),
  buildBreadcrumbList(
    [
      { name: options.homeName, href: "/" },
      { name: options.productsName, href: "/products/" },
      { name: options.product.name, href: options.productHref },
    ],
    locale,
  ),
];
