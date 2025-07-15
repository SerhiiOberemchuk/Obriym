import IconError from "~/assets/icons/icon_error.svg?w=20&h20&jsx";
import IconSuccess from "~/assets/icons/icon_success.svg?w=20&h20&jsx";

// export const SERVICES_OPTIONS = [
//   "Branding",
//   "Website",
//   "Mobile application",
//   "Product design",
//   "SEO optimization",
//   "other",
// ];
export const SERVICES_OPTIONS_EN = {
  branding: "Branding",
  website: "Website",
  mobile: "Mobile application",
  product: "Product design",
  seo: "SEO optimization",
  other: "Other",
};
export const SERVICES_OPTIONS_UA = {
  branding: "Брендинг",
  website: "Вебсайт",
  mobile: "Мобільний застосунок",
  product: "Дизайн продукту",
  seo: "SEO оптимізація",
  other: "Інше",
};
export const SERVICES_OPTIONS_IT = {
  branding: "Branding",
  website: "Sito web",
  mobile: "Applicazione mobile",
  product: "Design del prodotto",
  seo: "Ottimizzazione SEO",
  other: "Altro",
};
// export const SERVICES_OPTIONS = ["branding", "website", "mobile", "product", "seo", "other"];

// export const BUDGET_OPTIONS = ["under 1000€", "1000€ - 2000€", "2000€ - 5000€", "5000€+", "other"];

export const BUDGET_OPTIONS_EN = {
  under1000: "Under 1000€",
  "1000-2000": "1000€ - 2000€",
  "2000-5000": "2000€ - 5000€",
  over5000: "5000€+",
  other: "Other",
};
export const BUDGET_OPTIONS_UA = {
  under1000: "До 1000€",
  "1000-2000": "1000€ - 2000€",
  "2000-5000": "2000€ - 5000€",
  over5000: "Більше 5000€",
  other: "Інше",
};
export const BUDGET_OPTIONS_IT = {
  under1000: "Meno di 1000€",
  "1000-2000": "1000€ - 2000€",
  "2000-5000": "2000€ - 5000€",
  over5000: "Oltre 5000€",
  other: "Altro",
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
