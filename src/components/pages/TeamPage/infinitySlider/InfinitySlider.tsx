import {
  component$,
  useSignal,
  useStylesScoped$,
  $,
  useComputed$,
  useTask$,
  useContext,
} from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import styles from "./styles_slider.css?inline";

import IconLeft from "~/assets/icons/icon_left.svg?w=24&h=24&jsx";
import IconRight from "~/assets/icons/icon_right.svg?w=24&h=24&jsx";
import SlideComponent from "./slide-component/SlideComponent";
import ModalWrapper from "~/components/common/modal-component/ModalComponent";
import { TeamMemberType } from "~/types/team-member.type";
import { imageMap } from "~/const/team";
import { ViewportContext, ViewportWidthContext } from "~/routes/[...lang]/layout";

interface InfinitySliderProps {
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

export default component$(({ items }: InfinitySliderProps) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const viewportCategory = useContext(ViewportContext);
  const viewportWidth = useContext(ViewportWidthContext);
  const isOpen = useSignal(false);
  const selectedItem = useSignal<TeamMemberType | null>(null);

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
      const clonesFromEnd = items.slice(-cloneCount);
      const clonesFromStart = items.slice(0, cloneCount);

      return [...clonesFromEnd, ...items, ...clonesFromStart];
    }
    return items;
  });

  useTask$(({ track }) => {
    track(() => viewportCategory.value);
    track(() => viewportWidth.value);
    const trackR = trackRef.value;
    if (!trackR || baseItems.value.length === 0) return;
    trackR.style.transition = "none";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const slideWidthWithGap = Math.round(getSlideWidthWithGap(trackR));

        if (viewportCategory.value === "mobile") {
          trackR.style.transform = `translate3d(-${slideWidthWithGap}px, 0, 0)`;
        } else if (viewportCategory.value === "tablet") {
          const cloneCount = 2;
          trackR.style.transform = `translate3d(-${slideWidthWithGap * cloneCount}px, 0, 0)`;
        } else {
          trackR.style.transform = "translate3d(0, 0, 0)";
        }

        trackR.style.transition = "transform 0.4s ease";

        isReady.value = true;
      });
    });
  });

  useTask$(({ cleanup, track }) => {
    track(() => isOpen.value);
    track(() => isReady.value);
    track(() => isPaused.value);
    track(() => viewportCategory.value);
    track(() => viewportWidth.value);

    if (
      isOpen.value ||
      !isReady.value ||
      isPaused.value ||
      viewportCategory.value !== "mobile"
      //|| isAnimating.value
    )
      return;
    const trackR = trackRef.value;
    if (!trackR) return;
    let currentIndex = 1;
    const cloneCount = 1; //pro side
    const realSlidesCount = itemsOriginalSignal.value.length;
    const totalSlides = baseItems.value.length;
    const slideWidthWithGap = Math.round(getSlideWidthWithGap(trackR));

    const interval = setInterval(() => {
      isAnimating.value = true;

      currentIndex++;

      trackR.style.transition = "transform 0.4s ease";
      trackR.style.transform = `translate3d(-${slideWidthWithGap * currentIndex}px, 0, 0)`;

      const onTransitionEnd = () => {
        trackR.removeEventListener("transitionend", onTransitionEnd);

        activeIndex.value = (currentIndex - cloneCount + realSlidesCount) % realSlidesCount;
        if (currentIndex >= totalSlides - 1) {
          currentIndex = 1;
          trackR.style.transition = "none";
          trackR.style.transform = `translate3d(-${slideWidthWithGap * currentIndex}px, 0, 0)`;
        }
        isAnimating.value = false;
      };

      trackR.addEventListener("transitionend", onTransitionEnd);
    }, 3000);

    cleanup(() => clearInterval(interval));
  });

  //Next
  const nextSlide = $(() => {
    // console.log("in next");
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
  useTask$(({ track }) => {
    const open = track(() => isOpen.value);
    if (!open) {
      selectedItem.value = null;
    }
  });

  const memberName = t(
    `team.member.${selectedItem?.value?.slug}.name@@${selectedItem?.value?.name}`,
  );
  const linkedinLabel = t("team.aria.linkedin@@LinkedIn profile of {{name}}", {
    name: memberName,
  });

  return (
    <div class="inf_carousel-container">
      {/* BUTTONS viewportCategory.value === "tablet"*/}
      <div class="inf_btn_controls">
        <button onClick$={prevSlide} aria-label={t("team.aria.slider.button_prev@@Previous slide")}>
          <IconLeft />
        </button>
        <button onClick$={nextSlide} aria-label={t("team.aria.slider.button_next@@Next slide")}>
          <IconRight />
        </button>
      </div>
      {/* SLIDER */}
      <div
        class="inf_carousel-track"
        role="region"
        ref={trackRef}
        onMouseEnter$={() => (isPaused.value = true)}
        onMouseLeave$={() => (isPaused.value = false)}
        onTouchStart$={() => (isPaused.value = true)}
        onTouchEnd$={() => (isPaused.value = false)}
        onTouchCancel$={() => (isPaused.value = false)}
      >
        {baseItems.value.map((item, i) => (
          <div
            class={`inf_carousel-slide ${!isReady.value ? "invisible" : ""}`}
            key={`slide-${item.id}-${i}`}
            role="group"
            aria-labelledby={`name-${item.id}`}
            aria-describedby={`role-${item.id}`}
          >
            <SlideComponent item={item} onOpen$={$(() => openModal(item))} />
          </div>
        ))}
      </div>
      {/* DOTS */}
      {isReady.value && (
        <div
          class="inf_carousel-dots"
          aria-label={t("team.aria.slider.dots_btn@@Slide navigation")}
        >
          {itemsOriginalSignal.value.map((_, i) => (
            <div
              key={`dot-${i}`}
              aria-current={i === activeIndex.value ? "true" : undefined}
              aria-label={t("team.aria.slider.dots_current@@Slide {{current}} of {{total}}", {
                current: i + 1,
                total: itemsOriginalSignal.value.length,
              })}
              class={`inf_dot-wrapper ${i === activeIndex.value ? "active" : ""}`}
            >
              <div class={`inf_dot ${i === activeIndex.value ? "active" : ""}`} />
            </div>
          ))}
        </div>
      )}
      <ModalWrapper show={isOpen}>
        {selectedItem.value && (
          <div class="modal-scrollable-content">
            <div
              class="modal-wrapper"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${selectedItem.value.id}`}
              aria-describedby={`modal-desc-${selectedItem.value.id}`}
            >
              <div class="modal-img-wrp">
                {selectedItem.value && imageMap[selectedItem.value.imageKey]()}
              </div>
              <div class="modal-content">
                {/* title */}
                <div class="modal-title-block">
                  <h2 class=" body_big" id={`modal-title-${selectedItem.value.id}`}>
                    {t(`team.member.${selectedItem.value.slug}.name@@${selectedItem.value.name}`)}
                  </h2>

                  <p class="H6 grey" id={`slide-role-${selectedItem.value.id}`}>
                    {selectedItem.value.role}
                  </p>
                </div>
                {/* text-block*/}
                <div class="modal-text-block" id={`modal-desc-${selectedItem.value.id}`}>
                  <p class="btn_body grey">
                    {t(
                      `team.member.${selectedItem.value.slug}.description1@@${selectedItem.value.description1}`,
                    )}
                  </p>
                  <p class="btn_body grey">
                    {t(
                      `team.member.${selectedItem.value.slug}.description2@@${selectedItem.value.description2}`,
                    )}
                  </p>

                  <a
                    class="btn-linkedin btn_body"
                    href={selectedItem.value.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={linkedinLabel}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </ModalWrapper>
    </div>
  );
});
