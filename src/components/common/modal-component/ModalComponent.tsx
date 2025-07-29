import { component$, useStylesScoped$, Slot, Signal } from "@qwik.dev/core";
import { Modal } from "@qwik-ui/headless";

import styles from "./modal_styles.css?inline";
import IconClose from "~/assets/icons/icon_close.svg?w-24&h-24&jsx";

type ModalWrapperProps = {
  show: Signal<boolean>;
};

export default component$(({ show }: ModalWrapperProps) => {
  useStylesScoped$(styles);

  return (
    <Modal.Root bind:show={show}>
      <Modal.Panel class="modal-panel">
        <Slot />
        <Modal.Close class="modal-close btn_body">
          <span class="modal-close_span">Close</span> <IconClose />
        </Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});
