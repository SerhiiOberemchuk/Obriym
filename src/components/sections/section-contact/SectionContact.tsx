import { component$, useStylesScoped$ } from "@qwik.dev/core";
import ContentContact from "./content-contact/ContentContact";
import InputsContact from "./inputs-contact/InputsContact";
import styles from "./styles_contact.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <section class="c_section">
      <div class="container ">
        <div class="c_box_title">
          <p>ICON</p>
          <h2 class="H3_uppercase">get a contact</h2>
        </div>

        <div class="с_container">
          <ContentContact />
          <InputsContact />
        </div>
      </div>
    </section>
  );
});
