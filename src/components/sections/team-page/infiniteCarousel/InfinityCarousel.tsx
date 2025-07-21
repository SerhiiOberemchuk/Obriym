import {
  component$,
  useSignal,
  $,
  useStylesScoped$,
  useVisibleTask$,
  useTask$,
} from "@builder.io/qwik";

import styles from "./infiniteCarousel.css?inline";

export default component$(() => {
  const containerRef = useSignal<HTMLElement>();
  const cards = ["A", "B", "C"];

  const visibleCount = useSignal(1);

  const extendedCards = [cards[2], ...cards, cards[0]];

  useVisibleTask$(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 768) {
        visibleCount.value = 2;
      } else {
        visibleCount.value = 1;
      }

      if (containerRef.value) {
        const cardWidth = containerRef.value.offsetWidth / visibleCount.value;
        containerRef.value.scrollLeft = cardWidth;
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
  });

  const onScroll$ = () => {
    const el = containerRef.value;
    if (!el) return;

    const cardWidth = el.offsetWidth / visibleCount.value;
    const scrollLeft = el.scrollLeft;

    const maxScroll = cardWidth * (extendedCards.length - visibleCount.value);

    if (scrollLeft <= 0) {
      el.scrollLeft = cardWidth * cards.length;
    } else if (scrollLeft >= maxScroll) {
      el.scrollLeft = cardWidth;
    }
  };

  return (
    <>
      <style>{`
        .carousel-container {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          display: flex;
          scrollbar-width: none; /* Firefox */
        }
        .carousel-container::-webkit-scrollbar {
          display: none; /* Chrome */
        }
        .card {
          flex: 0 0 auto;
          scroll-snap-align: start;
          border: 2px solid #0070f3;
          border-radius: 12px;
          background: #e0f0ff;
          font-size: 2rem;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          height: 150px;
          margin-right: 10px;
          width: 100%; /* будет пересчитано inline */
          box-sizing: border-box;
          touch-action: pan-x;
        }

        @media(min-width: 768px) {
          .card {
            width: calc((100% / 2) - 10px);
          }
        }
        @media(max-width: 767px) {
          .card {
            width: 100%;
          }
        }
      `}</style>
      <div
        class="carousel-container"
        ref={containerRef}
        onScroll$={onScroll$}
        role="list"
        aria-label="Infinite Carousel"
      >
        {extendedCards.map((card, idx) => (
          <div key={idx} class="card" role="listitem" aria-label={`Card ${card}`}>
            {card}
          </div>
        ))}
      </div>
    </>
  );
});
