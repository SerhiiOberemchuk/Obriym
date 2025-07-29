import { component$, useStore, useStylesScoped$, useVisibleTask$ } from "@qwik.dev/core";
import styles from "./sp-styles.css?inline";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { useSpeakLocale } from "qwik-speak";
import { useFetchProjects } from "~/routes/[...lang]";
import { Project } from "~/types/project.type";
// import gsap from "gsap";

export default component$(() => {
  useStylesScoped$(styles);
  const store = useStore<{ currentProjects: Project[]; visibleCount: number }>({
    currentProjects: [],
    visibleCount: 4,
  });
  const { lang } = useSpeakLocale();

  const projects = useFetchProjects();

  useVisibleTask$(({ track, cleanup }) => {
    const data = track(() => projects.value.data);
    // const gsap = (await import("gsap")).default;
    // const { Flip } = await import("gsap/Flip");
    // gsap.registerPlugin(Flip);
    store.visibleCount = window.innerWidth < 768 ? 2 : 4;
    if (data) {
      store.currentProjects = data;
      const start = setInterval(() => {
        // const stateItem = Flip.getState(document.querySelectorAll(".item_animate"));
        const xArray = [...store.currentProjects];
        const lastItem = xArray.pop();
        if (lastItem === undefined) {
          return;
        }

        store.currentProjects = [lastItem, ...xArray];
        // requestAnimationFrame(() => {
        //   Flip.from(stateItem, {
        //     duration: 0.7,
        //     scale: true,
        //     stagger: 0.1,
        //     // absolute: true,
        //     onEnter: element =>
        //       gsap.fromTo(
        //         element,
        //         {
        //           opacity: 0,
        //         },
        //         { opacity: 1, duration: 1 },
        //       ),
        //     onLeave: element => gsap.to(element, { opacity: 0, duration: 1 }),
        //   });
        // });
        // console.log(store.currentProjects);
      }, 10000);

      cleanup(() => clearInterval(start));
    }
  });
  useVisibleTask$(({ track }) => {
    const projectsData = track(() => store.currentProjects);

    if (projectsData?.length) {
      (async () => {
        const gsap = (await import("gsap")).default;

        gsap.from(".item_animate", {
          x: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.inOut",
        });
      })();
    }
  });

  return (
    <section class="section">
      <div class="container">
        <SubTitle section="projects" classes="subtitle">
          projects
        </SubTitle>

        <ul class="list_projects">
          {store.currentProjects ? (
            store.currentProjects.slice(0, store.visibleCount).map(item => {
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
