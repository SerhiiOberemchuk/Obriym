import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";

import HeroSection from "~/components/sections/team-page/hero-section/HeroSection";
import InfinityCarousel from "~/components/sections/team-page/infiniteCarousel/InfinityCarousel";
import StepsSection from "~/components/sections/team-page/steps-section/StepsSection";
import InfinityScroll2 from "~/components/sections/team-page/infinityScroll2/InfinityScroll2";
export default component$(() => {
  // const t = inlineTranslate();

  // const key = "dynamic";

  return (
    <>
      <HeroSection />
      <StepsSection />
      <InfinityCarousel />
      <InfinityScroll2 />

      {/* <p>{t(`runtime.${key}`)}</p> */}
    </>
  );
});

export const head: DocumentHead = () => {
  const t = inlineTranslate();
  return {
    title: t("app.head.home.title@@{{name}}", { name: "Obriym" }),
    meta: [{}],
  };
};
