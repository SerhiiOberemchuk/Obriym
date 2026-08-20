"use client";

import { useTranslations } from "next-intl";
import { Modal } from "~/components/ui/modal";
import ContactFormComponent from "../common/contact-form/ContactFormComponent";
import { useLetsWorkModal, useMobileMenu } from "~/context/app-context";

export default function LetsWork({ place }: { place: "mob-menu" | "header" }) {
  const t = useTranslations();

  const { toggleMenu } = useMobileMenu();
  const { isLetsWorkOpen, setLetsWorkOpen } = useLetsWorkModal();
  const handleLetsWorkButton = () => {
    const isOpen = !isLetsWorkOpen;
    setLetsWorkOpen(isOpen);
    if (isOpen) {
      toggleMenu();
    }
  };
  return (
    <Modal.Root
      className="lw_wrapper"
      data-place={place}
      show={isLetsWorkOpen}
      onShowChange={setLetsWorkOpen}
    >
      <button
        type="button"
        data-place={place}
        onClick={handleLetsWorkButton}
        className="btn_body lw_button"
      >
        {t("app.btnLetsWork")}
      </button>
      <Modal.Panel className="lw_panel" data-place={place}>
        <ContactFormComponent modal />
      </Modal.Panel>
    </Modal.Root>
  );
}
