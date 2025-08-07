import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";

import styles from "./styles_steps.css?inline";
import { TEAM_MEMBERS } from "~/const/team";
import PinkImg from "~/assets/images/pink.png?w=100&h=100&jsx";
import InfinitySlider from "../infinitySlider/InfinitySlider";

// interface StepsSectionProps {
//   viewportCategory: "mobile" | "tablet" | "desktop";
// }

export default component$(() => {
  //   const t = inlineTranslate();
  useStylesScoped$(styles);
  const t = inlineTranslate();

  return (
    <section class="team_steps_section" aria-labelledby="team-title" role="region">
      <div class=" team_steps_container_wrp">
        <div class="container ">
          <div class="team_steps_title">
            <PinkImg class="team_steps_image" aria-hidden="true" />
            <h2 class="H3_uppercase" id="team-title">
              {t("team.title@@Our Team")}
            </h2>
          </div>
        </div>
        <div
          class="inf_carousel_wrp"
          role="list"
          aria-label={t("team.aria.carousel@@Team members carousel")}
        >
          <InfinitySlider items={TEAM_MEMBERS} />
        </div>
      </div>
    </section>
  );
});
