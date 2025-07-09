import { component$, useStylesScoped$ } from "@qwik.dev/core";
import ContentContact from "./content-contact/ContentContact";
import InputsContact from "./inputs-contact/InputsContact";
import styles from "./styles_contact.css?inline";
import IconGreen from "/public/icons/icon-green.svg?w=100&h100&jsx";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <section class="c_section">
      <div class="container ">
        <div class="c_box_title">
          <IconGreen class="c_title_icon" />
          <h2 class="H3_uppercase grey_dark">get a contact</h2>
        </div>

        <div class="с_container">
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
