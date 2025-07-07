import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./styles_content.css?inline";

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
          <p class="btn_header">
            Let&apos;s start the conversation and explore how we can bring your vision to life.
          </p>
          <div class="cc_text_soc_media_box">
            <div class="cc_soc_media_row">
              <p>icon</p>
              <p class="btn_header">info@obriym.com</p>
            </div>
            <div class="cc_soc_media_row">
              <p>icon</p>
              <p class="btn_header">@obriym</p>
            </div>
          </div>
        </div>
      </div>
      {/* calendly */}
      <div class="cc_calendly_box">
        <div class="cc_calendly__foto_box_blue">
          <div class="cc_calendly__foto_box_white">
            <div class="cc_calendly__foto">foto</div>
          </div>
        </div>
        <div class="cc_calendly_text_box">
          <div class="cc_calendly_text_wrap">
            <p class="H6">Schedule a call with Serhii</p>
            {/* Change to grey color .btn_body*/}
            <p class="btn_body">Founder & CEO</p>
          </div>
          <div class="cc_calendly_text_icon">icon</div>
        </div>
      </div>
    </div>
  );
});
