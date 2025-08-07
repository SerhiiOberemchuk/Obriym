import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";
import PrivacySection from "~/components/sections/privacy-page/PrivacySection";

export default component$(() => {
  return (
    <>
      <PrivacySection />
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

export const head: DocumentHead = () => {
  const t = inlineTranslate();

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
      { property: "og:url", content: "https://obriym.com/privacy-policy" },
      { property: "og:image", content: "https://obriym.com/images/privacy/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy | Obriym" },
      {
        name: "twitter:description",
        content: "Learn about our Privacy Policy at Obriym Web Agency.",
      },
      { name: "twitter:image", content: "https://obriym.com/images/privacy/og-image.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "alternate", hreflang: "en", href: "https://obriym.com/privacy-policy" },
      { rel: "alternate", hreflang: "uk-UA", href: "https://obriym.com/uk-UA/privacy-policy" },
      { rel: "alternate", hreflang: "it-IT", href: "https://obriym.com/it-IT/privacy-policy" },
      { rel: "alternate", hreflang: "x-default", href: "https://obriym.com/privacy-policy" },
      { rel: "canonical", href: "https://obriym.com/privacy-policy" },
    ],
  };
};
