import { component$, QRL, useStylesScoped$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import styles from "./nav-list.css?inline";
import IconHome from "~/assets/icons/icon-home.svg?h=38&w=39&jsx";

import { NavListItem } from "~/types/nav-list.type";

type Props = {
  place: "footer" | "header" | "mobilemenu";
  onClick?: QRL<() => void>;
};

export default component$<Props>(({ place, onClick }) => {
  const t = inlineTranslate();
  const location = useLocation();
  const locale = useSpeakLocale();
  const getPath = localizePath();
  useStylesScoped$(styles);
  const currentPath = location.url.pathname;
  const lang = locale.lang;
  const navRef = useSignal<HTMLElement>();

  // The floating pill (place="header") is position: fixed at the bottom of the
  // viewport. As the footer scrolls into view it would sit on top of it, so we
  // push the pill up to ride just above the footer's top edge (sticky-like).
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (place !== "header") return;
    const nav = navRef.value;
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
    cleanup(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    });
  });

  const teamPath = getPath("/team/", lang);
  const faqPath = getPath("/faq/", lang);
  const webDevelopmentPath = getPath("/web-development/", lang);
  const seoOptimizationPath = getPath("/seo-optimization/", lang);
  const ecommerceDevelopmentPath = getPath("/ecommerce-development/", lang);
  const productsPath = getPath("/products/", lang);
  const homePath = getPath("/", lang);

  const baseListItems: NavListItem[] = [
    {
      link: "products",
      label: t("navigation.products@@Products"),
      path: productsPath,
    },
    { link: "services", label: t("navigation.services@@Services"), path: `${homePath}#services` },
    {
      link: "portfolio",
      label: t("navigation.portfolio@@Portfolio"),
      path: `${homePath}#portfolio`,
    },
    { link: "team", label: t("navigation.team@@Team"), path: teamPath },
    { link: "about", label: t("navigation.about@@About"), path: `${homePath}#about` },
    { link: "contact", label: t("navigation.contact@@Contact"), path: `${currentPath}#contact` },
    { link: "faq", label: "FAQ", path: faqPath },
    {
      link: "web-development",
      label: t("navigation.webDevelopment@@Web Development"),
      path: webDevelopmentPath,
    },
    {
      link: "seo-optimization",
      label: t("navigation.seoOptimization@@SEO Optimization"),
      path: seoOptimizationPath,
    },
    {
      link: "ecommerce-development",
      label: t("navigation.ecommerceDevelopment@@E-commerce Development"),
      path: ecommerceDevelopmentPath,
    },
  ];

  const navListItems = baseListItems.filter(({ link }) => {
    if (place === "header") {
      return (
        link !== "team" &&
        link !== "faq" &&
        link !== "web-development" &&
        link !== "seo-optimization" &&
        link !== "ecommerce-development"
      );
    }
    if (place === "mobilemenu") {
      return link !== "contact";
    }
    if (place === "footer") {
      return link !== "contact";
    }
    return true;
  });

  return (
    <nav
      ref={navRef}
      id="main-navigation"
      data-place={place}
      class="navigation"
      aria-label={t("navigation.navTitle@@Main navigation")}
    >
      <ul data-place={place} class="nav_list glass-card">
        {place === "header" && (
          <li id="home-link">
            <a href={homePath} aria-label={t("navigation.linkHome@@Link to home page")}>
              <IconHome class="icon_home" />
            </a>
          </li>
        )}
        {navListItems.map(item => {
          return (
            <li key={item.link}>
              <a
                href={item.path}
                aria-label={`${t("navigation.linkLabel@@Link to section")} ${item.label}`}
                class="btn_body"
                onClick$={() => {
                  onClick?.();
                }}
              >
                <span data-place={place} class="page_link">
                  {item.label}{" "}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
