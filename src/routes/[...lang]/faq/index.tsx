import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import FaqPage from "~/components/pages/FaqPage";
import { buildSeoMeta, getAlternateLinks } from "~/utils/seo";

export default component$(() => {
  return <FaqPage />;
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();

  const title = t(
    "faq.head.title@@FAQ | website development, SEO, timelines & pricing | {{name}}",
    {
      name: "OBRIYM",
    },
  );
  const description = t(
    "faq.head.desc@@Answers about website development, fast SEO-ready builds, 2-4 week timelines, multilingual projects, e-commerce, analytics, GDPR, security and maintenance.",
  );

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname }),
    links: getAlternateLinks(url.pathname),
  };
};
