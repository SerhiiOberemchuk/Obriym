import {
  component$,
  useSignal,
  useVisibleTask$,
  useStylesScoped$,
  $,
  useOnWindow,
  useComputed$,
} from "@qwik.dev/core";

import styles from "./styles_slider.css?inline";
import IconLeft from "~/assets/icons/icon_left.svg?w=24&h=24&jsx";
import IconRight from "~/assets/icons/icon_right.svg?w=24&h=24&jsx";
import SlideComponent from "./slide-component/SlideComponent";
import { TeamMemberType } from "~/types/team-member";

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

export default component$(({ items }: { items: TeamMemberType[] }) => {
  useStylesScoped$(styles);

  // const baseItems = useSignal<TeamMemberType[]>([]);

  const itemsSignal = useSignal<TeamMemberType[]>(items);
  const trackRef = useSignal<HTMLElement | undefined>();
  const isPaused = useSignal(false);
  const slidesPerView = useSignal(1);
  const activeIndex = useSignal(0);
  const viewportCategory = useSignal<"mobile" | "tablet" | "desktop">("mobile");
  const isAnimating = useSignal(false);
  const isReady = useSignal(false);

  // Update slidesPerView from CSS variable
  const updateSlidesPerViewFromCSS = $(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const cssSlidesPerView = rootStyles.getPropertyValue("--slides-inf-per-view");
    const parsed = parseFloat(cssSlidesPerView.trim());
    slidesPerView.value = parsed;

    // Update viewportCategory based on parsed value
    if (parsed >= 3) viewportCategory.value = "desktop";
    else if (parsed > 1.5) viewportCategory.value = "tablet";
    else viewportCategory.value = "mobile";
  });
  //does not work when we come from another page
  //useOnWindow("load", updateSlidesPerViewFromCSS);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    updateSlidesPerViewFromCSS();
  });
  useOnWindow("resize", updateSlidesPerViewFromCSS);

  const baseItems = useComputed$(() => {
    const items = itemsSignal.value;
    if (items.length === 0) return [];
    if (viewportCategory.value === "tablet") {
      const last = items[items.length - 1];
      const first = items[0];
      return [last, ...items, first]; // without cloning for mobile
    }

    return items; // without cloning for mobile or desktop
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const track = trackRef.value;
    if (!track || baseItems.value.length === 0) return;

    const slideWidthWithGap = getSlideWidthWithGap(track);

    // if not mobile, set initial transform
    if (viewportCategory.value === "tablet") {
      track.style.transition = "none";
      //track.style.transform = `translateX(-${slideWidthWithGap}px)`;
      track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;
    }

    requestAnimationFrame(() => {
      isReady.value = true;
    });
  });

  // paused slider
  //autoscroll for mobile
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (isPaused.value || viewportCategory.value !== "mobile" || isAnimating.value) return;

      const track = trackRef.value;

      if (!track) return;

      //const slideWidthWithGap = getSlideWidthWithGap(track);
      const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

      track.style.transition = "transform 0.4s ease";
      // track.style.transform = `translateX(-${slideWidthWithGap}px)`;
      track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;

      setTimeout(() => {
        const items = [...itemsSignal.value];
        const first = items.shift()!;
        items.push(first);
        itemsSignal.value = items;

        //active dots
        // activeIndex.value = (activeIndex.value + 1) % itemsSignal.value.length;
        // Reset the track position
        // if (track) {
        //   track.style.transition = "none";
        //   track.style.transform = "translate3d(0, 0, 0)";
        // }
        requestAnimationFrame(() => {
          activeIndex.value = (activeIndex.value + 1) % itemsSignal.value.length;
          if (track) {
            track.style.transition = "none";
            // track.style.transform = "translateX(0)";
            track.style.transform = "translate3d(0, 0, 0)";
          }
        });
      }, 400);
    }, 3000);

    cleanup(() => clearInterval(interval));
  });

  //Next
  // В nextSlide:
  const nextSlide = $(() => {
    if (isAnimating.value) return;
    isAnimating.value = true;

    const track = trackRef.value;
    if (!track) return;

    // const slideWidthWithGap = getSlideWidthWithGap(track);
    const slideWidthWithGap = Math.round(getSlideWidthWithGap(track));

    //animation shift to the left from 0 to -slideWidth
    track.style.transition = "transform 0.4s ease";
    //track.style.transform = `translateX(-${slideWidthWithGap * 2}px)`;
    track.style.transform = `translate3d(-${slideWidthWithGap * 2}px, 0, 0)`;

    setTimeout(() => {
      // after the animation, we change the order of items- first item to the end
      const items = [...itemsSignal.value];
      const first = items.shift()!;
      items.push(first);
      itemsSignal.value = items;

      //reset the track position
      track.style.transition = "none";

      //track.style.transform = `translateX(-${slideWidthWithGap}px)`;
      track.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;

      // allow new animation
      isAnimating.value = false;

      // update active index for dots

      // activeIndex.value = (activeIndex.value + 1) % itemsSignal.value.length;
    }, 400);
  });

  // Previous slide
  const prevSlide = $(() => {
    if (isAnimating.value) return;
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
        {isReady.value && (
          <>
            {baseItems.value.map((item, i) => (
              <div class="inf_carousel-slide" key={`slide-${item.id}-${i}`}>
                {/* {item} */}
                <SlideComponent item={item} />
              </div>
            ))}
          </>
        )}
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
