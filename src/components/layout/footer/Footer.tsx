"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "~/i18n/navigation";
import Logo from "~/components/common/logo/logo";
import styles from "./styles_footer.module.css";
import NavList from "~/components/common/nav-list/NavList";
import FollowUs from "./follow-us/FollowUs";
import IconCookies from "~/assets/icons/cookies-icon.svg";
import { useCookiesBanner } from "~/context/app-context";
import AnimatedElement from "~/components/common/animated-ball/AnimatedElement";
import { LEGAL_ENTITY } from "~/types/legal.info";
import { getLegalDisplay } from "~/lib/legal";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const { openCookiesBanner } = useCookiesBanner();
  const legal = getLegalDisplay(locale);

  return (
    <footer className={styles.footer_root}>
      <div className={`container ${styles.f_container}`} id="contact">
        <Logo place="footer" />
        <div>
          <NavList place="footer" />
        </div>
        <div>
          <FollowUs />
        </div>
        <h3 className={styles.f_box_title} aria-label="Company motto">
          <span className="body_big grey">{t("footer.text.webuild1")}</span>
          <span className="body_big grey"> {t("footer.text.webuild2")}</span>
          <AnimatedElement
            className={styles.footer_ball}
            width={48}
            height={48}
            preset="greenball"
          />
        </h3>
        <div className={styles.nav_wrapper}>
          <button
            type="button"
            className={styles.btn_cookies}
            onClick={openCookiesBanner}
            aria-label="Cookie preferences"
          >
            <IconCookies width={38} height={38} />
          </button>
          <p className={`btn_header grey ${styles.f_copyright}`}>
            Copyright {"\u00A9"}Obriym{currentYear}
          </p>
          <nav aria-label="Legal information">
            <ul className={styles.privacy_list}>
              <li className="btn_header">
                <Link href="/privacy-policy/">Privacy policy</Link>
              </li>
              <li className={styles.divider}></li>
              <li className="btn_header">
                <Link href="/cookies-policy/">Cookie policy</Link>
              </li>
              <li className={styles.divider}></li>
              <li className="btn_header">
                <Link href="/legal-information/">Legal info</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={`${styles.f_legal} btn_header grey`}>
          <p>
            {LEGAL_ENTITY.name} — {LEGAL_ENTITY.nameEn}
          </p>
          <p>
            {t("legal.details.country")}, {legal.address}
            {" · "}
            <a href={`tel:${LEGAL_ENTITY.phone}`}>{legal.phoneDisplay}</a>
            {" · "}
            <a href="mailto:info@obriym.com">info@obriym.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
