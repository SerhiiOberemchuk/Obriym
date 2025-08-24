import { component$, QRL, useStylesScoped$ } from "@qwik.dev/core";
import { Link, useLocation } from "@qwik.dev/router";
import { inlineTranslate, localizePath } from "qwik-speak";
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
  useStylesScoped$(styles);
  const currentPath = location.url.pathname;

  const getPath = localizePath();

  const [teamPath] = getPath(["/team/"]);
  const [faqPath] = getPath(["/faq/"]);
  const [homePath] = getPath(["/"]);

  const baseListItems: NavListItem[] = [
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
  ];

  const navListItems = baseListItems.filter(({ link }) => {
    if (place === "mobilemenu" || place === "header") {
      return link !== "team" && link !== "faq";
    }
    if (place === "footer") {
      return link !== "contact";
    }
    return true;
  });

  return (
    <nav
      id="main-navigation"
      data-place={place}
      class="navigation"
      aria-label={t("navigation.navTitle@@Main navigation")}
    >
      <ul data-place={place} class="nav_list glass-card">
        {place === "header" && (
          <li id="home-link">
            <Link href={homePath} aria-label={t("navigation.linkHome@@Link to home page")}>
              <IconHome class="icon_home" />
            </Link>
          </li>
        )}
        {navListItems.map(item => {
          return (
            <li key={item.link}>
              <Link
                href={item.path}
                aria-label={`${t("navigation.linkLabel@@Link to section")} ${item.label}`}
                class="btn_body"
                onClick$={onClick}
              >
                <span data-place={place} class="page_link">
                  {item.label}{" "}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
