import { component$, useStyles$ } from "@qwik.dev/core";
import styles from "./styles.css?inline";
import { inlineTranslate } from "qwik-speak";
import { DocumentHead } from "@qwik.dev/router";

export default component$(() => {
  useStyles$(styles);
  const t = inlineTranslate();

  return (
    <section>
      <div class="container H6 grey privacy_wrapper">
        <h1 class="H2_light grey_dark title">{t("privacy.title@@Privacy Policy")}</h1>
        <p>
          {t("privacy.updated@@Last updated: 21 July 2025")}{" "}
          {t(
            "privacy.intro@@At Obriym (obriym.com), we respect your privacy and are committed to protecting your personal data.",
          )}
        </p>

        <h2 class="H3_uppercase black">
          {t("privacy.collect.title@@What information we collect:")}
        </h2>
        <ol>
          <li>
            {t(
              "privacy.collect.items.nameContact@@Name and contact details (if you fill out a form or contact us)",
            )}
          </li>
          <li>
            {t(
              "privacy.collect.items.technical@@Technical data (IP address, browser type, operating system)",
            )}
          </li>
          <li>{t("privacy.collect.items.usage@@Usage data (page views, time spent on pages)")}</li>
        </ol>

        <h2 class="H3_uppercase black">{t("privacy.use.title@@How we use your information:")}</h2>
        <ol>
          <li>{t("privacy.use.items.inquiries@@To respond to inquiries")}</li>
          <li>{t("privacy.use.items.improve@@To improve our website and services")}</li>
          <li>{t("privacy.use.items.analytics@@For analytics and performance tracking")}</li>
          <li>
            {t(
              "privacy.use.items.newsletter@@To send updates or newsletters (only with your consent)",
            )}
          </li>
        </ol>

        <h2 class="H3_uppercase black">{t("privacy.protect.title@@How we protect your data:")}</h2>
        <p>
          {t(
            "privacy.protect.text@@We use secure servers and industry-standard technologies to protect your information.",
          )}
        </p>

        <h2 class="H3_uppercase black">{t("privacy.rights.title@@You have the right to:")}</h2>
        <ol>
          <li>{t("privacy.rights.items.access@@Access your data")}</li>
          <li>{t("privacy.rights.items.correction@@Request correction or deletion")}</li>
          <li>{t("privacy.rights.items.withdraw@@Withdraw consent at any time")}</li>
        </ol>

        <h2 class="H3_uppercase black">
          {t("privacy.storage.title@@How long we store your data:")}
        </h2>
        <p>
          {t(
            "privacy.storage.text@@We store your personal data only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.",
          )}
        </p>

        <h2 class="H3_uppercase black">
          {t("privacy.legal.title@@Legal basis for processing data:")}
        </h2>
        <p>
          {t(
            "privacy.legal.text@@We process your data based on your consent or our legitimate interests in improving our services.",
          )}
        </p>

        <p>
          {t(
            "privacy.contact@@If you have any questions or want to exercise your rights, contact us at: info@obriym.com",
          )}
        </p>
      </div>
    </section>
  );
});

export const head: DocumentHead = () => {
  const t = inlineTranslate();

  return {
    title: t("app.head.privacy.title@@Privacy Policy | Obriym"),
    meta: [
      {
        name: "description",
        content: t(
          "app.head.privacy.description@@Read the Privacy Policy of Obriym Web Agency. Learn how we collect, use, and protect your personal data.",
        ),
      },
      { property: "og:title", content: "Privacy Policy | Obriym" },
      {
        property: "og:description",
        content: "Our Privacy Policy explains how we collect, use, and protect your personal data.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://obriym.com/privacy-policy" },
      { property: "og:image", content: "https://obriym.com/images/privacy/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy | Obriym" },
      {
        name: "twitter:description",
        content: "Learn about our Privacy Policy at Obriym Web Agency.",
      },
      { name: "twitter:image", content: "https://obriym.com/images/privacy/og-image.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "alternate", hreflang: "en", href: "https://obriym.com/privacy-policy" },
      { rel: "alternate", hreflang: "uk-UA", href: "https://obriym.com/uk-UA/privacy-policy" },
      { rel: "alternate", hreflang: "it-IT", href: "https://obriym.com/it-IT/privacy-policy" },
      { rel: "alternate", hreflang: "x-default", href: "https://obriym.com/privacy-policy" },
      { rel: "canonical", href: "https://obriym.com/privacy-policy" },
    ],
    scripts: [
      {
        props: {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            name: "Privacy Policy",
            description:
              "Privacy Policy of Obriym Web Agency. Learn how we collect, use, and protect your personal data.",
            dateModified: "2025-07-21",
            url: "https://obriym.com/privacy-policy",
            publisher: {
              "@type": "Organization",
              name: "Obriym Web Agency",
              url: "https://obriym.com",
              logo: "https://obriym.com/logo.svg",
            },
          }),
        },
      },
    ],
  };
};
