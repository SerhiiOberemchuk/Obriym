import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./infinityScroll2.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const items = ["А", "B", "C"];
  const doubleCards = [...items, ...items, ...items]; // Duplicate cards for infinite effect

  // useVisibleTask$(({ cleanup }) => {
  //   const interval = setInterval(() => {
  //     index.value = (index.value + 1) % items.length;
  //   }, 2000);

  //   cleanup(() => clearInterval(interval));
  // });

  return (
    <div class="c_carousel-container">
      {/* style={{ transform: `translateX(-${index.value * 100}%)` }} */}
      <div class="c_carousel-track">
        {doubleCards.map((item, idx) => (
          <div key={idx} class="c_carousel-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
});
