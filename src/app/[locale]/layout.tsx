import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "~/i18n/routing";
import { buildMetadata } from "~/lib/seo";
import { AppProvider } from "~/context/app-context";
import { Analytics } from "@vercel/analytics/next"
import Header from "~/components/layout/header/Header";
import Footer from "~/components/layout/footer/Footer";
import LetsWork from "~/components/lets-work/LetsWork";
import MobileMenu from "~/components/mobile-menu/MobileMenu";
import NavList from "~/components/common/nav-list/NavList";
import CookiesBanner from "~/components/cookies-banner/CookiesBanner";
import Popover from "~/components/common/popover/Popover";

// Global stylesheets, in the same order the Qwik root loaded them: the shared
// base first, then the component sheets that were imported globally.
import "~/styles/global.css";
import "~/components/layout/header/h-styles.css";
import "~/components/mobile-menu/mb-styles.css";
import "~/components/mobile-menu/menu-window/mw-styles.css";
import "~/components/lets-work/lw-styles.css";
import "~/components/common/contact-form/ic-form-modal-btn.css";
import "~/components/common/link-email/link_styles.css";
import "~/components/common/logo/style.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    ...buildMetadata({
      title: t("app.head.home.title", { name: "OBRIYM" }),
      description: t("app.head.home.description"),
      pathname: "/",
      locale: locale as Locale,
    }),
    manifest: "/manifest.json",
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <Analytics />
        <NextIntlClientProvider>
          <AppProvider>
            <Header />
            <LetsWork place="header" />
            <MobileMenu />
            <NavList place="header" />
            <main>{children}</main>
            <Footer />
            <CookiesBanner />
            <Popover />
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
