import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import ContentContact from "./content-contact/ContentContact";
import InputsContact from "./inputs-contact/InputsContact";

import styles from "./styles_contact.css?inline";
import IconGreen from "~/assets/images/green.png?w=100&h100&jsx";

export default component$(() => {
  const t = inlineTranslate();
  useStylesScoped$(styles);
  return (
    <section class="c_section">
      <div class="container ">
        <div class="c_box_title">
          <IconGreen class="c_title_icon" aria-hidden="true" />

          <h2 class="H3_uppercase grey_dark">{t("home.contact-section.title@@get a contact")}</h2>
        </div>

        <div class="c_container">
          <div class="cc_wrapper">
            <ContentContact />
          </div>

          <div class="cc_wrapper">
            <InputsContact />
          </div>
        </div>
      </div>
    </section>
  );
});
