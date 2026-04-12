import { component$, useStylesScoped$ } from "@builder.io/qwik";
import IconBlue from "~/assets/images/faq-page/faq-puff.png?w=116&h=106&quality=100&jsx";

import styles from "./title-styles.css?inline";
import { inlineTranslate } from "qwik-speak";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  return (
    <section class="title_section">
      <div class="container">
        <div class=" H1_extra_light title_faq" aria-hidden="true">
          <span>FAQ</span>
          <IconBlue class="icon" aria-hidden={true} />
        </div>
        <h1 class="body_big grey title">{t("faq.h1")}</h1>
        <h2 class=" btn_body grey faq_subtitle">{t("faq.lead")}</h2>
      </div>
    </section>
  );
});
