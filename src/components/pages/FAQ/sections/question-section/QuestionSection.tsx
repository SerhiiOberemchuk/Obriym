import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import IconPinkBall from "~/assets/images/faq-page/faq-balloons.png?w=100&h=100&jsx";
import IconYell from "~/assets/images/faq-page/faq-yel-pink.png?w=100&h=100&jsx";
import IconGreen from "~/assets/images/faq-page/faq-green.png?w=100&h=100&jsx";
import styles from "./quest-styles.css?inline";
import IconClose from "~/assets/icons/icon_close.svg?w=56&h=56&jsx";
import { faqStructure, Groupes, QA } from "./utils";

export default component$<{ groupe: Groupes }>(({ groupe }) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const items: QA[] = faqStructure[groupe].map(id => ({
    id,
    q: t(`faq.items.${id}.q`),
    a: t(`faq.items.${id}.a`),
  }));

  return (
    <section class="section">
      <div class="container">
        <div class="subtitle_wrapper">
          {groupe === "process" && <IconPinkBall aria-hidden="true" />}
          {groupe === "pricing_quality_seo" && <IconYell aria-hidden="true" />}
          {groupe === "postlaunch_support" && <IconGreen aria-hidden="true" />}
          <h2 class="H3_uppercase grey_dark">
            {t(`faq.question.section.${groupe}@@Процес розробки`)}
          </h2>
        </div>

        <ul class="qustion_wrapper">
          {items.map(item => (
            <li
              key={item.id}
              id={item.id}
              class="question_item"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <details class="question_details">
                <summary class="question_summary" aria-controls={`${item.id}-answer`}>
                  <h3 class="H6 grey" itemProp="name">
                    {item.q}
                  </h3>
                  <span class="icon_wrapper" aria-hidden="true">
                    <IconClose />
                  </span>
                </summary>
                <div
                  class="animation_open"
                  id={`${item.id}-answer`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p class="btn_body details_descr" itemProp="text">
                    {item.a}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
