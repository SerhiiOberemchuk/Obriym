import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import styles from "./styles_content.css?inline";

import IconTelegram from "~/assets/icons/icon_telegram.svg?w=24&h24&jsx";
import OberemImg from "~/assets/images/oberem-image.png?jsx";
import IconSchedule from "~/assets/icons/icon_schedule.svg?w=64&h64&jsx";
import Upwork from "~/assets/images/upwork-logo.png?w=120&h39&jsx";
import LinkEmail from "~/components/common/link-email/LinkEmail";

export default component$(() => {
  const t = inlineTranslate();
  useStylesScoped$(styles);
  return (
    <div class="cc_content_box">
      {/* title */}
      <div class="cc_title_box">
        {/* title title*/}
        <div>
          <h2 class="body_big">{t("home.contact-section.content.text1@@Have a project?")}</h2>

          <h3 class="body_big">{t("home.contact-section.content.text2@@Let's talk!")}</h3>
        </div>
        {/* text */}
        <div class="cc_text_box">
          <p class="btn_header grey">
            {t(
              "home.contact-section.content.text3@@Let's start the conversation and explore how we can bring your vision to life.",
            )}
          </p>
          <div class="cc_text_soc_media_box">
            <LinkEmail place="main" />
            <div class="cc_soc_media_row">
              <IconTelegram aria-hidden="true" />
              <p class="btn_header grey">@obriym</p>
            </div>
          </div>
        </div>
      </div>
      {/* upwork */}
      <div>
        <p class="btn_header grey cc_upwork_text">Also find us anytime at Upwork</p>
        <Upwork />
      </div>
      {/* calendly */}
      <div class="cc_calendly_box">
        <div class="cc_calendly__foto_box_blue">
          <div class="cc_calendly__foto_box_white">
            <div class="cc_calendly__foto">
              <OberemImg
                alt={t("home.contact-section.oberem_img_alt@@Portrait of Serhii, founder and CEO")}
              />
            </div>
          </div>
        </div>
        <div class="cc_calendly_text_box">
          <div class="cc_calendly_text_wrap">
            <p class="H6">{t("home.contact-section.content.text4@@Schedule a call with Serhii")}</p>

            <p class="btn_body grey">Founder & CEO</p>
          </div>

          <IconSchedule class="cc_calendly_text_icon" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
});
