import { component$, useStore, useStylesScoped$, useTask$, useVisibleTask$ } from "@qwik.dev/core";
// import gsap from "gsap";
import styles from "./sp-styles.css?inline";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";
import { useFetchProjects } from "~/routes/[...lang]";
import { Project } from "~/types/project.type";

export default component$(() => {
  useStylesScoped$(styles);
  const store = useStore<{
    currentProjects: Project[];
    visibleProjects: Project[];
    visibleCount: number;
  }>({ visibleProjects: [], currentProjects: [], visibleCount: 4 });
  const { lang } = useSpeakLocale();
  const t = inlineTranslate();
  const projects = useFetchProjects();
  useTask$(({ track }) => {
    const data = track(() => projects.value.data);
    if (data) {
      store.currentProjects = data;
      store.visibleProjects = [...store.currentProjects.slice(0, store.visibleCount)];
    }
  });

  useVisibleTask$(() => {
    const intervsl = setInterval(() => {
      store.visibleCount = window.innerWidth < 768 ? 2 : 4;

      const xArray = [...store.currentProjects];
      const firstItem = xArray.shift();
      if (firstItem === undefined) {
        return;
      }
      store.currentProjects = [...xArray, firstItem];
      store.visibleProjects = store.currentProjects.slice(0, store.visibleCount);
    }, 10000);

    return () => clearInterval(intervsl);
  });

  useVisibleTask$(async ({ track }) => {
    track(() => store.visibleProjects);
    const gsap = (await import("gsap")).default;
    gsap.from(".item_animate", {
      x: 150,
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power2.inOut",
    });
  });

  return (
    <section class="section" id="portfolio">
      <div class="container">
        <SubTitle section="projects" classes="subtitle">
          {t("home.sectionProject.title@@projects")}
        </SubTitle>

        <ul class="list_projects">
          {store.visibleProjects ? (
            store.visibleProjects.map(item => {
              const title =
                lang === "en-EU" ? item.titleEN : lang === "it-IT" ? item.titleIT : item.title;
              const description =
                lang === "en-EU"
                  ? item.descriptionEN
                  : lang === "it-IT"
                    ? item.descriptionIT
                    : item.description;
              return (
                <li key={item.slug} class="item_animate">
                  <article class="article">
                    <h3 class="visually_hidden">{title}</h3>
                    <a
                      href={item.website_url}
                      target="_blank"
                      aria-label={`link to project ${item.titleEN}`}
                      class="link_project"
                      rel="noopener noreferrer"
                    >
                      <figure>
                        <div class="image_wrapper">
                          <img
                            class="image_project"
                            src={item.image_src}
                            alt={`Project: ${title} - ${description}`}
                            width={668}
                            height={330}
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
    </section>
  );
});
