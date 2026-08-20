"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./styles_slider.module.css";

import IconLeft from "~/assets/icons/icon_left.svg";
import IconRight from "~/assets/icons/icon_right.svg";
import SlideComponent from "./slide-component/SlideComponent";
import ModalWrapper from "~/components/common/modal-component/ModalComponent";
import type { TeamMemberType } from "~/types/team-member.type";
import { imageMap } from "~/const/team";
import { useViewport } from "~/context/app-context";

interface InfinitySliderProps {
  items: TeamMemberType[];
}

export default function InfinitySlider({ items }: InfinitySliderProps) {
  const t = useTranslations();
  const viewportCategory = useViewport();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TeamMemberType | null>(null);

  const canUseSlider = items.length > 1;
  const isMobile = viewportCategory === "mobile";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      axis: "x",
      dragFree: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
        playOnInit: false,
      }),
    ],
  );

  const selectedMember = selectedItem
    ? {
        name: t(`team.member.${selectedItem.slug}.name`),
        role: t(`team.member.${selectedItem.slug}.role`),
        description1: t(`team.member.${selectedItem.slug}.description1`),
        description2: t(`team.member.${selectedItem.slug}.description2`),
      }
    : null;
  const SelectedImage = selectedItem ? imageMap[selectedItem.imageKey] : null;

  const openModal = (item: TeamMemberType) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedItem(null);
    }
  };

  const nextSlide = () => {
    emblaApi?.scrollNext();
    emblaApi?.plugins().autoplay?.reset();
  };

  const prevSlide = () => {
    emblaApi?.scrollPrev();
    emblaApi?.plugins().autoplay?.reset();
  };

  const goToSlide = (index: number) => {
    emblaApi?.scrollTo(index);
    emblaApi?.plugins().autoplay?.reset();
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins().autoplay;
    if (!autoplay) return;

    if (isMobile && !isPaused && !isOpen) {
      autoplay.play();
    } else {
      autoplay.stop();
    }
  }, [emblaApi, isMobile, isPaused, isOpen]);

  const linkedinLabel = t("team.aria.linkedin", {
    name: selectedMember?.name ?? "",
  });

  return (
    <div
      className={styles["inf_carousel-container"]}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      <div className={styles.inf_btn_controls}>
        <button onClick={prevSlide} aria-label={t("team.aria.slider.button_prev")}>
          <IconLeft width={24} height={24} />
        </button>
        <button onClick={nextSlide} aria-label={t("team.aria.slider.button_next")}>
          <IconRight width={24} height={24} />
        </button>
      </div>

      {/* A single slide never scrolls, so embla is left uninitialised then. */}
      <div
        className={styles["inf_carousel-viewport"]}
        ref={canUseSlider ? emblaRef : undefined}
        role="region"
      >
        <div className={styles["inf_carousel-track"]}>
          {items.map(item => (
            <div
              className={styles["inf_carousel-slide"]}
              key={`slide-${item.id}`}
              role="group"
              aria-labelledby={`name-${item.id}`}
              aria-describedby={`role-${item.id}`}
            >
              <SlideComponent item={item} onOpen={() => openModal(item)} />
            </div>
          ))}
        </div>
      </div>

      {canUseSlider && (
        <div className={styles["inf_carousel-dots"]} aria-label={t("team.aria.slider.dots_btn")}>
          {items.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => goToSlide(i)}
              aria-current={i === activeIndex ? "true" : undefined}
              aria-label={t("team.aria.slider.dots_current", {
                current: i + 1,
                total: items.length,
              })}
              className={`${styles["inf_dot-wrapper"]} ${i === activeIndex ? styles.active : ""}`}
            >
              <span className={`${styles.inf_dot} ${i === activeIndex ? styles.active : ""}`} />
            </button>
          ))}
        </div>
      )}

      <ModalWrapper show={isOpen} onShowChange={closeModal}>
        {selectedItem && selectedMember && SelectedImage && (
          <div className={styles["modal-scrollable-content"]}>
            <div
              className={styles["modal-wrapper"]}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${selectedItem.id}`}
              aria-describedby={`modal-desc-${selectedItem.id}`}
            >
              <div className={styles["modal-img-wrp"]}>
                <SelectedImage />
              </div>
              <div className={styles["modal-content"]}>
                <div className={styles["modal-title-block"]}>
                  <h2 className="body_big" id={`modal-title-${selectedItem.id}`}>
                    {selectedMember.name}
                  </h2>

                  <p className="H6 grey" id={`slide-role-${selectedItem.id}`}>
                    {selectedMember.role}
                  </p>
                </div>
                <div className={styles["modal-text-block"]} id={`modal-desc-${selectedItem.id}`}>
                  <p className="btn_body grey">{selectedMember.description1}</p>
                  <p className="btn_body grey">{selectedMember.description2}</p>

                  <a
                    className={`${styles["btn-linkedin"]} btn_body`}
                    href={selectedItem.linkedin}
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
}
