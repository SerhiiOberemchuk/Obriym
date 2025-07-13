import { component$, useStylesScoped$ } from "@qwik.dev/core";
import FormError from "~/components/common/form-error/form_error";
import styles from "./text-input_styles.css?inline";

type TextInputProps = {
  name: string;
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error?: string;
  onInput$?: (event: Event, element: HTMLInputElement) => void;
  onChange$?: (event: Event, element: HTMLInputElement) => void;
  onBlur$?: (event: Event, element: HTMLInputElement) => void;
};

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
