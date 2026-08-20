"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

/**
 * Drop-in replacement for the `@qwik-ui/headless` Modal used before the Next
 * migration. It renders the same DOM (a wrapper element around a native
 * `<dialog>`), so `.modal-panel`, `.modal-panel::backdrop` and `.modal-close`
 * keep styling it unchanged.
 */

type ModalContextValue = {
  show: boolean;
  setShow: (value: boolean) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = (component: string) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(`${component} must be rendered inside <Modal.Root>`);
  }
  return context;
};

type RootProps = ComponentPropsWithoutRef<"div"> & {
  show: boolean;
  onShowChange: (value: boolean) => void;
  children: ReactNode;
};

function Root({ show, onShowChange, children, ...rest }: RootProps) {
  return (
    <ModalContext.Provider value={{ show, setShow: onShowChange }}>
      <div {...rest}>{children}</div>
    </ModalContext.Provider>
  );
}

type PanelProps = ComponentPropsWithoutRef<"dialog">;

function Panel({ children, ...rest }: PanelProps) {
  const { show, setShow } = useModalContext("Modal.Panel");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (show && !dialog.open) {
      dialog.showModal();
    } else if (!show && dialog.open) {
      dialog.close();
    }
  }, [show]);

  // `close` also fires for the Esc key and for form[method=dialog] submits,
  // which keeps the external state in sync with the element.
  const handleClose = useCallback(() => setShow(false), [setShow]);

  return (
    <dialog ref={dialogRef} onClose={handleClose} {...rest}>
      {children}
    </dialog>
  );
}

type CloseProps = ComponentPropsWithoutRef<"button">;

function Close({ onClick, ...rest }: CloseProps) {
  const { setShow } = useModalContext("Modal.Close");

  return (
    <button
      type="button"
      onClick={event => {
        onClick?.(event);
        setShow(false);
      }}
      {...rest}
    />
  );
}

export const Modal = { Root, Panel, Close };
