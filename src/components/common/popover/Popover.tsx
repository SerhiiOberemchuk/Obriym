"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { PopoverPanel } from "~/components/ui/popover";

import styles from "./popover_styles.module.css";
import { ALERT_MESSAGE } from "~/const/form-const";

export enum PopoverId {
  contactFormSuccess = "contact-form-success",
  contactFormError = "contact-form-error",
}

export default function Popover() {
  const t = useTranslations();
  const anchor = useRef<HTMLDivElement>(null);
  const IconSuccess = ALERT_MESSAGE["success"].icon;
  const IconError = ALERT_MESSAGE["failed"].icon;
  const alert = {
    success: {
      title: t("alert.success.title"),
      message: t("alert.success.message"),
    },
    failed: {
      title: t("alert.failed.title"),
      message: t("alert.failed.message"),
    },
  };

  return (
    <div ref={anchor} aria-hidden="true" className={styles.popover_anchor}>
      <PopoverPanel
        id={PopoverId.contactFormSuccess}
        anchorRef={anchor}
        className="popover-transition"
      >
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-type="success"
          className={`${styles["popover-content"]} ${styles.popover_text}`}
        >
          <IconSuccess width={20} height={20} />

          <p>{alert.success.title}</p>

          <p>{alert.success.message}</p>
        </div>
      </PopoverPanel>
      <PopoverPanel
        id={PopoverId.contactFormError}
        anchorRef={anchor}
        className="popover-transition"
      >
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-type="failed"
          className={`${styles["popover-content"]} ${styles.popover_text}`}
        >
          <IconError width={20} height={20} />

          <p>{alert.failed.title}</p>

          <p>{alert.failed.message}</p>
        </div>
      </PopoverPanel>
    </div>
  );
}
