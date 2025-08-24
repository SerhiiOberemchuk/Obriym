import { component$, useContext, useStore, useStylesScoped$, useTask$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import ContentContact from "./content-contact/ContentContact";
import InputsContact from "./inputs-contact/InputsContact";

import styles from "./styles_contact.css?inline";
// import IconGreen from "~/assets/images/green.png?w=100&h100&jsx";
import { QModel } from "~/integrations/react/model/ModelGLB";
import { ViewportContext } from "~/routes/[...lang]/layout";

export default component$(() => {
  const t = inlineTranslate();
  useStylesScoped$(styles);
  const vieport = useContext(ViewportContext);
  const sizeModel = useStore({ sizes: { width: 32, height: 32 } });
  useTask$(({ track }) => {
    track(() => vieport.value);
    switch (vieport.value) {
      case "tablet":
        sizeModel.sizes = { width: 64, height: 64 };
        break;
      case "desktop":
        sizeModel.sizes = { width: 100, height: 100 };
        break;
      default:
        sizeModel.sizes = { width: 32, height: 32 };
        break;
    }
  });
  return (
    <section class="c_section">
      <div class="container ">
        <div class="c_box_title">
          {/* <IconGreen aria-hidden="true" /> */}
          <div class="c_title_icon">
            <QModel
              model="spring1"
              key={"spring1-contact"}
              width={sizeModel.sizes.width}
              height={sizeModel.sizes.height}
            />
          </div>

          <h2 class="H3_uppercase grey_dark">{t("home.contact-section.title@@get a contact")}</h2>
        </div>

        <div class="c_container">
          <div class="cc_wrapper">
            <ContentContact />
          </div>

          <div class="cc_wrapper">
            <InputsContact />
          </div>
        </div>
      </div>
    </section>
  );
});
