export type QA = { id: string; q: string; a: string };

export const faqStructure = {
  process: ["services", "timeline", "cms", "ecommerce", "integrations"],
  pricing_quality_seo: ["pricing", "performance", "seo", "i18n", "a11y", "analytics", "security"],
  postlaunch_support: ["handover", "maintenance", "migration"],
} as const;

export const ids = Object.values(faqStructure).flat();
export type FaqId = (typeof ids)[number];
export type Groupes = keyof typeof faqStructure;
