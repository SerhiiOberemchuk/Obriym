// eslint-disable-next-line qwik/no-use-visible-task
import { component$, useStylesScoped$ } from "@qwik.dev/core";

import styles from "./styles_steps.css?inline";
import PinkImg from "~/assets/images/pink.png?w=100&h=100&jsx";
import InfinitySlider from "../infinitySlider/InfinitySlider";
import QwikSlider from "~/components/sections/team-page/qwik-slider/QwikSlider";

export default component$(() => {
  //   const t = inlineTranslate();
  useStylesScoped$(styles);

  return (
    <section class="team_steps_section">
      <div class="container ">
        <div class="team_steps_title">
          <PinkImg class="team_steps_image" />
          <h2 class="H3_uppercase">Our Team</h2>
        </div>
      </div>
      <div class="inf_carousel_wrp">
        <InfinitySlider />
      </div>
      <div class="inf_carousel_wrp">
        <QwikSlider />
      </div>
    </section>
  );
});
