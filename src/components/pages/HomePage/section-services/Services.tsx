import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./services-styles.module.css";
import Card from "./card/Card";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { ServicesCardProps } from "~/types/services-card.type";
import IconO from "~/assets/images/O.svg";
import services1 from "~/assets/images/services/opaum.webp";
import services2 from "~/assets/images/services/ai.webp";
import services3 from "~/assets/images/services/mocup-branding.webp";
import services4 from "~/assets/images/services/crm-auto.webp";
import services5 from "~/assets/images/services/spa.webp";

export default function Services() {
  const t = useTranslations();

  const cards: ServicesCardProps[] = [
    {
      title: t("home.services.1.title"),
      description: t("home.services.1.descr"),
      list: [
        t("home.services.1.list.0"),
        t("home.services.1.list.1"),
        t("home.services.1.list.2"),
        t("home.services.1.list.3"),
        t("home.services.1.list.4"),
      ],
      srcImage: "/images/services/opaum.webp",
      image: (
        <Image
          src={services1}
          alt={`${t("home.services.1.title")} service preview`}
          width={706}
          height={296}
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      title: t("home.services.2.title"),
      description: t("home.services.2.descr"),
      list: [
        t("home.services.2.list.0"),
        t("home.services.2.list.1"),
        t("home.services.2.list.2"),
        t("home.services.2.list.3"),
        t("home.services.2.list.4"),
      ],
      srcImage: "/images/services/ai.webp",
      image: (
        <Image
          src={services2}
          alt={`${t("home.services.2.title")} service preview`}
          width={706}
          height={296}
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      title: t("home.services.3.title"),
      description: t("home.services.3.descr"),
      list: [
        t("home.services.3.list.0"),
        t("home.services.3.list.1"),
        t("home.services.3.list.2"),
        t("home.services.3.list.3"),
        t("home.services.3.list.4"),
      ],
      srcImage: "/images/services/mocup-branding.webp",
      image: (
        <Image
          src={services3}
          alt={`${t("home.services.3.title")} service preview`}
          width={706}
          height={296}
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      title: t("home.services.4.title"),
      description: t("home.services.4.descr"),
      list: [
        t("home.services.4.list.0"),
        t("home.services.4.list.1"),
        t("home.services.4.list.2"),
        t("home.services.4.list.3"),
        t("home.services.4.list.4"),
      ],
      srcImage: "/images/services/crm-auto.webp",
      image: (
        <Image
          src={services4}
          alt={`${t("home.services.4.title")} service preview`}
          width={706}
          height={296}
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      title: t("home.services.5.title"),
      description: t("home.services.5.descr"),
      list: [
        t("home.services.5.list.0"),
        t("home.services.5.list.1"),
        t("home.services.5.list.2"),
        t("home.services.5.list.3"),
        t("home.services.5.list.4"),
      ],
      srcImage: "/images/services/spa.webp",
      image: (
        <Image
          src={services5}
          alt={`${t("home.services.5.title")} service preview`}
          width={706}
          height={296}
          loading="lazy"
          decoding="async"
        />
      ),
    },
  ];
  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <div className="container">
        {/* Literal, not `styles.title`: under Qwik's scoped CSS this class never
            matched a rule inside SubTitle, so it must stay inert here too. */}
        <SubTitle classes="title" section="services" titleId="services-title">
          {t("home.services.title")}
        </SubTitle>
        <div className={styles.ins_wrapper}>
          <IconO className={styles.icon_o} aria-hidden="true" focusable="false" />
          <ul className={styles.list}>
            {cards.map(({ title, description, list, srcImage, image }, index) => (
              <li key={index} className={styles.li_item} data-num={index}>
                <Card title={title} description={description} list={list}>
                  <figure className={styles.image_wrapper}>{image}</figure>
                </Card>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Service",
                      serviceType: title,
                      url: "https://obriym.com/#services",
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
                      image: `https://obriym.com${srcImage}`,
                      areaServed: [
                        { "@type": "Country", name: "Italy" },
                        { "@type": "Place", name: "Europe" },
                      ],
                      offers: {
                        "@type": "Offer",
                        priceCurrency: "EUR",
                        price: "1500",
                        availability: "https://schema.org/InStock",
                        url: "https://obriym.com/#contact",
                      },
                    }),
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
