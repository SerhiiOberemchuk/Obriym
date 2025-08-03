import { component$, useStyles$ } from "@qwik.dev/core";
import styles from "./styles.css?inline";
import { inlineTranslate } from "qwik-speak";
import { DocumentHead } from "@qwik.dev/router";

export default component$(() => {
  useStyles$(styles);
  const t = inlineTranslate();

  return (
    <section>
      <div class="container">
        <h1 class="H2_light grey_dark title">{t("cookies.title@@Cookies Policy")}</h1>
        <ul class="H6 grey list_privasy">
          <li>
            {t("cookies.updated@@Last updated: 21 July 2025")}
            <br />
            {t(
              "cookies.intro@@This website (obriym.com) uses cookies to ensure you get the best experience on our site.",
            )}
          </li>
          <li>
            <h2 class="H3_uppercase black">{t("cookies.what.title@@What Cookies Are")}</h2>
            <p>
              {t(
                "cookies.what.text@@Cookies are small text files stored on your device when you visit a website. They help us improve performance, analyze traffic, and personalize your experience.",
              )}
            </p>
          </li>
          <li>
            <h2 class="H3_uppercase black">{t("cookies.types.title@@Types of cookies we use:")}</h2>
            <p>
              {t(
                "cookies.types.desc@@Cookies are small text files stored on your device when you visit a website. They help us improve performance, analyze traffic, and personalize your experience.",
              )}
            </p>
            <ul class="list_types">
              <li>
                <h3 class="H6 black title_types">
                  {t("cookies.types.required.title@@Required cookies:")}
                </h3>
                <p>
                  {t(
                    "cookies.types.required.text@@These cookies are essential for the basic functioning of the website. They allow you to navigate the site and use its basic functions. Without these files, the website may not function properly.",
                  )}
                </p>
              </li>
              <li>
                <h3 class="H6 black title_types">
                  {t("cookies.types.analytics.title@@Analytics cookies:")}
                </h3>
                <p>
                  {t(
                    "cookies.types.analytics.text@@These cookies collect information about how visitors use our site, such as which pages are most popular, how long users spend on the site, etc. This helps us to improve the site and provide you with more interesting content.",
                  )}
                </p>
              </li>
              <li>
                <h3 class="H6 black title_types">
                  {t("cookies.types.functionality.title@@Functionality cookies:")}
                </h3>
                <p>
                  {t(
                    "cookies.types.functionality.text@@These cookies allow the site to remember your choices (such as username, language or region) and provide enhanced, more personalized features.",
                  )}
                </p>
              </li>
              <li>
                <h3 class="H6 black title_types">
                  {t("cookies.types.advertising.title@@Advertising cookies:")}
                </h3>
                <p>
                  {t(
                    "cookies.types.advertising.text@@These cookies are used to show you ads that are relevant to your interests. They can also limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.",
                  )}
                </p>
              </li>
            </ul>
          </li>
          <li>
            <h2 class="H3_uppercase black">
              {t("cookies.storage.title@@How Long We Store Personal Data:")}
            </h2>
            <p>
              {t(
                "cookies.storage.text@@Your data is stored in our database of leads and clients for an indefinite period of time. You can always request its deletion on: info@obriym.com",
              )}
            </p>
          </li>
          <li>
            <h2 class="H3_uppercase black">{t("cookies.manage.title@@How to manage cookies:")}</h2>
            <p>
              {t(
                "cookies.manage.text@@You can choose which cookies you want to accept by adjusting your preferences in the cookie banner or your browser settings. Please note that disabling some cookies may affect your browsing experience. For more details, contact us at: info@obriym.com",
              )}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
});

export const head: DocumentHead = () => {
  const t = inlineTranslate();

  return {
    title: t("app.head.cookies.title@@Cookies Policy | Obriym"),
    meta: [
      {
        name: "description",
        content: t(
          "app.head.cookies.description@@Read the cookies policy of Obriym Web Agency. Learn what cookies we use, why we use them, and how you can manage your preferences.",
        ),
      },
      { property: "og:title", content: "Cookies Policy | Obriym" },
      {
        property: "og:description",
        content: "Our cookies policy explains how we use cookies to improve your experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://obriym.com/cookies-policy" },
      { property: "og:image", content: "https://obriym.com/images/cookies/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cookies Policy | Obriym" },
      {
        name: "twitter:description",
        content: "Learn about our cookies policy at Obriym Web Agency.",
      },
      { name: "twitter:image", content: "https://obriym.com/images/cookies/og-image.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://obriym.com/cookies-policy",
      },
      {
        rel: "alternate",
        hreflang: "uk-UA",
        href: "https://obriym.com/uk-UA/cookies-policy",
      },
      {
        rel: "alternate",
        hreflang: "it-IT",
        href: "https://obriym.com/it-IT/cookies-policy",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://obriym.com/cookies-policy",
      },
      {
        rel: "canonical",
        href: "https://obriym.com/cookies-policy",
      },
    ],
    scripts: [
      {
        props: {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cookies Policy",
            description:
              "Cookies Policy of Obriym Web Agency. Learn what cookies we use and how to manage them.",
            dateModified: "2025-07-21",
            url: "https://obriym.com/cookies-policy",
            publisher: {
              "@type": "Organization",
              name: "Obriym Web Agency",
              url: "https://obriym.com",
              logo: "https://obriym.com/logo.svg",
            },
            mainEntity: {
              "@type": "WebPageElement",
              name: "Cookies Policy",
              description: "Details about the types of cookies used by Obriym Web Agency.",
            },
          }),
        },
      },
    ],
  };
};
