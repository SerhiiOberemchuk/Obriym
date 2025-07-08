import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./styles_content.css?inline";
// import IconEmail1 from "/public/icons/icon_email1?w=24&h24&jsx";
// import IconEmail from "/public/icons/icon_email.svg?w=24&h24&jsx";
import IconTelegram from "/public/icons/icon_telegram.svg?w=24&h24&jsx";
import OberemImg from "../../../../assets/images/oberem-image.png?jsx";
import IconSchedule from "/public/icons/icon_schedule.svg?w=64&h64&jsx";
import LinkEmail from "~/components/common/link-email/LinkEmail";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="cc_content_box">
      {/* title */}
      <div class="cc_title_box">
        {/* title title*/}
        <div>
          {/* Change to black color .body_big */}
          <p class="body_big">Have a project?</p>
          <p class="body_big">Let&apos;s talk!</p>
        </div>
        {/* text */}
        <div class="cc_text_box">
          <p class="btn_header grey">
            Let&apos;s start the conversation and explore how we can bring your vision to life.
          </p>
          <div class="cc_text_soc_media_box">
            {/* <div class="cc_soc_media_row">
              <IconEmail class="cc_email_icon" />
              <p class="btn_header">info@obriym.com</p>
            </div> */}
            <LinkEmail place="main" />
            <div class="cc_soc_media_row">
              <IconTelegram />
              <p class="btn_header grey">@obriym</p>
            </div>
          </div>
        </div>
      </div>
      {/* calendly */}
      <div class="cc_calendly_box">
        <div class="cc_calendly__foto_box_blue">
          <div class="cc_calendly__foto_box_white">
            <div class="cc_calendly__foto">
              <OberemImg />
            </div>
          </div>
        </div>
        <div class="cc_calendly_text_box">
          <div class="cc_calendly_text_wrap">
            <p class="H6">Schedule a call with Serhii</p>
            {/* Change to grey color .btn_body*/}
            <p class="btn_body grey">Founder & CEO</p>
          </div>

          <IconSchedule class="cc_calendly_text_icon" />
        </div>
      </div>
    </div>
  );
});
