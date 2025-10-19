import { component$, useStylesScoped$ } from "@qwik.dev/core";

import styles from "./styles_inputs.css?inline";

import ContactFormComponent from "~/components/common/contact-form/ContactFormComponent";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    // ref={anchorRef}  aria-labelledby="contact-form-title"
    <section class="ic_content_box ">
      {/* modal={false} */}
      <ContactFormComponent modal={false} />
    </section>
  );
});
