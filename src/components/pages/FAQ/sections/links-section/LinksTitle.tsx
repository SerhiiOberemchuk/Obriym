import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./styles-links.css?inline";

import { useSpeak, useSpeakContext } from "qwik-speak";
import { ids, QA } from "../question-section/utils";

export default component$(() => {
  useStylesScoped$(styles);
  useSpeak({ runtimeAssets: ["faq"] });
  const {
    translation: { faq },
  } = useSpeakContext();

  const items: Omit<QA, "a">[] = ids.map(id => ({
    id,
    q: faq.items[id].link,
  }));

  return (
    <section class="links_section">
      <nav aria-label={faq.toc.aria} class="faq_toc">
        <ListItems array={items.filter((_, i) => i % 2 !== 0)} />
        <ListItems array={items.filter((_, i) => i % 2 !== 0)} />
      </nav>
      <div class="animate_title">
        <TitleAnimated title={faq.h2} />
        <TitleAnimated title={faq.h2} />
        <TitleAnimated title={faq.h2} />
      </div>
      <nav aria-label={faq.toc.aria} class="faq_toc">
        <ListItems array={items.filter((_, i) => i % 2 === 0)} />
        <ListItems array={items.filter((_, i) => i % 2 === 0)} />
      </nav>
    </section>
  );
});

const TitleAnimated = component$<{ title: string }>(({ title }) => {
  useStylesScoped$(styles);
  return <h2 class="H2_light grey title">{title}</h2>;
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
