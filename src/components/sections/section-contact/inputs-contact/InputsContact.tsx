import { component$, useStylesScoped$, useSignal, useTask$ } from "@qwik.dev/core";
import { usePopover } from "@qwik-ui/headless";
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import styles from "./styles_inputs.css?inline";

import { ContactSchema } from "~/schemas/contactSchema";
import { ContactForm, ContactFormResponse } from "~/types/contact-form.type";
import { AlertType } from "~/types/alert.type";

import { useContactFormLoader } from "~/routes/[...lang]";
import { useFormAction } from "~/utils/useFormAction";

import { SERVICES_OPTIONS, BUDGET_OPTIONS } from "~/const/form-const";

import PopoverComponent from "~/components/common/popover/Popover";
import FormError from "~/components/common/form-error/form_error";
import { TextInput } from "~/components/common/text-input/TextInput";
import { OptionsGroup } from "~/components/common/options-group/OptionsGroup";

export default component$(() => {
  useStylesScoped$(styles);
  const anchorRef = useSignal<HTMLElement>();
  const popoverId = "contact-popover";
  const { showPopover } = usePopover(popoverId);
  const message = useSignal<AlertType>("success");

  const [contactForm, { Form, Field }] = useForm<ContactForm, ContactFormResponse>({
    loader: useContactFormLoader(),
    action: useFormAction(),
    validate: valiForm$(ContactSchema),
  });

  useTask$(({ track }) => {
    track(() => contactForm.response);

    const result = contactForm.response;
    if (result.status === "success") {
      message.value = "success";

      showPopover();

      reset(contactForm);
    } else if (result.status === "error") {
      message.value = "failed";
      showPopover();
    }
  });

  return (
    // ref={anchorRef}
    <section class="ic_content_box " aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" class="sr-only">
        Contact Form
      </h2>
      <Form class="ic_form" aria-describedby="contact-form-description">
        <p id="contact-form-description" class="sr-only">
          Please fill out the following form to send us your request.
        </p>
        {/* SERVICES (checkboxes)  */}
        <Field name="services" type="string[]">
          {(field, props) => (
            <div class="ic_form_fieldset_wrp">
              <fieldset class="ic_form_fieldset">
                <legend class="H5 grey_dark">How can we help you?</legend>
                <OptionsGroup
                  {...props}
                  name="services"
                  type="checkbox"
                  options={SERVICES_OPTIONS}
                  label="Services offered"
                  value={field.value}
                />
              </fieldset>

              <FormError error={field.error} />
            </div>
          )}
        </Field>
        {/* Budget */}
        <Field name="budget">
          {(field, props) => (
            <div class="ic_form_fieldset_wrp">
              <fieldset class="ic_form_fieldset">
                <legend class="H5 grey_dark">Your budget range?</legend>
                <OptionsGroup
                  {...props}
                  name="budget"
                  type="radio"
                  options={BUDGET_OPTIONS}
                  label="Budget options"
                  value={field.value}
                />
              </fieldset>

              <FormError error={field.error} />
            </div>
          )}
        </Field>
        {/* NAME , EMAIL, DESCRIPTION */}
        <div class="ic_form_add_wrp">
          <fieldset class="ic_form_fieldset">
            <legend class="H5 grey_dark">Additional details</legend>
            <div class="ic_form_add_block">
              <div class="ic_form_inputs_block">
                {/* Name */}
                <Field name="name">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      name="name"
                      type="text"
                      value={field.value}
                      error={field.error}
                      placeholder="Enter your name"
                      label="Your name"
                    />
                  )}
                </Field>
                {/* ................ */}

                {/* Email */}
                <Field name="email">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      name="email"
                      type="email"
                      value={field.value}
                      error={field.error}
                      placeholder="Enter your email"
                      label="Your email"
                    />
                  )}
                </Field>
              </div>
              {/* MESSAGE */}
              <Field name="message">
                {(field, props) => (
                  <div class="ic_form_fieldset_wrp" ref={anchorRef}>
                    <label class="sr-only" for="message-textarea">
                      Your message
                    </label>
                    <textarea
                      {...props}
                      value={field.value}
                      id="message-textarea"
                      placeholder="Add description"
                      class={`btn_body grey_dark ic_form_textarea ${field.error ? "border-red" : ""}`}
                    >
                      {field.value}
                    </textarea>

                    <FormError error={field.error} />
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
      {/* anchor={anchorRef} */}
      <PopoverComponent popoverId={popoverId} type={message.value} anchor={anchorRef} />
    </section>
  );
});
