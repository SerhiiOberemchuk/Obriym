import * as v from "valibot";
import { ContactSchema } from "~/schemas/contactSchema";

export type ContactForm = v.InferInput<typeof ContactSchema>;

export type ContactFormResponse = {
  id?: string;
};
