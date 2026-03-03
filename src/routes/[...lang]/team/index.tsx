import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import SectionContact from "~/components/pages/HomePage/section-contact/SectionContact";
import HeroSection from "~/components/pages/TeamPage/hero-section/HeroSection";
import StepsSection from "~/components/pages/TeamPage/steps-section/StepsSection";
import {
  OG_IMAGE,
  canonicalFromPathname,
  hreflangLinksForPath,
  ogLocaleFromPathname,
  pathWithoutLocaleFromPathname,
} from "../services/seo-utils";

export default component$(() => {
  return (
    <>
      <HeroSection />
      <StepsSection />
      <SectionContact />
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.team.title@@Our Team | {{name}}", { name: "OBRIYM" });
  const description = t(
    "app.head.team.description@@Meet the OBRIYM team: strategists, designers, and developers delivering fast, scalable digital products.",
  );
  const canonical = canonicalFromPathname(url.pathname);
  const pathWithoutLocale = pathWithoutLocaleFromPathname(url.pathname);
  const ogLocale = ogLocaleFromPathname(url.pathname);

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OBRIYM" },
      { property: "og:locale", content: ogLocale },
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
    links: [{ rel: "canonical", href: canonical }, ...hreflangLinksForPath(pathWithoutLocale)],
  };
};
