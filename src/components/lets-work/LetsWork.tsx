import { component$, useStyles$ } from "@qwik.dev/core";
import styles from "./lw-styles.css?inline";
import { inlineTranslate } from "qwik-speak";
import { Modal } from "@qwik-ui/headless";
import ContactFormComponent from "../common/contact-form/ContactFormComponent";

export default component$(({ place }: { place: "mob-menu" | "header" }) => {
  const t = inlineTranslate();
  useStyles$(styles);
  return (
    <Modal.Root data-place={place} class="lw_wrapper">
      <Modal.Trigger type="button" data-place={place} class="btn_body lw_button">
        {t("app.btnLetsWork@@Let’s work")}
      </Modal.Trigger>
      <Modal.Panel class="lw_panel">
        <ContactFormComponent modal />
      </Modal.Panel>
    </Modal.Root>
  );
});
