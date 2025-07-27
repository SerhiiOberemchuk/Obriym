import {
  component$,
  useVisibleTask$,
  useStylesScoped$,
  Slot,
  Signal,
  useTask$,
  QRL,
} from "@qwik.dev/core";
import { Modal } from "@qwik-ui/headless";

import styles from "./modal_styles.css?inline";

type ModalWrapperProps = {
  show: Signal<boolean>;
  onClose$?: QRL<() => void>;
};

export default component$(({ show, onClose$ }: ModalWrapperProps) => {
  useStylesScoped$(styles);

  useVisibleTask$(({ track }) => {
    track(() => show);
    if (!show && onClose$) {
      onClose$();
    }
  });
  return (
    <Modal.Root bind:show={show}>
      <Modal.Panel class="modal-panel">
        <Slot />
        <Modal.Close class="modal-close" onClick$={onClose$}>
          X
        </Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});
