import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./styles-links.css?inline";

import { inlineTranslate } from "qwik-speak";
import { ids, QA } from "../question-section/utils";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const items: Omit<QA, "a">[] = ids.map(id => ({
    id,
    q: t(`faq.items.${id}.link`),
  }));
  return (
    <section class="links_section">
      <nav aria-label="Питання FAQ" class="faq_toc">
        <ListItems array={items.filter((_, i) => i % 2 !== 0)} />
        <ListItems array={items.filter((_, i) => i % 2 !== 0)} />
      </nav>
      <div class="animate_title">
        <TitleAnimated />
        <TitleAnimated />
        <TitleAnimated />
      </div>
      <nav aria-label="Питання FAQ" class="faq_toc">
        <ListItems array={items.filter((_, i) => i % 2 === 0)} />
        <ListItems array={items.filter((_, i) => i % 2 === 0)} />
      </nav>
    </section>
  );
});

const TitleAnimated = component$(() => {
  const t = inlineTranslate();
  useStylesScoped$(styles);
  return <h2 class="H2_light grey title">{t("faq.h2@@OBRIYM — веб-агенція повного циклу.")}</h2>;
});

const ListItems = component$<{ array: Omit<QA, "a">[] }>(({ array }) => {
  useStylesScoped$(styles);

  return (
    <ul class="faq_toc_list">
      {array.map(i => (
        <li key={i.id} class="item">
          <a href={`#${i.id}`} class="H6 grey_dark link">
            {i.q}
          </a>
        </li>
      ))}
    </ul>
  );
});
