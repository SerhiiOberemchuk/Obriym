import { useLocale, useTranslations } from "next-intl";
import SubTitle from "~/components/common/subtitile/SubTitle";
import SectionContact from "../HomePage/section-contact/SectionContact";
import JsonLd from "~/components/common/json-ld/JsonLd";
import { Link } from "~/i18n/navigation";
import type { Locale } from "~/i18n/routing";
import styles from "./projects-page.module.css";
import type { Project } from "~/types/project.type";
import { getLocalizedProject } from "~/lib/projects";
import { SITE, canonicalUrl } from "~/lib/seo";
import { buildBreadcrumbList } from "~/lib/structuredData";

type ProjectsPageProps = {
  projects: Project[];
};

/** Path without the locale prefix; the canonical/hreflang helpers add it. */
const PROJECTS_PATH = "/projects/";

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const localizedProjects = projects.map(project => getLocalizedProject(project, locale));
  const canonical = canonicalUrl(PROJECTS_PATH, locale);
  const breadcrumbSchema = buildBreadcrumbList(
    [
      { name: t("navigation.home"), pathname: "/" },
      { name: t("home.sectionProject.title"), pathname: PROJECTS_PATH },
    ],
    locale,
  );
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("projects.head.title", { name: "OBRIYM" }),
    description: t("projects.head.description"),
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: localizedProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: canonicalUrl(project.detailPath, locale),
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
      <JsonLd id="projects-collection-schema" data={collectionSchema} />
      <JsonLd id="projects-breadcrumb-schema" data={breadcrumbSchema} />

      <section className={styles.projects_page_hero}>
        <div className="container">
          <SubTitle section="projects" classes="projects_page_subtitle">
            {t("projects.page.subtitle")}
          </SubTitle>

          <div className={styles.projects_page_heading}>
            <h1 className={`H2_light black ${styles.projects_page_title}`}>
              {t("projects.page.title")}
            </h1>
            <p className={`body_big grey ${styles.projects_page_lead}`}>
              {t("projects.page.lead")}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.projects_page_grid_section}>
        <div className="container">
          <ul className={styles.projects_page_grid} aria-label={t("projects.page.list.aria")}>
            {localizedProjects.map(project => (
              <li key={project.slug}>
                <article className={styles.project_card}>
                  <Link href={project.detailPath} className={styles.project_card_link}>
                    <img
                      src={project.image_src}
                      alt={`${project.localizedTitle} - ${project.localizedDescription}`}
                      width={668}
                      height={330}
                      loading="lazy"
                      decoding="async"
                      className={styles.project_card_image}
                    />
                    <div className={styles.project_card_content}>
                      <div className={`${styles.project_card_meta} helper_text grey_dark`}>
                        <span>{project.year}</span>
                        <span>{project.localizedCategory}</span>
                      </div>
                      <h2 className={`H5 black ${styles.project_card_title}`}>
                        {project.localizedTitle}
                      </h2>
                      <p className={`btn_body grey ${styles.project_card_description}`}>
                        {project.localizedDescription}
                      </p>
                    </div>
                  </Link>

                  <div className={styles.project_card_footer}>
                    <ul
                      className={styles.project_tags}
                      aria-label={t("projects.page.features.aria")}
                    >
                      {project.localizedFeatures.slice(0, 4).map(feature => (
                        <li key={feature} className="helper_text grey_dark">
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={project.detailPath}
                      className={`${styles.project_card_cta} btn_body black`}
                    >
                      {t("projects.page.button")}
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
}
