"use client";

import { useTranslations } from "next-intl";
import styles from "./options-group_styles.module.css";

type OptionsGroupProps = {
  name: string;
  idPrefix?: string;
  type: "checkbox" | "radio";
  options: Record<string, string>;
  label: string;
  value: string[] | string | undefined;
  /** Translation key of the current validation error, if any. */
  error?: string;
  /** Receives the whole field value: an array for checkboxes, the key for radios. */
  onChange: (value: string[] | string) => void;
  onBlur?: () => void;
};

export function OptionsGroup({
  name,
  type,
  options,
  label,
  value,
  error,
  idPrefix,
  onChange,
  onBlur,
}: OptionsGroupProps) {
  const t = useTranslations();

  const isCheckbox = type === "checkbox";
  const groupRole = isCheckbox ? "group" : "radiogroup";
  const groupLabelId = idPrefix ? `${idPrefix}-${name}-group-label` : `${name}-group-label`;
  const errorId = idPrefix ? `${idPrefix}-${name}-error` : `${name}-error`;

  // Checkboxes own an array of keys, so a toggle adds to or removes from it;
  // radios simply replace the value.
  const handleChange = (key: string, checked: boolean) => {
    if (!isCheckbox) {
      onChange(key);
      return;
    }

    const selected = Array.isArray(value) ? value : [];
    onChange(checked ? [...selected, key] : selected.filter(item => item !== key));
  };

  return (
    <div
      className={styles.ic_form_options}
      role={groupRole}
      aria-labelledby={groupLabelId}
      aria-invalid={!!error}
      aria-errormessage={error ? errorId : undefined}
    >
      <span id={groupLabelId} className="sr-only">
        {label}
      </span>

      {Object.entries(options).map(([key, option]) => {
        const isSelected = isCheckbox ? Array.isArray(value) && value.includes(key) : value === key;
        const optionLabel = name === "services" || name === "budget" ? t(`${name}.${key}`) : option;

        return (
          <label
            key={key}
            className={`${styles.ic_form_option} ${isSelected ? styles.selected : ""}`}
          >
            <input
              onChange={event => handleChange(key, event.target.checked)}
              onBlur={onBlur}
              type={type}
              name={name}
              value={key}
              checked={isSelected}
              className={styles["visually-hidden"]}
              aria-label={optionLabel}
            />
            <span className={`grey_dark btn_body ${styles.ic_form_label}`}>{optionLabel}</span>
          </label>
        );
      })}
    </div>
  );
}
