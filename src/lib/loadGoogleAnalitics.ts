import Clarity from "@microsoft/clarity";
import { gtag, install } from "ga-gtag";

const GA_MEASUREMENT_ID = "G-VH4ZJDDVDG";
const CLARITY_PROJECT_ID = "wag39p63ny";

let isClarityInitialized = false;

export const loadAnalytics = () => {
  install(GA_MEASUREMENT_ID, { send_page_view: true });
  gtag("consent", "update", { ad_storage: "granted", analytics_storage: "granted" });

  if (CLARITY_PROJECT_ID && !isClarityInitialized) {
    Clarity.init(CLARITY_PROJECT_ID);
    isClarityInitialized = true;
  }

  if (isClarityInitialized) {
    Clarity.consent(true);
  }

  console.log("Analytics enabled");
};

export const disableAnalitics = () => {
  gtag("consent", "update", { ad_storage: "denied", analytics_storage: "denied" });

  if (isClarityInitialized) {
    Clarity.consent(false);
  }

  console.log("Analytics disabled");
};
