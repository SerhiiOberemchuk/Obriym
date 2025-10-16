import * as v from "valibot";

export const ContactSchema = v.object({
  services: v.pipe(
    v.array(v.string("errors.services.type@@Each service must be a string.")),
    v.minLength(1, "errors.services.required@@Please select at least one service."),
  ),
  budget: v.pipe(v.string(), v.nonEmpty("errors.budget.required@@Please choose your budget.")),
  name: v.string(),
  email: v.pipe(
    v.string(),
    v.nonEmpty("errors.email.required@@Please enter your email."),
    v.email("errors.email.invalid@@Invalid email address."),
  ),
  message: v.pipe(v.string(), v.nonEmpty("errors.message.required@@Please enter your message.")),
});
