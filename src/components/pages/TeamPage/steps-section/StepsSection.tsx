import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./styles_steps.module.css";
import { TEAM_MEMBERS } from "~/const/team";
import InfinitySlider from "../infinitySlider/InfinitySlider";
import pinkImg from "~/assets/images/pink.png";

// interface StepsSectionProps {
//   viewportCategory: "mobile" | "tablet" | "desktop";
// }

export default function StepsSection() {
  const t = useTranslations();

  return (
    <section className={styles.team_steps_section} aria-labelledby="team-title" role="region">
      <div className={styles.team_steps_container_wrp}>
        <div className="container">
          <div className={styles.team_steps_title}>
            <Image src={pinkImg} alt="" className={styles.team_steps_image} aria-hidden={true} />
            <h2 className="H3_uppercase" id="team-title">
              {t("team.title")}
            </h2>
          </div>
        </div>
        <div className={styles.inf_carousel_wrp} role="list" aria-label={t("team.aria.carousel")}>
          <InfinitySlider items={TEAM_MEMBERS} />
        </div>
      </div>
    </section>
  );
}
