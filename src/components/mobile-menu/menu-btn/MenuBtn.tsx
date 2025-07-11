import { $, component$, useSignal } from "@qwik.dev/core";
import "./mb-styles.css";
import MenuWindow from "../menu-window/MenuWindow";

export default component$(() => {
  const isMenuOpen = useSignal<boolean>(false);
  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  return (
    <>
      <button
        onClick$={toggleMenu}
        class="menu_btn"
        aria-controls="main-navigation"
        aria-expanded={isMenuOpen.value ? "true" : "false"}
        aria-label="Button to open mobile menu"
      >
        <span class="btn_body title">Menu</span>
        <span class="mb_burger">
          <span />
          <span />
          <span />
        </span>
      </button>
      <MenuWindow isOpen={isMenuOpen.value} onClick={toggleMenu} />
    </>
  );
});
