import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import styles from "./faq-styles.css?inline";
import { Accordion } from "@qwik-ui/headless";

type QA = { id: string; q: string; a: string };

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const ids = [
    "services",
    "timeline",
    "pricing",
    "seo",
    "performance",
    "ecommerce",
    "cms",
    "i18n",
    "a11y",
    "analytics",
    "security",
    "maintenance",
    "handover",
    "migration",
    "integrations",
  ];

  const items: QA[] = ids.map(id => ({
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
    <section class="faq_section">
      <div class="container">
        <h1 class="H4 grey_dark title">{t("faq.h1")}</h1>
        <h2 class="body lead btn_body">{t("faq.lead")}</h2>

        <nav aria-label="Питання FAQ" class="faq_toc">
          <ul class="faq_toc_list">
            {items.map(i => (
              <li key={i.id}>
                <a href={`#${i.id}`}>{i.q}</a>
              </li>
            ))}
          </ul>
        </nav>

        <Accordion.Root class="faq_list">
          {items.map(i => (
            <Accordion.Item id={i.id} key={i.id} class="faq_item">
              <Accordion.Header>
                <Accordion.Trigger>
                  <span class=" H5 accord_title">{i.q}</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content class="body">
                <p>{i.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(faqJsonLd)} />
      </div>
    </section>
  );
});
