import { useLocale, useTranslations } from "next-intl";
import styles from "./styles.module.css";
import { LEGAL_ENTITY } from "~/types/legal.info";
import { getLegalDisplay } from "~/lib/legal";

export default function PrivacySection() {
  const t = useTranslations();
  const lang = useLocale();
  const legal = getLegalDisplay(lang);
  return (
    <section>
      <div className={`container H6 grey ${styles.privacy_wrapper}`}>
        <h1 className={`H2_light grey_dark ${styles.title}`}>{t("privacy.title")}</h1>
        <p>
          {t("privacy.updated")} {t("privacy.intro")}
        </p>

        <h2 className="H3_uppercase black">{t("privacy.collect.title")}</h2>
        <ol>
          <li>{t("privacy.collect.items.nameContact")}</li>
          <li>{t("privacy.collect.items.technical")}</li>
          <li>{t("privacy.collect.items.usage")}</li>
        </ol>

        <h2 className="H3_uppercase black">{t("privacy.use.title")}</h2>
        <ol>
          <li>{t("privacy.use.items.inquiries")}</li>
          <li>{t("privacy.use.items.improve")}</li>
          <li>{t("privacy.use.items.analytics")}</li>
          <li>{t("privacy.use.items.newsletter")}</li>
        </ol>

        <h2 className="H3_uppercase black">{t("privacy.protect.title")}</h2>
        <p>{t("privacy.protect.text")}</p>

        <h2 className="H3_uppercase black">{t("privacy.rights.title")}</h2>
        <ol>
          <li>{t("privacy.rights.items.access")}</li>
          <li>{t("privacy.rights.items.correction")}</li>
          <li>{t("privacy.rights.items.withdraw")}</li>
        </ol>

        <h2 className="H3_uppercase black">{t("privacy.storage.title")}</h2>
        <p>{t("privacy.storage.text")}</p>

        <h2 className="H3_uppercase black">{t("privacy.legal.title")}</h2>
        <p>{t("privacy.legal.text")}</p>

        <h2 className="H3_uppercase black">{t("privacy.controller.title")}</h2>
        <p>{t("privacy.controller.text")}</p>
        <p>
          {legal.name}
          <br />
          {t("legal.details.taxId")}: {LEGAL_ENTITY.taxId}
          <br />
          {t("legal.details.regRecord")} {LEGAL_ENTITY.edrRecord} {t("legal.details.regDate")}{" "}
          {legal.edrDateFormatted}
          <br />
          {t("legal.details.country")}, {legal.address}
          <br />
          {t("privacy.controller.phone")}:{" "}
          <a href={`tel:${LEGAL_ENTITY.phone}`}>{LEGAL_ENTITY.phone}</a>
        </p>

        <p>{t("privacy.contact")}</p>
      </div>
    </section>
  );
}
