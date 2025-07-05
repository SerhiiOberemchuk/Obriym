import { component$ } from "@qwik.dev/core";
import { Link, useLocation } from "@qwik.dev/router";
import { inlineTranslate, localizePath } from "qwik-speak";
import { ChangeLocale } from "../../change-locale/change-locale";

export default component$(() => {
  const t = inlineTranslate();

  const pathname = useLocation().url.pathname;

  const getPath = localizePath();
  const [homePath, pagePath] = getPath(["/", "/page/"]);

  return (
    <header>
      <ul>
        <li>
          <Link href={homePath} class={{ active: pathname === homePath }}>
            {t("app.nav.home@@Home")}
          </Link>
        </li>
        <li>
          <Link href={pagePath} class={{ active: pathname === pagePath }}>
            {t("app.nav.page@@Page")}
          </Link>
        </li>
      </ul>
      <ChangeLocale />
    </header>
  );
});
