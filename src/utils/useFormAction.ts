import { formAction$, valiForm$ } from "@modular-forms/qwik";
import { ContactSchema } from "~/schemas/contactSchema";
import { ContactForm, ContactFormResponse } from "~/types/contact-form.type";
import { sendEmail } from "~/utils/sendEmail";
import { getEmailHtmlToUs, getEmailHtmlToUser } from "./emailTemplates";

export const useFormAction = formAction$<ContactForm, ContactFormResponse>(
  async (values, requestEvent) => {
    const { services, budget, name, email, message } = values;

    const resendApiKey = requestEvent.env.get("RESEND_API_KEY");
    const myDomainEmail = requestEvent.env.get("EMAIL_RECEIVER");

    if (!resendApiKey) throw new Error("RESEND_API_KEY is not defined");
    if (!myDomainEmail) throw new Error("EMAIL_RECEIVER is not defined");

    const emailHtmlToUs = getEmailHtmlToUs({ name, email, services, budget, message });
    const emailHtmlToUser = getEmailHtmlToUser(name);
    try {
      const resultToUs = await sendEmail(resendApiKey, {
        from: myDomainEmail,
        to: myDomainEmail,
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
        from: myDomainEmail,
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
