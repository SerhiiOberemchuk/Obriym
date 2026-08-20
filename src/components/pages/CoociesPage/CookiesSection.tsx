import { useTranslations } from "next-intl";
import styles from "./styles.module.css";

export default function CookiesSection() {
  const t = useTranslations();
  return (
    <section>
      <div className="container">
        <h1 className={`H2_light grey_dark ${styles.title}`}>{t("cookies.title")}</h1>
        <ul className={`H6 grey ${styles.list_privasy}`}>
          <li>
            {t("cookies.updated")}
            <br />
            {t("cookies.intro")}
          </li>
          <li>
            <h2 className="H3_uppercase black">{t("cookies.what.title")}</h2>
            <p>{t("cookies.what.text")}</p>
          </li>
          <li>
            <h2 className="H3_uppercase black">{t("cookies.types.title")}</h2>
            <p>{t("cookies.types.desc")}</p>
            <ul className={styles.list_types}>
              <li>
                <h3 className={`H6 black ${styles.title_types}`}>
                  {t("cookies.types.required.title")}
                </h3>
                <p>{t("cookies.types.required.text")}</p>
              </li>
              <li>
                <h3 className={`H6 black ${styles.title_types}`}>
                  {t("cookies.types.analytics.title")}
                </h3>
                <p>{t("cookies.types.analytics.text")}</p>
              </li>
              <li>
                <h3 className={`H6 black ${styles.title_types}`}>
                  {t("cookies.types.functionality.title")}
                </h3>
                <p>{t("cookies.types.functionality.text")}</p>
              </li>
              <li>
                <h3 className={`H6 black ${styles.title_types}`}>
                  {t("cookies.types.advertising.title")}
                </h3>
                <p>{t("cookies.types.advertising.text")}</p>
              </li>
            </ul>
          </li>
          <li>
            <h2 className="H3_uppercase black">{t("cookies.storage.title")}</h2>
            <p>{t("cookies.storage.text")}</p>
          </li>
          <li>
            <h2 className="H3_uppercase black">{t("cookies.manage.title")}</h2>
            <p>{t("cookies.manage.text")}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
