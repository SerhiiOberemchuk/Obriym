import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";

import SectionTitle from "~/components/pages/HomePage/section-title/SectionTitle";
import SectionHero from "~/components/pages/HomePage/section-hero/SectionHero";
import Services from "~/components/pages/HomePage/section-services/Services";
import SectionProjects from "~/components/pages/HomePage/section-projects/SectionProjects";
import SectionHowItWork from "~/components/pages/HomePage/section-hiw/SectionHowItWork";
import SectionContact from "~/components/pages/HomePage/section-contact/SectionContact";
import SiteSchemas from "~/components/seo/SiteSchemas";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("app.head.home.title", { name: "OBRIYM" }),
    description: t("app.head.home.description"),
    pathname: "/",
    locale: locale as Locale,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectionTitle />
      <SectionHero />
      <Services />
      <SectionProjects />
      <SectionHowItWork />
      <SectionContact />
      <SiteSchemas />
    </>
  );
}
