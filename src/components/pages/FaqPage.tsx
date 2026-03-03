import { component$ } from "@qwik.dev/core";

import SectionTitle from "./FAQ/sections/title-section/SectionTitle";
import QuestionSection from "./FAQ/sections/question-section/QuestionSection";
import { inlineTranslate } from "qwik-speak";
import { faqStructure, QA } from "./FAQ/sections/question-section/utils";
import LinksTitle from "./FAQ/sections/links-section/LinksTitle";

export default component$(() => {
  const t = inlineTranslate();

  const items: QA[] = Object.values(faqStructure)
    .flat()
    .map(id => ({
      id,
      q: t(`faq.items.${id}.q`),
      a: t(`faq.items.${id}.a`),
    }));
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(i => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <>
      <SectionTitle />
      <LinksTitle />
      <QuestionSection groupe="process" />
      <QuestionSection groupe="pricing_quality_seo" />
      <QuestionSection groupe="postlaunch_support" />
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(faqJsonLd)} />
    </>
  );
});
