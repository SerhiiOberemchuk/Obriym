import { useLocale, useTranslations } from "next-intl";
import SubTitle from "~/components/common/subtitile/SubTitle";
import SectionContact from "../HomePage/section-contact/SectionContact";
import JsonLd from "~/components/common/json-ld/JsonLd";
import { Link } from "~/i18n/navigation";
import type { Locale } from "~/i18n/routing";
import styles from "./project-detail-page.module.css";
import type { LocalizedProject } from "~/lib/projects";
import { SITE, canonicalUrl } from "~/lib/seo";
import { buildBreadcrumbList } from "~/lib/structuredData";

type ProjectDetailPageProps = {
  project: LocalizedProject;
  relatedProjects: LocalizedProject[];
};

/** Path without the locale prefix; the canonical/hreflang helpers add it. */
const PROJECTS_PATH = "/projects/";

export default function ProjectDetailPage({ project, relatedProjects }: ProjectDetailPageProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const canonical = canonicalUrl(project.detailHref, locale);
  const breadcrumbSchema = buildBreadcrumbList(
    [
      { name: t("navigation.home"), href: "/" },
      { name: t("home.sectionProject.title"), href: PROJECTS_PATH },
      { name: project.localizedTitle, href: project.detailHref },
    ],
    locale,
  );
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.localizedTitle,
    description: project.localizedDescription,
    url: canonical,
    image: project.image_src,
    dateModified: project.updated_at,
    datePublished: project.created_at,
    keywords: project.technologies.join(", "),
    inLanguage: project.locale,
    genre: project.localizedCategory,
    about: project.localizedFeatures,
    creator: {
      "@type": "Organization",
      name: "OBRIYM",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "OBRIYM",
      url: SITE,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  return (
    <>
      <JsonLd id="project-creativework-schema" data={creativeWorkSchema} />
      <JsonLd id="project-breadcrumb-schema" data={breadcrumbSchema} />

      <section className={styles.project_detail_hero}>
        <div className="container">
          <SubTitle section="projects" classes="project_detail_subtitle">
            {t("projects.detail.subtitle")}
          </SubTitle>

          <Link href={PROJECTS_PATH} className={`${styles.project_back} btn_body grey_dark`}>
            {t("projects.detail.back")}
          </Link>

          <div className={styles.project_detail_head}>
            <div className="project_detail_copy">
              <p className="helper_text grey_dark project_detail_kicker">
                {project.localizedCategory} / {project.year}
              </p>
              <h1 className={`H2_light black ${styles.project_detail_title}`}>
                {project.localizedTitle}
              </h1>
              <p className={`body_big grey ${styles.project_detail_lead}`}>
                {project.localizedDescription}
              </p>
            </div>

            <div className={styles.project_detail_panel}>
              <div>
                <p className="helper_text grey_dark">{t("projects.detail.client")}</p>
                <p className="H6 black">{project.localizedClient}</p>
              </div>
              <div>
                <p className="helper_text grey_dark">{t("projects.detail.year")}</p>
                <p className="H6 black">{project.year}</p>
              </div>
              <div>
                <p className="helper_text grey_dark">{t("projects.detail.stack")}</p>
                <p className="btn_body grey_dark">{project.technologies.join(", ")}</p>
              </div>
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.project_detail_link} btn_body black`}
              >
                {t("projects.detail.website")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.project_detail_visual}>
        <div className="container">
          <div className={styles.project_detail_image_shell}>
            <img
              src={project.image_src}
              alt={`${project.localizedTitle} - ${project.localizedDescription}`}
              width={1280}
              height={720}
              className={styles.project_detail_image}
            />
          </div>
        </div>
      </section>

      <section className={styles.project_detail_content}>
        <div className={`container ${styles.project_detail_content_grid}`}>
          <article className={styles.project_story_card}>
            <h2 className="H5 black">{t("projects.detail.overview.title")}</h2>
            <p className="btn_body grey">{project.localizedDescription}</p>
            <p className="btn_body grey">{t("projects.detail.overview.text")}</p>
          </article>

          <aside className={styles.project_features_card}>
            <h2 className="H5 black">{t("projects.detail.features")}</h2>
            <ul className={styles.project_features_list}>
              {project.localizedFeatures.map(feature => (
                <li key={feature} className="btn_body grey_dark">
                  {feature}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className={styles.project_related_section}>
          <div className="container">
            <h2 className={`H5 black ${styles.project_related_title}`}>
              {t("projects.detail.related")}
            </h2>
            <ul className={styles.project_related_grid}>
              {relatedProjects.map(related => (
                <li key={related.slug}>
                  <article className={styles.project_related_card}>
                    <Link href={related.detailHref} className={styles.project_related_link}>
                      <img
                        src={related.image_src}
                        alt={related.localizedTitle}
                        width={668}
                        height={330}
                        className={styles.project_related_image}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={styles.project_related_body}>
                        <p className="helper_text grey_dark">
                          {related.localizedCategory} / {related.year}
                        </p>
                        <h3 className="H6 black">{related.localizedTitle}</h3>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <SectionContact />
    </>
  );
}
