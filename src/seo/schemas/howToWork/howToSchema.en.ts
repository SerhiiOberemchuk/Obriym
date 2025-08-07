export const howToWorkSchemaEN = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to build your SEO-friendly website with OBRIYM",
  description:
    "Follow these 3 simple steps to launch a modern, SEO-optimized website tailored to your business goals in Italy and Europe.",
  inLanguage: "en",
  totalTime: "P14D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: "1500",
  },
  supply: [
    { "@type": "HowToSupply", name: "Business requirements" },
    { "@type": "HowToSupply", name: "Company branding materials" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Project management platform" },
    { "@type": "HowToTool", name: "Modern web development stack" },
  ],
  step: [
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step1",
      name: "Consultation",
      image: "https://obriym.com/images/how-it-works-step1.jpg",
      text: "We begin with a consultation to understand your business goals and challenges.",
      timeRequired: "PT1H",
    },
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step2",
      name: "Get the Plan",
      image: "https://obriym.com/images/how-it-works-step2.jpg",
      text: "You receive a detailed proposal including scope, transparent budget, and realistic timeline.",
      timeRequired: "P2D",
    },
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#step3",
      name: "Make It Real",
      image: "https://obriym.com/images/how-it-works-step3.jpg",
      text: "We design, develop, and launch your SEO-friendly website, keeping you updated at every stage.",
      timeRequired: "P10D",
    },
  ],
};
