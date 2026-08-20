"use client";

import NavList from "~/components/common/nav-list/NavList";
import { ChangeLocale } from "~/components/change-locale/change-locale";
import LetsWork from "~/components/lets-work/LetsWork";
import { useMobileMenu } from "~/context/app-context";

export default function MenuWindow() {
  const { isMenuOpen, toggleMenu } = useMobileMenu();

  return (
    <>
      <div className="mob_wraper" data-open={isMenuOpen ? "true" : "false"} onClick={toggleMenu} />
      <div className="mob_menu">
        <NavList place="mobilemenu" onClick={toggleMenu} />
        <div>
          <ChangeLocale place="mob-menu" />
          <LetsWork place="mob-menu" />
        </div>
      </div>
    </>
  );
}
