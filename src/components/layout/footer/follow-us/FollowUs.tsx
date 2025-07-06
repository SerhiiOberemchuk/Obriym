import { component$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import "./follow-styles.css";
import { socialLinks } from "~/types/social-links.type";
import IconFacebook from "/public/icons/icon-facebook.svg?w=64&h64&jsx";
import IconLinkedIn from "/public/icons/icon-linkedIn.svg?w=64&h64&jsx";
import IconInstagram from "/public/icons/icon-instagram.svg?w=64&h64&jsx";
import LinkEmail from "~/components/common/link-email/LinkEmail";

export default component$(() => {
  const t = inlineTranslate();

  return (
    <div class="f_social_wrapper">
      <h4 class="H4">{t("footer.followUs@@Follow us on")}</h4>
      <ul class="f_social_list">
        {socialLinks.map(item => (
          <li key={item.network}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
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
