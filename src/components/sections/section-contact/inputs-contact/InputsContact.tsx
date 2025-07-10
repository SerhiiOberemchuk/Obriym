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
import IconError from "/public/icons/icon_error.svg?w=20&h20&jsx";
import { Resend } from "resend";

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
export const useFormAction = formAction$<ContactForm>(async (values, requestEvent) => {
  // Runs on server
  console.log("Submitted on server:", values);
  const { services, budget, name, email, message } = values;
  const resendApiKey = requestEvent.env.get("RESEND_API_KEY");
  const emailReceiver = requestEvent.env.get("EMAIL_RECEIVER");
  console.log(("email", emailReceiver));
  if (!emailReceiver) {
    throw new Error("EMAIL_RECEIVER is not defined in environment variables.");
  }
  const resend = new Resend(resendApiKey);
  const emailHtml = `
  <h2>New Contact Request</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Services:</strong> ${services.join(", ")}</p>
  <p><strong>Budget:</strong> ${budget}</p>
  <p><strong>Message:</strong></p>
  <p>${message}</p>
`;
  try {
    const result = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: emailReceiver, // Replace with your email
      subject: "New contact form submission",
      html: emailHtml,
    });

    console.log("Email sent:", result);
  } catch (err) {
    console.error("Email error:", err);
  }
}, valiForm$(ContactSchema));
// export const useFormAction = formAction$<ContactForm>(values => {
//   // Runs on server
//   console.log("Submitted on server:", values);
// }, valiForm$(ContactSchema));
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
      <Form onSubmit$={handleSubmit} class="ic_form">
        <Field name="services" type="string[]">
          {(field, props) => (
            <div class="ic_form_fieldset_wrp">
              <fieldset class="ic_form_fieldset">
                <legend class="H5 grey_dark">How can we help you?</legend>

                <div class="ic_form_options">
                  {[
                    "Branding",
                    "Website",
                    "Mobile application",
                    "Product design",
                    "SEO optimization",
                    "other",
                  ].map(option => {
                    const isChecked = field.value?.includes(option);

                    return (
                      <label key={option} class={`ic_form_option ${isChecked ? "selected" : ""}`}>
                        <input
                          {...props}
                          type="checkbox"
                          value={option}
                          checked={isChecked}
                          class="visually-hidden"
                        />
                        <span class="grey_dark btn_body ic_form_label">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {field.error && (
                <div class="ic_form_error helper_text red ">
                  <IconError />
                  <span>{field.error}</span>
                </div>
              )}
            </div>
          )}
        </Field>
        <Field name="budget">
          {(field, props) => (
            <>
              <fieldset class="ic_form_fieldset">
                <legend class="H5 grey_dark">Your budget range?</legend>
                <div class="ic_form_options">
                  {["under 1000€", "1000€ - 2000€", "2000€ - 5000€", "5000€+", "other"].map(
                    budget => {
                      const isSelected = field.value === budget;

                      return (
                        <label
                          key={budget}
                          class={`ic_form_option ${isSelected ? "selected" : ""}`}
                        >
                          <input
                            {...props}
                            type="radio"
                            value={budget}
                            checked={isSelected}
                            class="visually-hidden"
                          />
                          <span class="grey_dark btn_body ic_form_label">{budget}</span>
                        </label>
                      );
                    },
                  )}
                </div>
              </fieldset>

              {field.error && (
                <div class="ic_form_error helper_text red ">
                  <IconError />
                  <span>{field.error}</span>
                </div>
              )}
            </>
          )}
        </Field>

        <fieldset class="ic_form_fieldset">
          <legend class="H5 grey_dark">Additional details</legend>
          <div class="ic_form_block">
            <div class="ic_form_imput_block">
              <Field name="name">
                {(field, props) => (
                  <div>
                    <input
                      {...props}
                      value={field.value}
                      class={`btn_body grey_dark ic_form_imput ${field.error ? "border-red" : ""}`}
                      placeholder="Enter your name"
                    />

                    {field.error && (
                      <div class="ic_form_error helper_text red">
                        <IconError />
                        <span>{field.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <Field name="email">
                {(field, props) => (
                  <div>
                    <input
                      {...props}
                      type="email"
                      value={field.value}
                      class={`btn_body grey_dark ic_form_imput ${field.error ? "border-red" : ""}`}
                      placeholder="Enter your email"
                    />

                    {field.error && (
                      <div class="ic_form_error helper_text red">
                        <IconError />
                        <span>{field.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
            </div>

            <Field name="message">
              {(field, props) => (
                <div>
                  <textarea
                    {...props}
                    placeholder="Add description"
                    class={`btn_body grey_dark ic_form_textarea ${field.error ? "border-red" : ""}`}
                  >
                    {field.value}
                  </textarea>

                  {field.error && (
                    <div class="ic_form_error helper_text red ">
                      <IconError />
                      <span>{field.error}</span>
                    </div>
                  )}
                </div>
              )}
            </Field>
          </div>
        </fieldset>

        <button type="submit" class="btn_body black ic_form_btn">
          Send information
        </button>
      </Form>
    </div>
  );
});
