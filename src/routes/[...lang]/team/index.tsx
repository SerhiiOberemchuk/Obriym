import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";

import HeroSection from "~/components/sections/team-page/hero-section/HeroSection";

import StepsSection from "~/components/sections/team-page/steps-section/StepsSection";

import SectionContact from "~/components/sections/home-page/section-contact/SectionContact";

export default component$(() => {
  // const slidesPerView = useSignal(1);
  // const viewportCategory = useSignal<"mobile" | "tablet" | "desktop">("mobile");
  // const t = inlineTranslate();

  // const key = "dynamic";

  // const updateViewport = $(() => {
  //   const rootStyles = getComputedStyle(document.documentElement);

  //   const cssSlidesPerView = rootStyles.getPropertyValue("--slides-inf-per-view");
  //   const parsed = parseFloat(cssSlidesPerView.trim());
  //   slidesPerView.value = parsed;

  //   // Update viewportCategory based on parsed value
  //   if (parsed >= 3) viewportCategory.value = "desktop";
  //   else if (parsed > 1.5) viewportCategory.value = "tablet";
  //   else viewportCategory.value = "mobile";
  // });

  // useVisibleTask$(() => {
  //   updateViewport();
  // });
  // useOnWindow("resize", updateViewport);

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
