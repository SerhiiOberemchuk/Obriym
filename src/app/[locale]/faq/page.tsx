import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import FaqPage from "~/components/pages/FaqPage";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("faq.head.title", { name: "OBRIYM" }),
    description: t("faq.head.desc"),
    pathname: "/faq/",
    locale: locale as Locale,
  });
}

export default async function Faq({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FaqPage />;
}
