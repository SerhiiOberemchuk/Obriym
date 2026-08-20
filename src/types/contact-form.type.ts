import * as v from "valibot";
import { ContactSchema } from "../schemas/contactSchema";

export type ContactForm = v.InferInput<typeof ContactSchema>;

/** What the `submitContactForm` server action resolves to. */
export type ContactFormResponse = {
  status: "success" | "error";
  message: string;
  data?: { id?: string };
};
