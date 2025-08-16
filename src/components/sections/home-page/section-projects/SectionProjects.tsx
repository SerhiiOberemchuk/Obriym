import { component$, useContext, useSignal, useStyles$, useVisibleTask$ } from "@qwik.dev/core";
import styles from "./sp-styles.css?inline";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";
import { useFetchProjects } from "~/routes/[...lang]";

import { Carousel } from "@qwik-ui/headless";
import { ViewportContext } from "~/routes/[...lang]/layout";
// import { ProjectsSchema } from "./ProjectsSchema";

export default component$(() => {
  useStyles$(styles);

  const t = inlineTranslate();

  return (
    <section class="section" id="portfolio">
      <div class="container">
        <SubTitle section="projects" classes="subtitle_project">
          {t("home.sectionProject.title@@projects")}
        </SubTitle>

        <CarouselComponent classC="carousel_projects_top" autoPlayIntervalMs={5000} />
        <CarouselComponent autoPlayIntervalMs={5000} reversSlider={true} />
      </div>
      {/* <ProjectsSchema projects={projects.value} /> */}
    </section>
  );
});
type PropsCarousel = {
  classC?: string;
  autoPlayIntervalMs?: number;
  reversSlider?: boolean;
  startIndex?: number;
};
const CarouselComponent = component$<PropsCarousel>(
  ({ classC, autoPlayIntervalMs, startIndex, reversSlider }) => {
    const isPlaying = useSignal<boolean>(false);
    const slidesPerView = useSignal<number>(2);
    const { lang } = useSpeakLocale();
    const t = inlineTranslate();
    const projects = useFetchProjects();

    const devise = useContext(ViewportContext);
    useVisibleTask$(({ track }) => {
      track(() => devise.value);
      slidesPerView.value = devise.value === "desktop" ? 2 : 1;
      isPlaying.value = true;
    });
    const projectsToRender = () => {
      if (!projects.value.data) {
        return [];
      }
      const proj = reversSlider ? [...projects.value.data].reverse() : [...projects.value.data];
      return proj;
    };

    return (
      <Carousel.Root
        id={`${Math.random()}`}
        class={classC}
        orientation="horizontal"
        slidesPerView={slidesPerView.value}
        gap={20}
        startIndex={startIndex}
        autoPlayIntervalMs={autoPlayIntervalMs}
        bind:autoplay={isPlaying}
      >
        <Carousel.Scroller class="carousel_animation_projects">
          {projects.value.data ? (
            projectsToRender().map(item => {
              const title =
                lang === "en-EU" ? item.titleEN : lang === "it-IT" ? item.titleIT : item.title;
              const description =
                lang === "en-EU"
                  ? item.descriptionEN
                  : lang === "it-IT"
                    ? item.descriptionIT
                    : item.description;
              return (
                <Carousel.Slide key={item.slug}>
                  <article>
                    <h3 class="visually_hidden">{title}</h3>
                    <a
                      href={item.website_url}
                      target="_blank"
                      aria-label={`link to project ${item.titleEN}`}
                      class="link_project"
                      rel="noopener noreferrer"
                    >
                      <figure>
                        <div class="image_wrapper_project">
                          <img
                            loading="lazy"
                            class="image_project"
                            src={item.image_src}
                            alt={`Project: ${title} - ${description}`}
                            width={668}
                            height={330}
                            decoding="async"
                          />
                        </div>
                        <figcaption>{title}</figcaption>
                      </figure>
                    </a>
                    <p class="visually_hidden" itemProp="description">
                      {description}
                    </p>
                    <ul class="list_technologies">
                      {item.technologies.map((item, index) => (
                        <li key={index}>{<span class="helper_text grey_dark">{item}</span>}</li>
                      ))}
                    </ul>
                    {/* <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        name: title,
                        url: item.website_url,
                        description: description,
                        image: item.image_src,
                        inLanguage: lang,
                        keywords: item.technologies.join(", "),
                      })}
                    ></script> */}
                  </article>
                </Carousel.Slide>
              );
            })
          ) : (
            <div>
              <p>{t("home.sectionProject.error@@error to fetch projects")}</p>
            </div>
          )}
        </Carousel.Scroller>
      </Carousel.Root>
    );
  },
);
