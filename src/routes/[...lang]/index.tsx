import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate, useFormatDate, useFormatNumber } from "qwik-speak";
import SectionContact from "~/components/sections/section-contact/SectionContact";
import SectionTest from "~/components/sections/SectionTest";
import { routeLoader$ } from "@qwik.dev/router";

export const useContactFormLoader = routeLoader$(() => ({
  services: [],
  budget: "",
  name: "",
  email: "",
  message: "",
}));

export default component$(() => {
  const t = inlineTranslate();

  const fd = useFormatDate();
  const fn = useFormatNumber();
  const formLoader = useContactFormLoader();
  return (
    <>
      <h1>{t("app.title@@{{name}} demo", { name: "Qwik Speak" })}</h1>

      <h3>{t("dates@@Dates")}</h3>
      <p>{fd(Date.now(), { dateStyle: "full", timeStyle: "short" })}</p>

      <h3>{t("numbers@@Numbers")}</h3>
      <p>{fn(1000000, { style: "currency" })}</p>

      <SectionTest />
      <SectionContact initialValues={formLoader.value} />
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
