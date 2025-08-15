import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";
import FaqPage from "~/components/pages/FaqPage";

export default component$(() => {
  return <FaqPage />;
});
export const head: DocumentHead = () => {
  const t = inlineTranslate();
  const title = t("faq.head.title@@FAQ — services, SEO, timelines & pricing | {{name}}");

  const description = t(
    "faq.head.title.desc@@Answers about fast SEO-ready websites and web apps, 2–4 week timelines, multilingual, e-commerce, analytics, GDPR, security and maintenance.",
  );
  // const path = url.pathname.replace(/^\/(uk-UA|en-EU|it-IT)(?=\/|$)/, "") || "/";
  // const canonical = `${SITE}${path}`;
  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      // { property: "og:type", content: "website" },
      // { property: "og:site_name", content: "OBRIYM" },
      // { property: "og:title", content: title },
      // { property: "og:description", content: description },
      // { property: "og:url", content: canonical },
      // { property: "og:image", content: OG_IMAGE },
      // { property: "og:image:width", content: "1200" },
      // { property: "og:image:height", content: "630" },
      // { name: "twitter:card", content: "summary_large_image" },
      // { name: "twitter:title", content: title },
      // { name: "twitter:description", content: description },
      // { name: "twitter:image", content: OG_IMAGE },
    ],
  };
};
