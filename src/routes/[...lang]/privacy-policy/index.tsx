import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import PrivacyPage from "~/components/pages/PrivacyPage";
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
      <PrivacyPage />
      <script
        type="application/ld+json"
        id="obriym-policy-schema"
        dangerouslySetInnerHTML={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PrivacyPolicy",
          name: "Privacy Policy",
          description:
            "Privacy Policy of Obriym Web Agency. Learn how we collect, use, and protect your personal data.",
          dateModified: "2025-07-21",
          url: "https://obriym.com/privacy-policy/",
          publisher: {
            "@type": "Organization",
            name: "Obriym Web Agency",
            url: "https://obriym.com",
            logo: "https://obriym.com/logo.svg",
          },
        })}
      ></script>
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.privacy.title@@Privacy Policy | Obriym");
  const description = t(
    "app.head.privacy.description@@Read the Privacy Policy of Obriym Web Agency. Learn how we collect, use, and protect your personal data.",
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
