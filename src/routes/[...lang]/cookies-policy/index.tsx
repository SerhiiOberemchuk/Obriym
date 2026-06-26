import { component$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import CookiesSection from "~/components/pages/CoociesPage/CookiesSection";
import { buildSeoMeta, getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

const COOKIES_OG_IMAGE = "https://obriym.com/images/cookies/og-image.png";

export default component$(() => {
  const loc = useLocation();
  const canonical = getCanonicalUrl(loc.url.pathname);

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
          url: canonical,
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

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname, image: COOKIES_OG_IMAGE }),
    links: getAlternateLinks(url.pathname),
  };
};
