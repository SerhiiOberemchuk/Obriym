import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";
import styles from "./st-styles.css?inline";
import AnimatedElement from "~/components/common/animated-ball/AnimatedElement";
import ImgHeroSlides from "~/assets/images/hero_slides.png?jsx";
import TitleAbstract from "~/assets/images/element-title.png?jsx";

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
          <AnimatedElement class="spring_model" preset="spring" width={80} height={80} />
          <span class="H1_extra_light grey_dark" aria-hidden={true}>
            {t("home.stitle.3span@@products")}.
          </span>
          <ImgHeroSlides
            class="notebook tablet"
            alt=""
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
        <ImgHeroSlides
          class="notebook mobile"
          alt=""
          aria-hidden={true}
        />
      </div>
    </section>
  );
});
