import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import styles from "./sh-styles.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  // useVisibleTask$(async ({ cleanup }) => {
  //   const gsap = (await import("gsap")).default;
  //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  //   gsap.registerPlugin(ScrollTrigger);

  //   const words = gsap.utils.toArray<HTMLElement>(".fly_word");

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".triggertitle",
  //       start: "top 90%",
  //       end: "bottom 20%",
  //       scrub: true,
  //       //   markers: true,
  //     },
  //   });

  //   words.forEach(word => {
  //     const randomX = gsap.utils.random(-150, 150);
  //     const randomY = gsap.utils.random(-100, 100);
  //     // const randomRot = gsap.utils.random(-90, 90);
  //     const randomScale = gsap.utils.random(0, 0.1);

  //     tl.fromTo(
  //       word,
  //       {
  //         x: randomX,
  //         y: randomY,
  //         // rotationZ: randomRot,
  //         scale: randomScale,
  //         // opacity: 0.5,
  //       },

  //       {
  //         x: 0,
  //         y: 0,
  //         // rotationZ: 0,
  //         scale: 1,
  //         // opacity: 1,
  //         duration: 1,
  //         ease: "power3.out",
  //       },
  //       "<",
  //     );
  //   });

  //   cleanup(() => ScrollTrigger.killAll(true));
  // });

  return (
    <section class="sh_section" id="about">
      <div class="container">
        {/* <h2 class="body_big grey title triggertitle">
          {t(
            "home.shsection@@{{name}} — from first spark to full launch.<br> From insight to execution.<br> We plan, design, develop, and launch products that make a real impact.",
            { name: "OBRIYM" },
          )}
        </h2> */}
        <h2 class="body_big grey title triggertitle">
          {t(
            "home.shsection@@{{name}} — from first spark to full launch.<br> From insight to execution.<br> We plan, design, develop, and launch products that make a real impact.",
            { name: "OBRIYM" },
          )
            .split(" ")
            .map((item, key) => (
              <span class="fly_word" key={key}>
                {item}
              </span>
            ))}
        </h2>
      </div>
    </section>
  );
});
