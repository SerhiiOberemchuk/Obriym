import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import styles from "./sh-styles.module.css";

export default function SectionHero() {
  const t = useTranslations();
  const getSeed = (word: string, index: number) =>
    [...`${index}:${word}`].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const getOffsetX = (word: string, index: number) => (getSeed(word, index) % 301) - 150;
  const getOffsetY = (word: string, index: number) => (getSeed(word, index) % 201) - 100;

  // Animation with GSAP
  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   const ctx = gsap.context(() => {
  //     const words = gsap.utils.toArray<HTMLElement>(`.${styles.fly_word}`);

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: ".triggertitle",
  //         start: "top 90%",
  //         end: "bottom 20%",
  //         scrub: true,
  //         //   markers: true,
  //       },
  //     });

  //     words.forEach(word => {
  //       const randomX = gsap.utils.random(-150, 150);
  //       const randomY = gsap.utils.random(-100, 100);
  //       // const randomRot = gsap.utils.random(-90, 90);
  //       const randomScale = gsap.utils.random(0, 0.1);

  //       tl.fromTo(
  //         word,
  //         {
  //           x: randomX,
  //           y: randomY,
  //           // rotationZ: randomRot,
  //           scale: randomScale,
  //           // opacity: 0.5,
  //         },

  //         {
  //           x: 0,
  //           y: 0,
  //           // rotationZ: 0,
  //           scale: 1,
  //           // opacity: 1,
  //           duration: 1,
  //           ease: "power3.out",
  //         },
  //         "<",
  //       );
  //     });
  //   });

  //   return () => ctx.revert();
  // }, []);

  return (
    <section className={styles.sh_section} id="about">
      <div className="container">
        {/* <h2 className={`body_big grey ${styles.title} triggertitle`}>
          {t("home.shsection", { name: "OBRIYM" })}
        </h2> */}
        <h2 className={`body_big grey ${styles.title} triggertitle`}>
          {t("home.shsection", { name: "OBRIYM" })
            .split(" ")
            .map((item, key) => (
              <span
                className={styles.fly_word}
                style={
                  {
                    "--rundomX": `${getOffsetX(item, key)}px`,
                    "--rundomY": `${getOffsetY(item, key)}px`,
                  } as CSSProperties
                }
                key={key}
              >
                {item}
              </span>
            ))}
        </h2>
      </div>
    </section>
  );
}
