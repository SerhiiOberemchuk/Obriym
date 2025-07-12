import { Resend } from "resend";

export async function sendEmail(
  resendApiKey: string,
  params: {
    from: string;
    to: string | string[];
    subject: string;
    html: string;
  },
) {
  const resend = new Resend(resendApiKey);
  console.log("in sendEmail", params.from);
  return resend.emails.send({
    from: params.from,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });
}
