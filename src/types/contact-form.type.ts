import * as v from "valibot";
import type { QRL } from "@builder.io/qwik";
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
  onInput$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  onChange$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  onBlur$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  ref?: QRL<(element: HTMLInputElement) => void>;
};

export type OptionsGroupProps = {
  name: string;
  type: "checkbox" | "radio";
  options: Record<string, string>;
  label: string;
  value: string[] | string | undefined;
  error?: string;
  onInput$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  onChange$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  onBlur$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  ref?: QRL<(element: HTMLInputElement) => void>;
};
