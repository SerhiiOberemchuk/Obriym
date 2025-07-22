import { component$, useSignal, useVisibleTask$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./styles_slider.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const baseItems = useSignal(["a", "b", "c"]);
  const trackRef = useSignal<HTMLElement>();
  const isPaused = useSignal(false);
  const slidesPerView = useSignal(1);
  const activeIndex = useSignal(0);

  // quantity of cards in the carousel
  useVisibleTask$(() => {
    const updateSlides = () => {
      slidesPerView.value = window.innerWidth >= 768 ? 2 : 1;
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  });

  // paused slider
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (isPaused.value) return;

      const track = trackRef.value;
      if (!track) return;

      const slideWidth = track.offsetWidth / slidesPerView.value;

      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translateX(-${slideWidth}px)`;

      setTimeout(() => {
        const items = [...baseItems.value];
        const first = items.shift()!;
        items.push(first);
        baseItems.value = items;
        //active dots
        activeIndex.value = (activeIndex.value + 1) % baseItems.value.length;

        // Reset the track position
        requestAnimationFrame(() => {
          if (track) {
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
          }
        });
      }, 400);
    }, 3000);

    cleanup(() => clearInterval(interval));
  });

  return (
    <div
      class="carousel-container"
      onMouseEnter$={() => (isPaused.value = true)}
      onMouseLeave$={() => (isPaused.value = false)}
      onTouchStart$={() => (isPaused.value = true)}
      onTouchEnd$={() => (isPaused.value = false)}
      onTouchCancel$={() => (isPaused.value = false)}
    >
      <div class="carousel-track" ref={trackRef}>
        {baseItems.value.map((item, i) => (
          <div class="carousel-slide" key={`${item}-${i}`}>
            {item}
          </div>
        ))}
      </div>
      <div class="carousel-dots">
        {baseItems.value.map((_, i) => (
          <button class={`dot ${i === activeIndex.value ? "active" : ""}`} key={`dot-${i}`} />
        ))}
      </div>
    </div>
  );
});
