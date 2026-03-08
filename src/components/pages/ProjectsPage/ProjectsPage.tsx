import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";
import SubTitle from "~/components/common/subtitile/SubTitle";
import SectionContact from "../HomePage/section-contact/SectionContact";
import styles from "./projects-page.css?inline";
import type { Project } from "~/types/project.type";
import { type ProjectLocale, getLocalizedProject } from "~/utils/projects";
import { SITE } from "~/utils/seo";

type ProjectsPageProps = {
  projects: Project[];
};

export default component$<ProjectsPageProps>(({ projects }) => {
  useStylesScoped$(styles);

  const { lang } = useSpeakLocale();
  const t = inlineTranslate();
  const loc = useLocation();
  const localizedProjects = projects.map(project => getLocalizedProject(project, lang as ProjectLocale));
  const canonical = `${SITE}${loc.url.pathname === "/" ? "/" : loc.url.pathname.replace(/\/+$/, "")}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("navigation.home@@Home"),
        item: `${SITE}${lang === "uk-UA" ? "/uk-UA" : lang === "it-IT" ? "/it-IT" : ""}` || SITE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("home.sectionProject.title@@Projects"),
        item: canonical,
      },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("projects.head.title@@Projects | SEO-ready websites and digital products | {{name}}", {
      name: "OBRIYM",
    }),
    description: t(
      "projects.head.description@@Explore OBRIYM projects: fast SEO-ready websites, multilingual platforms and digital products created for ambitious brands across Europe.",
    ),
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: localizedProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE}${project.detailPath}`,
        name: project.localizedTitle,
      })),
    },
    publisher: {
      "@type": "Organization",
      name: "OBRIYM",
      url: SITE,
    },
  };

  return (
    <>
      <script
        id="projects-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(collectionSchema)}
      ></script>
      <script
        id="projects-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(breadcrumbSchema)}
      ></script>

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
