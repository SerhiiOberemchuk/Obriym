import {
  component$,
  useSignal,
  useVisibleTask$,
  useStylesScoped$,
  $,
  useOnWindow,
} from "@qwik.dev/core";
import { TEAM_MEMBERS } from "~/const/team";

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

export default component$(() => {
  useStylesScoped$(styles);

  //   const baseItems = useSignal(["a", "b", "c"]);
  const baseItems = useSignal<TeamMemberType[]>([]);
  const trackRef = useSignal<HTMLElement>();
  const isPaused = useSignal(false);
  const slidesPerView = useSignal(1);
  const activeIndex = useSignal(0);
  const viewportCategory = useSignal<"mobile" | "tablet" | "desktop">("mobile");
  const isAnimating = useSignal(false);

  useVisibleTask$(() => {
    baseItems.value = [...TEAM_MEMBERS]; // Initialize with team members
  });
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

  useOnWindow("load", updateSlidesPerViewFromCSS);
  useOnWindow("resize", updateSlidesPerViewFromCSS);
  //cloned Arr
  const getClonedItems = () => {
    const items = baseItems.value;
    if (items.length === 0) return [];
    const last = items[items.length - 1];
    const first = items[0];
    return [last, ...items, first];
  };

  // paused slider!!!!!

  //autoscroll for mobile
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (isPaused.value || viewportCategory.value !== "mobile" || isAnimating.value) return;

      const track = trackRef.value;

      if (!track) return;

      const slideWidthWithGap = getSlideWidthWithGap(track);

      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translateX(-${slideWidthWithGap}px)`;

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
  // В nextSlide:
  const nextSlide = $(() => {
    if (isAnimating.value) return;
    isAnimating.value = true;

    const track = trackRef.value;
    if (!track) return;

    // const slideWidth = track.offsetWidth / slidesPerView.value;
    const slideWidthWithGap = getSlideWidthWithGap(track);

    //animation shift to the left from 0 to -slideWidth
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${slideWidthWithGap}px)`;

    setTimeout(() => {
      // after the animation, we change the order of items- first item to the end
      const items = [...baseItems.value];
      const first = items.shift()!;
      items.push(first);
      baseItems.value = items;

      //reset the track position
      track.style.transition = "none";
      track.style.transform = "translateX(0)";

      // allow new animation
      isAnimating.value = false;

      // update active index for dots
      activeIndex.value = (activeIndex.value + 1) % baseItems.value.length;
    }, 400);
  });

  // Previous slide
  const prevSlide = $(() => {
    if (isAnimating.value) return;
    isAnimating.value = true;

    const track = trackRef.value;
    if (!track) return;

    //const slideWidth = track.offsetWidth / slidesPerView.value;
    const slideWidthWithGap = getSlideWidthWithGap(track);

    // change the order of items in baseItems
    const items = [...baseItems.value];
    const last = items.pop()!;
    items.unshift(last);
    baseItems.value = items;

    // without animation, move the track to the left by slideWidth
    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidthWithGap}px)`;

    // Double rAF: ensures the browser applies the initial transform
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.4s ease";
        track.style.transform = "translateX(0)";
      });
    });

    // Reset the flag after the animation is complete
    setTimeout(() => {
      isAnimating.value = false;
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
        {getClonedItems().map((item, i) => (
          <div class="inf_carousel-slide" key={`slide-${item.id}-${i}`}>
            {/* {item} */}
            <SlideComponent item={item} />
          </div>
        ))}
      </div>
      <div class="inf_carousel-dots">
        {baseItems.value.map((_, i) => (
          <div class={`inf_dot ${i === activeIndex.value ? "active" : ""}`} key={`dot-${i}`} />
        ))}
      </div>
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
