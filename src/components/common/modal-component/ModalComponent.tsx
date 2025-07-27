import { component$, useStylesScoped$, Slot, Signal } from "@qwik.dev/core";
import { Modal } from "@qwik-ui/headless";

import styles from "./modal_styles.css?inline";

type ModalWrapperProps = {
  show: Signal<boolean>;
};

export default component$(({ show }: ModalWrapperProps) => {
  useStylesScoped$(styles);

  return (
    <Modal.Root bind:show={show}>
      <Modal.Panel class="modal-panel">
        <Slot />
        <Modal.Close class="modal-close">X</Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});
