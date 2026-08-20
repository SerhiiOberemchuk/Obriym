"use client";

import { useTranslations } from "next-intl";
import styles from "./form_error.module.css";
import IconError from "~/assets/icons/icon_error.svg";

interface FormErrorProps {
  /** Translation key produced by the valibot schema. */
  error?: string;
  id?: string;
}

export default function FormError({ error, id }: FormErrorProps) {
  const t = useTranslations();
  const message = error ? t(error) : undefined;

  return (
    <div
      id={id}
      role="alert"
      aria-live="assertive"
      className={`${styles.ic_form_error} helper_text red ${error ? styles.visible : ""}`}
    >
      {error && (
        <>
          <IconError width={20} height={20} />
          <span>{message}</span>
        </>
      )}
    </div>
  );
}
