import IconError from "~/assets/icons/icon_error.svg?w=20&h=20&jsx";
import IconSuccess from "~/assets/icons/icon_success.svg?w=20&h=20&jsx";

export const SERVICES_OPTIONS_EN = {
  branding: "Branding",
  website: "Website",
  mobile: "Mobile application",
  product: "Product design",
  seo: "SEO optimization",
  other: "Other",
};

export const BUDGET_OPTIONS_EN = {
  under1000: "Under EUR 1000",
  "1000-2000": "EUR 1000 - EUR 2000",
  "2000-5000": "EUR 2000 - EUR 5000",
  over5000: "EUR 5000+",
  other: "Other",
};

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
