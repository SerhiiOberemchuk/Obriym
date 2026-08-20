"use client";

import type { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./sp-styles.module.css";

type Props = {
  direction: "rtl" | "ltr";
  children: ReactNode;
};

/**
 * Client half of `SectionProjects`: it only owns the embla viewport element so
 * the slides themselves stay server-rendered. Options and the autoplay plugin
 * are identical to the Qwik `EmblaCarousel(...)` init.
 */
export default function CarouselViewport({ direction, children }: Props) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, direction, align: "start", axis: "x", dragFree: true },
    [Autoplay({ delay: 8000, stopOnInteraction: false })],
  );

  return (
    <div className={styles.projects_caru_viewport} ref={emblaRef}>
      {children}
    </div>
  );
}
