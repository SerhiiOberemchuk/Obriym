import { component$, $, useSignal, useVisibleTask$, useStylesScoped$ } from "@qwik.dev/core";
import { Carousel } from "@qwik-ui/headless";

import styles from "./styles_qwik_slider.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const baseColors = ["red", "green", "blue"];
  const colors = [baseColors[baseColors.length - 1], ...baseColors, baseColors[0]];

  const currentIndex = useSignal(1); // Start at real first slide
  const viewportCategory = useSignal<"mobile" | "tablet" | "desktop">("mobile");
  const scrollerRef = useSignal<HTMLElement>();

  const slideCount = colors.length;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const updateCategory = () => {
      const width = window.innerWidth;
      if (width >= 1440) viewportCategory.value = "desktop";
      else if (width >= 768) viewportCategory.value = "tablet";
      else viewportCategory.value = "mobile";
    };

    updateCategory();
    window.addEventListener("resize", updateCategory);
    cleanup(() => window.removeEventListener("resize", updateCategory));
  });
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (viewportCategory.value !== "mobile") return;
    const scroller = scrollerRef.value;
    if (!scroller) return;

    const slideWidth = scroller.clientWidth;
    const transitionDuration = 500; // ms
    const intervalDuration = 3000;

    // first scroll to the first real slide
    scroller.scrollTo({
      left: slideWidth * currentIndex.value,
      behavior: "auto",
    });

    const interval = setInterval(() => {
      currentIndex.value++;

      scroller.scrollTo({
        left: slideWidth * currentIndex.value,
        behavior: "smooth",
      });

      // after 500ms, check if we reached the last slide
      // and reset to the first real slide
      setTimeout(() => {
        if (currentIndex.value === slideCount - 1) {
          // disable smooth animation
          scroller.style.scrollBehavior = "auto";

          currentIndex.value = 1;
          scroller.scrollTo({
            left: slideWidth * currentIndex.value,
          });

          // re-enable smooth animation
          scroller.style.scrollBehavior = "smooth";
        }
      }, transitionDuration);
    }, intervalDuration);

    cleanup(() => clearInterval(interval));
  });

  //   const scrollOne = $((dir: "next" | "prev") => {
  //     const scroller = scrollerRef.value;
  //     if (!scroller) return;

  //     const slide = scroller.querySelector(".carousel-slide") as HTMLElement;
  //     if (!slide) return;

  //     const offset = slide.offsetWidth + parseFloat(getComputedStyle(scroller).gap || "0");
  //     scroller.scrollBy({ left: dir === "next" ? offset : -offset, behavior: "smooth" });
  //   });
  return (
    <Carousel.Root gap={0} class="carousel-root">
      {/* BUTTONS viewportCategory.value === "tablet"*/}

      {/* <div class="inf_btn_controls">
        <button onClick$={() => scrollOne("prev")}>←</button>
        <button onClick$={() => scrollOne("next")}>→</button>
      </div> */}

      <Carousel.Scroller class="carousel-scroller" ref={scrollerRef}>
        {colors.map((color, i) => (
          <Carousel.Slide key={i} class="carousel-slide">
            <div class="slide-inner" style={{ backgroundColor: color }}>
              {color}
            </div>
          </Carousel.Slide>
        ))}
      </Carousel.Scroller>
      <div class="inf_carousel-dots">
        {baseColors.map((_, i) => (
          <button
            class={`inf_dot ${i === (currentIndex.value - 1 + baseColors.length) % baseColors.length ? "active" : ""}`}
            key={`dot-${i}`}
          />
        ))}
      </div>
    </Carousel.Root>
  );
});
