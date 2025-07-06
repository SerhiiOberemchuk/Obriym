import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { inlineTranslate, useFormatDate, useFormatNumber } from "qwik-speak";
import SectionTest from "~/components/sections/SectionTest";

export default component$(() => {
  const t = inlineTranslate();

  const fd = useFormatDate();
  const fn = useFormatNumber();

  return (
    <>
      <h1>{t("app.title@@{{name}} demo", { name: "Qwik Speak" })}</h1>

      <h3>{t("dates@@Dates")}</h3>
      <p>{fd(Date.now(), { dateStyle: "full", timeStyle: "short" })}</p>

      <h3>{t("numbers@@Numbers")}</h3>
      <p>{fn(1000000, { style: "currency" })}</p>

      <SectionTest />
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
