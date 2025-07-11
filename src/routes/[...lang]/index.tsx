import { component$ } from "@qwik.dev/core";
import { DocumentHead, routeLoader$ } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";
import SectionContact from "~/components/sections/section-contact/SectionContact";

export const useContactFormLoader = routeLoader$(() => ({
  services: [],
  budget: "",
  name: "",
  email: "",
  message: "",
}));

export default component$(() => {
  return (
    <>
      <SectionContact />
    </>
  );
});

export const head: DocumentHead = () => {
  const t = inlineTranslate();

  return {
    title: t("app.head.home.title@@{{name}}", { name: "Obriym" }),
    meta: [
      {
        name: "description",
        content: t("app.head.home.description@@Localized routing"),
      },
    ],
  };
};
