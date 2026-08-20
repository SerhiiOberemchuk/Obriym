import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./st-styles.module.css";
import AnimatedElement from "~/components/common/animated-ball/AnimatedElement";
import imgHeroSlides from "~/assets/images/hero_slides.png";
import titleAbstract from "~/assets/images/element-title.png";

export default function SectionTitle() {
  const t = useTranslations();

  return (
    <section className={styles.st_section}>
      <div className="container">
        <h1 className={`H2_light black ${styles.title}`}>
          <span className="sr-only">{t("home.h1")}</span>
          <span className={styles.icon_span} aria-hidden={true}>
            {t("home.stitle.1span")}
            <Image src={titleAbstract} alt="" className={styles.icon_title} aria-hidden={true} />
          </span>
          <span className="H1_extra_light grey_dark">{t("home.stitle.2span")}</span>
          <AnimatedElement className={styles.spring_model} preset="spring" width={80} height={80} />
          <span className="H1_extra_light grey_dark" aria-hidden={true}>
            {t("home.stitle.3span")}.
          </span>
          <Image
            src={imgHeroSlides}
            className={`notebook ${styles.tablet}`}
            alt=""
            aria-hidden={true}
          />
          <span className={styles.from_sp1} aria-hidden={true}>
            {t("home.stitle.4span")}
          </span>
          <span className={styles.text_center} aria-hidden={true}>
            <span className={styles.from_sp2}>{t("home.stitle.4span")}</span>{" "}
            {t("home.stitle.5span")}
          </span>
        </h1>
        <Image
          src={imgHeroSlides}
          className={`notebook ${styles.mobile}`}
          alt=""
          aria-hidden={true}
        />
      </div>
    </section>
  );
}
