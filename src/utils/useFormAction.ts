import { formAction$, valiForm$ } from "@modular-forms/qwik";
import { ContactSchema } from "~/schemas/contactSchema";
import { ContactForm, ContactFormResponse } from "~/types/contact-form.type";
import { sendEmail } from "~/utils/sendEmail";
import { getEmailHtmlToUs } from "./emailTemplates"; //, getEmailHtmlToUser

export const useFormAction = formAction$<ContactForm, ContactFormResponse>(
  async (values, requestEvent) => {
    // Runs on server

    const { services, budget, name, email, message } = values;

    const resendApiKey = requestEvent.env.get("RESEND_API_KEY");
    const emailReceiver = requestEvent.env.get("EMAIL_RECEIVER");

    if (!resendApiKey) throw new Error("RESEND_API_KEY is not defined");
    if (!emailReceiver) throw new Error("EMAIL_RECEIVER is not defined");

    const emailHtmlToUs = getEmailHtmlToUs({ name, email, services, budget, message });
    //const emailHtmlToUser = getEmailHtmlToUser(name);
    try {
      const resultToUs = await sendEmail(resendApiKey, {
        from: "Acme <onboarding@resend.dev>",
        to: emailReceiver, //"info@obriym.com",
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
      // WE NEED IT TO SEND EMAIL TO USER
      // Trying to send an email to a user, but not waiting for an error
      // await sendEmail(resendApiKey, {
      //   from: "Acme <onboarding@resend.dev>", //"info@obriym.com",
      //   to: email,
      //   subject: "Thank you for reaching out!",
      //   html: emailHtmlToUser,
      // }).catch(err => {
      //   console.error("Failed to send thank you email to user:", err);
      //   // The error is logged, but does not affect the response to the client for popover
      // });

      //We return a successful response to the client, because email has been sent to us
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
