import { component$, createContextId, QRL, Signal, useContext } from "@qwik.dev/core";
import "./mb-styles.css";
import MenuWindow from "./menu-window/MenuWindow";

export const MobileMenuContext = createContextId<{
  isOpen: Signal<boolean>;
  toggleMenu: QRL<() => void>;
}>("mobile-menu-context");

export default component$(() => {
  const { toggleMenu, isOpen } = useContext(MobileMenuContext);
  return (
    <>
      <button
        onClick$={toggleMenu}
        class="menu_btn"
        aria-controls="main-navigation"
        aria-expanded={isOpen.value ? "true" : "false"}
        aria-label="Button to open mobile menu"
      >
        <span class="btn_body title">Menu</span>
        <span class="mb_burger">
          <span />
          <span />
          <span />
        </span>
      </button>
      <MenuWindow />
    </>
  );
});
