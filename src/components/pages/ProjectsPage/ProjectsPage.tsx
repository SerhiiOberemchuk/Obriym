import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";
import SubTitle from "~/components/common/subtitile/SubTitle";
import SectionContact from "../HomePage/section-contact/SectionContact";
import styles from "./projects-page.css?inline";
import type { Project } from "~/types/project.type";
import { type ProjectLocale, getLocalizedProject } from "~/utils/projects";

type ProjectsPageProps = {
  projects: Project[];
};

export default component$<ProjectsPageProps>(({ projects }) => {
  useStylesScoped$(styles);

  const { lang } = useSpeakLocale();
  const t = inlineTranslate();
  const localizedProjects = projects.map(project => getLocalizedProject(project, lang as ProjectLocale));

  return (
    <>
      <section class="projects_page_hero">
        <div class="container">
          <SubTitle section="projects" classes="projects_page_subtitle">
            {t("projects.page.subtitle@@Selected work")}
          </SubTitle>

          <div class="projects_page_heading">
            <h1 class="H2_light black projects_page_title">
              {t("projects.page.title@@Projects shaped for growth, speed and real-world launch.")}
            </h1>
            <p class="body_big grey projects_page_lead">
              {t(
                "projects.page.lead@@A closer look at websites and digital products we designed and built for ambitious brands across Europe.",
              )}
            </p>
          </div>
        </div>
      </section>

      <section class="projects_page_grid_section">
        <div class="container">
          <ul class="projects_page_grid" aria-label={t("projects.page.list.aria@@Projects list")}>
            {localizedProjects.map(project => (
              <li key={project.slug}>
                <article class="project_card">
                  <Link href={project.detailPath} class="project_card_link">
                    <img
                      src={project.image_src}
                      alt={`${project.localizedTitle} - ${project.localizedDescription}`}
                      width={668}
                      height={330}
                      loading="lazy"
                      decoding="async"
                      class="project_card_image"
                    />
                    <div class="project_card_content">
                      <div class="project_card_meta helper_text grey_dark">
                        <span>{project.year}</span>
                        <span>{project.localizedCategory}</span>
                      </div>
                      <h2 class="H5 black project_card_title">{project.localizedTitle}</h2>
                      <p class="btn_body grey project_card_description">
                        {project.localizedDescription}
                      </p>
                    </div>
                  </Link>

                  <div class="project_card_footer">
                    <ul class="project_tags" aria-label={t("projects.page.features.aria@@Project features")}>
                      {project.localizedFeatures.slice(0, 4).map(feature => (
                        <li key={feature} class="helper_text grey_dark">
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link href={project.detailPath} class="project_card_cta btn_body black">
                      {t("projects.page.button@@View project")}
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionContact />
    </>
  );
});
