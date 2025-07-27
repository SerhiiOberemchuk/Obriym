import { component$, useStylesScoped$, Signal } from "@qwik.dev/core";

import styles from "./styles_steps.css?inline";
import { TEAM_MEMBERS } from "~/const/team";
import PinkImg from "~/assets/images/pink.png?w=100&h=100&jsx";
import InfinitySlider from "../infinitySlider/InfinitySlider";

// interface StepsSectionProps {
//   viewportCategory: "mobile" | "tablet" | "desktop";
// }

export default component$(({ viewportCategory }: { viewportCategory: Signal<string> }) => {
  //   const t = inlineTranslate();
  useStylesScoped$(styles);

  return (
    <section class="team_steps_section">
      <div class=" team_steps_container_wrp">
        <div class="container ">
          <div class="team_steps_title">
            <PinkImg class="team_steps_image" />
            <h2 class="H3_uppercase">Our Team</h2>
          </div>
        </div>
        <div class="inf_carousel_wrp">
          <InfinitySlider items={TEAM_MEMBERS} viewportCategory={viewportCategory} />
        </div>
      </div>
    </section>
  );
});
