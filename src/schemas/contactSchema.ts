import * as v from "valibot";

export const ContactSchema = v.object({
  services: v.pipe(
    v.array(v.string("errors.services.type")),
    v.minLength(1, "errors.services.required"),
  ),
  budget: v.pipe(v.string(), v.nonEmpty("errors.budget.required")),
  name: v.string(),
  email: v.pipe(v.string(), v.nonEmpty("errors.email.required"), v.email("errors.email.invalid")),
  message: v.pipe(v.string(), v.nonEmpty("errors.message.required")),
});

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
