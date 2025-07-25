import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";

import HeroSection from "~/components/sections/team-page/hero-section/HeroSection";

import StepsSection from "~/components/sections/team-page/steps-section/StepsSection";

import SectionContact from "~/components/sections/home-page/section-contact/SectionContact";

export default component$(() => {
  // const t = inlineTranslate();

  // const key = "dynamic";

  return (
    <>
      <HeroSection />
      <StepsSection />
      <SectionContact />

      {/* Uncomment to use the InfinitySlider component */}
      {/* <InfinitySlider /> */}

      {/* Uncomment to use the following components */}
      {/* <InfinityCarousel />
      <InfinityScroll2 /> */}

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
