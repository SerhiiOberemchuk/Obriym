"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./hiw-styles.module.css";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { StepHowItWork } from "~/types/step-how-it-eork.type";

export default function SectionHowItWork() {
  const t = useTranslations();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.list_steps} > :nth-child(1)`, {
        scrollTrigger: {
          trigger: `.${styles.sticky_wrapper}`,
          // markers: true,
          start: "top top",
          end: "+=800",
          scrub: true,
        },
        rotate: 12,
        x: "100svw",
      });
      gsap.from(`.${styles.list_steps} > :nth-child(2)`, {
        scrollTrigger: {
          trigger: `.${styles.sticky_wrapper}`,
          // markers: true,
          start: "+=800",
          end: "+=800",
          scrub: true,
        },

        scale: 0,
      });
      gsap.from(`.${styles.list_steps} > :nth-child(3)`, {
        scrollTrigger: {
          trigger: `.${styles.sticky_wrapper}`,
          // markers: true,
          start: "+=1600",
          end: "+=800",
          scrub: true,
        },
        rotate: -12,
        x: "-100svw",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const steps: StepHowItWork[] = [
    {
      step: t("home.sectionHIW.steps.step1.step"),
      title: t("home.sectionHIW.steps.step1.title"),
      text: t("home.sectionHIW.steps.step1.text"),
    },
    {
      step: t("home.sectionHIW.steps.step2.step"),
      title: t("home.sectionHIW.steps.step2.title"),
      text: t("home.sectionHIW.steps.step2.text"),
    },
    {
      step: t("home.sectionHIW.steps.step3.step"),
      title: t("home.sectionHIW.steps.step3.title"),
      text: t("home.sectionHIW.steps.step3.text"),
    },
  ];

  return (
    <section
      ref={rootRef}
      id="how-it-work"
      className={styles.section}
      aria-label={t("home.sectionHIW.sectionAriaLabel")}
    >
      <div className="container">
        <SubTitle section="how-it-work">{t("home.sectionHIW.subTitle")}</SubTitle>
        <div className={styles.sticky_wrapper}>
          <div className={styles.sticky_box}>
            <div className={styles.relative}>
              <h2 className={`body_big grey ${styles.title}`}>
                {t("home.sectionHIW.sectionTitle")}
              </h2>
              <div className={styles.list_wrap}>
                <ul className={styles.list_steps}>
                  {steps.map((item, index) => (
                    <li key={index} className={styles.item} id={`step${index + 1}`}>
                      <article className={styles.card}>
                        <header>
                          <p className="H4">{item.step}</p>
                          <h3 className="H3_uppercase black">{item.title}</h3>
                        </header>

                        <p className="btn_body">{item.text}</p>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
