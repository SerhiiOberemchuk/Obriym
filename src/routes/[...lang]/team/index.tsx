import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import SectionContact from "~/components/pages/HomePage/section-contact/SectionContact";
import HeroSection from "~/components/pages/TeamPage/hero-section/HeroSection";
import StepsSection from "~/components/pages/TeamPage/steps-section/StepsSection";
import { DEFAULT_OG_IMAGE, getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

export default component$(() => {
  return (
    <>
      <HeroSection />
      <StepsSection />
      <SectionContact />
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.team.title@@Team | {{name}}", { name: "Obriym" });
  const description = t(
    "app.head.team.description@@Meet the Obriym team building fast SEO-ready websites and web apps for international brands.",
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
