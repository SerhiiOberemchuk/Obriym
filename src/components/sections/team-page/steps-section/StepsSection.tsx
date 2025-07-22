// eslint-disable-next-line qwik/no-use-visible-task
import { component$, useStylesScoped$, useSignal, useTask$ } from "@qwik.dev/core";
import { Carousel } from "@qwik-ui/headless";
import styles from "./styles_steps.css?inline";
import PinkImg from "~/assets/images/pink.png?w=100&h=100&jsx";

export default component$(() => {
  //   const t = inlineTranslate();
  useStylesScoped$(styles);

  const isPlaying = useSignal<boolean>(false);
  const slides = Array.from({ length: 3 });

  const extendedSlides = [
    ...slides, //we duplicate the last slide at the beginning
    ...slides,
    ...slides,
    ...slides,
  ];
  //   const isAutoplaySig = useSignal<boolean>(false);

  //   useVisibleTask$(() => {
  //     isAutoplaySig.value = true;
  //   });

  return (
    <section class="team_steps_section">
      <div class="container ">
        <div class="team_steps_title">
          <PinkImg class="team_steps_image" />
          <h2 class="H3_uppercase">Our Team</h2>
        </div>
        {/* <Carousel.Root
          class="carousel-root"
          //   gap={30}
          autoPlayIntervalMs={3500}
          slidesPerView={1}
          //   bind:autoplay={isPlaying}
          bind:autoplay={isAutoplaySig}
          rewind={false}
          align="center"
        > */}
        <div class="carousel-container">
          <Carousel.Root
            class="carousel-root"
            gap={30}
            autoPlayIntervalMs={3500}
            bind:autoplay={isPlaying}
            align="start"
            rewind={false}
          >
            <div class="carousel-buttons">
              <Carousel.Previous>Prev</Carousel.Previous>
              <Carousel.Player>{isPlaying.value ? "<LuPause />" : "<LuPlay />"}</Carousel.Player>
              <Carousel.Next>Next</Carousel.Next>
            </div>
            <Carousel.Scroller
              class="carousel-scroller carousel-animation"
              style="--transform: none"
            >
              {extendedSlides.map((_, index) => (
                // change key!!!! style={{ flexBasis: "100%" }}
                <Carousel.Slide class="carousel-slide" key={index}>
                  Slide {index}
                </Carousel.Slide>
              ))}
            </Carousel.Scroller>

            <Carousel.Stepper class="carousel-stepper">
              {Array.from({ length: 3 }).map((_, index) => (
                // change key!!!!
                <Carousel.Step as="div" class="carousel-step" key={index}>
                  Header {index + 1}
                </Carousel.Step>
              ))}
            </Carousel.Stepper>
          </Carousel.Root>
        </div>
      </div>
    </section>
  );
});
