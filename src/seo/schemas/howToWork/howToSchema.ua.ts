export const howToWorkSchemaUA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Як створити SEO-оптимізований сайт з OBRIYM",
  description:
    "Дотримуйтесь цих 3 простих кроків, щоб запустити сучасний SEO-оптимізований сайт, адаптований під ваш бізнес.",
  inLanguage: "uk",
  totalTime: "P14D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: "1500",
  },
  supply: [
    { "@type": "HowToSupply", name: "Вимоги бізнесу" },
    { "@type": "HowToSupply", name: "Брендові матеріали компанії" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Платформа для управління проєктами" },
    { "@type": "HowToTool", name: "Сучасний стек веброзробки" },
  ],
  step: [
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step1",
      name: "Консультація",
      image: "https://obriym.com/images/how-it-works-step1.jpg",
      text: "Ми починаємо з консультації, щоб зрозуміти ваші бізнес-цілі та виклики.",
      timeRequired: "PT1H",
    },
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step2",
      name: "Отримайте план",
      image: "https://obriym.com/images/how-it-works-step2.jpg",
      text: "Ви отримуєте детальну пропозицію з обсягом робіт, прозорим бюджетом і реалістичним терміном.",
      timeRequired: "P2D",
    },
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step3",
      name: "Втілення в життя",
      image: "https://obriym.com/images/how-it-works-step3.jpg",
      text: "Ми розробляємо та запускаємо ваш SEO-оптимізований сайт, інформуючи на кожному етапі.",
      timeRequired: "P10D",
    },
  ],
};
