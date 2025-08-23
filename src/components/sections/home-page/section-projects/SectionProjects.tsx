import { $, component$, useOnWindow, useSignal, useStylesScoped$, useTask$ } from "@qwik.dev/core";
import styles from "./sp-styles.css?inline";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";
import { useFetchProjects } from "~/routes/[...lang]";
import { Project } from "~/types/project.type";

export default component$(() => {
  useStylesScoped$(styles);

  const t = inlineTranslate();

  return (
    <section class="section" id="portfolio">
      <div class="container">
        <SubTitle section="projects" classes="subtitle_project">
          {t("home.sectionProject.title@@projects")}
        </SubTitle>

        <CarouselComponent classC="carousel_projects_top" howToRenderArray="pair" />
        <CarouselComponent howToRenderArray="unmatched" />
      </div>
      {/* <ProjectsSchema projects={projects.value} /> */}
    </section>
  );
});
type PropsCarousel = {
  classC?: string;
  direction?: "rtl" | "ltr";
  howToRenderArray?: "origin" | "pair" | "unmatched";
};
const CarouselComponent = component$<PropsCarousel>(
  ({ classC, direction = "ltr", howToRenderArray = "origin" }) => {
    const sliderRef = useSignal<HTMLUListElement>();
    const projectsToRender = useSignal<Project[]>([]);
    useStylesScoped$(styles);
    const { lang } = useSpeakLocale();
    const t = inlineTranslate();
    const projects = useFetchProjects();

    useTask$(({ track }) => {
      const data = track(() => projects.value.data);
      if (!data) return;
      if (howToRenderArray === "origin") {
        projectsToRender.value = data;
      }
      if (howToRenderArray === "pair") {
        projectsToRender.value = data?.filter((_, i) => i % 2 === 0);
      }
      if (howToRenderArray === "unmatched") {
        projectsToRender.value = data?.filter((_, i) => i % 2 !== 0);
      }
    });

    useOnWindow(
      "DOMContentLoaded",
      $(async () => {
        if (!sliderRef.value) return;
        const emblaCarousel = (await import("embla-carousel")).default;
        const autoPlay = (await import("embla-carousel-autoplay")).default;
        emblaCarousel(
          sliderRef.value,
          { loop: true, direction, align: "start", axis: "x", dragFree: true },
          [autoPlay({ delay: 8000, stopOnInteraction: false })],
        );
      }),
    );

    return (
      <div class={["projects_caru", classC]}>
        <div class="projects_caru_viewport" ref={sliderRef}>
          <ul class="projects_caru_container">
            {projectsToRender.value?.length ? (
              projectsToRender.value.map(item => {
                const title =
                  lang === "en-EU" ? item.titleEN : lang === "it-IT" ? item.titleIT : item.title;
                const description =
                  lang === "en-EU"
                    ? item.descriptionEN
                    : lang === "it-IT"
                      ? item.descriptionIT
                      : item.description;
                const feautures =
                  lang === "en-EU"
                    ? item.featuresEN
                    : lang === "it-IT"
                      ? item.featuresIT
                      : item.features;
                return (
                  <li key={item.slug} class="projects_caru_slide">
                    <article>
                      <h3 class="sr-only">{title}</h3>
                      <a
                        href={item.website_url}
                        target="_blank"
                        aria-label={`link to project ${item.titleEN}`}
                        class="link_project"
                        rel="noopener noreferrer"
                      >
                        <figure>
                          <img
                            loading="lazy"
                            class="image_project"
                            src={item.image_src}
                            alt={`Project: ${title} - ${description}`}
                            width={668}
                            height={330}
                            decoding="async"
                          />
                          <figcaption>{title}</figcaption>
                        </figure>
                      </a>
                      <p class="sr-only" itemProp="description">
                        {description}
                      </p>
                      <ul class="list_technologies">
                        {feautures.map((item, index) => (
                          <li key={index} class="item_features helper_text grey_dark">
                            {item}
                          </li>
                        ))}
                      </ul>
                      <script
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
                      ></script>
                    </article>
                  </li>
                );
              })
            ) : (
              <div>
                <p>{t("home.sectionProject.error@@error to fetch projects")}</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  },
);
