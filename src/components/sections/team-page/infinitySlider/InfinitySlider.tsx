import {
  component$,
  useSignal,
  useVisibleTask$,
  useStylesScoped$,
  $,
  useComputed$,
  Signal,
} from "@qwik.dev/core";
import { Modal } from "@qwik-ui/headless";

import styles from "./styles_slider.css?inline";

import IconLeft from "~/assets/icons/icon_left.svg?w=24&h=24&jsx";
import IconRight from "~/assets/icons/icon_right.svg?w=24&h=24&jsx";
import SlideComponent from "./slide-component/SlideComponent";
import { TeamMemberType } from "~/types/team-member";

interface InfinitySliderProps {
  viewportCategory: Signal<string>;
  items: TeamMemberType[];
}

export function getSlideWidthWithGap(track: HTMLElement | null): number {
  if (!track) return 0;

  const rootStyles = getComputedStyle(document.documentElement);
  const slides = parseFloat(rootStyles.getPropertyValue("--slides-inf-per-view")) || 1;
  const gap = parseFloat(rootStyles.getPropertyValue("--inf-gap")) || 0;
  const padding = parseFloat(rootStyles.getPropertyValue("--inf-container-padding")) || 0;

  const totalGap = gap * (slides - 1);
  const slideWidth = (track.offsetWidth - totalGap - 1 * padding) / slides;

  return slideWidth + gap;
}

