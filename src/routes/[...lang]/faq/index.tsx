import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import FaqPage from "~/components/pages/FaqPage";
import { DEFAULT_OG_IMAGE, getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

export default component$(() => {
  return <FaqPage />;
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("faq.head.title@@FAQ - services, SEO, timelines & pricing | {{name}}");
  const description = t(
    "faq.head.title.desc@@Answers about fast SEO-ready websites and web apps, 2-4 week timelines, multilingual, e-commerce, analytics, GDPR, security and maintenance.",
  );
  const canonical = getCanonicalUrl(url.pathname);

  return {
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OBRIYM" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: getAlternateLinks(url.pathname),
  };
};
