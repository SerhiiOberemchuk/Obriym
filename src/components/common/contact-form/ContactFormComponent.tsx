import { component$, useStylesScoped$, useSignal, useTask$ } from "@qwik.dev/core";
import { usePopover } from "@qwik-ui/headless";
import { inlineTranslate } from "qwik-speak"; //, useSpeakLocale
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import styles from "./contact-form_styles.css?inline";

import { ContactSchema } from "~/schemas/contactSchema";
import { ContactForm, ContactFormResponse } from "~/types/contact-form.type";
import { AlertType } from "~/types/alert.type";

import { useContactFormLoader } from "~/routes/[...lang]";
import { useFormAction } from "~/utils/useFormAction";

import {
  SERVICES_OPTIONS_EN,
  // SERVICES_OPTIONS_IT,
  // SERVICES_OPTIONS_UA,
  BUDGET_OPTIONS_EN,
  // BUDGET_OPTIONS_IT,
  // BUDGET_OPTIONS_UA,
} from "~/const/form-const";

import PopoverComponent from "~/components/common/popover/Popover";
import FormError from "~/components/common/form-error/form_error";
import { TextInput } from "~/components/common/text-input/TextInput";
import { OptionsGroup } from "~/components/common/options-group/OptionsGroup";

type ContactFormComponentProps = {
  modal?: boolean;
};

export default component$(({ modal }: ContactFormComponentProps) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  //const locale = useSpeakLocale();
  //console.log("locale", locale.lang); //uk-UA it-IT en-EU
  // const SERVICES_OPTIONS =
  //   locale.lang === "uk-UA"
  //     ? SERVICES_OPTIONS_UA
  //     : locale.lang === "it-IT"
  //       ? SERVICES_OPTIONS_IT
  //       : SERVICES_OPTIONS_EN;

  // const BUDGET_OPTIONS =
  //   locale.lang === "uk-UA"
  //     ? BUDGET_OPTIONS_UA
  //     : locale.lang === "it-IT"
  //       ? BUDGET_OPTIONS_IT
  //       : BUDGET_OPTIONS_EN;

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
    <div aria-labelledby="contact-form-title">
      {modal ? (
        <h2 id="contact-form-title" class="H3_uppercase contact-form-title">
          {t("app.form.title.modal@@Let's start you project")}
        </h2>
      ) : (
        <h2 id="contact-form-title" class="sr-only">
          {t("app.form.title.not-modal@@Contact Form")}
        </h2>
      )}
      <Form class="ic_form" aria-describedby="contact-form-description">
        <p id="contact-form-description" class="sr-only">
          {t("app.form.sr-only.title@@Please fill out the following form to send us your request.")}
        </p>

        {/* SERVICES (checkboxes)  */}
        <Field name="services" type="string[]">
          {(field, props) => (
            <div class="ic_form_fieldset_wrp">
              <fieldset class="ic_form_fieldset">
                {modal ? (
                  <legend class="H5 grey_dark">
                    {t("app.form.services.legend.modal@@What can we create for you?")}
                  </legend>
                ) : (
                  <legend class="H5 grey_dark">
                    {t("app.form.services.legend.not-modal@@How can we help you?")}
                  </legend>
                )}
                <OptionsGroup
                  {...props}
                  name="services"
                  type="checkbox"
                  options={SERVICES_OPTIONS_EN}
                  label={t("app.form.services.sr-label@@Services offered")}
                  value={field.value}
                />
              </fieldset>

              <FormError error={field.error} id={`services-error`} />
            </div>
          )}
        </Field>
        {/* Budget */}
        <Field name="budget">
          {(field, props) => (
            <div class="ic_form_fieldset_wrp">
              <fieldset class="ic_form_fieldset">
                <legend class="H5 grey_dark">
                  {t("app.form.budget.legend@@Your budget range?")}
                </legend>
                <OptionsGroup
                  {...props}
                  name="budget"
                  type="radio"
                  options={BUDGET_OPTIONS_EN}
                  label={t("app.form.budget.sr-label@@Budget options")}
                  value={field.value}
                />
              </fieldset>

              <FormError error={field.error} id={`budget-error`} />
            </div>
          )}
        </Field>
        {/* NAME , EMAIL, DESCRIPTION */}
        <div class="ic_form_add_wrp">
          <fieldset class="ic_form_fieldset">
            <legend class="H5 grey_dark">
              {t("app.form.additional.legend@@Additional details")}
            </legend>
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
                      placeholder={t("app.form.name.placeholder@@Enter your name")}
                      label={t("app.form.name.label@@Your name")}
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
                      placeholder={t("app.form.email.placeholder@@Enter your email")}
                      label={t("app.form.email.label@@Your email")}
                    />
                  )}
                </Field>
              </div>
              {/* MESSAGE */}
              <Field name="message">
                {(field, props) => (
                  <div class="ic_form_fieldset_wrp" ref={anchorRef}>
                    <label class="sr-only" for="message-textarea">
                      label={t("app.form.message.sr-label@@Your message")}
                    </label>
                    <textarea
                      {...props}
                      value={field.value}
                      id="message-textarea"
                      // placeholder={
                      //   modal
                      //     ? t("app.form.message.placeholder.modal@@Add information")
                      //     : t("app.form.message.placeholder.not-modal@@Add description")
                      // }
                      placeholder={t("app.form.message.placeholder.not-modal@@Add information")}
                      class={`btn_body grey_dark ic_form_textarea ${field.error ? "border-red" : ""}`}
                    >
                      {field.value}
                    </textarea>

                    <FormError error={field.error} id={`message-error`} />
                  </div>
                )}
              </Field>
            </div>
          </fieldset>
          <div class="ic_form_btn_wrp">
            {modal && (
              <button class={`btn_body black ic_form_modal_btn `} disabled={contactForm.submitting}>
                {t("app.form.btn-close.modal@@Close")}
              </button>
            )}
            <button
              type="submit"
              class={`btn_body black ic_form_btn `}
              disabled={contactForm.submitting}
            >
              {contactForm.submitting
                ? t("app.form.btn.submitting@@Sending...")
                : t("app.form.btn.text@@Send a request")}
            </button>
          </div>
        </div>
      </Form>
      {/* anchor={anchorRef} */}
      <PopoverComponent popoverId={popoverId} type={message.value} anchor={anchorRef} />
    </div>
  );
});
