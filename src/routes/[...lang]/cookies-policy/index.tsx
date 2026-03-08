import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import CookiesSection from "~/components/pages/CoociesPage/CookiesSection";
import { getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

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

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const canonical = getCanonicalUrl(url.pathname);

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
      { property: "og:url", content: canonical },
      { property: "og:image", content: "https://obriym.com/images/cookies/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cookies Policy | Obriym" },
      {
        name: "twitter:description",
        content: "Learn about our cookies policy at Obriym Web Agency.",
      },
      { name: "twitter:image", content: "https://obriym.com/images/cookies/og-image.jpg" },
      { name: "robots", content: "index, follow" },
    ],
    links: getAlternateLinks(url.pathname),
  };
};
