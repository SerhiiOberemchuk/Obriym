import { component$ } from "@qwik.dev/core";

import SectionTitle from "../sections/faq-page/title-section/SectionTitle";
import LinksTitle from "../sections/faq-page/links-section/LinksTitle";
import QuestionSection from "../sections/faq-page/question-section/QuestionSection";

export default component$(() => {
  return (
    <>
      <SectionTitle />
      <LinksTitle />
      <QuestionSection groupe="process" />
      <QuestionSection groupe="pricing_quality_seo" />
      <QuestionSection groupe="postlaunch_support" />
    </>
  );
});
