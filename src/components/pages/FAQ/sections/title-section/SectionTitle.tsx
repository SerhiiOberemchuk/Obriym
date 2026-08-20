import { useTranslations } from "next-intl";
import Image from "next/image";
import iconBlue from "~/assets/images/faq-page/faq-puff.png";

import styles from "./title-styles.module.css";

export default function SectionTitle() {
  const t = useTranslations();

  return (
    <section className={styles.title_section}>
      <div className="container">
        <div className={`H1_extra_light ${styles.title_faq}`} aria-hidden="true">
          <span>FAQ</span>
          <Image
            src={iconBlue}
            alt=""
            width={116}
            height={106}
            className={styles.icon}
            aria-hidden={true}
          />
        </div>
        <h1 className={`body_big grey ${styles.title}`}>{t("faq.h1")}</h1>
        <p className={`btn_body grey ${styles.faq_subtitle}`}>{t("faq.lead")}</p>
      </div>
    </section>
  );
}
