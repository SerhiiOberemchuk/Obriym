"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import styles from "./contact-form_styles.module.css";

import { ContactSchema } from "../../../schemas/contactSchema";
import { ContactForm } from "~/types/contact-form.type";

import { submitContactForm } from "~/app/actions/contact";
import { Modal } from "~/components/ui/modal";
import { usePopover } from "~/components/ui/popover";
import { useLetsWorkModal } from "~/context/app-context";

import { SERVICES_OPTIONS_EN, BUDGET_OPTIONS_EN } from "~/const/form-const";

import FormError from "~/components/common/form-error/form_error";
import { TextInput } from "~/components/common/text-input/TextInput";
import { OptionsGroup } from "~/components/common/options-group/OptionsGroup";
import IconClose from "~/assets/icons/icon_close.svg";
import { PopoverId } from "../popover/Popover";

/**
 * The valibot schema stores its messages as `errors.x.y@@Default text`; only the
 * key half is a translation key, so the default text is dropped here.
 */
const errorKey = (message?: string) => message?.split("@@")[0];

type ContactFormComponentProps = {
  modal?: boolean;
};
export default function ContactFormComponent({ modal }: ContactFormComponentProps) {
  const t = useTranslations();

  const anchorRef = useRef<HTMLDivElement>(null);
  const popoverSuccess = usePopover(PopoverId.contactFormSuccess);
  const popoverFail = usePopover(PopoverId.contactFormError);
  const { setLetsWorkOpen } = useLetsWorkModal();
  const formId = modal ? "contact-form-modal" : "contact-form";
  const titleId = `${formId}-title`;
  const descriptionId = `${formId}-description`;
  const messageId = `${formId}-message`;
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: valibotResolver(ContactSchema),
    defaultValues: { services: [], budget: "", name: "", email: "", message: "" },
  });

  const onSubmit = handleSubmit(async values => {
    const result = await submitContactForm(values);

    if (result.status === "success") {
      if (modal) {
        setLetsWorkOpen(false);
      }
      popoverFail.hidePopover();
      popoverSuccess.showPopover();
      setTimeout(() => {
        popoverSuccess.hidePopover();
      }, 3000);
      reset();
    } else {
      popoverSuccess.hidePopover();
      popoverFail.showPopover();
    }
  });

  const nameError = errorKey(errors.name?.message);
  const emailError = errorKey(errors.email?.message);
  const messageError = errorKey(errors.message?.message);

  return (
    <div className="modal_lw">
      {modal ? (
        <h2 id={titleId} className={`H3_uppercase ${styles["contact-form-title"]}`}>
          {t("app.form.title.modal")}
        </h2>
      ) : (
        <h2 id={titleId} className="sr-only">
          {t("app.form.title.not-modal")}
        </h2>
      )}
      <form
        className={styles.ic_form}
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        onSubmit={onSubmit}
        noValidate
      >
        <p id={descriptionId} className="sr-only">
          {t("app.form.sr-only.title")}
        </p>

        {/* SERVICES (checkboxes)  */}
        <Controller
          name="services"
          control={control}
          render={({ field, fieldState }) => {
            const error = errorKey(fieldState.error?.message);

            return (
              <div className="ic_form_fieldset_wrp">
                <fieldset className={styles.ic_form_fieldset}>
                  {modal ? (
                    <legend className="H5 grey_dark">{t("app.form.services.legend.modal")}</legend>
                  ) : (
                    <legend className="H5 grey_dark">
                      {t("app.form.services.legend.not-modal")}
                    </legend>
                  )}
                  <OptionsGroup
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name="services"
                    idPrefix={formId}
                    type="checkbox"
                    options={SERVICES_OPTIONS_EN}
                    label={t("app.form.services.sr-label")}
                    value={field.value}
                    error={error}
                  />
                </fieldset>

                <FormError error={error} id={`${formId}-services-error`} />
              </div>
            );
          }}
        />
        {/* Budget */}
        <Controller
          name="budget"
          control={control}
          render={({ field, fieldState }) => {
            const error = errorKey(fieldState.error?.message);

            return (
              <div className="ic_form_fieldset_wrp">
                <fieldset className={styles.ic_form_fieldset}>
                  <legend className="H5 grey_dark">{t("app.form.budget.legend")}</legend>
                  <OptionsGroup
                    name="budget"
                    idPrefix={formId}
                    type="radio"
                    options={BUDGET_OPTIONS_EN}
                    label={t("app.form.budget.sr-label")}
                    value={field.value}
                    error={error}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </fieldset>

                <FormError error={error} id={`${formId}-budget-error`} />
              </div>
            );
          }}
        />
        {/* NAME , EMAIL, DESCRIPTION */}
        <div className={styles.ic_form_add_wrp}>
          <fieldset className={styles.ic_form_fieldset}>
            <legend className="H5 grey_dark">{t("app.form.additional.legend")}</legend>
            <div className={styles.ic_form_add_block}>
              <div className={styles.ic_form_inputs_block}>
                {/* Name */}
                <TextInput
                  name="name"
                  idPrefix={formId}
                  type="text"
                  error={nameError}
                  registration={register("name")}
                  placeholder={t("app.form.name.placeholder")}
                  label={t("app.form.name.label")}
                />
                {/* ................ */}

                {/* Email */}
                <TextInput
                  name="email"
                  idPrefix={formId}
                  type="email"
                  error={emailError}
                  registration={register("email")}
                  placeholder={t("app.form.email.placeholder")}
                  label={t("app.form.email.label")}
                />
              </div>
              {/* MESSAGE */}
              <div className="ic_form_fieldset_wrp" ref={anchorRef}>
                <label className="sr-only" htmlFor={messageId}>
                  {t("app.form.message.sr-label")}
                </label>
                <textarea
                  {...register("message")}
                  role="textbox"
                  id={messageId}
                  aria-multiline="true"
                  aria-invalid={!!messageError}
                  aria-errormessage={messageError ? `${formId}-message-error` : undefined}
                  aria-placeholder={t("app.form.message.placeholder.not-modal")}
                  placeholder={t("app.form.message.placeholder.not-modal")}
                  className={`btn_body grey_dark ${styles.ic_form_textarea} ${messageError ? styles["border-red"] : ""}`}
                />

                <FormError error={messageError} id={`${formId}-message-error`} />
              </div>
            </div>
          </fieldset>
          <div className={styles.ic_form_btn_wrp}>
            {modal && (
              <Modal.Close className="btn_body black ic_form_modal_btn" disabled={isSubmitting}>
                <span className="modal_close_text">{t("app.form.btn-close.modal")}</span>
                <IconClose className="modal_close_icon" width={24} height={24} />
              </Modal.Close>
            )}
            <button
              type="submit"
              className={`btn_body black ${styles.ic_form_btn} `}
              disabled={isSubmitting}
            >
              {isSubmitting ? t("app.form.btn.submitting") : t("app.form.btn.text")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
