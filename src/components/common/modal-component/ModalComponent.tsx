"use client";

import type { ReactNode } from "react";
import { Modal } from "~/components/ui/modal";

import IconClose from "~/assets/icons/icon_close.svg";

type ModalWrapperProps = {
  show: boolean;
  onShowChange: (value: boolean) => void;
  children: ReactNode;
};

export default function ModalWrapper({ show, onShowChange, children }: ModalWrapperProps) {
  return (
    <Modal.Root show={show} onShowChange={onShowChange}>
      <Modal.Panel className="modal-panel">
        <div>
          {children}

          <Modal.Close className="modal-close btn_body">
            <span className="modal-close_span">Close</span> <IconClose width={24} height={24} />
          </Modal.Close>
        </div>
      </Modal.Panel>
    </Modal.Root>
  );
}
