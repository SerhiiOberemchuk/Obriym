import { component$, QRL } from "@qwik.dev/core";
import { Link, useLocation } from "@qwik.dev/router";
import { inlineTranslate, localizePath } from "qwik-speak";
import "./nav-list.css";
import IconHome from "~/assets/icons/icon-home.svg?h38&w39&jsx";

import { NavListItem } from "~/types/nav-list.type";

type Props = {
  place: "footer" | "header" | "mobilemenu";
  onClick?: QRL<() => void>;
};

export default component$<Props>(({ place, onClick }) => {
  const t = inlineTranslate();
  const location = useLocation();

  const currentPath = location.url.pathname;

  const getPath = localizePath();

  const [teamPath] = getPath(["/team/"]);
  const [homePath] = getPath(["/"]);

  const baseListItems: NavListItem[] = [
    { link: "services", label: t("navigation.services@@Services") },
    { link: "portfolio", label: t("navigation.portfolio@@Portfolio") },
    { link: "team", label: t("navigation.team@@Team") },
    { link: "about", label: t("navigation.about@@About") },
    { link: "contact", label: t("navigation.contact@@Contact") },
  ];

  const navListItems = baseListItems.filter(({ link }) => {
    if (place === "mobilemenu" || place === "header") {
      return link !== "team";
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
      <div></div>
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
                href={
                  item.link === "team"
                    ? `${teamPath}`
                    : item.link === "contact"
                      ? `${currentPath}#${item.link}`
                      : `${homePath}#${item.link}`
                }
                aria-label={`${t("navigation.linkLabel@@Link to section")} ${item.label}`}
                class="btn_body link"
                onClick$={onClick}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
