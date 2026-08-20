import { useLocale, useTranslations } from "next-intl";
import { Link } from "~/i18n/navigation";
import styles from "./styles.module.css";
import { LEGAL_ENTITY } from "~/types/legal.info";
import { getLegalDisplay } from "~/lib/legal";

export default function LegalSection() {
  const t = useTranslations();
  const lang = useLocale();
  const legal = getLegalDisplay(lang);

  return (
    <section>
      <div className={`container H6 grey ${styles.legal_wrapper}`}>
        <h1 className={`H2_light grey_dark ${styles.title}`}>{t("legal.title")}</h1>
        <p>{t("legal.intro")}</p>
        <p>{t("legal.trading")}</p>

        <h2 className="H3_uppercase black">{t("legal.founder.title")}</h2>
        <p>
          {t("legal.founder.text1")} {t("legal.founder.text2")}{" "}
          <Link className={styles.team_link} href="/team/">
            {t("legal.founder.linkTeam")}
          </Link>
          .
        </p>

        <h2 className="H3_uppercase black">{t("legal.details.title")}</h2>
        <dl className={styles.legal_details}>
          <div className={styles.legal_row}>
            <dt className="black">{t("legal.details.name")}</dt>
            <dd>{legal.name}</dd>
          </div>
          <div className={styles.legal_row}>
            <dt className="black">{t("legal.details.taxId")}</dt>
            <dd>{LEGAL_ENTITY.taxId}</dd>
          </div>
          <div className={styles.legal_row}>
            <dt className="black">{t("legal.details.regRecord")}</dt>
            <dd>
              {LEGAL_ENTITY.edrRecord} {t("legal.details.regDate")} {legal.edrDateFormatted}
            </dd>
          </div>
          <div className={styles.legal_row}>
            <dt className="black">{t("legal.details.address")}</dt>
            <dd>
              {t("legal.details.country")}, {legal.address}
            </dd>
          </div>
          <div className={styles.legal_row}>
            <dt className="black">{t("legal.details.phone")}</dt>
            <dd>
              <a href={`tel:${LEGAL_ENTITY.phone}`}>{legal.phoneDisplay}</a>
            </dd>
          </div>
          <div className={styles.legal_row}>
            <dt className="black">{t("legal.details.email")}</dt>
            <dd>
              <a href="mailto:info@obriym.com">info@obriym.com</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
