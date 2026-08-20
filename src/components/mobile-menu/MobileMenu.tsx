"use client";

import MenuWindow from "./menu-window/MenuWindow";
import { useMobileMenu, useViewport } from "~/context/app-context";

export default function MobileMenu() {
  const { toggleMenu, isMenuOpen } = useMobileMenu();
  const viewport = useViewport();
  if (viewport !== "mobile") {
    return null;
  }
  return (
    <>
      <button
        onClick={toggleMenu}
        className="menu_btn"
        aria-controls="main-navigation"
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-label="Button to open mobile menu"
      >
        <span className="btn_body title">Menu</span>
        <span className="mb_burger">
          <span />
          <span />
          <span />
        </span>
      </button>
      <MenuWindow />
    </>
  );
}
