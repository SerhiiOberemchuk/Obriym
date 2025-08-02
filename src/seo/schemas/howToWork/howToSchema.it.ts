export const howToWorkSchemaIT = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Come creare un sito web SEO-friendly con OBRIYM",
  description:
    "Segui questi 3 semplici passaggi per lanciare un sito web moderno e ottimizzato SEO, adattato ai tuoi obiettivi di business.",
  inLanguage: "it",
  totalTime: "P14D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: "1500",
  },
  supply: [
    { "@type": "HowToSupply", name: "Requisiti aziendali" },
    { "@type": "HowToSupply", name: "Materiali di branding aziendale" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Piattaforma di project management" },
    { "@type": "HowToTool", name: "Stack di sviluppo web moderno" },
  ],
  step: [
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step1",
      name: "Consulenza",
      image: "https://obriym.com/images/how-it-works-step1.jpg",
      text: "Iniziamo con una consulenza per comprendere i tuoi obiettivi e le sfide aziendali.",
      timeRequired: "PT1H",
    },
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step2",
      name: "Ricevi il piano",
      image: "https://obriym.com/images/how-it-works-step2.jpg",
      text: "Ricevi una proposta dettagliata con ambito, budget trasparente e tempistiche realistiche.",
      timeRequired: "P2D",
    },
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step3",
      name: "Realizzalo",
      image: "https://obriym.com/images/how-it-works-step3.jpg",
      text: "Progettiamo, sviluppiamo e lanciamo il tuo sito web SEO-friendly, aggiornandoti in ogni fase.",
      timeRequired: "P10D",
    },
  ],
};
