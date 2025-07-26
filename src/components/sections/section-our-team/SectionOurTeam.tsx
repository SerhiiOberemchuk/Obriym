import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import styles from "./sot-stylec.css?inline";
// import IconPink from "~/assets/images/pink_dark.png?w=64&h=64&jsx";
import Card from "./card/Card";
import SubTitle from "~/components/common/subtitile/SubTitle";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  return (
    <section>
      <div class="container">
        <SubTitle classes="title" section="ourTeam">
          {t("home.sectionSOT@@services")}
        </SubTitle>
        {/* <div
          role="heading"
          aria-level={2}
          class="H3_uppercase grey_dark title"
          aria-label={t("home.sectionSOT")}
        >
          <div></div>
          <IconPink alt={"Shape icon"} />
        
        </div> */}
        <Card />
      </div>
    </section>
  );
});
