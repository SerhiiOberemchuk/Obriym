import IconError from "/public/icons/icon_error.svg?w=20&h20&jsx";
import IconSuccess from "/public/icons/icon_success.svg?w=20&h20&jsx";

export const SERVICES_OPTIONS = [
  "Branding",
  "Website",
  "Mobile application",
  "Product design",
  "SEO optimization",
  "other",
];

export const BUDGET_OPTIONS = ["under 1000€", "1000€ - 2000€", "2000€ - 5000€", "5000€+", "other"];
export const ALERT_MESSAGE = {
  success: {
    icon: IconSuccess,
    title: "Cool!",
    message: "Your message was sent successfully. We will get back to you shortly!",
  },
  failed: {
    icon: IconError,
    title: "Oops!",
    message: "Something went wrong. Please try again.",
  },
};
