import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import styles from "./styles.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { lang } = useSpeakLocale();
  const getPath = localizePath();
  const homePath = getPath("/", lang);

  return (
    <section>
      <div class="container nf_wrapper">
        <p class="nf_code H2_light grey" aria-hidden="true">
          404
        </p>
        <h1 class="H2_light grey_dark">{t("app.notFound.title@@Page not found")}</h1>
        <p class="H6 grey">
          {t("app.notFound.text@@The page you are looking for doesn't exist or has been moved.")}
        </p>
        <a class="nf_home btn_body" href={homePath}>
          {t("app.notFound.homeLink@@Back to homepage")}
        </a>
      </div>
    </section>
  );
});
