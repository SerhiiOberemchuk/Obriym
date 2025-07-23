import { component$, $, useStylesScoped$, useVisibleTask$, useStore } from "@qwik.dev/core";

import styles from "./infiniteCarousel.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const cards = ["A", "B", "C"];
  const extCards = [...cards, ...cards]; // Duplicate cards for infinite effect

  const state = useStore({
    currentIndex: 0,
    offsetX: 0,
    isDragging: false,
    startX: 0,
    width: 0,
  });

  const onPointerDown = $((event: PointerEvent) => {
    state.isDragging = true;
    state.startX = event.clientX;
  });

  const onPointerMove = $((event: PointerEvent) => {
    if (!state.isDragging) return;
    state.offsetX = event.clientX - state.startX;
  });

  const onPointerUp = $(() => {
    if (!state.isDragging) return;
    state.isDragging = false;

    if (state.offsetX < -30) {
      state.currentIndex = (state.currentIndex + 1) % cards.length;
    } else if (state.offsetX > 30) {
      state.currentIndex = (state.currentIndex - 1 + cards.length) % cards.length;
    }

    state.offsetX = 0;
  });

  useVisibleTask$(() => {
    const updateWidth = () => {
      state.width = window.innerWidth < 768 ? window.innerWidth : 400;
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  //   useVisibleTask$(({ cleanup }) => {
  //     const tick = () => {
  //       if (!state.isDragging) {
  //         state.currentIndex = (state.currentIndex + 1) % cards.length;
  //       }
  //       timer = setTimeout(tick, 3000);
  //     };

  //     let timer = setTimeout(tick, 3000);
  //     cleanup(() => clearTimeout(timer));
  //   });

  // const getTranslateX = () => {
  //   return -state.currentIndex * state.width + state.offsetX;
  // };

  return (
    <div class="c_carousel_wrapper">
      <div
        class="c_carousel-container"
        onPointerDown$={onPointerDown}
        onPointerMove$={onPointerMove}
        onPointerUp$={onPointerUp}
      >
        <div class="c_carousel-track scrollLeft">
          {extCards.map(card => (
            <div key={card} class="c_carousel-item">
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
