// eslint-disable-next-line qwik/loader-location
import { component$, useStylesScoped$, type QRL, $ } from "@qwik.dev/core";
import styles from "./styles_inputs.css?inline";
import {
  formAction$,
  useForm,
  valiForm$,
  type SubmitHandler,
  type InitialValues,
} from "@modular-forms/qwik";
import { routeLoader$ } from "@qwik.dev/router";
import * as v from "valibot";

// interface ContactForm {
//   services: string[];
//   budget: string;
//   name: string;
//   email: string;
//   message: string;
// }

// interface InputsContactProps {
//   initialValues: ContactForm;
// }
// === Schema ===
const ContactSchema = v.object({
  services: v.array(v.string(), "Select at least one service."),
  budget: v.pipe(v.string(), v.nonEmpty("Please choose your budget.")),
  // name: v.pipe(v.string(), v.nonEmpty("Please enter your name.")),
  name: v.string(),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Invalid email address."),
  ),
  message: v.pipe(v.string(), v.nonEmpty("Please enter your description.")),
});
type ContactForm = v.InferInput<typeof ContactSchema>;

// === Server action ===
export const useFormAction = formAction$<ContactForm>(values => {
  console.log("Submitted on server:", values);
}, valiForm$(ContactSchema));

interface InputsContactProps {
  initialValues: InitialValues<ContactForm>;
}
export default component$(({ initialValues }: InputsContactProps) => {
  useStylesScoped$(styles);
  return (
    <div class="ic_content_box">
      <p>Inputs Contact</p>
    </div>
  );
});
