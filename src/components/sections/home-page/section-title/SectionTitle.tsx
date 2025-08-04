import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./st-styles.css?inline";
import { inlineTranslate } from "qwik-speak";
import ImgGreen from "~/assets/images/green.png?w=124&h=124&jsx";
import ImgHeroSl from "~/assets/images/hero_slides.png?w=233&h=124&jsx";
import IconTitle from "~/assets/images/element-title.png?w=64&h=64&jsx";
// import { useResponsive } from "~/hooks/useResponsive";
// import { QModel } from "~/integrations/react/model/ModelGLB";

export default component$(() => {
  useStylesScoped$(styles);

  const t = inlineTranslate();

  // const { isMobile, isTablet, isDesctop } = useResponsive();

  return (
    <section class="st_section">
      <div class="container">
        <h1 class="H2_light black title">
          <span class="icon_span">
            {t("home.stitle.1span@@Complete")}
            <IconTitle class="icon_title" width={60} height={60} />
          </span>
          <span class="H1_extra_light grey_dark">{t("home.stitle.2span@@digital")}</span>
          <ImgGreen class="spring_img" alt="dfd" />
          {/* <QModel model="spring" width={75} height={75} /> */}
          <span class="H1_extra_light grey_dark">{t("home.stitle.3span@@products")}.</span>
          <ImgHeroSl class="notebook tablet" alt="desc" />

          <span class="from_sp1">{t("home.stitle.4span@@From")}</span>
          <span class="text_center">
            <span class="from_sp2">{t("home.stitle.4span")}</span>{" "}
            {t("home.stitle.5span@@concept to launch")}
          </span>
        </h1>
        <ImgHeroSl class="notebook mobile" alt="Image notebook" />
      </div>
    </section>
  );
});
