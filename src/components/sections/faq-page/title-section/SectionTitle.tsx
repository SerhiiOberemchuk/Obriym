import { component$, useStylesScoped$ } from "@qwik.dev/core";
import IconBlue from "~/assets/images/faq-page/faq-puff.png?w=116&h=106&jsx";

import styles from "./title-styles.css?inline";
import { inlineTranslate } from "qwik-speak";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  return (
    <section class="title_section">
      <div class="container">
        <h2 class=" H1_extra_light title_faq">
          <span>FAQ</span>
          <IconBlue class="icon" />
        </h2>
        <h1 class="body_big grey title">{t("faq.h1")}</h1>
        <h2 class=" btn_body grey faq_subtitle">{t("faq.lead")}</h2>
      </div>
    </section>
  );
});
