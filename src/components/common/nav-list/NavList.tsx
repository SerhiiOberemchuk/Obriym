"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, homeSectionHref } from "~/i18n/navigation";
import styles from "./nav-list.module.css";
import IconHome from "~/assets/icons/icon-home.svg";

import type { Locale } from "~/i18n/routing";
import { NavListItem } from "~/types/nav-list.type";

type Props = {
  place: "footer" | "header" | "mobilemenu";
  onClick?: () => void;
};

export default function NavList({ place, onClick }: Props) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const navRef = useRef<HTMLElement>(null);

  // The floating pill (place="header") is position: fixed at the bottom of the
  // viewport. As the footer scrolls into view it would sit on top of it, so we
  // push the pill up to ride just above the footer's top edge (sticky-like).
  useEffect(() => {
    if (place !== "header") return;
    const nav = navRef.current;
    const footer = document.querySelector("footer");
    if (!nav || !footer) return;

    const BASE_GAP = 16; // pill's default distance from the viewport bottom (bottom: 1rem)
    const CLEAR_GAP = 16; // breathing room kept between the pill and the footer
    let raf = 0;

    const update = () => {
      raf = 0;
      const footerTop = footer.getBoundingClientRect().top;
      const navBottom = window.innerHeight - BASE_GAP;
      const shift = navBottom - footerTop + CLEAR_GAP;
      nav.style.setProperty("--nav-shift", `${Math.max(0, shift)}px`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [place]);

  const baseListItems: NavListItem[] = [
    { link: "products", label: t("navigation.products"), kind: "route", href: "/products/" },
    {
      link: "services",
      label: t("navigation.services"),
      kind: "anchor",
      href: homeSectionHref("services", locale),
    },
    {
      link: "portfolio",
      label: t("navigation.portfolio"),
      kind: "anchor",
      href: homeSectionHref("portfolio", locale),
    },
    { link: "team", label: t("navigation.team"), kind: "route", href: "/team/" },
    {
      link: "about",
      label: t("navigation.about"),
      kind: "anchor",
      href: homeSectionHref("about", locale),
    },
    { link: "contact", label: t("navigation.contact"), kind: "anchor", href: "#contact" },
    { link: "faq", label: "FAQ", kind: "route", href: "/faq/" },
    {
      link: "web-development",
      label: t("navigation.webDevelopment"),
      kind: "route",
      href: "/web-development/",
    },
    {
      link: "ecommerce-development",
      label: t("navigation.ecommerceDevelopment"),
      kind: "route",
      href: "/ecommerce-development/",
    },
    {
      link: "crm-development",
      label: t("navigation.crmDevelopment"),
      kind: "route",
      href: "/crm-development/",
    },
    {
      link: "saas-development",
      label: t("navigation.saasDevelopment"),
      kind: "route",
      href: "/saas-development/",
    },
  ];

  const navListItems = baseListItems.filter(({ link }) => {
    if (place === "header") {
      return (
        link !== "team" &&
        link !== "faq" &&
        link !== "web-development" &&
        link !== "ecommerce-development" &&
        link !== "crm-development" &&
        link !== "saas-development"
      );
    }
    if (place === "mobilemenu" || place === "footer") {
      return link !== "contact";
    }
    return true;
  });

  return (
    <nav
      ref={navRef}
      id="main-navigation"
      data-place={place}
      className={styles.navigation}
      aria-label={t("navigation.navTitle")}
    >
      <ul data-place={place} className={`${styles.nav_list} ${styles["glass-card"]}`}>
        {place === "header" && (
          <li id="home-link">
            <Link href="/" aria-label={t("navigation.linkHome")}>
              <IconHome className={styles.icon_home} width={39} height={38} />
            </Link>
          </li>
        )}
        {navListItems.map(item => {
          const label = `${t("navigation.linkLabel")} ${item.label}`;
          const content = (
            <span data-place={place} className={styles.page_link}>
              {item.label}{" "}
            </span>
          );

          return (
            <li key={item.link}>
              {item.kind === "route" ? (
                <Link
                  href={item.href}
                  aria-label={label}
                  className="btn_body"
                  onClick={() => onClick?.()}
                >
                  {content}
                </Link>
              ) : (
                <a
                  href={item.href}
                  aria-label={label}
                  className="btn_body"
                  onClick={() => onClick?.()}
                >
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
