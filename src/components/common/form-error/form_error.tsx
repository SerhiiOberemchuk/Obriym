import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./form_error.css?inline";
import IconError from "~/assets/icons/icon_error.svg?w=20&h20&jsx";

interface FormErrorProps {
  error?: string;
  id?: string;
}
export default component$(({ error, id }: FormErrorProps) => {
  useStylesScoped$(styles);
  return (
    <div
      id={id}
      role="alert"
      aria-live="assertive"
      class={`ic_form_error helper_text red ${error ? "visible" : ""}`}
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
