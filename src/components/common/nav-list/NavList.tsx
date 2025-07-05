import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { inlineTranslate } from "qwik-speak";

type Props = { class?: string; place: "footer" | "header" | "mobmenu" };

export default component$<Props>(props => {
  const t = inlineTranslate();
  const navListItems = [
    { Services: t("navigation.services@@Services") },
    { Portfolio: t("navigation.portfolio@@Portfolio") },
    { About: t("navigation.about@@About") },
    { Contact: t("navigation.contact@@Contact") },
  ];
  console.log("navListItems", navListItems);

  return (
    <nav class={props.class}>
      <ul>
        {navListItems.map((item, index) => {
          const [key, valu] = Object.entries(item)[0];
          return (
            <li key={index}>
              <Link href={`#${key}`}>{valu}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
