import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./form_error.css?inline";
import IconError from "~/assets/icons/icon_error.svg?w=20&h20&jsx";

interface FormErrorProps {
  error?: string;
}
export default component$(({ error }: FormErrorProps) => {
  useStylesScoped$(styles);
  return (
    <div
      class={`ic_form_error helper_text red ${error ? "visible" : ""}`}
      role="alert"
      aria-live="assertive"
    >
      {error && (
        <>
          <IconError />
          <span>{error}</span>
        </>
      )}
    </div>
  );
});
