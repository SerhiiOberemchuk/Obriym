import { formAction$, valiForm$ } from "@modular-forms/qwik";
import { ContactSchema } from "~/schemas/contactSchema";
import { ContactForm, ContactFormResponse } from "~/types/contact-form.type";
import { sendEmail } from "~/utils/sendEmail";
import { getEmailHtmlToUs, getEmailHtmlToUser } from "./emailTemplates";

function getEnvValue(
  requestEvent: { env?: { get: (key: string) => string | undefined } },
  key: string,
) {
  const fromRequest = requestEvent.env?.get(key);
  if (fromRequest) return fromRequest;
  if (typeof process !== "undefined") {
    return process.env?.[key];
  }
  return undefined;
}

export const useFormAction = formAction$<ContactForm, ContactFormResponse>(
  async (values, requestEvent) => {
    const { services, budget, name, email, message } = values;
    try {
      const resendApiKey = getEnvValue(requestEvent, "RESEND_API_KEY");
      const emailReceiver = getEnvValue(requestEvent, "EMAIL_RECEIVER");
      const emailFrom = getEnvValue(requestEvent, "EMAIL_FROM") || emailReceiver;

      if (!resendApiKey) {
        return {
          status: "error",
          message: "Server email configuration is incomplete: RESEND_API_KEY is missing.",
        };
      }

      if (!emailReceiver) {
        return {
          status: "error",
          message: "Server email configuration is incomplete: EMAIL_RECEIVER is missing.",
        };
      }

      if (!emailFrom) {
        return {
          status: "error",
          message: "Server email configuration is incomplete: EMAIL_FROM is missing.",
        };
      }

      const emailHtmlToUs = getEmailHtmlToUs({ name, email, services, budget, message });
      const emailHtmlToUser = getEmailHtmlToUser(name);

      const resultToUs = await sendEmail(resendApiKey, {
        from: emailFrom,
        to: emailReceiver,
        subject: "New contact form submission",
        html: emailHtmlToUs,
      });
      if (resultToUs.error) {
        console.error("API error:", resultToUs.error);
        return {
          status: "error",
          message: resultToUs.error.message || "Error sending email to us.",
        };
      }

      await sendEmail(resendApiKey, {
        from: emailFrom,
        to: email,
        subject: "Thank you for reaching out!",
        html: emailHtmlToUser,
      }).catch(err => {
        console.error("Failed to send thank you email to user:", err);
      });

      return {
        status: "success",
        message: "Your message was sent successfully!",
        data: {
          id: resultToUs?.data?.id,
        },
      };
    } catch (err) {
      console.error("Error sending email to us:", err);
      return {
        status: "error",
        message: "There was an error sending your message.",
      };
    }
  },
  valiForm$(ContactSchema),
);
