import { useTranslations } from "next-intl";
import styles from "./styles-links.module.css";

import { getFaqLink, ids, QA } from "../question-section/utils";

export default function LinksTitle() {
  const t = useTranslations();

  const items: Omit<QA, "a">[] = ids.map(id => ({
    id,
    q: getFaqLink(t, id),
  }));

  return (
    <section className={styles.links_section}>
      <nav aria-label={t("faq.toc.aria")} className={styles.faq_toc}>
        <ListItems array={items.filter((_, i) => i % 2 !== 0)} />
        <ListItems array={items.filter((_, i) => i % 2 !== 0)} />
      </nav>
      <div className={styles.animate_title}>
        <TitleAnimated title={t("faq.h2")} />
        <TitleAnimated title={t("faq.h2")} />
        <TitleAnimated title={t("faq.h2")} />
      </div>
      <nav aria-label={t("faq.toc.aria")} className={styles.faq_toc}>
        <ListItems array={items.filter((_, i) => i % 2 === 0)} />
        <ListItems array={items.filter((_, i) => i % 2 === 0)} />
      </nav>
    </section>
  );
}

function TitleAnimated({ title }: { title: string }) {
  return <h2 className={`H2_light grey ${styles.title}`}>{title}</h2>;
}

function ListItems({ array }: { array: Omit<QA, "a">[] }) {
  return (
    <ul className={styles.faq_toc_list}>
      {array.map(i => (
        <li key={i.id} className={styles.item}>
          <a href={`#${i.id}`} className={`H6 grey_dark ${styles.link}`}>
            {i.q}
          </a>
        </li>
      ))}
    </ul>
  );
}
