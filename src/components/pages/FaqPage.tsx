import { component$ } from "@builder.io/qwik";

import SectionTitle from "./FAQ/sections/title-section/SectionTitle";
import QuestionSection from "./FAQ/sections/question-section/QuestionSection";
import { inlineTranslate } from "qwik-speak";
import { faqStructure, getFaqAnswer, getFaqQuestion, QA } from "./FAQ/sections/question-section/utils";
import LinksTitle from "./FAQ/sections/links-section/LinksTitle";

export default component$(() => {
  const t = inlineTranslate();

  const items = Object.values(faqStructure)
    .flat()
    .reduce<QA[]>((acc, id) => {
      const q = getFaqQuestion(t, id);
      const a = getFaqAnswer(t, id);
      if (!q || !a) return acc;
      acc.push({ id, q, a });
      return acc;
    }, []);

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
