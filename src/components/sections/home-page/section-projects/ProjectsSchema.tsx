import { component$ } from "@qwik.dev/core";
import type { Project } from "~/types/project.type";

const mapLang = (lang: string) => (lang === "it-IT" ? "it-IT" : lang === "uk-UA" ? "uk" : "en");

export const ProjectsSchema = component$(
  ({ projects, lang }: { projects: Project[]; lang: string }) => {
    const items = projects.slice(0, 4).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: p.website_url,
      item: {
        "@type": "CreativeWork",
        name: p.titleEN ?? p.title,
        description: (p.descriptionEN ?? p.description)?.slice(0, 160),
        image: p.image_src,
        inLanguage: mapLang(lang),
        keywords: (p.technologies || []).join(", "),
      },
    }));

    const json = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: items,
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(json)} />;
  },
);
