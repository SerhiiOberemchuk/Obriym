import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./st-styles.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <section class="st_section">
      <div class="container">
        <h1 class="H2_light black title">
          <span>Complete</span> <span class="H1_extra_light grey_dark">digital</span>
          <img src="/images/green.png" width={124} height={124} alt="dfd" />
          <span class="H1_extra_light grey_dark">products.</span>
          <img
            src="/images/hero_slides.png"
            alt="desc"
            width={233}
            height={124}
            class="notebook tablet"
          />
          <span>From</span>
          <span>concept to launch</span>
          <canvas></canvas>
          <img
            src="/images/hero_slides.png"
            alt="desc"
            width={233}
            height={124}
            class="notebook mobile"
          />
        </h1>
      </div>
    </section>
  );
});
