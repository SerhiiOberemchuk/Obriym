import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import ServicePage, { buildServiceMetadataInput } from "~/components/pages/ServicePage/ServicePage";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(await buildServiceMetadataInput("webDevelopment", locale as Locale));
}

export default async function WebDevelopmentPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicePage service="webDevelopment" locale={locale as Locale} />;
}
