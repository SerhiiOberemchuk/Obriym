"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import styles from "./text-input_styles.module.css";
import FormError from "~/components/common/form-error/form_error";

type TextInputProps = {
  name: string;
  idPrefix?: string;
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  /** Translation key of the current validation error, if any. */
  error?: string;
  /** Result of react-hook-form's `register(name)` — name, ref, onChange, onBlur. */
  registration: UseFormRegisterReturn;
};

export function TextInput({
  label,
  type,
  name,
  idPrefix,
  placeholder,
  error,
  registration,
}: TextInputProps) {
  const id = idPrefix ? `${idPrefix}-${name}-input` : `${name}-input`;
  const errorId = idPrefix ? `${idPrefix}-${name}-error` : `${name}-error`;
  return (
    <div className={`${styles.ic_form_fieldset_wrp} ${error ? styles["has-error"] : ""}`}>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        {...registration}
        className={`btn_body grey_dark ${styles.ic_form_input} ${error ? styles["border-red"] : ""}`}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-errormessage={error ? errorId : undefined}
      />
      <FormError error={error} id={errorId} />
    </div>
  );
}
