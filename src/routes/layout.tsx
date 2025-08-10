import { $, component$, Slot, useContextProvider, useSignal } from "@qwik.dev/core";
import { ModalLetsWork } from "~/components/lets-work/LetsWork";
import { MobileMenuContext } from "~/components/mobile-menu/MobileMenu";

export default component$(() => {
  const isMenuOpen = useSignal<boolean>(false);
  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });
  useContextProvider(MobileMenuContext, { isOpen: isMenuOpen, toggleMenu });
  useContextProvider(ModalLetsWork, useSignal<boolean>(false));
  return <Slot />;
});
