import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
// import { QModel } from "~/integrations/react/model/ModelGLB";
import styles from "./st-styles.css?inline";
import ImgHeroSl from "~/assets/images/hero_slides.png?w=234&h=124&quality=100&jsx";
import TitleAbstract from "~/assets/images/element-title.png?h=64&w=64&quality=100&jsx";
import IconGreen from "~/assets/images/green.png?quality=100&w=100&h=100&jsx";

export default component$(() => {
  useStylesScoped$(styles);

  const t = inlineTranslate();

  return (
    <section class="st_section">
      <div class="container">
        <h1 class="H2_light black title">
          <span class="sr-only">
            {t("home.h1@@Full-cycle web agency — developing fast SEO websites and web apps")}
          </span>
          <span class="icon_span" aria-hidden={true}>
            {t("home.stitle.1span@@Complete")}
            <TitleAbstract class="icon_title" aria-hidden={true} />
          </span>
          <span class="H1_extra_light grey_dark">{t("home.stitle.2span@@digital")}</span>
          <IconGreen class="spring_model" aria-hidden={true}></IconGreen>

          <span class="H1_extra_light grey_dark" aria-hidden={true}>
            {t("home.stitle.3span@@products")}.
          </span>
          <ImgHeroSl
            class="notebook tablet"
            alt="desc"
            width={234}
            height={124}
            aria-hidden={true}
          />

          <span class="from_sp1" aria-hidden={true}>
            {t("home.stitle.4span@@From")}
          </span>
          <span class="text_center" aria-hidden={true}>
            <span class="from_sp2">{t("home.stitle.4span")}</span>{" "}
            {t("home.stitle.5span@@concept to launch")}
          </span>
        </h1>
        <ImgHeroSl
          class="notebook mobile"
          alt="Image notebook"
          width={180}
          height={96}
          aria-hidden={true}
        />
      </div>
    </section>
  );
});
