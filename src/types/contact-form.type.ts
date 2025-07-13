import * as v from "valibot";
import { ContactSchema } from "~/schemas/contactSchema";

export type ContactForm = v.InferInput<typeof ContactSchema>;

export type ContactFormResponse = {
  id?: string;
};

export type TextInputProps = {
  name: string;
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error?: string;
  onInput$?: (event: Event, element: HTMLInputElement) => void;
  onChange$?: (event: Event, element: HTMLInputElement) => void;
  onBlur$?: (event: Event, element: HTMLInputElement) => void;
};

export type OptionsGroupProps = {
  name: string;
  type: "checkbox" | "radio";
  options: string[];
  label: string;
  value: string[] | string | undefined;
  error?: string;
  onInput$?: (event: Event, element: HTMLInputElement) => void;
  onChange$?: (event: Event, element: HTMLInputElement) => void;
  onBlur$?: (event: Event, element: HTMLInputElement) => void;
};
