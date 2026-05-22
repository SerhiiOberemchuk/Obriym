import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./styles_inputs.css?inline";

import ContactFormComponent from "~/components/common/contact-form/ContactFormComponent";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <section class="ic_content_box ">
      <ContactFormComponent modal={false} />
    </section>
  );
});
