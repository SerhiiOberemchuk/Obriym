import * as v from "valibot";
import { inlineTranslate } from "qwik-speak";

const t = inlineTranslate();
// export const ContactSchema = v.object({
//   services: v.pipe(
//     v.array(v.string(), "Each service must be a string."),
//     v.minLength(1, "Select at least one service."),
//   ),
//   budget: v.pipe(v.string(), v.nonEmpty("Please choose your budget.")),
//   // name: v.pipe(v.string(), v.nonEmpty("Please enter your name.")),
//   name: v.string(),
//   email: v.pipe(
//     v.string(),
//     v.nonEmpty("Please enter your email."),
//     v.email("Invalid email address."),
//   ),
//   message: v.pipe(v.string(), v.nonEmpty("Please enter your description.")),
// });

export const ContactSchema = v.object({
  services: v.pipe(
    v.array(v.string("errors.services.type@@Each service must be a string.")),
    v.minLength(1, "errors.services.required"),
  ),
  budget: v.pipe(v.string(), v.nonEmpty("errors.budget.required@@Please choose your budget.")),
  name: v.string(),
  email: v.pipe(
    v.string(),
    v.nonEmpty("errors.email.required@@Please enter your email."),
    v.email("errors.email.invalid@@Invalid email address."),
  ),
  message: v.pipe(
    v.string(),
    v.nonEmpty("errors.message.required@@Please enter your description."),
  ),
});
// export const ContactSchema = v.object({
//   services: v.pipe(
//     v.array(v.string(), t("errors.services.type@@Each service must be a string.")),
//     v.minLength(1, t("errors.services.required@@Select at least one service.")),
//   ),
//   budget: v.pipe(
//     v.string(),
//     v.nonEmpty(t("errors.budget.required@@Please choose your budget.")),
//   ),
//   email: v.pipe(
//     v.string(),
//     v.nonEmpty(t("errors.email.required@@Please enter your email.")),
//     v.email(t("errors.email.invalid@@Invalid email address.")),
//   ),
//   message: v.pipe(
//     v.string(),
//     v.nonEmpty(t("errors.message.required@@Please enter your description.")),
//   ),
//   name: v.string(),
// });
