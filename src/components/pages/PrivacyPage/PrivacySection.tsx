import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./styles.css?inline";
import { inlineTranslate } from "qwik-speak";
export default component$(() => {
  useStylesScoped$(styles);
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
