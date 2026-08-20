import { useTranslations } from "next-intl";
import styles from "./follow-styles.module.css";
import { socialLinks } from "~/types/social-links.type";
import IconFacebook from "~/assets/icons/icon-facebook.svg";
import IconLinkedIn from "~/assets/icons/icon-linkedIn.svg";
import IconInstagram from "~/assets/icons/icon-instagram.svg";
import LinkEmail from "~/components/common/link-email/LinkEmail";

export default function FollowUs() {
  const t = useTranslations();
  return (
    <div className={styles.f_social_wrapper}>
      <h2 className="H4">{t("footer.followUs")}</h2>
      <ul className={styles.f_social_list}>
        {socialLinks.map(item => (
          <li key={item.network}>
            <a
              href={item.link}
              target="_blank"
              aria-label={item.ariaLabel}
              rel="noopener noreferrer"
            >
              {item.network === "facebook" ? (
                <IconFacebook className={styles.f_social_icon} width={64} height={64} />
              ) : item.network === "linkedIn" ? (
                <IconLinkedIn className={styles.f_social_icon} width={64} height={64} />
              ) : (
                <IconInstagram className={styles.f_social_icon} width={64} height={64} />
              )}
            </a>
          </li>
        ))}
      </ul>
      <LinkEmail place="footer" />
    </div>
  );
}
