export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageEntry = {
  slug: string;
  navLabel: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  deliverables: string[];
  process: string[];
  faqs: ServiceFaq[];
};

export const SERVICE_PAGES: ServicePageEntry[] = [
  {
    slug: "website-development",
    navLabel: "Website Development",
    h1: "Website Development Services for Business Growth",
    lead:
      "We design and develop fast, SEO-ready websites that present your offer clearly, generate leads, and scale with your business.",
    metaTitle: "Website Development Services in Europe",
    metaDescription:
      "Custom website development for companies: strategy, UX UI, design, front-end and back-end implementation, SEO setup, analytics and launch support.",
    keywords:
      "website development services, custom website development, corporate website development, landing page development, business website agency",
    deliverables: [
      "Discovery workshop with goals, structure and conversion flow",
      "UX architecture and content wireframes for key pages",
      "Responsive UI design system and reusable components",
      "High-performance front-end with Core Web Vitals in focus",
      "CMS or custom admin panel setup for content updates",
      "Technical SEO baseline, schema, metadata, and analytics",
    ],
    process: [
      "Research your business, audience, and competitors",
      "Define page structure, conversion points, and user journeys",
      "Design visual direction and validate interaction flows",
      "Build, optimize, test, and deploy the production website",
      "Monitor performance and iterate after launch",
    ],
    faqs: [
      {
        question: "How long does a business website project usually take?",
        answer:
          "Most projects run 3 to 8 weeks depending on scope, language versions, and integrations.",
      },
      {
        question: "Can we migrate our current website without losing SEO?",
        answer:
          "Yes. We prepare redirect mapping, preserve important URLs, and validate indexing after release.",
      },
      {
        question: "Do you support multilingual websites?",
        answer:
          "Yes. We build multilingual structure with localized routing and technical SEO for each locale.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    navLabel: "E-commerce Development",
    h1: "E-commerce Development for Scalable Online Sales",
    lead:
      "We build conversion-focused online stores with reliable checkout flows, catalog management, and integrations for payment and delivery.",
    metaTitle: "E-commerce Development Services",
    metaDescription:
      "E-commerce website development for brands and retailers: storefront UX, cart and checkout, payments, shipping, CRM/ERP integrations, and performance optimization.",
    keywords:
      "ecommerce development, online store development, ecommerce website agency, custom ecommerce website, checkout optimization",
    deliverables: [
      "Store architecture for categories, filters, and product pages",
      "Cart and checkout UX optimized for conversion",
      "Payment gateway and shipping provider integrations",
      "Order management and notification workflows",
      "Analytics for funnel tracking and revenue attribution",
      "Technical SEO setup for product and category pages",
    ],
    process: [
      "Audit products, logistics, and business requirements",
      "Design customer journey from listing to payment",
      "Implement storefront and back-office integrations",
      "QA test checkout, taxes, shipping, and edge cases",
      "Launch with monitoring and post-launch optimization",
    ],
    faqs: [
      {
        question: "Do you build custom checkout flows?",
        answer:
          "Yes. We can implement custom checkout logic for subscriptions, bundles, or regional delivery rules.",
      },
      {
        question: "Can you integrate our CRM or ERP?",
        answer:
          "Yes. We connect stores to CRM/ERP systems for product sync, orders, and customer data flow.",
      },
      {
        question: "Is SEO included for product pages?",
        answer:
          "Yes. We configure technical SEO, clean URL structures, metadata, schema, and indexing rules.",
      },
    ],
  },
  {
    slug: "web-app-development",
    navLabel: "Web App Development",
    h1: "Custom Web App Development for Product Teams",
    lead:
      "We create reliable web applications for internal operations and customer-facing products with maintainable architecture and clear user flows.",
    metaTitle: "Web App Development Services",
    metaDescription:
      "Custom web app development from architecture to deployment: dashboards, user portals, internal tools, API integrations, testing, and long-term support.",
    keywords:
      "web app development, custom web application development, saas development agency, dashboard development, internal tools development",
    deliverables: [
      "Product scope, architecture, and technical roadmap",
      "User flows for key roles, permissions, and actions",
      "Scalable front-end and back-end implementation",
      "API integrations and external service orchestration",
      "Automated testing and release pipeline setup",
      "Security baseline and observability instrumentation",
    ],
    process: [
      "Shape requirements and prioritize MVP scope",
      "Design data model, architecture, and user experience",
      "Develop core modules in iterative milestones",
      "Run QA, performance checks, and security validation",
      "Deploy, measure usage, and plan next iterations",
    ],
    faqs: [
      {
        question: "Can you start from an MVP and scale later?",
        answer:
          "Yes. We structure architecture so new modules can be added without rebuilding the core.",
      },
      {
        question: "Do you work with existing codebases?",
        answer:
          "Yes. We can audit an existing app, stabilize it, and continue development with clear milestones.",
      },
      {
        question: "How do you handle quality and reliability?",
        answer:
          "We use test coverage for critical flows, staged releases, and monitoring for real-world stability.",
      },
    ],
  },
  {
    slug: "ux-ui-design",
    navLabel: "UX UI Design",
    h1: "UX UI Design for High-Conversion Digital Products",
    lead:
      "We design interfaces that are easy to use, visually consistent, and aligned with business goals across websites and web apps.",
    metaTitle: "UX UI Design Services",
    metaDescription:
      "UX UI design services for websites and web apps: user research, wireframes, design systems, prototypes, and interface optimization for conversion.",
    keywords:
      "ux ui design services, website ui design, product ux design, conversion focused design, design system development",
    deliverables: [
      "UX research synthesis and user intent mapping",
      "Information architecture and wireframes",
      "UI concept with visual hierarchy and accessibility",
      "Design system tokens, components, and states",
      "Interactive prototypes for handoff and validation",
      "Developer-ready specs and asset documentation",
    ],
    process: [
      "Analyze users, product goals, and current pain points",
      "Build wireframes and validate interaction concepts",
      "Create final UI, motion states, and design system",
      "Support implementation with review and QA",
      "Measure behavior and improve weak conversion points",
    ],
    faqs: [
      {
        question: "Can you redesign only key pages first?",
        answer:
          "Yes. We often start with high-impact pages and expand to the full product in phases.",
      },
      {
        question: "Do you work inside our existing brand system?",
        answer:
          "Yes. We can follow your existing identity or evolve it where needed for digital channels.",
      },
      {
        question: "Will developers get implementation-ready files?",
        answer:
          "Yes. We provide structured components, states, and clear implementation specs.",
      },
    ],
  },
  {
    slug: "technical-seo",
    navLabel: "Technical SEO",
    h1: "Technical SEO and Performance Optimization Services",
    lead:
      "We improve indexability, speed, and search visibility with technical SEO implementation tailored to your website structure and market.",
    metaTitle: "Technical SEO Services",
    metaDescription:
      "Technical SEO services for websites and web apps: crawlability, indexing, schema, metadata, site speed, Core Web Vitals, and on-page technical fixes.",
    keywords:
      "technical seo services, website seo optimization, core web vitals optimization, schema markup implementation, site speed optimization",
    deliverables: [
      "Technical audit of crawl, indexing, and rendering issues",
      "Metadata and internal linking architecture improvements",
      "Schema markup implementation for priority page types",
      "Core Web Vitals and loading performance optimization",
      "Sitemap, robots, and canonicalization setup",
      "Tracking dashboard with KPI monitoring and backlog",
    ],
    process: [
      "Audit current SEO baseline and technical blockers",
      "Prioritize fixes by impact and implementation complexity",
      "Implement and validate changes in staging and production",
      "Monitor indexation, rankings, and technical signals",
      "Run continuous optimization cycles",
    ],
    faqs: [
      {
        question: "Can technical SEO improve existing websites without redesign?",
        answer:
          "Yes. Many improvements can be implemented without changing the visual layer.",
      },
      {
        question: "Do you optimize Core Web Vitals?",
        answer:
          "Yes. We target LCP, CLS, and INP with code-level and content-level optimizations.",
      },
      {
        question: "Do you provide implementation, not only audit?",
        answer:
          "Yes. We deliver both the audit and the technical implementation plan, and can execute it.",
      },
    ],
  },
  {
    slug: "branding",
    navLabel: "Branding",
    h1: "Branding Services for Consistent Digital Presence",
    lead:
      "We build practical brand systems that align visual identity, messaging, and product experience across website and communication channels.",
    metaTitle: "Branding Services for Digital Products",
    metaDescription:
      "Branding services for companies launching or redesigning websites: visual identity, logo systems, brand guidelines, messaging direction, and digital consistency.",
    keywords:
      "branding services, digital branding agency, brand identity design, logo and visual system, website brand guidelines",
    deliverables: [
      "Brand positioning and tone-of-voice direction",
      "Logo and visual identity system",
      "Color, typography, and component rules for digital use",
      "Brand guidelines for product and marketing teams",
      "Key visual assets for website and social channels",
      "Consistency checklist for launch and scaling",
    ],
    process: [
      "Define brand strategy and differentiation points",
      "Create identity concepts and select direction",
      "Build complete visual system and usage rules",
      "Apply branding to website and key assets",
      "Support rollout across channels and materials",
    ],
    faqs: [
      {
        question: "Can you refresh an existing brand without full rebrand?",
        answer:
          "Yes. We can modernize the system and keep recognizable elements where it makes sense.",
      },
      {
        question: "Do you align branding with website design?",
        answer:
          "Yes. We build branding with web implementation in mind from day one.",
      },
      {
        question: "Do we get reusable brand guidelines?",
        answer:
          "Yes. We provide practical guidelines your team can apply consistently.",
      },
    ],
  },
  {
    slug: "product-strategy",
    navLabel: "Product Strategy",
    h1: "Product and Website Strategy Before Development",
    lead:
      "We define what to build, for whom, and in what sequence so your website or product launch is based on validated priorities, not assumptions.",
    metaTitle: "Product Strategy for Website Projects",
    metaDescription:
      "Product strategy and discovery for website and web app projects: audience analysis, value proposition, feature prioritization, and launch roadmap.",
    keywords:
      "product strategy services, website strategy, digital product discovery, launch roadmap, feature prioritization",
    deliverables: [
      "Business goals and success metrics map",
      "Audience segmentation and key user jobs analysis",
      "Competitor and positioning review",
      "Feature prioritization and scope boundaries",
      "Content and conversion architecture recommendations",
      "Phased implementation roadmap for launch and growth",
    ],
    process: [
      "Collect stakeholder goals and baseline constraints",
      "Research market, audience, and alternatives",
      "Map priorities and define MVP scope",
      "Align technical, design, and business roadmap",
      "Prepare delivery plan with measurable checkpoints",
    ],
    faqs: [
      {
        question: "Is strategy needed if we already have a website?",
        answer:
          "Yes. Strategy helps identify what should be improved first to maximize business impact.",
      },
      {
        question: "Can strategy reduce development budget risks?",
        answer:
          "Yes. Prioritization prevents building low-impact features early and reduces rework.",
      },
      {
        question: "Do you provide a roadmap that can be executed immediately?",
        answer:
          "Yes. We deliver a practical roadmap with priorities, dependencies, and implementation phases.",
      },
    ],
  },
];

export const getServicePageBySlug = (slug: string) => SERVICE_PAGES.find(item => item.slug === slug);
