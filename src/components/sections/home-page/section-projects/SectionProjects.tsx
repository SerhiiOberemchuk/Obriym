import {
  $,
  component$,
  useOnDocument,
  useStore,
  useStylesScoped$,
  useTask$,
  useVisibleTask$,
} from "@qwik.dev/core";
import styles from "./sp-styles.css?inline";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { useSpeakLocale } from "qwik-speak";
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

  const projects = useFetchProjects();
  useTask$(({ track }) => {
    const data = track(() => projects.value.data);
    if (data) {
      store.currentProjects = data;
      store.visibleProjects = [...store.currentProjects.slice(0, store.visibleCount)];
    }
  });

  useOnDocument(
    "DOMContentLoaded",
    $(() => {
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
    }),
  );

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
    <section class="section">
      <div class="container">
        <SubTitle section="projects" classes="subtitle">
          projects
        </SubTitle>

        <ul class="list_projects">
          {store.visibleProjects ? (
            store.visibleProjects.map(item => {
              return (
                <li key={item.slug} class="item_animate">
                  <article class="article">
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
                            alt={item.description}
                            width={668}
                            height={330}
                          />
                        </div>
                        <figcaption>
                          {lang === "en-EU"
                            ? item.titleEN
                            : lang === "it-IT"
                              ? item.titleIT
                              : item.title}
                        </figcaption>
                      </figure>
                    </a>

                    <ul class="list_technologies">
                      {item.technologies.map((item, index) => (
                        <li key={index}>{<span class="helper_text grey_dark">{item}</span>}</li>
                      ))}
                    </ul>
                  </article>
                </li>
              );
            })
          ) : (
            <div>
              <p>error to fetch projects</p>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
});
