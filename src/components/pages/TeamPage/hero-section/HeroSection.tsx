import { useTranslations } from "next-intl";
import Image from "next/image";
import abstract3d from "~/assets/images/abstract_3d.png";
import frame98 from "~/assets/images/frame_98.png";
import styles from "./styles_hero.module.css";

export default function HeroSection() {
  const t = useTranslations();

  return (
    <section
      className={styles.team_hero_section}
      aria-labelledby="team-hero-title"
      aria-describedby="team-hero-description"
    >
      {/* <div class="container "> */}
      <div>
        <h1 className={`H2_light ${styles.team_hero_title}`} id="team-hero-title">
          <span className={styles.team_hero_line1}>
            <Image
              src={abstract3d}
              alt=""
              className={styles.team_hero_line1_icon}
              aria-hidden={true}
            />
            {t("team.hero.title.line1")}
          </span>
          <span className="H1_extra_light gray_dark">&nbsp;{t("team.hero.title.line2")}</span>
          <br />
          <span className={styles.team_hero_line2}>
            {t("team.hero.title.line3")}
            <Image
              src={frame98}
              alt=""
              aria-hidden={true}
              className={styles.team_hero_line2_icon}
            />
          </span>
          {t("team.hero.title.line4")}
        </h1>
        <p className="sr-only" id="team-hero-description">
          {t("team.hero.description")}
        </p>
      </div>
    </section>
  );
}
