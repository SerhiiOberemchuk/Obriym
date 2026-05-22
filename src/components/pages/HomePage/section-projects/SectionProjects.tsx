import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./sp-styles.css?inline";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import { useFetchProjects } from "~/routes/[...lang]";
import { type ProjectLocale, getLocalizedProject } from "~/utils/projects";

export default component$(() => {
  useStylesScoped$(styles);

  const t = inlineTranslate();
  const { lang } = useSpeakLocale();
  const getPath = localizePath();

  return (
    <section class="section" id="portfolio">
      <div class="container">
        <SubTitle section="projects" classes="subtitle_project">
          {t("home.sectionProject.title@@projects")}
        </SubTitle>

        <div class="projects_section_head">
          <p class="btn_body grey projects_section_copy">
            {t(
              "home.sectionProject.lead@@Selected case studies from launches focused on speed, clarity and measurable product value.",
            )}
          </p>
          <a href={getPath("/projects/", lang)} class="btn_body black projects_show_all">
            {t("home.sectionProject.showAll@@Show all projects")}
          </a>
        </div>

        <CarouselComponent classC="carousel_projects_top" howToRenderArray="pair" />
        <CarouselComponent howToRenderArray="unmatched" />
      </div>
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
    useStylesScoped$(styles);
    const { lang } = useSpeakLocale();
    const getPath = localizePath();
    const t = inlineTranslate();
    const projects = useFetchProjects();
    const projectsToRender = projects.value.data.filter((_, index) => {
      if (howToRenderArray === "pair") return index % 2 === 0;
      if (howToRenderArray === "unmatched") return index % 2 !== 0;
      return true;
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ cleanup }) => {
      if (!sliderRef.value) return;
      const emblaCarousel = (await import("embla-carousel")).default;
      const autoPlay = (await import("embla-carousel-autoplay")).default;
      const carousel = emblaCarousel(
        sliderRef.value,
        { loop: true, direction, align: "start", axis: "x", dragFree: true },
        [autoPlay({ delay: 8000, stopOnInteraction: false })],
      );
      cleanup(() => carousel.destroy());
    });

    return (
      <div class={["projects_caru", classC]}>
        <div class="projects_caru_viewport" ref={sliderRef}>
          <ul class="projects_caru_container">
            {projectsToRender.length ? (
              projectsToRender.map(item => {
                const localizedProject = getLocalizedProject(item, lang as ProjectLocale);
                const title = localizedProject.localizedTitle;
                const description = localizedProject.localizedDescription;
                const feautures = localizedProject.localizedFeatures;
                return (
                  <li key={item.slug} class="projects_caru_slide">
                    <article>
                      <h3 class="sr-only">{title}</h3>
                      <a
                        href={getPath(localizedProject.detailPath, lang)}
                        aria-label={`link to project ${item.titleEN}`}
                        class="link_project"
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
                          url: `https://obriym.com${getPath(localizedProject.detailPath, lang)}`,
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
