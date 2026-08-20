export type QA = { id: string; q: string; a: string };

export const faqStructure = {
  process: ["services", "timeline", "cms", "ecommerce", "integrations"],
  pricing_quality_seo: ["pricing", "performance", "seo", "i18n", "a11y", "analytics", "security"],
  postlaunch_support: ["handover", "maintenance", "migration"],
} as const;

export const ids = Object.values(faqStructure).flat();
export type FaqId = (typeof ids)[number];
export type Groupes = keyof typeof faqStructure;

type TranslateFn = (key: string, params?: Record<string, string | number | Date>) => string;

export const getFaqQuestion = (t: TranslateFn, id: FaqId): string => {
  switch (id) {
    case "services":
      return t("faq.items.services.q");
    case "timeline":
      return t("faq.items.timeline.q");
    case "cms":
      return t("faq.items.cms.q");
    case "ecommerce":
      return t("faq.items.ecommerce.q");
    case "integrations":
      return t("faq.items.integrations.q");
    case "pricing":
      return t("faq.items.pricing.q");
    case "performance":
      return t("faq.items.performance.q");
    case "seo":
      return t("faq.items.seo.q");
    case "i18n":
      return t("faq.items.i18n.q");
    case "a11y":
      return t("faq.items.a11y.q");
    case "analytics":
      return t("faq.items.analytics.q");
    case "security":
      return t("faq.items.security.q");
    case "handover":
      return t("faq.items.handover.q");
    case "maintenance":
      return t("faq.items.maintenance.q");
    case "migration":
      return t("faq.items.migration.q");
  }
};

export const getFaqAnswer = (t: TranslateFn, id: FaqId): string => {
  switch (id) {
    case "services":
      return t("faq.items.services.a");
    case "timeline":
      return t("faq.items.timeline.a");
    case "cms":
      return t("faq.items.cms.a");
    case "ecommerce":
      return t("faq.items.ecommerce.a");
    case "integrations":
      return t("faq.items.integrations.a");
    case "pricing":
      return t("faq.items.pricing.a");
    case "performance":
      return t("faq.items.performance.a");
    case "seo":
      return t("faq.items.seo.a");
    case "i18n":
      return t("faq.items.i18n.a");
    case "a11y":
      return t("faq.items.a11y.a");
    case "analytics":
      return t("faq.items.analytics.a");
    case "security":
      return t("faq.items.security.a");
    case "handover":
      return t("faq.items.handover.a");
    case "maintenance":
      return t("faq.items.maintenance.a");
    case "migration":
      return t("faq.items.migration.a");
  }
};

export const getFaqLink = (t: TranslateFn, id: FaqId): string => {
  switch (id) {
    case "services":
      return t("faq.items.services.link");
    case "timeline":
      return t("faq.items.timeline.link");
    case "cms":
      return t("faq.items.cms.link");
    case "ecommerce":
      return t("faq.items.ecommerce.link");
    case "integrations":
      return t("faq.items.integrations.link");
    case "pricing":
      return t("faq.items.pricing.link");
    case "performance":
      return t("faq.items.performance.link");
    case "seo":
      return t("faq.items.seo.link");
    case "i18n":
      return t("faq.items.i18n.link");
    case "a11y":
      return t("faq.items.a11y.link");
    case "analytics":
      return t("faq.items.analytics.link");
    case "security":
      return t("faq.items.security.link");
    case "handover":
      return t("faq.items.handover.link");
    case "maintenance":
      return t("faq.items.maintenance.link");
    case "migration":
      return t("faq.items.migration.link");
  }
};

export const getFaqSectionTitle = (t: TranslateFn, groupe: Groupes): string => {
  switch (groupe) {
    case "process":
      return t("faq.question.section.process");
    case "pricing_quality_seo":
      return t("faq.question.section.pricing_quality_seo");
    case "postlaunch_support":
      return t("faq.question.section.postlaunch_support");
  }
};
