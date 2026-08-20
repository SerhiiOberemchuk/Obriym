import { useTranslations } from "next-intl";
import Image from "next/image";
import iconPinkBall from "~/assets/images/faq-page/faq-balloons.png";
import iconYell from "~/assets/images/faq-page/faq-yel-pink.png";
import iconGreen from "~/assets/images/faq-page/faq-green.png";
import styles from "./quest-styles.module.css";
import IconClose from "~/assets/icons/icon_close.svg";
import {
  faqStructure,
  getFaqAnswer,
  getFaqQuestion,
  getFaqSectionTitle,
  Groupes,
  QA,
} from "./utils";

export default function QuestionSection({ groupe }: { groupe: Groupes }) {
  const t = useTranslations();

  const items: QA[] = faqStructure[groupe].map(id => ({
    id,
    q: getFaqQuestion(t, id),
    a: getFaqAnswer(t, id),
  }));

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.subtitle_wrapper}>
          {groupe === "process" && (
            <Image src={iconPinkBall} alt="" width={100} height={100} aria-hidden="true" />
          )}
          {groupe === "pricing_quality_seo" && (
            <Image src={iconYell} alt="" width={100} height={100} aria-hidden="true" />
          )}
          {groupe === "postlaunch_support" && (
            <Image src={iconGreen} alt="" width={100} height={100} aria-hidden="true" />
          )}
          <h2 className="H3_uppercase grey_dark">{getFaqSectionTitle(t, groupe)}</h2>
        </div>

        <ul className={styles.qustion_wrapper}>
          {items.map(item => (
            <li
              key={item.id}
              id={item.id}
              className="question_item"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <details className={styles.question_details}>
                <summary className={styles.question_summary} aria-controls={`${item.id}-answer`}>
                  <h3 className="H6 grey" itemProp="name">
                    {item.q}
                  </h3>
                  <span className={styles.icon_wrapper} aria-hidden="true">
                    <IconClose width={56} height={56} />
                  </span>
                </summary>
                <div
                  className="animation_open"
                  id={`${item.id}-answer`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p className={`btn_body ${styles.details_descr}`} itemProp="text">
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
}
