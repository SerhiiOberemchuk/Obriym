import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./text-input_styles.css?inline";
import { TextInputProps } from "~/types/contact-form.type";
import FormError from "~/components/common/form-error/form_error";

export const TextInput = component$(
  ({
    label,
    type,
    name,
    idPrefix,
    value,
    placeholder,
    error,
    onInput$,
    onBlur$,
  }: TextInputProps) => {
    useStylesScoped$(styles);

    const id = idPrefix ? `${idPrefix}-${name}-input` : `${name}-input`;
    const errorId = idPrefix ? `${idPrefix}-${name}-error` : `${name}-error`;
    return (
      <div class={`ic_form_fieldset_wrp ${error ? "has-error" : ""}`}>
        {
          <label class="form-label" for={id}>
            {label}
          </label>
        }

        <input
          id={id}
          type={type}
          onInput$={onInput$}
          onBlur$={onBlur$}
          name={name}
          value={value}
          class={`btn_body grey_dark ic_form_input ${error ? "border-red" : ""}`}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
        />
        <FormError error={error} id={errorId} />
      </div>
    );
  },
);
