import { component$, useStylesScoped$ } from "@qwik.dev/core";
// import { inlineTranslate } from "qwik-speak";
import styles from "./options-group_styles.css?inline";
import { OptionsGroupProps } from "~/types/contact-form.type";

export const OptionsGroup = component$(
  ({ name, type, options, label, value, ...props }: OptionsGroupProps) => {
    // const t = inlineTranslate();
    useStylesScoped$(styles);

    const isCheckbox = type === "checkbox";
    const groupRole = isCheckbox ? "group" : "radiogroup";
    const groupLabelId = `${name}-group-label`;
    return (
      // <div class="ic_form_options" role={groupRole} aria-labelledby={groupLabelId}>
      //   <span id={groupLabelId} class="sr-only">
      //     {label}
      //   </span>
      //   {options.map(option => {
      //     const isSelected = isCheckbox
      //       ? Array.isArray(value) && value.includes(option)
      //       : value === option;

      //     return (
      //       <label key={option} class={`ic_form_option ${isSelected ? "selected" : ""}`}>
      //         <input
      //           {...props}
      //           type={type}
      //           value={option}
      //           checked={isSelected}
      //           class="visually-hidden"
      //           aria-checked={isSelected}
      //         />
      //         <span class="grey_dark btn_body ic_form_label">{option}</span>
      //       </label>
      //     );
      //   })}
      // </div>
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
                {...props}
                type={type}
                value={key}
                checked={isSelected}
                class="visually-hidden"
                aria-checked={isSelected}
              />
              <span class="grey_dark btn_body ic_form_label">
                {/* {t(`services.mobile`)} */}

                {label}
              </span>
            </label>
          );
        })}
      </div>
    );
  },
);

{
  /* <div class="ic_form_options" role={groupRole} aria-labelledby={groupLabelId}>
  <span id={groupLabelId} class="sr-only">
    {label}
  </span>

  {Object.entries(options).map(([key, label]) => {
    const isSelected = isCheckbox ? Array.isArray(value) && value.includes(key) : value === key;
    return (
      <label key={key} class={`ic_form_option ${isSelected ? "selected" : ""}`}>
        <input
          {...props}
          type={type}
          value={key}
          checked={isSelected}
          class="visually-hidden"
          aria-checked={isSelected}
        />
        <span class="grey_dark btn_body ic_form_label">
          {t(`services-options.${option}@@${option}`)}
          {t(`services-options.${key}@@${label}`)}
          {t("services-options.mobile@@Мобільний застосунок")}
          {t("services-options.mobile@@Mobile application")}
        </span>
      </label>
    );
  })}
</div>; */
}
