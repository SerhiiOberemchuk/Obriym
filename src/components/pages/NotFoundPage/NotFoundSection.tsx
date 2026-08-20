import { useTranslations } from "next-intl";
import { Link } from "~/i18n/navigation";
import styles from "./styles.module.css";

export default function NotFoundSection() {
  const t = useTranslations();

  return (
    <section className={styles.nf_section}>
      <div className={`container ${styles.nf_wrapper}`}>
        <p className={`${styles.nf_code} H2_light grey`} aria-hidden="true">
          404
        </p>
        <h1 className="H2_light grey_dark">{t("app.notFound.title")}</h1>
        <p className="H6 grey">{t("app.notFound.text")}</p>
        <Link className={`${styles.nf_home} btn_body`} href="/">
          {t("app.notFound.homeLink")}
        </Link>
      </div>
    </section>
  );
}
