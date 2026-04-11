import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useSpeak, useSpeakContext } from "qwik-speak";
import styles from "./options-group_styles.css?inline";
import { OptionsGroupProps } from "~/types/contact-form.type";

export const OptionsGroup = component$(
  ({ name, type, options, label, value, onInput$, onBlur$ }: OptionsGroupProps) => {
    useSpeak({ runtimeAssets: ["services", "budget"] });
    const { translation } = useSpeakContext();
    useStylesScoped$(styles);

    const isCheckbox = type === "checkbox";
    const groupRole = isCheckbox ? "group" : "radiogroup";
    const groupLabelId = `${name}-group-label`;
    return (
      <div class="ic_form_options" role={groupRole} aria-labelledby={groupLabelId}>
        <span id={groupLabelId} class="sr-only">
          {label}
        </span>

        {Object.entries(options).map(([key, option]) => {
          const isSelected = isCheckbox
            ? Array.isArray(value) && value.includes(key)
            : value === key;
          const optionLabel =
            name === "services"
              ? translation.services[key]
              : name === "budget"
                ? translation.budget[key]
                : option;

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
