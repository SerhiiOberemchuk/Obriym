import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "~/i18n/navigation";
import styles from "./sp-styles.module.css";
import SubTitle from "~/components/common/subtitile/SubTitle";
import CarouselViewport from "./CarouselViewport";
import { canonicalUrl } from "~/lib/seo";
import { type Locale } from "~/i18n/routing";
import type { Project } from "~/types/project.type";
import { fetchProjects, getLocalizedProject } from "~/lib/projects";

/** Replacement for the Qwik `useFetchProjects` routeLoader: it never throws. */
const loadProjects = async (): Promise<Project[]> => {
  try {
    return await fetchProjects();
  } catch (error) {
    console.error(`error : ${error}`);
    return [];
  }
};

export default async function SectionProjects() {
  const t = await getTranslations();
  const projects = await loadProjects();

  return (
    <section className={styles.section} id="portfolio">
      <div className="container">
        {/* Literal, not `styles.subtitle_project`: the class was inert under
            Qwik's scoped CSS and stays inert to keep the layout identical. */}
        <SubTitle section="projects" classes="subtitle_project">
          {t("home.sectionProject.title")}
        </SubTitle>

        <div className={styles.projects_section_head}>
          <p className={`btn_body grey ${styles.projects_section_copy}`}>
            {t("home.sectionProject.lead")}
          </p>
          <Link href="/projects/" className={`btn_body black ${styles.projects_show_all}`}>
            {t("home.sectionProject.showAll")}
          </Link>
        </div>

        <CarouselComponent
          projects={projects}
          classC={styles.carousel_projects_top}
          howToRenderArray="pair"
        />
        <CarouselComponent projects={projects} howToRenderArray="unmatched" />
      </div>
    </section>
  );
}
type PropsCarousel = {
  projects: Project[];
  classC?: string;
  direction?: "rtl" | "ltr";
  howToRenderArray?: "origin" | "pair" | "unmatched";
};
const CarouselComponent = async ({
  projects,
  classC,
  direction = "ltr",
  howToRenderArray = "origin",
}: PropsCarousel) => {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const projectsToRender = projects.filter((_, index) => {
    if (howToRenderArray === "pair") return index % 2 === 0;
    if (howToRenderArray === "unmatched") return index % 2 !== 0;
    return true;
  });

  return (
    <div className={`${styles.projects_caru}${classC ? ` ${classC}` : ""}`}>
      <CarouselViewport direction={direction}>
        <ul className={styles.projects_caru_container}>
          {projectsToRender.length ? (
            projectsToRender.map(item => {
              const localizedProject = getLocalizedProject(item, locale);
              const title = localizedProject.localizedTitle;
              const description = localizedProject.localizedDescription;
              const feautures = localizedProject.localizedFeatures;
              return (
                <li key={item.slug} className={styles.projects_caru_slide}>
                  <article>
                    <h3 className="sr-only">{title}</h3>
                    <Link
                      href={localizedProject.detailHref}
                      aria-label={`link to project ${item.titleEN}`}
                      className="link_project"
                    >
                      <figure>
                        <img
                          loading="lazy"
                          className={styles.image_project}
                          src={item.image_src}
                          alt={`Project: ${title} - ${description}`}
                          width={668}
                          height={330}
                          decoding="async"
                        />
                        <figcaption>{title}</figcaption>
                      </figure>
                    </Link>
                    <p className="sr-only" itemProp="description">
                      {description}
                    </p>

                    <ul className={styles.list_technologies}>
                      {feautures.map((item, index) => (
                        <li key={index} className={`${styles.item_features} helper_text grey_dark`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "CreativeWork",
                          name: title,
                          url: canonicalUrl(localizedProject.detailHref, locale),
                          description: description,
                          image: item.image_src,
                          inLanguage: locale,
                          keywords: item.technologies.join(", "),
                        }),
                      }}
                    ></script>
                  </article>
                </li>
              );
            })
          ) : (
            <div>
              <p>{t("home.sectionProject.error")}</p>
            </div>
          )}
        </ul>
      </CarouselViewport>
    </div>
  );
};
