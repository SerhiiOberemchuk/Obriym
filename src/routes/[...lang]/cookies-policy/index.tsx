import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import CookiesSection from "~/components/pages/CoociesPage/CookiesSection";
import {
  OG_IMAGE,
  canonicalFromPathname,
  hreflangLinksForPath,
  ogLocaleFromPathname,
  pathWithoutLocaleFromPathname,
} from "../services/seo-utils";

export default component$(() => {
  return (
    <>
      <CookiesSection />
      <script
        type="application/ld+json"
        id="obriym-cookies-schema"
        dangerouslySetInnerHTML={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Cookies Policy",
          description:
            "Cookies Policy of Obriym Web Agency. Learn what cookies we use and how to manage them.",
          dateModified: "2025-07-21",
          url: "https://obriym.com/cookies-policy/",
          publisher: {
            "@type": "Organization",
            name: "Obriym Web Agency",
            url: "https://obriym.com",
            logo: "https://obriym.com/logo.svg",
          },
          mainEntity: {
            "@type": "WebPageElement",
            name: "Cookies Policy",
            description: "Details about the types of cookies used by Obriym Web Agency.",
          },
        })}
      ></script>
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.cookies.title@@Cookies Policy | Obriym");
  const description = t(
    "app.head.cookies.description@@Read the cookies policy of Obriym Web Agency. Learn what cookies we use, why we use them, and how you can manage your preferences.",
  );
  const canonical = canonicalFromPathname(url.pathname);
  const pathWithoutLocale = pathWithoutLocaleFromPathname(url.pathname);
  const ogLocale = ogLocaleFromPathname(url.pathname);

  return {
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OBRIYM" },
      { property: "og:locale", content: ogLocale },
      { property: "og:url", content: canonical },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: canonical }, ...hreflangLinksForPath(pathWithoutLocale)],
  };
};
