import { $, component$, useComputed$, useContext, useSignal, useStylesScoped$, useTask$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";
import { Carousel } from "@qwik-ui/headless";

import styles from "./styles_slider.css?inline";
import IconLeft from "~/assets/icons/icon_left.svg?w=24&h=24&jsx";
import IconRight from "~/assets/icons/icon_right.svg?w=24&h=24&jsx";
import SlideComponent from "./slide-component/SlideComponent";
import ModalWrapper from "~/components/common/modal-component/ModalComponent";
import { TeamMemberType } from "~/types/team-member.type";
import { imageMap } from "~/const/team";
import { ViewportContext } from "~/routes/[...lang]/layout";

interface InfinitySliderProps {
  items: TeamMemberType[];
}

export default component$(({ items }: InfinitySliderProps) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const viewportCategory = useContext(ViewportContext);

  const isOpen = useSignal(false);
  const selectedItem = useSignal<TeamMemberType | null>(null);
  const activeIndex = useSignal(0);
  const isPaused = useSignal(false);
  const isAutoplay = useSignal(false);

  const slidesPerView = useComputed$(() => {
    if (viewportCategory.value === "desktop") return 3;
    if (viewportCategory.value === "tablet") return 2;
    return 1;
  });

  const canLoop = useComputed$(() => items.length > slidesPerView.value);

  const gap = useComputed$(() => {
    if (viewportCategory.value === "desktop") return 12;
    if (viewportCategory.value === "tablet") return 16;
    return 10;
  });

  useTask$(({ track }) => {
    track(() => isOpen.value);
    track(() => isPaused.value);
    track(() => canLoop.value);

    isAutoplay.value = canLoop.value && !isOpen.value && !isPaused.value;
  });

  const openModal = $((item: TeamMemberType) => {
    selectedItem.value = item;
    isOpen.value = true;
  });

  useTask$(({ track }) => {
    const open = track(() => isOpen.value);
    if (!open) selectedItem.value = null;
  });

  const memberName = t(`team.member.${selectedItem?.value?.slug}.name@@${selectedItem?.value?.name}`);
  const linkedinLabel = t("team.aria.linkedin@@LinkedIn profile of {{name}}", {
    name: memberName,
  });

  return (
    <div class="inf_carousel-container">
      <Carousel.Root
        class="inf_carousel-root"
        slidesPerView={slidesPerView.value}
        gap={gap.value}
        move={1}
        rewind={canLoop.value}
        bind:selectedIndex={activeIndex}
        bind:autoplay={isAutoplay}
        autoPlayIntervalMs={3000}
      >
        <div class="inf_btn_controls">
          <Carousel.Previous aria-label={t("team.aria.slider.button_prev@@Previous slide")}>
            <IconLeft />
          </Carousel.Previous>
          <Carousel.Next aria-label={t("team.aria.slider.button_next@@Next slide")}>
            <IconRight />
          </Carousel.Next>
        </div>

        <Carousel.Scroller
          class="inf_carousel-track"
          onMouseEnter$={() => (isPaused.value = true)}
          onMouseLeave$={() => (isPaused.value = false)}
          onTouchStart$={() => (isPaused.value = true)}
          onTouchEnd$={() => (isPaused.value = false)}
          onTouchCancel$={() => (isPaused.value = false)}
        >
          {items.map((item, i) => (
            <Carousel.Slide
              class="inf_carousel-slide"
              _index={i}
              key={`slide-${item.id}-${i}`}
              role="group"
              aria-labelledby={`name-${item.id}`}
              aria-describedby={`role-${item.id}`}
            >
              <SlideComponent item={item} onOpen$={$(() => openModal(item))} />
            </Carousel.Slide>
          ))}
        </Carousel.Scroller>

        <Carousel.Pagination
          class="inf_carousel-dots"
          aria-label={t("team.aria.slider.dots_btn@@Slide navigation")}
        >
          {items.map((_, i) => (
            <Carousel.Bullet
              _index={i}
              key={`dot-${i}`}
              aria-current={i === activeIndex.value ? "true" : undefined}
              aria-label={t("team.aria.slider.dots_current@@Slide {{current}} of {{total}}", {
                current: i + 1,
                total: items.length,
              })}
              class={`inf_dot-wrapper ${i === activeIndex.value ? "active" : ""}`}
            >
              <span class={`inf_dot ${i === activeIndex.value ? "active" : ""}`} />
            </Carousel.Bullet>
          ))}
        </Carousel.Pagination>
      </Carousel.Root>

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
              <div class="modal-img-wrp">{selectedItem.value && imageMap[selectedItem.value.imageKey]()}</div>
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
