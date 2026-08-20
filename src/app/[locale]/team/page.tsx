import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";

import HeroSection from "~/components/pages/TeamPage/hero-section/HeroSection";
import StepsSection from "~/components/pages/TeamPage/steps-section/StepsSection";
import SectionContact from "~/components/pages/HomePage/section-contact/SectionContact";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("app.head.team.title", { name: "OBRIYM" }),
    description: t("app.head.team.description"),
    pathname: "/team/",
    locale: locale as Locale,
  });
}

export default async function TeamPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StepsSection />
      <SectionContact />
    </>
  );
}
