import { component$, useContext } from "@qwik.dev/core";
import "./mw-styles.css";
import NavList from "~/components/common/nav-list/NavList";
import { ChangeLocale } from "~/components/change-locale/change-locale";
import LetsWork from "~/components/lets-work/LetsWork";
import { MobileMenuContext } from "../MobileMenu";

export default component$(() => {
  const { isOpen, toggleMenu } = useContext(MobileMenuContext);

  return (
    <>
      <div class="mob_wraper" data-open={isOpen.value ? "true" : "false"} onClick$={toggleMenu} />
      <div class="mob_menu">
        <NavList place="mobilemenu" onClick={toggleMenu} />
        <div>
          <ChangeLocale place="mob-menu" />
          <LetsWork place="mob-menu" />
        </div>
      </div>
    </>
  );
});
