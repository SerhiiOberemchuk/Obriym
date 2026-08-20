"use server";

import * as v from "valibot";
import { ContactSchema } from "~/schemas/contactSchema";
import type { ContactForm, ContactFormResponse } from "~/types/contact-form.type";
import { getEmailHtmlToUs, getEmailHtmlToUser } from "~/lib/emailTemplates";
import { sendEmail } from "~/lib/sendEmail";

/**
 * Server-side replacement for the qwik-city `formAction$` that used to live in
 * `src/utils/useFormAction.ts`. Validation runs again here because a Server
 * Action is a public endpoint.
 */
export async function submitContactForm(values: ContactForm): Promise<ContactFormResponse> {
  const parsed = v.safeParse(ContactSchema, values);

  if (!parsed.success) {
    return { status: "error", message: "errors.form.invalid" };
  }

  const { services, budget, name, email, message } = parsed.output;

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailReceiver = process.env.EMAIL_RECEIVER;
    const emailFrom = process.env.EMAIL_FROM || emailReceiver;

    if (!resendApiKey || !emailReceiver || !emailFrom) {
      console.error("[contact] Missing email configuration");
      return {
        status: "error",
        message: "Server email configuration is incomplete.",
      };
    }

    const resultToUs = await sendEmail(resendApiKey, {
      from: emailFrom,
      to: emailReceiver,
      subject: "New contact form submission",
      html: getEmailHtmlToUs({ name, email, services, budget, message }),
    });

    if (resultToUs.error) {
      console.error("[contact] API error:", resultToUs.error);
      return {
        status: "error",
        message: resultToUs.error.message || "Error sending email to us.",
      };
    }

    await sendEmail(resendApiKey, {
      from: emailFrom,
      to: email,
      subject: "Thank you for reaching out!",
      html: getEmailHtmlToUser(name),
    }).catch(err => {
      console.error("[contact] Failed to send thank you email to user:", err);
    });

    return {
      status: "success",
      message: "Your message was sent successfully!",
      data: { id: resultToUs?.data?.id },
    };
  } catch (err) {
    console.error("[contact] Error sending email to us:", err);
    return { status: "error", message: "There was an error sending your message." };
  }
}
