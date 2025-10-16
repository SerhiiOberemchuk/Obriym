import { component$ } from "@qwik.dev/core";

import SectionTitle from "../sections/faq-page/title-section/SectionTitle";
import LinksTitle from "../sections/faq-page/links-section/LinksTitle";
import QuestionSection from "../sections/faq-page/question-section/QuestionSection";
import { inlineTranslate } from "qwik-speak";
import { faqStructure, QA } from "../sections/faq-page/question-section/utils";

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
