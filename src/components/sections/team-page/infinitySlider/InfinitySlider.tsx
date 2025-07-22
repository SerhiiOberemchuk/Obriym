import { component$, useSignal, useVisibleTask$, useStylesScoped$, $ } from "@builder.io/qwik";
import styles from "./styles_slider.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const baseItems = useSignal(["a", "b", "c"]);
  const trackRef = useSignal<HTMLElement>();
  const isPaused = useSignal(false);
  const slidesPerView = useSignal(1);
  const activeIndex = useSignal(0);
  const viewportCategory = useSignal<"mobile" | "tablet" | "desktop">("mobile");

  // quantity of cards in the carousel
  useVisibleTask$(() => {
    const updateViewport = () => {
      const width = window.innerWidth;

      if (width >= 1440) {
        viewportCategory.value = "desktop";
        slidesPerView.value = 3;
      } else if (width >= 768) {
        viewportCategory.value = "tablet";
        slidesPerView.value = 2;
      } else {
        viewportCategory.value = "mobile";
        slidesPerView.value = 1;
      }
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  });

  // paused slider
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (isPaused.value || viewportCategory.value !== "mobile") return;

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

  //Next
  const nextSlide = $(() => {
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
      activeIndex.value = (activeIndex.value + 1) % baseItems.value.length;

      requestAnimationFrame(() => {
        if (track) {
          track.style.transition = "none";
          track.style.transform = "translateX(0)";
        }
      });
    }, 400);
  });

  // Previous slide

  const prevSlide = $(() => {
    const track = trackRef.value;
    if (!track) return;

    const slideWidth = track.offsetWidth / slidesPerView.value;

    // 1. Change the order of items in baseItems
    const items = [...baseItems.value];
    const last = items.pop()!;
    baseItems.value = [last, ...items];
    activeIndex.value = (activeIndex.value - 1 + baseItems.value.length) % baseItems.value.length;

    // 2. Move the track to the left by slideWidth (without animation)
    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidth}px)`;

    // 3. On the next frame — animate to 0 (to the right)
    requestAnimationFrame(() => {
      track.style.transition = "transform 0.4s ease";
      track.style.transform = "translateX(0)";
    });
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
      {/* BUTTONS */}
      {viewportCategory.value === "tablet" && (
        <div class="controls">
          <button onClick$={prevSlide}>← Назад</button>
          <button onClick$={nextSlide}>Вперёд →</button>
        </div>
      )}
      {/* SLIDER */}
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
