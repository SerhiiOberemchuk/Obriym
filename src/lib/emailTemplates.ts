const BRAND = {
  black: "#111111",
  white: "#ffffff",
  greyDark: "#505050",
  grey: "#6f6f6f",
  blue: "#70aeff",
  blueLight: "#cce1fd",
  pink: "#fcc0dc",
  pinkLight: "#ffe5f1",
  greenLight: "#8ce7a6",
  background: "#f6faff",
  border: "#e7eef8",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function wrapEmailTemplate(content: {
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  footer?: string;
}) {
  const { eyebrow, title, intro, body, footer } = content;

  return `
    <div style="margin:0;padding:32px 16px;background:${BRAND.background};font-family:'Plus Jakarta Sans',Arial,sans-serif;color:${BRAND.black};">
      <div style="max-width:720px;margin:0 auto;">
        <div style="margin-bottom:18px;padding:0 8px;">
          <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:${BRAND.pinkLight};color:${BRAND.black};font-size:12px;line-height:1;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
            ${eyebrow}
          </div>
        </div>

        <div style="position:relative;overflow:hidden;background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:32px;box-shadow:0 24px 70px rgba(17,17,17,0.08);">
          <div style="position:absolute;top:-48px;right:-12px;width:180px;height:180px;border-radius:50%;background:${BRAND.pink};opacity:0.45;"></div>
          <div style="position:absolute;bottom:-60px;left:-24px;width:200px;height:200px;border-radius:50%;background:${BRAND.blueLight};opacity:0.7;"></div>
          <div style="position:absolute;top:96px;left:28px;width:14px;height:14px;border-radius:50%;background:${BRAND.greenLight};"></div>

          <div style="position:relative;padding:40px 32px 20px;border-bottom:1px solid ${BRAND.border};">
            <div style="font-size:14px;line-height:1.4;color:${BRAND.grey};margin-bottom:14px;">Obriym Agency</div>
            <h1 style="margin:0 0 14px;font-size:32px;line-height:1.1;font-weight:800;color:${BRAND.black};">${title}</h1>
            <p style="margin:0;max-width:560px;font-size:16px;line-height:1.7;color:${BRAND.greyDark};">${intro}</p>
          </div>

          <div style="position:relative;padding:28px 32px 36px;">
            ${body}
          </div>
        </div>

        <div style="padding:18px 8px 0;color:${BRAND.grey};font-size:13px;line-height:1.7;">
          ${footer ?? "This message was generated from the Obriym website contact form."}
        </div>
      </div>
    </div>
  `;
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:14px 0 10px;vertical-align:top;font-size:12px;line-height:1.2;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.grey};width:120px;">
        ${label}
      </td>
      <td style="padding:14px 0 10px;vertical-align:top;font-size:15px;line-height:1.7;color:${BRAND.black};">
        ${value}
      </td>
    </tr>
  `;
}

function serviceBadges(services: string[]) {
  return services
    .map(
      service => `
        <span style="display:inline-block;margin:0 8px 8px 0;padding:10px 14px;border-radius:999px;background:${BRAND.blueLight};color:${BRAND.black};font-size:13px;line-height:1.1;font-weight:700;">
          ${escapeHtml(service)}
        </span>
      `,
    )
    .join("");
}

export function getEmailHtmlToUs(data: {
  name?: string;
  email: string;
  services: string[];
  budget: string;
  message: string;
}) {
  const { name = "Dear Client", email, services, budget, message } = data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeBudget = escapeHtml(budget);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return wrapEmailTemplate({
    eyebrow: "New Inquiry",
    title: "New contact request",
    intro:
      "A new lead just came in through the Obriym website. The contact details and project context are below.",
    body: `
      <div style="margin-bottom:24px;padding:20px 22px;border-radius:24px;background:${BRAND.background};border:1px solid ${BRAND.border};">
        <div style="margin-bottom:12px;font-size:13px;line-height:1.4;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.grey};">
          Requested Services
        </div>
        <div>${serviceBadges(services)}</div>
      </div>

      <table role="presentation" style="width:100%;border-collapse:collapse;">
        ${detailRow("Name", safeName)}
        ${detailRow("Email", `<a href="mailto:${safeEmail}" style="color:${BRAND.black};text-decoration:none;border-bottom:1px solid ${BRAND.blue};">${safeEmail}</a>`)}
        ${detailRow("Budget", safeBudget)}
        ${detailRow(
          "Message",
          `<div style="padding:16px 18px;border-radius:20px;background:${BRAND.pinkLight};color:${BRAND.black};">${safeMessage}</div>`,
        )}
      </table>
    `,
    footer: "Internal notification from the Obriym website contact form.",
  });
}

export function getEmailHtmlToUser(name?: string) {
  const safeName = name ? escapeHtml(name) : "";

  return wrapEmailTemplate({
    eyebrow: "Thanks for reaching out",
    title: `We got your message${safeName ? `, ${safeName}` : ""}`,
    intro:
      "Thank you for contacting Obriym. Your request is in our inbox, and we will review it shortly.",
    body: `
      <div style="margin-bottom:24px;padding:22px;border-radius:24px;background:${BRAND.background};border:1px solid ${BRAND.border};">
        <p style="margin:0 0 12px;font-size:16px;line-height:1.7;color:${BRAND.greyDark};">
          We usually reply with the next steps, clarifying questions, or an initial estimate after reviewing your request.
        </p>
        <p style="margin:0;font-size:16px;line-height:1.7;color:${BRAND.greyDark};">
          If your project has strict deadlines, budgets, or technical constraints, we will take them into account in the first response.
        </p>
      </div>

      <div style="display:inline-block;padding:14px 18px;border-radius:18px;background:${BRAND.black};color:${BRAND.white};font-size:14px;line-height:1.4;font-weight:700;">
        Obriym team will get back to you shortly
      </div>
    `,
    footer: "If you did not submit this request, you can safely ignore this email.",
  });
}
