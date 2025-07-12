import { component$, useStylesScoped$, useSignal, useTask$ } from "@qwik.dev/core";
import { usePopover } from "@qwik-ui/headless";
import styles from "./styles_inputs.css?inline";
import {
  useForm,
  valiForm$,
  // type SubmitHandler,
  // type InitialValues,
} from "@modular-forms/qwik";
import { ContactSchema } from "~/schemas/contactSchema";
import { ContactForm, ContactFormResponse } from "~/types/contact-form.type";

import { useContactFormLoader } from "~/routes/[...lang]";
import IconError from "~/assets/icons/icon_error.svg?w=20&h20&jsx";

import { SERVICES_OPTIONS, BUDGET_OPTIONS } from "~/const/form-const";
import { AlertType } from "~/types/alert.type";
import PopoverComponent from "~/components/common/popover/Popover";
import { useFormAction } from "~/utils/useFormAction";

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
      // contactForm.reset();
    } else if (result.status === "error") {
      message.value = "failed";
      showPopover();
    }
  });

  return (
    // ref={anchorRef}
    <div class="ic_content_box ">
      <Form class="ic_form">
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
              <div class="ic_form_inputs_block">
                <Field name="name">
                  {(field, props) => (
                    <div class="ic_form_fieldset_wrp">
                      <input
                        {...props}
                        value={field.value}
                        class={`btn_body grey_dark ic_form_input ${field.error ? "border-red" : ""}`}
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
                        class={`btn_body grey_dark ic_form_input ${field.error ? "border-red" : ""}`}
                        placeholder="Enter your email"
                      />

                      {/* {field.error && (
                        <div class="ic_form_error helper_text red ">
                          <IconError />
                          <span>{field.error}</span>
                        </div>
                      )} */}
                      <div class={`ic_form_error helper_text red ${field.error ? "visible" : ""}`}>
                        {field.error ? (
                          <>
                            <IconError />
                            <span>{field.error}</span>
                          </>
                        ) : (
                          "\u00A0"
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              <Field name="message">
                {(field, props) => (
                  <div class="ic_form_fieldset_wrp" ref={anchorRef}>
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
      {/* anchor={anchorRef} */}
      <PopoverComponent popoverId={popoverId} type={message.value} anchor={anchorRef} />
    </div>
  );
});
