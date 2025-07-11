import { component$, QRL } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";
import "./nav-list.css";
import { NavListItem } from "~/types/nav-list.type";

type Props = {
  class?: string;
  place: "footer" | "header" | "mobilemenu";
  onClick?: QRL<() => void>;
};

export default component$<Props>(({ place, onClick }) => {
  const t = inlineTranslate();

  const baseListItems: NavListItem[] = [
    { link: "services", label: t("navigation.services@@Services") },
    { link: "portfolio", label: t("navigation.portfolio@@Portfolio") },
    { link: "team", label: t("navigation.team@@Team") },
    { link: "about", label: t("navigation.about@@About") },
    { link: "contact", label: t("navigation.contact@@Contact") },
  ];

  const navListItems = baseListItems.filter(({ link }) => {
    if (place === "mobilemenu") {
      return link !== "team";
    }
    if (place === "footer") {
      return link !== "contact";
    }
    return true;
  });

  return (
    <nav>
      <ul data-place={place} class="nav_list">
        {navListItems.map(item => {
          return (
            <li key={item.link}>
              <Link
                href={item.link === "team" ? `/${item.link}` : `#${item.link}`}
                class="btn_body"
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
