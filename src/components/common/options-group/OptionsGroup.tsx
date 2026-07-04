import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";
import styles from "./options-group_styles.css?inline";
import { OptionsGroupProps } from "~/types/contact-form.type";

export const OptionsGroup = component$(
  ({
    name,
    type,
    options,
    label,
    value,
    error,
    idPrefix,
    onInput$,
    onBlur$,
  }: OptionsGroupProps) => {
    const t = inlineTranslate();
    useStylesScoped$(styles);

    const isCheckbox = type === "checkbox";
    const groupRole = isCheckbox ? "group" : "radiogroup";
    const groupLabelId = idPrefix ? `${idPrefix}-${name}-group-label` : `${name}-group-label`;
    const errorId = idPrefix ? `${idPrefix}-${name}-error` : `${name}-error`;
    return (
      <div
        class="ic_form_options"
        role={groupRole}
        aria-labelledby={groupLabelId}
        aria-invalid={!!error}
        aria-errormessage={error ? errorId : undefined}
      >
        <span id={groupLabelId} class="sr-only">
          {label}
        </span>

        {Object.entries(options).map(([key, option]) => {
          const isSelected = isCheckbox
            ? Array.isArray(value) && value.includes(key)
            : value === key;
          const optionLabel =
            name === "services" || name === "budget" ? t(`${name}.${key}@@${option}`) : option;

          return (
            <label key={key} class={`ic_form_option ${isSelected ? "selected" : ""}`}>
              <input
                onInput$={onInput$}
                onBlur$={onBlur$}
                type={type}
                name={name}
                value={key}
                checked={isSelected}
                class="visually-hidden"
                aria-label={optionLabel}
              />
              <span class="grey_dark btn_body ic_form_label">{optionLabel}</span>
            </label>
          );
        })}
      </div>
    );
  },
);
