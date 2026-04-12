import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";
import Abstract3d from "~/assets/images/abstract_3d.png?jsx";
import Frame98 from "~/assets/images/frame_98.png?jsx";
import styles from "./styles_hero.css?inline";

export default component$(() => {
  const t = inlineTranslate();
  useStylesScoped$(styles);

  return (
    <section
      class="team_hero_section"
      aria-labelledby="team-hero-title"
      aria-describedby="team-hero-description"
    >
      {/* <div class="container "> */}
      <div>
        <h1 class="H2_light  team_hero_title" id="team-hero-title">
          <span class="team_hero_line1">
            <Abstract3d class="team_hero_line1_icon" aria-hidden={true} />
            {t("team.hero.title.line1@@Our team")}
          </span>
          <span class="H1_extra_light gray_dark ">
            &nbsp;{t("team.hero.title.line2@@is the best")}
          </span>
          <br />
          <span class="team_hero_line2">
            {t("team.hero.title.line3@@product we have")}
            <Frame98 aria-hidden={true} class="team_hero_line2_icon" />
          </span>
          {t("team.hero.title.line4@@created together")}
        </h1>
        <p class="sr-only" id="team-hero-description">
          {t(
            "team.hero.description@@Meet the OBRIYM team of strategists, designers and developers building fast SEO-ready websites and web apps for international brands.",
          )}
        </p>
      </div>
    </section>
  );
});
