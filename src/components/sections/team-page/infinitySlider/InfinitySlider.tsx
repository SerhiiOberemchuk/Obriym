import {
  component$,
  useSignal,
  useVisibleTask$,
  useStylesScoped$,
  $,
  useComputed$,
} from "@qwik.dev/core";

import styles from "./styles_slider.css?inline";
import IconLeft from "~/assets/icons/icon_left.svg?w=24&h=24&jsx";
import IconRight from "~/assets/icons/icon_right.svg?w=24&h=24&jsx";
import SlideComponent from "./slide-component/SlideComponent";
import { TeamMemberType } from "~/types/team-member";

interface InfinitySliderProps {
  viewportCategory: "mobile" | "tablet" | "desktop";
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
  console.log("slideWidth  ", slideWidth);
  console.log("gap  ", gap);
  return slideWidth + gap;
}

export default component$(({ viewportCategory, items }: InfinitySliderProps) => {
  useStylesScoped$(styles);

  // const baseItems = useSignal<TeamMemberType[]>([]);
  const currentMegaIndex = useSignal(2);
  const itemsSignal = useSignal<TeamMemberType[]>(items);
  const trackRef = useSignal<HTMLElement | undefined>();
  const isPaused = useSignal(false);
  // const slidesPerView = useSignal(1);
  const activeIndex = useSignal(0);
  // const viewportCategory = useSignal<"mobile" | "tablet" | "desktop">("mobile");
  const isAnimating = useSignal(false);
  const isReady = useSignal(false);

  const baseItems = useComputed$(() => {
    const items = itemsSignal.value;
    if (items.length === 0) return [];
    if (viewportCategory === "mobile") {
      const last = items[items.length - 1];
      const first = items[0];
      return [last, ...items, first]; // without cloning for mobile
    }
    if (viewportCategory === "tablet") {
      const cloneCount = 2;

      // from end
      const clonesFromEnd = items.slice(-cloneCount);

      // from start
      const clonesFromStart = items.slice(0, cloneCount);

      return [...clonesFromEnd, ...items, ...clonesFromStart];
    }
    return items; // without cloning for mobile or desktop
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const track = trackRef.value;
    if (!track || baseItems.value.length === 0) return;

    //const slideWidthWithGap = getSlideWidthWithGap(track);
    const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

    // if not mobile, set initial transform
    if (viewportCategory === "mobile") {
      track.style.transition = "none";
      track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;

      requestAnimationFrame(() => {
        track.style.transition = "transform 0.4s ease";

        isReady.value = true;
      });
    } else if (viewportCategory === "tablet") {
      const cloneCount = 2;
      track.style.transition = "none";
      console.log("slideWidthWithGap 2 ", slideWidthWithGap);
      track.style.transform = `translate3d(-${slideWidthWithGap * cloneCount}px, 0, 0)`;

      requestAnimationFrame(() => {
        track.style.transition = "transform 0.4s ease";
        isReady.value = true;
      });
    } else {
      isReady.value = true;
    }
  });

  // paused slider
  //autoscroll for mobile

  // useVisibleTask$(({ cleanup }) => {
  //   const interval = setInterval(() => {
  //     if (!isReady.value || isPaused.value || viewportCategory !== "mobile" || isAnimating.value)
  //       return;

  //     const track = trackRef.value;

  //     if (!track) return;

  //     //const slideWidthWithGap = getSlideWidthWithGap(track);
  //     const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

  //     track.style.transition = "transform 0.4s ease";
  //     // track.style.transform = `translateX(-${slideWidthWithGap}px)`;
  //     track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;

  //     setTimeout(() => {
  //       const items = [...itemsSignal.value];
  //       const first = items.shift()!;
  //       items.push(first);
  //       itemsSignal.value = items;

  //       requestAnimationFrame(() => {
  //         activeIndex.value = (activeIndex.value + 1) % itemsSignal.value.length;
  //         if (track) {
  //           track.style.transition = "none";
  //           // track.style.transform = "translateX(0)";
  //           track.style.transform = "translate3d(0, 0, 0)";
  //         }
  //       });
  //     }, 400);
  //   }, 3000);

  //   cleanup(() => clearInterval(interval));
  // });
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (!isReady.value || isPaused.value || viewportCategory !== "mobile" || isAnimating.value)
      return;
    const track = trackRef.value;
    if (!track) return;
    // from first real slide
    let currentIndex = 1;

    const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));
    const totalSlides = baseItems.value.length;

    const interval = setInterval(() => {
      isAnimating.value = true;

      currentIndex++;

      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translate3d(-${slideWidthWithGap * currentIndex}px, 0, 0)`;

      const onTransitionEnd = () => {
        track.removeEventListener("transitionend", onTransitionEnd);

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

      console.log("baseItems.value.length ", baseItems.value.length);
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
    isAnimating.value = true;

    const track = trackRef.value;
    if (!track) return;

    const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

    // change the order of items in baseItems

    const items = [...itemsSignal.value];
    const last = items.pop()!;
    items.unshift(last);
    itemsSignal.value = items;

    // without animation, move the track to the left by slideWidth
    track.style.transition = "none";

    //track.style.transform = `translateX(-${slideWidthWithGap * 2}px)`;
    track.style.transform = `translate3d(-${slideWidthWithGap * 2}px, 0, 0)`;

    // Double rAF: ensures the browser applies the initial transform
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.4s ease";

        //track.style.transform = `translateX(-${slideWidthWithGap}px)`;
        track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;
      });
    });

    // Reset the flag after the animation is complete
    setTimeout(() => {
      isAnimating.value = false;
      // activeIndex.value =
      //   (activeIndex.value - 1 + itemsSignal.value.length) % itemsSignal.value.length;
    }, 400); // same as transition duration
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
            <SlideComponent item={item} />
          </div>
        ))}
      </div>
      {isReady.value && (
        <div class="inf_carousel-dots">
          {baseItems.value.map((_, i) => (
            <div class={`inf_dot ${i === activeIndex.value ? "active" : ""}`} key={`dot-${i}`} />
          ))}
        </div>
      )}
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
