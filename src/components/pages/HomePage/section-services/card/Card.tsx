import type { ReactNode } from "react";
import styles from "./card-tyles.module.css";
import { ServicesCardProps } from "~/types/services-card.type";

type Props = ServicesCardProps & {
  children: ReactNode;
};

export default function Card({ title, description, list, children }: Props) {
  return (
    <article className={styles.card}>
      <header className={styles.wrapper_title}>
        <h3 className={`${styles.title} body_big`}>{title} </h3>
        <p className={`${styles.description} btn_body`}>{description}</p>
        <ol className={`${styles.list} btn_body`} aria-label="Key tasks in this phase">
          {list.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}
        </ol>
      </header>
      {children}
    </article>
  );
}
