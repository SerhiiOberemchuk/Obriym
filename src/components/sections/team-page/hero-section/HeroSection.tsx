import { component$, useStylesScoped$ } from "@qwik.dev/core";
import Abstract_3d from "~/assets/images/abstract_3d.png?w=24&h=24&jsx";
import Frame_98 from "~/assets/images/frame_98.png?w=24&h=24&jsx";
import styles from "./styles_hero.css?inline";

export default component$(() => {
  //   const t = inlineTranslate();
  useStylesScoped$(styles);

  return (
    <section class="team_hero_section">
      <div class="container ">
        <h1 class="H2_light  team_hero_title">
          <span class="team_hero_line1">
            <Abstract_3d class="team_hero_line1_icon" /> Our team
          </span>
          <span class="H1_extra_light gray_dark ">&nbsp;is the best</span>
          <br />
          <span class="team_hero_line2">
            product we have <Frame_98 class="team_hero_line2_icon" />
          </span>
          created together
        </h1>
      </div>
    </section>
  );
});
