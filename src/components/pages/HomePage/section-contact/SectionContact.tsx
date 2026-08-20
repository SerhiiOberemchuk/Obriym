import { useTranslations } from "next-intl";
import ContentContact from "./content-contact/ContentContact";
import InputsContact from "./inputs-contact/InputsContact";

import styles from "./styles_contact.module.css";
import AnimatedElement from "~/components/common/animated-ball/AnimatedElement";
// import IconGreen from "~/assets/images/green.png";

export default function SectionContact() {
  const t = useTranslations();

  return (
    <section className={styles.c_section}>
      <div className="container">
        <div className={styles.c_box_title}>
          <div className={styles.c_title_icon}>
            {/* <IconGreen aria-hidden="true" /> */}
            {/* <img src="/images/green.png" alt="" aria-hidden="true" /> */}
            <AnimatedElement preset="spring" width={64} height={64} />
          </div>

          <h2 className="H3_uppercase grey_dark">{t("home.contact-section.title")}</h2>
        </div>

        <div className={styles.c_container}>
          <div className={styles.cc_wrapper}>
            <ContentContact />
          </div>

          <div className={styles.cc_wrapper}>
            <InputsContact />
          </div>
        </div>
      </div>
    </section>
  );
}
