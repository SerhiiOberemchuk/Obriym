export const howToWorkSchemaUA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to build your SEO-friendly website with OBRIYM",
  description:
    "Follow these 3 simple steps to launch a modern, SEO-optimized website tailored to your business goals.",
  //   image: "https://obriym.com/images/how-it-works-cover.jpg",
  totalTime: "P14D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: "1500",
  },
  supply: [
    {
      "@type": "HowToSupply",
      name: "Business requirements",
    },
    {
      "@type": "HowToSupply",
      name: "Company branding materials",
    },
  ],
  tool: [
    {
      "@type": "HowToTool",
      name: "Project management platform",
    },
    {
      "@type": "HowToTool",
      name: "Modern web development stack",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#how-it-work",
      name: "Consultation",
      image: "https://obriym.com/#how-it-work",
      text: "We begin with a consultation to understand your business goals and challenges.",
      timeRequired: "PT1H",
    },
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#how-it-work",
      name: "Get the Plan",
      image: "https://obriym.com/#how-it-work",
      text: "You receive a detailed proposal including scope, transparent budget, and realistic timeline.",
      timeRequired: "P3D",
    },
    {
      "@type": "HowToStep",
      url: "https://obriym.com/#how-it-work",
      name: "Make It Real",
      image: "https://obriym.com/#how-it-work",
      text: "We design, develop, and launch your SEO-friendly website, keeping you updated at every stage.",
      timeRequired: "P10D",
    },
  ],
};
