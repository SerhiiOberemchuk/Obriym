import {
  component$,
  Resource,
  useResource$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from "@qwik.dev/core";
import styles from "./sp-styles.css?inline";
import SubTitle from "~/components/common/subtitile/SubTitle";
import { useSpeakLocale } from "qwik-speak";
import { Project } from "~/types/project.type";

export default component$(() => {
  useStylesScoped$(styles);
  const store = useStore<{ length: number; currentIndexes: number[]; visibleCount: number }>({
    length: 0,
    currentIndexes: [],
    visibleCount: 2,
  });
  const { lang } = useSpeakLocale();
  console.log(store.currentIndexes);

  const projects = useResource$<Project[]>(async () => {
    const url = import.meta.env.PUBLIC_URL_PROJECTS;
    const response = await fetch(`${url}/api/projects`);
    const projects = await response.json();
    return projects.data;
  });

  useVisibleTask$(
    ({ cleanup }) => {
      store.visibleCount = window.innerWidth < 768 ? 2 : 4;
      const start = setInterval(() => {
        const currentIndexes = [...Array(store.length)].map((_, i) => i);
        store.currentIndexes = currentIndexes.map(item => item + 1);
      }, 1000);

      cleanup(() => clearInterval(start));
    },
    { strategy: "document-ready" },
  );

  return (
    <section class="section">
      <div class="container">
        <SubTitle section="projects" classes="subtitle">
          projects
        </SubTitle>
        <Resource
          value={projects}
          onResolved={proj => {
            store.length = proj.length;

            return (
              <ul class="list_projects">
                {proj.map(item => (
                  <li key={item.slug}>
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
                ))}
              </ul>
            );
          }}
        />
      </div>
    </section>
  );
});
