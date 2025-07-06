import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";
import "./nav-list.css";
import { NavListItem } from "~/types/nav-list.type";

type Props = { class?: string; place: "footer" | "header" | "mobilemenu" };

export default component$<Props>(({ place }) => {
  const t = inlineTranslate();

  const navListItems: NavListItem[] = [
    { link: "services", label: t("navigation.services@@Services") },
    { link: "portfolio", label: t("navigation.portfolio@@Portfolio") },
    { link: "team", label: t("navigation.team@@Team") },
    { link: "about", label: t("navigation.about@@About") },
    { link: "contact", label: t("navigation.contact@@Contact") },
  ];

  if (place === "footer") {
    navListItems.pop();
  }

  return (
    <nav>
      <ul data-place={place} class="nav_list">
        {navListItems.map(item => {
          return (
            <li key={item.link}>
              <Link
                href={item.link === "team" ? `/${item.link}` : `#${item.link}`}
                class="btn_body"
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
