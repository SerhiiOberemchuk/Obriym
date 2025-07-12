import { Resend } from "resend";
import { formAction$, valiForm$ } from "@modular-forms/qwik";
import { ContactSchema } from "~/schemas/contactSchema";
import { ContactForm, ContactFormResponse } from "~/types/contact-form.type";

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
        to: emailReceiver, // Replace with our email
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
