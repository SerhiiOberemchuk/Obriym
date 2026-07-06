import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./styles.css?inline";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import { LEGAL_ENTITY } from "~/types/legal.info";
import { getLegalDisplay } from "~/utils/legal";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { lang } = useSpeakLocale();
  const getPath = localizePath();
  const legal = getLegalDisplay(lang);
  const teamPath = getPath("/team/", lang);

  return (
    <section>
      <div class="container H6 grey legal_wrapper">
        <h1 class="H2_light grey_dark title">{t("legal.title@@Legal Information")}</h1>
        <p>
          {t(
            "legal.intro@@OBRIYM (obriym.com) is the trading name of an officially registered business. Below you will find the full legal details of the entity operating this website.",
          )}
        </p>
        <p>
          {t(
            "legal.trading@@OBRIYM is the trading name under which ФОП Оберемчук Сергій Олександрович (Individual Entrepreneur Oberemchuk Serhii Oleksandrovych) provides web development, CRM solutions and digital integration services.",
          )}
        </p>

        <h2 class="H3_uppercase black">{t("legal.founder.title@@Who is behind OBRIYM:")}</h2>
        <p>
          {t(
            "legal.founder.text1@@The agency was founded and is legally operated by Serhii Oberemchuk — Founder & CEO of OBRIYM.",
          )}{" "}
          {t("legal.founder.text2@@Learn more about him and the whole team on our")}{" "}
          <a class="team_link" href={teamPath}>
            {t("legal.founder.linkTeam@@Team page")}
          </a>
          .
        </p>

        <h2 class="H3_uppercase black">{t("legal.details.title@@Business details:")}</h2>
        <dl class="legal_details">
          <div class="legal_row">
            <dt class="black">{t("legal.details.name@@Legal name")}</dt>
            <dd>{legal.name}</dd>
          </div>
          <div class="legal_row">
            <dt class="black">{t("legal.details.taxId@@Tax ID (RNOKPP)")}</dt>
            <dd>{LEGAL_ENTITY.taxId}</dd>
          </div>
          <div class="legal_row">
            <dt class="black">{t("legal.details.regRecord@@State registration record No.")}</dt>
            <dd>
              {LEGAL_ENTITY.edrRecord} {t("legal.details.regDate@@dated")} {legal.edrDateFormatted}
            </dd>
          </div>
          <div class="legal_row">
            <dt class="black">{t("legal.details.address@@Registered address")}</dt>
            <dd>
              {t("legal.details.country@@Ukraine")}, {legal.address}
            </dd>
          </div>
          <div class="legal_row">
            <dt class="black">{t("legal.details.phone@@Phone")}</dt>
            <dd>
              <a href={`tel:${LEGAL_ENTITY.phone}`}>{legal.phoneDisplay}</a>
            </dd>
          </div>
          <div class="legal_row">
            <dt class="black">{t("legal.details.email@@Email")}</dt>
            <dd>
              <a href="mailto:info@obriym.com">info@obriym.com</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
});
