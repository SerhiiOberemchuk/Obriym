import { component$, QRL, useStylesScoped$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
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
  const getPath = localizePath();
  useStylesScoped$(styles);
  const currentPath = location.url.pathname;
  const lang =
    currentPath === "/uk-UA" || currentPath.startsWith("/uk-UA/")
      ? "uk-UA"
      : currentPath === "/it-IT" || currentPath.startsWith("/it-IT/")
        ? "it-IT"
        : "en-EU";
  const tr = (key: string) => t(key, undefined, lang) as string;
  const teamPath = getPath("/team/", lang);
  const faqPath = getPath("/faq/", lang);
  const homePath = getPath("/", lang);

  const baseListItems: NavListItem[] = [
    { link: "services", label: tr("navigation.services@@Services"), path: `${homePath}#services` },
    {
      link: "portfolio",
      label: tr("navigation.portfolio@@Portfolio"),
      path: `${homePath}#portfolio`,
    },
    { link: "team", label: tr("navigation.team@@Team"), path: teamPath },
    { link: "about", label: tr("navigation.about@@About"), path: `${homePath}#about` },
    { link: "contact", label: tr("navigation.contact@@Contact"), path: `${currentPath}#contact` },
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
      aria-label={tr("navigation.navTitle@@Main navigation")}
    >
      <ul data-place={place} class="nav_list glass-card">
        {place === "header" && (
          <li id="home-link">
            <Link
              href={homePath}
              onClick$={() => {
                console.log(lang);
              }}
              aria-label={tr("navigation.linkHome@@Link to home page")}
            >
              <IconHome class="icon_home" />
            </Link>
          </li>
        )}
        {navListItems.map(item => {
          return (
            <li key={item.link}>
              <Link
                href={item.path}
                aria-label={`${tr("navigation.linkLabel@@Link to section")} ${item.label}`}
                class="btn_body"
                onClick$={() => {
                  onClick?.();
                  console.log(lang);
                }}
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
