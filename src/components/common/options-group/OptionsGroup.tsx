import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import styles from "./options-group_styles.css?inline";
import { OptionsGroupProps } from "~/types/contact-form.type";

export const OptionsGroup = component$(
  ({ name, type, options, label, value, onInput$, onBlur$ }: OptionsGroupProps) => {
    const t = inlineTranslate();
    useStylesScoped$(styles);

    const isCheckbox = type === "checkbox";
    const groupRole = isCheckbox ? "group" : "radiogroup";
    const groupLabelId = `${name}-group-label`;
    return (
      <div class="ic_form_options" role={groupRole} aria-labelledby={groupLabelId}>
        <span id={groupLabelId} class="sr-only">
          {label}
        </span>

        {Object.entries(options).map(([key, label]) => {
          const isSelected = isCheckbox
            ? Array.isArray(value) && value.includes(key)
            : value === key;
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
                // aria-checked={isSelected}
                aria-label={t(`${name}.${key}@@${label}`)}
              />
              <span class="grey_dark btn_body ic_form_label">
                {t(`${name}.${key}@@${label}`)}

                {/* {label} */}
              </span>
            </label>
          );
        })}
      </div>
    );
  },
);
