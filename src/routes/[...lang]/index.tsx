import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city"; //
import { inlineTranslate } from "qwik-speak";
import SectionContact from "~/components/pages/HomePage/section-contact/SectionContact";

import SectionHero from "~/components/pages/HomePage/section-hero/SectionHero";
import SectionHowItWork from "~/components/pages/HomePage/section-hiw/SectionHowItWork";
import SectionProjects from "~/components/pages/HomePage/section-projects/SectionProjects";
import Services from "~/components/pages/HomePage/section-services/Services";
import SectionTitle from "~/components/pages/HomePage/section-title/SectionTitle";
import { Project } from "~/types/project.type";
import SchemaSeoScripts from "~/utils/SchemaSeoScripts";

export const useLocalLoader = routeLoader$(({ locale }) => locale);
export const useFetchProjects = routeLoader$(async ({ cacheControl }) => {
  cacheControl({
    public: true,
    maxAge: 60 * 60,
    sMaxAge: 60 * 60 * 24,
    staleWhileRevalidate: 60,
  });
  try {
    const url = import.meta.env.PUBLIC_URL_PROJECTS;
    const response = await fetch(`${url}/api/projects`, {
      headers: { accept: "application/json" },
    });
    const projects = await response.json();
    return {
      status: true as boolean,
      message: "successful fetch" as string,
      data: projects.data as Project[],
    };
  } catch (error) {
    return { status: false as boolean, message: `error : ${error}` };
  }
});

export default component$(() => {
  return (
    <>
      <SectionTitle />
      <SectionHero />
      <Services />
      <SectionProjects />
      <SectionHowItWork />
      <SectionContact />
      <SchemaSeoScripts />
    </>
  );
});

export const SITE = "https://obriym.com";

export const OG_IMAGE = `${SITE}/og-image.jpg`;

const HOME_KEYWORDS_BY_LOCALE: Record<"en-EU" | "uk-UA" | "it-IT", string> = {
  "en-EU":
    "web development agency, website development, ecommerce development, web app development, landing page development, corporate website development, UX UI design agency, SEO website development, website redesign, custom website development",
  "uk-UA":
    "створення сайтів, розробка сайту, веб студія, веб розробка, розробка інтернет магазину, створення лендінгу, UX UI дизайн, SEO оптимізований сайт, корпоративний сайт, веб застосунок",
  "it-IT":
    "agenzia web, sviluppo siti web, realizzazione siti web, sviluppo ecommerce, sviluppo web app, creazione landing page, design UX UI, sito ottimizzato SEO, sito aziendale, sviluppo sito su misura",
};

const detectLocaleFromPath = (pathname: string): "en-EU" | "uk-UA" | "it-IT" => {
  if (pathname.startsWith("/uk-UA")) return "uk-UA";
  if (pathname.startsWith("/it-IT")) return "it-IT";
  return "en-EU";
};

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const locale = detectLocaleFromPath(url.pathname);
  const title = t("app.head.home.title@@Full-cycle web agency - fast SEO sites and apps | {{name}}", {
    name: "OBRIYM",
  });
  const description = t("app.head.home.description@@Localized routing");
  const keywords = HOME_KEYWORDS_BY_LOCALE[locale];
  const ogLocale = locale === "uk-UA" ? "uk_UA" : locale === "it-IT" ? "it_IT" : "en_GB";
  const canonicalPathFromLocale = url.pathname.replace(/^\/en-EU(?=\/|$)/, "");
  const canonicalPath =
    canonicalPathFromLocale === "" || canonicalPathFromLocale === "/"
      ? "/"
      : canonicalPathFromLocale.endsWith("/")
        ? canonicalPathFromLocale
        : `${canonicalPathFromLocale}/`;
  const canonical = `${SITE}${canonicalPath}`;

  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      { name: "keywords", content: keywords },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { name: "author", content: "OBRIYM" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OBRIYM" },
      { property: "og:locale", content: ogLocale },
      { property: "og:locale:alternate", content: "en_GB" },
      { property: "og:locale:alternate", content: "uk_UA" },
      { property: "og:locale:alternate", content: "it_IT" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hreflang: "en-EU", href: `${SITE}/` },
      { rel: "alternate", hreflang: "uk-UA", href: `${SITE}/uk-UA/` },
      { rel: "alternate", hreflang: "it-IT", href: `${SITE}/it-IT/` },
      { rel: "alternate", hreflang: "x-default", href: `${SITE}/` },
    ],
  };
};

