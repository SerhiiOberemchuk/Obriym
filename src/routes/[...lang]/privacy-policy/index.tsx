import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import PrivacyPage from "~/components/pages/PrivacyPage";
import { getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

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
          url: "https://obriym.com/privacy-policy",
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
  const canonical = getCanonicalUrl(url.pathname);

  return {
    title: t("app.head.privacy.title@@Privacy Policy | Obriym"),
    meta: [
      {
        name: "description",
        content: t(
          "app.head.privacy.description@@Read the Privacy Policy of Obriym Web Agency. Learn how we collect, use, and protect your personal data.",
        ),
      },
      { property: "og:title", content: "Privacy Policy | Obriym" },
      {
        property: "og:description",
        content: "Our Privacy Policy explains how we collect, use, and protect your personal data.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: "https://obriym.com/images/privacy/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy | Obriym" },
      {
        name: "twitter:description",
        content: "Learn about our Privacy Policy at Obriym Web Agency.",
      },
      { name: "twitter:image", content: "https://obriym.com/images/privacy/og-image.jpg" },
      { name: "robots", content: "index, follow" },
    ],
    links: getAlternateLinks(url.pathname),
  };
};
