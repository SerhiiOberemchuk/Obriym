import { component$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import "./follow-styles.css";
import { socialLinks } from "~/types/social-links.type";
import IconFacebook from "~/assets/icons/icon-facebook.svg?w=64&h64&jsx";
import IconLinkedIn from "~/assets/icons/icon-linkedIn.svg?w=64&h64&jsx";
import IconInstagram from "~/assets/icons/icon-instagram.svg?w=64&h64&jsx";
import LinkEmail from "~/components/common/link-email/LinkEmail";

export default component$(() => {
  const t = inlineTranslate();

  return (
    <div class="f_social_wrapper">
      <h2 class="H4">{t("footer.followUs@@Follow us on")}</h2>
      <ul class="f_social_list">
        {socialLinks.map(item => (
          <li key={item.network}>
            <a
              href={item.link}
              target="_blank"
              aria-label={item.ariaLabel}
              rel="noopener noreferrer"
            >
              {item.network === "facebook" ? (
                <IconFacebook class="f_social_icon" />
              ) : item.network === "linkedIn" ? (
                <IconLinkedIn class="f_social_icon" />
              ) : (
                <IconInstagram class="f_social_icon" />
              )}
            </a>
          </li>
        ))}
      </ul>
      <LinkEmail place="footer" />
    </div>
  );
});
