import { component$ } from "@qwik.dev/core";
// import { Link, useLocation } from "@qwik.dev/router";
// import { inlineTranslate, localizePath } from "qwik-speak";
// import { ChangeLocale } from "../../change-locale/change-locale";
import Logo from "~/components/common/logo/logo";
import "./h-styles.css";
import MenuBtn from "~/components/mobile-menu/menu-btn/MenuBtn";
import TopMenu from "~/components/common/top-menu/TopMenu";

export default component$(() => {
  // const t = inlineTranslate();

  // const pathname = useLocation().url.pathname;
  //
  // const getPath = localizePath();
  // const [homePath, pagePath] = getPath(["/", "/page/"]);

  return (
    <header class="header">
      <div class="container">
        <Logo place="header" />
        {/* <ChangeLocale /> */}
        <MenuBtn />
        <TopMenu place="header" />
      </div>
    </header>
  );
});
