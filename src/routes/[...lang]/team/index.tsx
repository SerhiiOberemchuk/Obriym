import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import SectionContact from "~/components/pages/HomePage/section-contact/SectionContact";
import HeroSection from "~/components/pages/TeamPage/hero-section/HeroSection";
import StepsSection from "~/components/pages/TeamPage/steps-section/StepsSection";
import { buildSeoMeta, getAlternateLinks } from "~/utils/seo";

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
  const title = t("app.head.team.title@@Our team | web designers, developers & strategists | {{name}}", {
    name: "OBRIYM",
  });
  const description = t(
    "app.head.team.description@@Meet the OBRIYM team of strategists, designers and developers creating fast SEO-ready websites and web apps for international brands.",
  );

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname }),
    links: getAlternateLinks(url.pathname),
  };
};
