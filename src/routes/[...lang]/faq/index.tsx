import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import FaqPage from "~/components/pages/FaqPage";
import {
  OG_IMAGE,
  canonicalFromPathname,
  hreflangLinksForPath,
  ogLocaleFromPathname,
  pathWithoutLocaleFromPathname,
} from "../services/seo-utils";

export default component$(() => {
  return <FaqPage />;
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("faq.head.title@@FAQ - services, SEO, timelines and pricing | {{name}}", {
    name: "OBRIYM",
  });
  const description = t(
    "faq.head.title.desc@@Answers about SEO-ready websites and web apps, timelines, multilingual support, e-commerce, analytics, GDPR, security and maintenance.",
  );
  const canonical = canonicalFromPathname(url.pathname);
  const pathWithoutLocale = pathWithoutLocaleFromPathname(url.pathname);
  const ogLocale = ogLocaleFromPathname(url.pathname);

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
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
