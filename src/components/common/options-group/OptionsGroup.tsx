import { component$, useStylesScoped$ } from "@qwik.dev/core";

import styles from "./options-group_styles.css?inline";

type OptionsGroupProps = {
  name: string;
  type: "checkbox" | "radio";
  options: string[];
  label: string;
  value: string[] | string | undefined;
  error?: string;
  onInput$?: (event: Event, element: HTMLInputElement) => void;
  onChange$?: (event: Event, element: HTMLInputElement) => void;
  onBlur$?: (event: Event, element: HTMLInputElement) => void;
};

export const OptionsGroup = component$(
  ({ name, type, options, label, value, ...props }: OptionsGroupProps) => {
    useStylesScoped$(styles);

    const isCheckbox = type === "checkbox";
    const groupRole = isCheckbox ? "group" : "radiogroup";
    const groupLabelId = `${name}-group-label`;
    return (
      <div class="ic_form_options" role={groupRole} aria-labelledby={groupLabelId}>
        <span id={groupLabelId} class="sr-only">
          {label}
        </span>
        {options.map(option => {
          const isSelected = isCheckbox
            ? Array.isArray(value) && value.includes(option)
            : value === option;

          return (
            <label key={option} class={`ic_form_option ${isSelected ? "selected" : ""}`}>
              <input
                {...props}
                type={type}
                value={option}
                checked={isSelected}
                class="visually-hidden"
                aria-checked={isSelected}
              />
              <span class="grey_dark btn_body ic_form_label">{option}</span>
            </label>
          );
        })}
      </div>
    );
  },
);
