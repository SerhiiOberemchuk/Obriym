import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";

import HeroSection from "~/components/pages/TeamPage/hero-section/HeroSection";

import StepsSection from "~/components/pages/TeamPage/steps-section/StepsSection";

import SectionContact from "~/components/pages/HomePage/section-contact/SectionContact";

export default component$(() => {
  return (
    <>
      <HeroSection />
      <StepsSection />
      <SectionContact />
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
