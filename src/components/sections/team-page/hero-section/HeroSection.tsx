import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import Abstract_3d from "~/assets/images/abstract_3d.png?w=64&h=64&jsx";
import Frame_98 from "~/assets/images/frame_98.png?w=65&h=64&jsx";
import styles from "./styles_hero.css?inline";

export default component$(() => {
  const t = inlineTranslate();
  useStylesScoped$(styles);

  return (
    <section class="team_hero_section" aria-labelledby="team-hero-title">
      {/* <div class="container "> */}
      <div>
        <h1 class="H2_light  team_hero_title" id="team-hero-title">
          <span class="team_hero_line1">
            <Abstract_3d class="team_hero_line1_icon" aria-hidden="true" />{" "}
            {t("team.hero.title.line1@@Our team")}
          </span>
          <span class="H1_extra_light gray_dark ">
            &nbsp;{t("team.hero.title.line2@@is the best")}
          </span>
          <br />
          <span class="team_hero_line2">
            {t("team.hero.title.line3@@product we have")}
            <Frame_98 class="team_hero_line2_icon" />
          </span>
          {t("team.hero.title.line4@@created together")}
        </h1>
      </div>
    </section>
  );
});
