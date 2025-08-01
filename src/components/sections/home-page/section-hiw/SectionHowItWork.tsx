import { $, component$, useOnWindow, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./hiw-styles.css?inline";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { StepHowItWork } from "~/types/step-how-it-eork.type";
import { inlineTranslate } from "qwik-speak";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  useOnWindow(
    "load",
    $(async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".list_steps > :nth-child(1)", {
        scrollTrigger: {
          trigger: ".sticky_wrapper",
          // markers: true,
          start: "top top",
          end: "+=800",
          scrub: true,
        },
        rotate: 12,
        x: "100svw",
      });
      gsap.from(".list_steps > :nth-child(2)", {
        scrollTrigger: {
          trigger: ".sticky_wrapper",
          // markers: true,
          start: "+=800",
          end: "+=800",
          scrub: true,
        },

        y: "100svh",
      });
      gsap.from(".list_steps > :nth-child(3)", {
        scrollTrigger: {
          trigger: ".sticky_wrapper",
          // markers: true,
          start: "+=1600",
          end: "+=800",
          scrub: true,
        },
        rotate: -12,
        x: "-100svw",
      });
    }),
  );
  const steps: StepHowItWork[] = [
    {
      step: t("home.sectionHIW.steps.step1.step@@I step"),
      title: t("home.sectionHIW.steps.step1.title@@Let’s Talk"),
      text: t(
        "home.sectionHIW.steps.step1.text@@We begin with an in-depth consultation to understand your business objectives and challenges.",
      ),
    },
    {
      step: t("home.sectionHIW.steps.step2.step@@II step"),
      title: t("home.sectionHIW.steps.step2.title@@get the plan"),
      text: t(
        "home.sectionHIW.steps.step2.text@@You receive a tailored proposal outlining the scope, timeline, and budget — fully transparent.",
      ),
    },
    {
      step: t("home.sectionHIW.steps.step3.step@@III step"),
      title: t("home.sectionHIW.steps.step3.title@@Make It Real"),
      text: t(
        "home.sectionHIW.steps.step3.text@@Design, develop, deliver. Step by step — we’ll keep you in the loop every step of the way.",
      ),
    },
  ];

  return (
    <section
      id="how-it-work"
      class="section"
      aria-label={t("home.sectionHIW.sectionAriaLabel@@How our web development process works")}
    >
      <div class="container">
        <SubTitle section="how-it-work">{t("home.sectionHIW.subTitle@@HOW IT WORKS")}</SubTitle>
        <div class="sticky_wrapper">
          <div class="sticky_box">
            <div class="relative">
              <h2 class="body_big grey title">
                {t(
                  "home.sectionHIW.sectionTitle@@Follow these 3 simple steps to launch a modern, SEO-optimized website tailored to your business goals.",
                )}
              </h2>
              <div class="list_wrap">
                <ul class="list_steps">
                  {steps.map((item, index) => (
                    <li key={index} class="item">
                      <article class="card">
                        <header>
                          <p class="H4 grey_dark">{item.step}</p>
                          <h3 class="H3_uppercase black">{item.title}</h3>
                        </header>

                        <p class="btn_body grey_dark">{item.text}</p>
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
});
