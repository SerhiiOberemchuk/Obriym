import { component$, useStylesScoped$, useSignal, useTask$ } from "@qwik.dev/core";
import { Popover, usePopover } from "@qwik-ui/headless";
import styles from "./styles_inputs.css?inline";
import {
  formAction$,
  useForm,
  valiForm$,
  // type SubmitHandler,
  // type InitialValues,
} from "@modular-forms/qwik";

import * as v from "valibot";
import { useContactFormLoader } from "~/routes/[...lang]";
import IconError from "/public/icons/icon_error.svg?w=20&h20&jsx";
import { Resend } from "resend";
import { SERVICES_OPTIONS, BUDGET_OPTIONS } from "~/const/form-const";

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

type ContactFormResponse = {
  id?: string;
};
// === Server action ===
//formAction$<ContactForm, ContactFormResponse>
export const useFormAction = formAction$<ContactForm, ContactFormResponse>(
  async (values, requestEvent) => {
    // Runs on server

    const { services, budget, name, email, message } = values;
    const resendApiKey = requestEvent.env.get("RESEND_API_KEY");
    const emailReceiver = requestEvent.env.get("EMAIL_RECEIVER");

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
      return {
        status: "success",
        message: "Your message was sent successfully!",
        data: {
          id: result?.data?.id,
        },
      };
    } catch (err) {
      console.error("Email error:", err);
      return {
        status: "error",
        message: "There was an error sending your message.",
      };
    }
  },
  valiForm$(ContactSchema),
);

export default component$(() => {
  useStylesScoped$(styles);
  const anchorRef = useSignal<HTMLElement>();
  const popoverId = "contact-popover";
  const { showPopover, hidePopover } = usePopover(popoverId);
  const message = useSignal<string>("");

  const [contactForm, { Form, Field }] = useForm<ContactForm, ContactFormResponse>({
    loader: useContactFormLoader(),
    action: useFormAction(),
    validate: valiForm$(ContactSchema),
  });

  useTask$(({ track }) => {
    track(() => contactForm.response);
    console.log("response", contactForm.response);

    const result = contactForm.response;
    if (result.status === "success") {
      message.value = `Your message was sent successfully!`;
      console.log("🎉 Попытка показать поповер");
      showPopover();
      // contactForm.reset();
    } else if (result.status === "error") {
      message.value = `There was an error sending your message`;
      showPopover();
    }
  });
  // const handleSubmit: QRL<SubmitHandler<ContactForm>> = $(values => {
  //   // Runs on client
  //   console.log("Submitted on client:", values);
  // });
  return (
    <div class="ic_content_box " ref={anchorRef}>
      <Form class="ic_form">
        {/* //onSubmit$={handleSubmit} */}
        <Field name="services" type="string[]">
          {(field, props) => (
            <div class="ic_form_fieldset_wrp">
              <fieldset class="ic_form_fieldset">
                <legend class="H5 grey_dark">How can we help you?</legend>

                <div class="ic_form_options">
                  {SERVICES_OPTIONS.map(option => {
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
            <div class="ic_form_fieldset_wrp">
              <fieldset class="ic_form_fieldset">
                <legend class="H5 grey_dark">Your budget range?</legend>
                <div class="ic_form_options">
                  {BUDGET_OPTIONS.map(budget => {
                    const isSelected = field.value === budget;

                    return (
                      <label key={budget} class={`ic_form_option ${isSelected ? "selected" : ""}`}>
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
        <div class="ic_form_add_wrp">
          <fieldset class="ic_form_fieldset">
            <legend class="H5 grey_dark">Additional details</legend>
            <div class="ic_form_add_block">
              <div class="ic_form_imputs_block">
                <Field name="name">
                  {(field, props) => (
                    <div class="ic_form_fieldset_wrp">
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
                    <div class="ic_form_fieldset_wrp">
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
                  <div class="ic_form_fieldset_wrp">
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
        </div>
      </Form>
      {/* === Popover  === */}
      <Popover.Root id={popoverId} bind:anchor={anchorRef}>
        <Popover.Panel class="popover-panel popover-programmatic">{message.value}</Popover.Panel>
      </Popover.Root>
    </div>
  );
});
