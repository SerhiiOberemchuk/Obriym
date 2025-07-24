import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./st-styles.css?inline";
import { inlineTranslate } from "qwik-speak";
// import ImgGreen from "~/assets/images/green.png?w124&h124&jsx";
import ImgHeroSl from "~/assets/images/hero_slides.png?w233&h124&jsx";
// import { useResponsive } from "~/hooks/useResponsive";
import { QModel } from "~/integrations/react/model/ModelGLB";

export default component$(() => {
  useStylesScoped$(styles);

  const t = inlineTranslate();

  // const { isMobile, isTablet, isDesctop } = useResponsive();

  return (
    <section class="st_section">
      <div class="container">
        <h1 class="H2_light black title">
          <span>{t("home.stitle.1span@@Complete")}</span>
          <span class="H1_extra_light grey_dark">{t("home.stitle.2span@@digital")}</span>
          {/* <ImgGreen class="spring_img" alt="dfd" /> */}
          <QModel model="spring" width={75} height={75} />
          <span class="H1_extra_light grey_dark">{t("home.stitle.3span@@products")}.</span>
          <ImgHeroSl class="notebook tablet" alt="desc" />

          <span class="from_sp1">{t("home.stitle.4span@@From")}</span>
          <span class="text_center">
            <span class="from_sp2">{t("home.stitle.4span")}</span>{" "}
            {t("home.stitle.5span@@concept to launch")}
          </span>
        </h1>
        <ImgHeroSl class="notebook mobile" />
      </div>
    </section>
  );
});
