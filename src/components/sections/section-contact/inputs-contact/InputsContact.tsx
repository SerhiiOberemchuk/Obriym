// eslint-disable-next-line qwik/loader-location
import { component$, useStylesScoped$, type QRL, $ } from "@qwik.dev/core";
import styles from "./styles_inputs.css?inline";
import {
  formAction$,
  useForm,
  valiForm$,
  type SubmitHandler,
  // type InitialValues,
} from "@modular-forms/qwik";

import * as v from "valibot";
import { useContactFormLoader } from "~/routes/[...lang]";

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
  services: v.pipe(
    v.array(v.string(), "Each service must be a string."),
    v.minLength(1, "Select at least one service."),
  ),
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
  // Runs on server
  console.log("Submitted on server:", values);
}, valiForm$(ContactSchema));

export default component$(() => {
  useStylesScoped$(styles);
  const [contactForm, { Form, Field }] = useForm<ContactForm>({
    loader: useContactFormLoader(),
    action: useFormAction(),
    validate: valiForm$(ContactSchema),
  });

  const handleSubmit: QRL<SubmitHandler<ContactForm>> = $(values => {
    // Runs on client
    console.log("Submitted on client:", values);
  });
  return (
    <div class="ic_content_box">
      <Form onSubmit$={handleSubmit}>
        <Field name="services" type="string[]">
          {(field, props) => (
            <>
              <fieldset class="services-fieldset">
                <legend>How can we help you?</legend>

                {[
                  { label: "Bananas", value: "bananas" },
                  { label: "Apples", value: "apples" },
                  { label: "Grapes", value: "grapes" },
                ].map(({ label, value }) => {
                  const isChecked = field.value?.includes(value);

                  return (
                    <label key={value} class={`service-option ${isChecked ? "selected" : ""}`}>
                      <input
                        {...props}
                        type="checkbox"
                        value={value}
                        checked={isChecked}
                        class="visually-hidden"
                      />
                      <span class="service-label">{label}</span>
                    </label>
                  );
                })}
              </fieldset>

              {field.error && <div class="error">{field.error}</div>}
            </>
          )}
        </Field>
        {/* <fieldset>
          <legend>Your budget?</legend>
          {["<1000", "1000–2000", "2000–5000", ">5000"].map(budget => (
            <Field key={budget} name="budget">
              {(field, props) => (
                <label>
                  <input value={budget} type="radio" {...props} />
                  {budget}
                  {field.error && <div class="error">{field.error}</div>}
                </label>
              )}
            </Field>
          ))}
        </fieldset> */}
        <Field name="budget">
          {(field, props) => (
            <>
              <fieldset class="budget-fieldset">
                <legend>Your budget?</legend>

                {["<1000", "1000–2000", "2000–5000", ">5000"].map(budget => {
                  const isSelected = field.value === budget;

                  return (
                    <label key={budget} class={`budget-option ${isSelected ? "selected" : ""}`}>
                      <input
                        {...props}
                        type="radio"
                        value={budget}
                        checked={isSelected}
                        class="visually-hidden"
                      />
                      <span class="budget-label">{budget}</span>
                    </label>
                  );
                })}
              </fieldset>

              {field.error && <div class="error">{field.error}</div>}
            </>
          )}
        </Field>
        <Field name="name">
          {(field, props) => (
            <div>
              <label>
                Name:
                <input {...props} value={field.value} />
              </label>
              {field.error && <div class="error">{field.error}</div>}
            </div>
          )}
        </Field>

        <Field name="email">
          {(field, props) => (
            <div>
              <label>
                Email:
                <input {...props} type="email" value={field.value} />
              </label>
              {field.error && <div class="error">{field.error}</div>}
            </div>
          )}
        </Field>

        <Field name="message">
          {(field, props) => (
            <div>
              <label>
                Message:
                <textarea {...props}>{field.value}</textarea>
              </label>
            </div>
          )}
        </Field>

        <button type="submit">Send</button>
      </Form>
    </div>
  );
});
