import { component$, useContext, useStore, useStylesScoped$, useTask$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import { QModel } from "~/integrations/react/model/ModelGLB";
import { ViewportContext } from "~/routes/[...lang]/layout";
import styles from "./st-styles.css?inline";
import ImgHeroSl from "~/assets/images/hero_slides.png?w=233&h=124&jsx";

export default component$(() => {
  useStylesScoped$(styles);
  const sizeModel = useStore<{
    puff: { width: number; height: number };
    spring: { width: number; height: number };
  }>({
    puff: { width: 20, height: 20 },
    spring: { width: 44, height: 44 },
  });
  const t = inlineTranslate();

  const vieport = useContext(ViewportContext);
  useTask$(({ track }) => {
    track(() => vieport.value);
    switch (vieport.value) {
      case "tablet":
        sizeModel.puff.height = 42;
        sizeModel.puff.width = 42;
        sizeModel.spring.height = 72;
        sizeModel.spring.width = 72;
        break;
      case "desktop":
        sizeModel.puff.height = 60;
        sizeModel.puff.width = 60;
        sizeModel.spring.height = 124;
        sizeModel.spring.width = 124;
        break;
      default:
        sizeModel.puff.width = 20;
        sizeModel.puff.height = 20;
        sizeModel.spring.height = 44;
        sizeModel.spring.width = 44;
        break;
    }
  });

  return (
    <section class="st_section">
      <div class="container">
        <h1 class="H2_light black title">
          <span class="icon_span">
            {t("home.stitle.1span@@Complete")}
            <div class="icon_title">
              <QModel model="puff" width={sizeModel.puff.width} height={sizeModel.puff.height} />
            </div>
          </span>
          <span class="H1_extra_light grey_dark">{t("home.stitle.2span@@digital")}</span>

          <QModel model="spring" width={sizeModel.spring.width} height={sizeModel.spring.height} />
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
