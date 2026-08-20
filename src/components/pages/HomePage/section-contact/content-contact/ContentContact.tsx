import { useTranslations } from "next-intl";
import styles from "./styles_content.module.css";

import IconTelegram from "~/assets/icons/icon_telegram.svg";
// import OberemImg from "~/assets/images/oberem-image.png";
// import IconSchedule from "~/assets/icons/icon_schedule.svg";
import Upwork from "~/assets/icons/Upwork-logo.svg";
import LinkEmail from "~/components/common/link-email/LinkEmail";

export default function ContentContact() {
  const t = useTranslations();
  return (
    <div className={styles.cc_content_box}>
      {/* title */}
      <div className={styles.cc_title_box} role="region" aria-labelledby="contact-section-heading">
        {/* title title*/}
        <div>
          <h2 className="body_big" id="contact-section-heading">
            {t("home.contact-section.content.text1")}
          </h2>

          <h3 className="body_big">{t("home.contact-section.content.text2")}</h3>
        </div>
        {/* text */}
        <div className={styles.cc_text_box}>
          <p className="btn_header grey">{t("home.contact-section.content.text3")}</p>
          <div className={styles.cc_text_soc_media_box}>
            <LinkEmail place="main" />
            <a
              className={styles.cc_soc_media_link}
              href="https://t.me/obriym"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("home.contact-section.content.link_telegram")}
            >
              <IconTelegram width={24} height={24} aria-hidden="true" />
              <span className="btn_header grey">@obriym</span>
            </a>
          </div>
        </div>
      </div>
      {/* upwork */}
      <div>
        <p className={`btn_header grey ${styles.cc_upwork_text}`}>
          {t("home.contact-section.content.text5")}
        </p>
        <a
          className={styles.cc_upwork_link}
          href="https://www.upwork.com/agencies/obriym"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("home.contact-section.content.link_upwork")}
        >
          <Upwork width={120} height={39} aria-hidden="true" />
        </a>
      </div>
      {/* calendly */}
      {/* <div
        className={styles.cc_calendly_box}
        role="region"
        aria-labelledby="calendly-heading"
        aria-describedby="calendly-desc"
      >
        <div className={styles.cc_calendly__foto_box_blue}>
          <div className={styles.cc_calendly__foto_box_white}>
            <div className={styles.cc_calendly__foto}>
              <OberemImg
                alt={t("home.contact-section.oberem_img_alt")}
                role="img"
              />
            </div>
          </div>
        </div>
        <div className={styles.cc_calendly_text_box}>
          <div className={styles.cc_calendly_text_wrap}>
            <p className="H6" id="calendly-heading">
              {t("home.contact-section.content.text4")}
            </p>

            <p className="btn_body grey" id="calendly-desc">
              Founder & CEO
            </p>
          </div>

          <IconSchedule className={styles.cc_calendly_text_icon} aria-hidden="true" />
        </div>
      </div> */}
    </div>
  );
}
