import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";
import SubTitle from "~/components/common/subtitile/SubTitle";
import SectionContact from "../HomePage/section-contact/SectionContact";
import styles from "./project-detail-page.css?inline";
import type { LocalizedProject } from "~/utils/projects";
import { SITE } from "~/utils/seo";

type ProjectDetailPageProps = {
  project: LocalizedProject;
  relatedProjects: LocalizedProject[];
};

export default component$<ProjectDetailPageProps>(({ project, relatedProjects }) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const loc = useLocation();
  const { lang } = useSpeakLocale();
  const homePath = `${SITE}${lang === "uk-UA" ? "/uk-UA" : lang === "it-IT" ? "/it-IT" : ""}` || SITE;
  const projectsPath = `${SITE}${project.detailPath.replace(`/${project.slug}`, "") || "/projects"}`;
  const canonical = `${SITE}${loc.url.pathname === "/" ? "/" : loc.url.pathname.replace(/\/+$/, "")}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("navigation.home@@Home"),
        item: homePath,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("home.sectionProject.title@@Projects"),
        item: projectsPath,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.localizedTitle,
        item: canonical,
      },
    ],
  };
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
      <script
        id="project-creativework-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(creativeWorkSchema)}
      ></script>
      <script
        id="project-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify(breadcrumbSchema)}
      ></script>

      <section class="project_detail_hero">
        <div class="container">
          <SubTitle section="projects" classes="project_detail_subtitle">
            {t("projects.detail.subtitle@@Project case")}
          </SubTitle>

          <Link href={project.detailPath.replace(`/${project.slug}`, "") || "/projects"} class="project_back btn_body grey_dark">
            {t("projects.detail.back@@Back to projects")}
          </Link>

          <div class="project_detail_head">
            <div class="project_detail_copy">
              <p class="helper_text grey_dark project_detail_kicker">
                {project.localizedCategory} / {project.year}
              </p>
              <h1 class="H2_light black project_detail_title">{project.localizedTitle}</h1>
              <p class="body_big grey project_detail_lead">{project.localizedDescription}</p>
            </div>

            <div class="project_detail_panel">
              <div>
                <p class="helper_text grey_dark">{t("projects.detail.client@@Client")}</p>
                <p class="H6 black">{project.localizedClient}</p>
              </div>
              <div>
                <p class="helper_text grey_dark">{t("projects.detail.year@@Year")}</p>
                <p class="H6 black">{project.year}</p>
              </div>
              <div>
                <p class="helper_text grey_dark">{t("projects.detail.stack@@Technologies")}</p>
                <p class="btn_body grey_dark">{project.technologies.join(", ")}</p>
              </div>
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                class="project_detail_link btn_body black"
              >
                {t("projects.detail.website@@Visit live website")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="project_detail_visual">
        <div class="container">
          <div class="project_detail_image_shell">
            <img
              src={project.image_src}
              alt={`${project.localizedTitle} - ${project.localizedDescription}`}
              width={1280}
              height={720}
              class="project_detail_image"
            />
          </div>
        </div>
      </section>

      <section class="project_detail_content">
        <div class="container project_detail_content_grid">
          <article class="project_story_card">
            <h2 class="H5 black">{t("projects.detail.overview.title@@Overview")}</h2>
            <p class="btn_body grey">
              {project.localizedDescription}
            </p>
            <p class="btn_body grey">
              {t(
                "projects.detail.overview.text@@This project focused on a clear product story, a fast browsing experience and a launch-ready interface that could support growth without adding unnecessary complexity.",
              )}
            </p>
          </article>

          <aside class="project_features_card">
            <h2 class="H5 black">{t("projects.detail.features@@What shaped the project")}</h2>
            <ul class="project_features_list">
              {project.localizedFeatures.map(feature => (
                <li key={feature} class="btn_body grey_dark">
                  {feature}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section class="project_related_section">
          <div class="container">
            <h2 class="H5 black project_related_title">
              {t("projects.detail.related@@More selected projects")}
            </h2>
            <ul class="project_related_grid">
              {relatedProjects.map(related => (
                <li key={related.slug}>
                  <article class="project_related_card">
                    <Link href={related.detailPath} class="project_related_link">
                      <img
                        src={related.image_src}
                        alt={related.localizedTitle}
                        width={668}
                        height={330}
                        class="project_related_image"
                        loading="lazy"
                        decoding="async"
                      />
                      <div class="project_related_body">
                        <p class="helper_text grey_dark">
                          {related.localizedCategory} / {related.year}
                        </p>
                        <h3 class="H6 black">{related.localizedTitle}</h3>
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
});
