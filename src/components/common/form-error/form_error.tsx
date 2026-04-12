import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useSpeakContext } from "qwik-speak";
import styles from "./form_error.css?inline";
import IconError from "~/assets/icons/icon_error.svg?w=20&h20&jsx";

interface FormErrorProps {
  error?: string;
  id?: string;
}

export default component$(({ error, id }: FormErrorProps) => {
  const { translation } = useSpeakContext();
  const errors = translation?.errors;
  useStylesScoped$(styles);

  const message = (() => {
    switch (error) {
      case "errors.services.type@@Each service must be a string.":
        return errors?.services?.type ?? error;
      case "errors.services.required@@Please select at least one service.":
        return errors?.services?.required ?? error;
      case "errors.budget.required@@Please choose your budget.":
        return errors?.budget?.required ?? error;
      case "errors.name.required@@Please enter your name.":
        return errors?.name?.required ?? error;
      case "errors.name.max@@Name is too long.":
        return errors?.name?.max ?? error;
      case "errors.email.required@@Please enter your email.":
        return errors?.email?.required ?? error;
      case "errors.email.invalid@@Invalid email address.":
        return errors?.email?.invalid ?? error;
      case "errors.message.required@@Please enter your message.":
        return errors?.message?.required ?? error;
      case "errors.message.max@@Message is too long.":
        return errors?.message?.max ?? error;
      default:
        return error;
    }
  })();

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
          <span>{message}</span>
        </>
      )}
    </div>
  );
});
