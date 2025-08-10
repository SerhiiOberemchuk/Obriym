import { $, component$, createContextId, Signal, useContext, useStyles$ } from "@qwik.dev/core";
import styles from "./lw-styles.css?inline";
import { inlineTranslate } from "qwik-speak";
import { Modal } from "@qwik-ui/headless";
import ContactFormComponent from "../common/contact-form/ContactFormComponent";
import { MobileMenuContext } from "../mobile-menu/MobileMenu";

export const ModalLetsWork = createContextId<Signal<boolean>>("modal-lets-workf");

export default component$(({ place }: { place: "mob-menu" | "header" }) => {
  const t = inlineTranslate();

  useStyles$(styles);
  const { toggleMenu } = useContext(MobileMenuContext);
  const contextModal = useContext(ModalLetsWork);
  const handleLetsWorkButton = $(() => {
    contextModal.value = !contextModal.value;
    if (contextModal.value) {
      toggleMenu();
    }
  });
  return (
    <Modal.Root data-place={place} class="lw_wrapper" bind:show={contextModal}>
      <button
        type="button"
        data-place={place}
        onClick$={handleLetsWorkButton}
        class="btn_body lw_button"
      >
        {t("app.btnLetsWork@@Let’s work")}
      </button>
      <Modal.Panel class="lw_panel">
        <ContactFormComponent modal />
      </Modal.Panel>
    </Modal.Root>
  );
});
