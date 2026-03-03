import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { inlineTranslate, localizePath } from "qwik-speak";

import styles from "./services-styles.css?inline";
import Card from "./card/Card";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { ServicesCardProps } from "~/types/services-card.type";
import IconO from "~/assets/images/O.svg?jsx";
import Services1 from "~/assets/images/services/opaum.webp?w=706&h=296&jsx";
import Services2 from "~/assets/images/services/ai.webp?w=706&h=296&jsx";
import Services3 from "~/assets/images/services/mocup-branding.webp?w=706&h=296&jsx";
import Services4 from "~/assets/images/services/crm-auto.webp?w=706&h=296&jsx";
import Services5 from "~/assets/images/services/spa.webp?w=706&h=296&jsx";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const getPath = localizePath();

  const [servicesHubPath] = getPath(["/services/"]);
  const [productStrategyPath] = getPath(["/services/product-strategy/"]);
  const [uxDesignPath] = getPath(["/services/ux-ui-design/"]);
  const [brandingPath] = getPath(["/services/branding/"]);
  const [webAppPath] = getPath(["/services/web-app-development/"]);
  const [technicalSeoPath] = getPath(["/services/technical-seo/"]);
  const [websiteDevelopmentPath] = getPath(["/services/website-development/"]);
  const [ecommercePath] = getPath(["/services/ecommerce-development/"]);

  const openServicePageLabel = t("home.services.card.link@@Open dedicated page");

  const cards: ServicesCardProps[] = [
    {
      title: t("home.services.1.title@@Research & Strategy"),
      description: t(
        "home.services.1.descr@@We uncover insights, define goals, and map out clear, user-centered strategies.",
      ),
      list: [
        t("home.services.1.list.0@@User Research"),
        t("home.services.1.list.1@@Market Analysis"),
        t("home.services.1.list.2@@Competitor Analysis"),
        t("home.services.1.list.3@@Product Strategy"),
        t("home.services.1.list.4@@UX Audits"),
      ],
      href: productStrategyPath,
      linkLabel: openServicePageLabel,
      srcImage: "/images/services/opaum.webp",
      image: (
        <Services1
          alt={`${t("home.services.1.title@@Research & Strategy")}picture`}
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      title: t("home.services.2.title@@UX UI Design"),
      description: t(
        "home.services.2.descr@@We craft intuitive, aesthetically pleasing interfaces that provide seamless user experiences.",
      ),
      list: [
        t("home.services.2.list.0@@Wireframing"),
        t("home.services.2.list.1@@Prototyping"),
        t("home.services.2.list.2@@UI Design"),
        t("home.services.2.list.3@@UX Flows"),
        t("home.services.2.list.4@@Design Systems"),
      ],
      href: uxDesignPath,
      linkLabel: openServicePageLabel,
      srcImage: "/images/services/ai.webp",
      image: (
        <Services2 alt={`${t("home.services.2.title")}picture`} loading="lazy" decoding="async" />
      ),
    },
    {
      title: t("home.services.3.title@@Branding"),
      description: t(
        "home.services.3.descr@@We build unique, consistent brand identities that communicate your values and connect with your audience.",
      ),
      list: [
        t("home.services.3.list.0@@Visual Identity"),
        t("home.services.3.list.1@@Logo Design"),
        t("home.services.3.list.2@@Brand Guidelines"),
        t("home.services.3.list.3@@Tone of Voice"),
        t("home.services.3.list.4@@Brand Positioning"),
      ],
      href: brandingPath,
      linkLabel: openServicePageLabel,
      srcImage: "/images/services/mocup-branding.webp",
      image: (
        <Services3 alt={`${t("home.services.3.title")}picture`} loading="lazy" decoding="async" />
      ),
    },
    {
      title: t("home.services.4.title@@Web & App Development"),
      description: t(
        "home.services.4.descr@@We turn designs into high-performing digital products with scalable, responsive, and efficient code.",
      ),
      list: [
        t("home.services.4.list.0@@Frontend Development"),
        t("home.services.4.list.1@@Backend Development"),
        t("home.services.4.list.2@@CMS Integration"),
        t("home.services.4.list.3@@Webflow / WordPress / Custom"),
        t("home.services.4.list.4@@Mobile App Development"),
      ],
      href: webAppPath,
      linkLabel: openServicePageLabel,
      srcImage: "/images/services/crm-auto.webp",
      image: (
        <Services4 alt={`${t("home.services.4.title")}picture`} loading="lazy" decoding="async" />
      ),
    },
    {
      title: t("home.services.5.title@@Launch & Optimization"),
      description: t(
        "home.services.5.descr@@We ensure a smooth launch and support long-term growth through testing, analytics, and iteration.",
      ),
      list: [
        t("home.services.5.list.0@@QA Testing"),
        t("home.services.5.list.1@@Performance Optimization"),
        t("home.services.5.list.2@@A/B Testing"),
        t("home.services.5.list.3@@Analytics Setup"),
        t("home.services.5.list.4@@Continuous Improvement"),
      ],
      href: technicalSeoPath,
      linkLabel: openServicePageLabel,
      srcImage: "/images/services/spa.webp",
      image: (
        <Services5 alt={`${t("home.services.5.title")}picture`} loading="lazy" decoding="async" />
      ),
    },
  ];

  const serviceIntentLinks = [
    { path: websiteDevelopmentPath, label: t("home.services.link.website@@Website Development") },
    { path: ecommercePath, label: t("home.services.link.ecommerce@@E-commerce Development") },
    { path: webAppPath, label: t("home.services.link.webapp@@Web App Development") },
    { path: uxDesignPath, label: t("home.services.link.uxui@@UX UI Design") },
    { path: technicalSeoPath, label: t("home.services.link.seo@@Technical SEO") },
  ];

  return (
    <section class="section" id="services" aria-label={t("home.services.title@@services")}> 
      <div class="container">
        <SubTitle classes="title" section="services">
          {t("home.services.title@@services")}
        </SubTitle>

        <div class="services_actions">
          <Link href={servicesHubPath} class="services_hub_link btn_body">
            {t("home.services.hub@@Explore all specialized service pages")}
          </Link>
        </div>

        <div class="ins_wrapper">
          <IconO class="icon_o" aria-hidden="true" focusable="false" />
          <ul class="list">
            {cards.map(({ title, description, list, href, linkLabel, srcImage, image }, index) => (
              <li key={index} class="li_item" data-num={index}>
                <Card title={title} description={description} list={list} href={href} linkLabel={linkLabel}>
                  <figure class="image_wrapper">{image}</figure>
                </Card>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    serviceType: title,
                    url: "https://obriym.com/services/",
                    description: `${description} Our services include ${list.join(", ")} for businesses in Italy and across Europe.`,
                    provider: {
                      "@type": "Organization",
                      name: "OBRIYM",
                      url: "https://obriym.com",
                      logo: "https://obriym.com/images/logo.png",
                      sameAs: [
                        "https://www.facebook.com/obriym",
                        "https://www.instagram.com/obriym",
                        "https://www.linkedin.com/company/obriym",
                      ],
                    },
                    image: srcImage,
                    areaServed: [
                      { "@type": "Country", name: "Italy" },
                      { "@type": "Country", name: "Ukraine" },
                      { "@type": "Country", name: "European Union" },
                    ],
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "EUR",
                      price: "1500",
                      availability: "https://schema.org/InStock",
                      url: "https://obriym.com/#contact",
                    },
                  })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div class="seo_links" aria-label={t("home.services.intent.aria@@Popular service intents")}> 
          <p class="btn_header seo_links_title">
            {t("home.services.intent.title@@Popular requests for website projects")}
          </p>
          <ul class="seo_links_list">
            {serviceIntentLinks.map(({ path, label }) => (
              <li key={path}>
                <Link href={path} class="btn_body seo_link_item">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});