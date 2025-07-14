import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./text-input_styles.css?inline";
import { TextInputProps } from "~/types/contact-form.type";
import FormError from "~/components/common/form-error/form_error";

export const TextInput = component$(
  ({ label, type, name, value, placeholder, error, ...props }: TextInputProps) => {
    // const { name } = props;
    useStylesScoped$(styles);

    const id = `${name}-input`;
    return (
      <div class="ic_form_fieldset_wrp">
        {
          <label class="sr-only" for={id}>
            {label}
          </label>
        }

        <input
          {...props}
          id={id}
          type={type}
          //   name={name}
          value={value}
          class={`btn_body grey_dark ic_form_input ${error ? "border-red" : ""}`}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <FormError error={error} id={`${name}-error`} />
      </div>
    );
  },
);
