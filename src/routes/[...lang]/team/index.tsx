import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";

import HeroSection from "~/components/sections/team-page/hero-section/HeroSection";

export default component$(() => {
  // const t = inlineTranslate();

  // const key = "dynamic";

  return (
    <>
      <HeroSection />

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
