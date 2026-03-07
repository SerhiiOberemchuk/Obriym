import {
  $,
  component$,
  noSerialize,
  useComputed$,
  useContext,
  useSignal,
  useStylesScoped$,
  useTask$,
  useVisibleTask$,
  type NoSerialize,
} from "@builder.io/qwik";
import type { EmblaCarouselType } from "embla-carousel";
import { inlineTranslate } from "qwik-speak";
import styles from "./styles_slider.css?inline";

import IconLeft from "~/assets/icons/icon_left.svg?w=24&h=24&jsx";
import IconRight from "~/assets/icons/icon_right.svg?w=24&h=24&jsx";
import SlideComponent from "./slide-component/SlideComponent";
import ModalWrapper from "~/components/common/modal-component/ModalComponent";
import type { TeamMemberType } from "~/types/team-member.type";
import { imageMap } from "~/const/team";
import { ViewportContext, ViewportWidthContext } from "~/routes/[...lang]/layout";

interface InfinitySliderProps {
  items: TeamMemberType[];
}

type AutoplayController = {
  play: () => void;
  stop: () => void;
  reset: () => void;
};

export default component$(({ items }: InfinitySliderProps) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const viewportCategory = useContext(ViewportContext);
  const viewportWidth = useContext(ViewportWidthContext);

  const viewportRef = useSignal<HTMLDivElement>();
  const emblaApi = useSignal<NoSerialize<EmblaCarouselType>>();
  const autoplay = useSignal<NoSerialize<AutoplayController>>();
  const activeIndex = useSignal(0);
  const isPaused = useSignal(false);
  const isOpen = useSignal(false);
  const selectedItem = useSignal<TeamMemberType | null>(null);

  const canUseSlider = useComputed$(() => items.length > 1);
  const isMobile = useComputed$(() => viewportCategory.value === "mobile");

  const openModal = $((item: TeamMemberType) => {
    selectedItem.value = item;
    isOpen.value = true;
  });

  const nextSlide = $(() => {
    emblaApi.value?.scrollNext();
    autoplay.value?.reset();
  });

  const prevSlide = $(() => {
    emblaApi.value?.scrollPrev();
    autoplay.value?.reset();
  });

  const goToSlide = $((index: number) => {
    emblaApi.value?.scrollTo(index);
    autoplay.value?.reset();
  });

  useTask$(({ track }) => {
    const open = track(() => isOpen.value);
    if (!open) {
      selectedItem.value = null;
    }
  });

  useVisibleTask$(async ({ cleanup, track }) => {
    track(() => viewportCategory.value);
    track(() => viewportWidth.value);

    if (!viewportRef.value || !canUseSlider.value) return;

    const emblaCarousel = (await import("embla-carousel")).default;
    const autoPlayFactory = (await import("embla-carousel-autoplay")).default;

    const autoplayPlugin = autoPlayFactory({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      playOnInit: false,
    });

    const api = emblaCarousel(
      viewportRef.value,
      {
        loop: true,
        align: "start",
        axis: "x",
        dragFree: true,
      },
      [autoplayPlugin],
    );

    emblaApi.value = noSerialize(api);
    autoplay.value = noSerialize(autoplayPlugin as AutoplayController);
    activeIndex.value = api.selectedScrollSnap();

    const onSelect = () => {
      activeIndex.value = api.selectedScrollSnap();
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    cleanup(() => {
      autoplayPlugin.stop();
      api.destroy();
      emblaApi.value = undefined;
      autoplay.value = undefined;
    });
  });

  useTask$(({ track }) => {
    track(() => isMobile.value);
    track(() => isPaused.value);
    track(() => isOpen.value);
    track(() => emblaApi.value);

    const controller = autoplay.value;
    if (!controller) return;

    if (isMobile.value && !isPaused.value && !isOpen.value) {
      controller.play();
    } else {
      controller.stop();
    }
  });

  const memberName = t(
    `team.member.${selectedItem?.value?.slug}.name@@${selectedItem?.value?.name}`,
  );
  const linkedinLabel = t("team.aria.linkedin@@LinkedIn profile of {{name}}", {
    name: memberName,
  });

  return (
    <div
      class="inf_carousel-container"
      onMouseEnter$={() => (isPaused.value = true)}
      onMouseLeave$={() => (isPaused.value = false)}
      onTouchStart$={() => (isPaused.value = true)}
      onTouchEnd$={() => (isPaused.value = false)}
      onTouchCancel$={() => (isPaused.value = false)}
    >
      <div class="inf_btn_controls">
        <button onClick$={prevSlide} aria-label={t("team.aria.slider.button_prev@@Previous slide")}>
          <IconLeft />
        </button>
        <button onClick$={nextSlide} aria-label={t("team.aria.slider.button_next@@Next slide")}>
          <IconRight />
        </button>
      </div>

      <div class="inf_carousel-viewport" ref={viewportRef} role="region">
        <div class="inf_carousel-track">
          {items.map(item => (
            <div
              class="inf_carousel-slide"
              key={`slide-${item.id}`}
              role="group"
              aria-labelledby={`name-${item.id}`}
              aria-describedby={`role-${item.id}`}
            >
              <SlideComponent item={item} onOpen$={$(() => openModal(item))} />
            </div>
          ))}
        </div>
      </div>

      {canUseSlider.value && (
        <div class="inf_carousel-dots" aria-label={t("team.aria.slider.dots_btn@@Slide navigation")}>
          {items.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick$={$(() => goToSlide(i))}
              aria-current={i === activeIndex.value ? "true" : undefined}
              aria-label={t("team.aria.slider.dots_current@@Slide {{current}} of {{total}}", {
                current: i + 1,
                total: items.length,
              })}
              class={`inf_dot-wrapper ${i === activeIndex.value ? "active" : ""}`}
            >
              <span class={`inf_dot ${i === activeIndex.value ? "active" : ""}`} />
            </button>
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
                <div class="modal-title-block">
                  <h2 class=" body_big" id={`modal-title-${selectedItem.value.id}`}>
                    {t(`team.member.${selectedItem.value.slug}.name@@${selectedItem.value.name}`)}
                  </h2>

                  <p class="H6 grey" id={`slide-role-${selectedItem.value.id}`}>
                    {selectedItem.value.role}
                  </p>
                </div>
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
