import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";
import CookiesSection from "~/components/sections/cookies-page/CookiesSection";

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
          url: "https://obriym.com/cookies-policy",
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

export const head: DocumentHead = () => {
  const t = inlineTranslate();

  return {
    title: t("app.head.cookies.title@@Cookies Policy | Obriym"),
    meta: [
      {
        name: "description",
        content: t(
          "app.head.cookies.description@@Read the cookies policy of Obriym Web Agency. Learn what cookies we use, why we use them, and how you can manage your preferences.",
        ),
      },
      { property: "og:title", content: "Cookies Policy | Obriym" },
      {
        property: "og:description",
        content: "Our cookies policy explains how we use cookies to improve your experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://obriym.com/cookies-policy" },
      { property: "og:image", content: "https://obriym.com/images/cookies/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cookies Policy | Obriym" },
      {
        name: "twitter:description",
        content: "Learn about our cookies policy at Obriym Web Agency.",
      },
      { name: "twitter:image", content: "https://obriym.com/images/cookies/og-image.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://obriym.com/cookies-policy",
      },
      {
        rel: "alternate",
        hreflang: "uk-UA",
        href: "https://obriym.com/uk-UA/cookies-policy",
      },
      {
        rel: "alternate",
        hreflang: "it-IT",
        href: "https://obriym.com/it-IT/cookies-policy",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://obriym.com/cookies-policy",
      },
      {
        rel: "canonical",
        href: "https://obriym.com/cookies-policy",
      },
    ],
  };
};
