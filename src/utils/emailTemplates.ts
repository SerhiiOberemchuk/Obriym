export function getEmailHtmlToUs(data: {
  name?: string;
  email: string;
  services: string[];
  budget: string;
  message: string;
}) {
  const { name = "Dear Client", email, services, budget, message } = data;

  return `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Services:</strong> ${services.join(", ")}</p>
    <p><strong>Budget:</strong> ${budget}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;
}

export function getEmailHtmlToUser(name?: string) {
  return `
    <h2>Thank you for your inquiry${name ? `, ${name}` : ""}!</h2>
    <p>We have received your message and will contact you shortly.</p>
    <p>Best regards, the Obriym team.</p>
  `;
}