export default component$(({ viewportCategory, items }: InfinitySliderProps) => {
  useStylesScoped$(styles);

  // for modal
  const isOpen = useSignal(false);
  const selectedItem = useSignal<TeamMemberType | null>(null);

  // for slider
  const itemsOriginalSignal = useSignal<TeamMemberType[]>(items);
  const currentMegaIndex = useSignal(2);
  const itemsSignal = useSignal<TeamMemberType[]>(items);
  const trackRef = useSignal<HTMLElement | undefined>();
  const isPaused = useSignal(false);
  const activeIndex = useSignal(0);

  const isAnimating = useSignal(false);
  const isReady = useSignal(false);

  const baseItems = useComputed$(() => {
    const items = itemsSignal.value;
    if (items.length === 0) return [];
    if (viewportCategory.value === "mobile") {
      const last = items[items.length - 1];
      const first = items[0];
      return [last, ...items, first];
    }
    if (viewportCategory.value === "tablet") {
      const cloneCount = 2;

      // from end
      const clonesFromEnd = items.slice(-cloneCount);

      // from start
      const clonesFromStart = items.slice(0, cloneCount);

      return [...clonesFromEnd, ...items, ...clonesFromStart];
    }
    return items; // without cloning for  desktop
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const track = trackRef.value;
    if (!track || baseItems.value.length === 0) return;

    const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

    if (viewportCategory.value === "mobile") {
      track.style.transition = "none";
      track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;

      requestAnimationFrame(() => {
        track.style.transition = "transform 0.4s ease";

        isReady.value = true;
      });
    } else if (viewportCategory.value === "tablet") {
      const cloneCount = 2;
      track.style.transition = "none";

      track.style.transform = `translate3d(-${slideWidthWithGap * cloneCount}px, 0, 0)`;

      requestAnimationFrame(() => {
        track.style.transition = "transform 0.4s ease";
        isReady.value = true;
      });
    } else {
      isReady.value = true;
    }
  });

  //for mobile
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (
      !isReady.value ||
      isPaused.value ||
      viewportCategory.value !== "mobile" ||
      isAnimating.value
    )
      return;
    const track = trackRef.value;
    if (!track) return;
    // from first real slide
    let currentIndex = 1;
    const cloneCount = 1; //pro side
    const realSlidesCount = itemsOriginalSignal.value.length;
    const totalSlides = baseItems.value.length;
    const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

    const interval = setInterval(() => {
      isAnimating.value = true;

      currentIndex++;

      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translate3d(-${slideWidthWithGap * currentIndex}px, 0, 0)`;

      const onTransitionEnd = () => {
        track.removeEventListener("transitionend", onTransitionEnd);

        activeIndex.value = (currentIndex - cloneCount + realSlidesCount) % realSlidesCount;
        if (currentIndex >= totalSlides - 1) {
          currentIndex = 1;
          track.style.transition = "none";
          track.style.transform = `translate3d(-${slideWidthWithGap * currentIndex}px, 0, 0)`;
        }
        isAnimating.value = false;
      };

      track.addEventListener("transitionend", onTransitionEnd);
    }, 3000);

    cleanup(() => clearInterval(interval));
  });

  //Next
  const nextSlide = $(() => {
    if (!isReady.value || isAnimating.value) return;
    const track = trackRef.value;
    if (!track) return;

    const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));
    isAnimating.value = true;

    currentMegaIndex.value += 1;

    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translate3d(-${slideWidthWithGap * currentMegaIndex.value}px, 0, 0)`;

    const onTransitionEnd = () => {
      track.removeEventListener("transitionend", onTransitionEnd);

      if (currentMegaIndex.value === baseItems.value.length - 2) {
        currentMegaIndex.value = 2;
        track.style.transition = "none";
        track.style.transform = `translate3d(-${slideWidthWithGap * currentMegaIndex.value}px, 0, 0)`;
      }

      isAnimating.value = false;
    };

    track.addEventListener("transitionend", onTransitionEnd);
  });

  // Previous slide
  const prevSlide = $(() => {
    if (!isReady.value || isAnimating.value) return;

    const track = trackRef.value;
    if (!track) return;

    const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));
    isAnimating.value = true;

    currentMegaIndex.value -= 1;

    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translate3d(-${slideWidthWithGap * currentMegaIndex.value}px, 0, 0)`;

    const onTransitionEnd = () => {
      track.removeEventListener("transitionend", onTransitionEnd);

      // if we are at the first ind clonedslide, go to the last real slide
      if (currentMegaIndex.value === 1) {
        currentMegaIndex.value = baseItems.value.length - 3;

        track.style.transition = "none";
        track.style.transform = `translate3d(-${slideWidthWithGap * currentMegaIndex.value}px, 0, 0)`;
      }

      isAnimating.value = false;
    };

    track.addEventListener("transitionend", onTransitionEnd);
  });

  //for modal
  const openModal = $((item: TeamMemberType) => {
    selectedItem.value = item;
    isOpen.value = true;
  });
  return (
    <div class="inf_carousel-container">
      {/* BUTTONS viewportCategory.value === "tablet"*/}
      <div class="inf_btn_controls">
        <button onClick$={prevSlide}>
          <IconLeft />
        </button>
        <button onClick$={nextSlide}>
          <IconRight />
        </button>
      </div>

      {/* SLIDER */}
      <div
        class="inf_carousel-track"
        ref={trackRef}
        onMouseEnter$={() => (isPaused.value = true)}
        onMouseLeave$={() => (isPaused.value = false)}
        onTouchStart$={() => (isPaused.value = true)}
        onTouchEnd$={() => (isPaused.value = false)}
        onTouchCancel$={() => (isPaused.value = false)}
      >
        {baseItems.value.map((item, i) => (
          // <div class="inf_carousel-slide" key={`slide-${item.id}-${i}`}>

          <div
            class={`inf_carousel-slide ${!isReady.value ? "invisible" : ""}`}
            key={`slide-${item.id}-${i}`}
          >
            <SlideComponent item={item} onOpen$={$(() => openModal(item))} />
            {/* // onOpen$={$(() => openModal(item))} onOpen$={() => openModal(item)}*/}
            <div>Content {item.name}</div>
          </div>
        ))}
      </div>
      {isReady.value && (
        <div class="inf_carousel-dots">
          {itemsOriginalSignal.value.map((_, i) => (
            <div class={`inf_dot ${i === activeIndex.value ? "active" : ""}`} key={`dot-${i}`} />
          ))}
        </div>
      )}
      <Modal.Root bind:show={isOpen}>
        <Modal.Panel class="modal-panel">
          {selectedItem.value && (
            <>
              <Modal.Title>{selectedItem.value.name}</Modal.Title>
              <Modal.Description>{selectedItem.value.role}</Modal.Description>
              {/* любое другое содержимое */}

              <Modal.Close class="modal-close">
                <button>Закрыть</button>
              </Modal.Close>
            </>
          )}
        </Modal.Panel>
      </Modal.Root>
    </div>
  );
});

// quantity of cards in the carousel
//   const updateViewport = $(() => {
//     const width = window.innerWidth;

//     if (width >= 1440) {
//       viewportCategory.value = "desktop";
//       slidesPerView.value = 3;
//     } else if (width >= 768) {
//       viewportCategory.value = "tablet";
//       slidesPerView.value = 2.3;
//     } else {
//       viewportCategory.value = "mobile";
//       slidesPerView.value = 1;
//     }

//     const root = document.documentElement;
//     root.style.setProperty("--slides-inf-per-view", slidesPerView.value.toString());
//   });

//   useOnWindow(
//     "load",
//     $(() => {
//       updateViewport();
//     }),
//   );

//   useOnWindow(
//     "resize",
//     $(() => {
//       updateViewport();
//     }),
//   );

// const prevSlide = $(() => {
//   if (!isReady.value || isAnimating.value) return;
//   isAnimating.value = true;

//   const track = trackRef.value;
//   if (!track) return;

//   const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

//   // change the order of items in baseItems

//   const items = [...itemsSignal.value];
//   const last = items.pop()!;
//   items.unshift(last);
//   itemsSignal.value = items;

//   // without animation, move the track to the left by slideWidth
//   track.style.transition = "none";

//   //track.style.transform = `translateX(-${slideWidthWithGap * 2}px)`;
//   track.style.transform = `translate3d(-${slideWidthWithGap * 2}px, 0, 0)`;

//   // Double rAF: ensures the browser applies the initial transform
//   requestAnimationFrame(() => {
//     requestAnimationFrame(() => {
//       track.style.transition = "transform 0.4s ease";

//       //track.style.transform = `translateX(-${slideWidthWithGap}px)`;
//       track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;
//     });
//   });

//   // Reset the flag after the animation is complete
//   setTimeout(() => {
//     isAnimating.value = false;
//     // activeIndex.value =
//     //   (activeIndex.value - 1 + itemsSignal.value.length) % itemsSignal.value.length;
//   }, 400); // same as transition duration
// });
// В nextSlide:
// const nextSlide = $(() => {
//   if (!isReady.value || isAnimating.value) return;
//   isAnimating.value = true;

//   const track = trackRef.value;
//   if (!track) return;

//   const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

//   //animation shift to the left from 0 to -slideWidth

//   track.style.transition = "transform 0.4s ease";

//   track.style.transform = `translate3d(-${slideWidthWithGap * 2}px, 0, 0)`;

//   setTimeout(() => {
//     // after the animation, we change the order of items- first item to the end
//     const items = [...itemsSignal.value];
//     const first = items.shift()!;
//     items.push(first);
//     itemsSignal.value = items;

//     //reset the track position
//     track.style.transition = "none";

//     track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;

//     // allow new animation
//     isAnimating.value = false;

//     // update active index for dots

//     // activeIndex.value = (activeIndex.value + 1) % itemsSignal.value.length;
//   }, 400);
// });
