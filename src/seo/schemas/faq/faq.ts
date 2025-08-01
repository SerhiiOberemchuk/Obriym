export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On average, our projects take 2 to 4 weeks, depending on complexity.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO optimization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all our websites are built SEO-friendly with modern standards.",
      },
    },
  ],
};
