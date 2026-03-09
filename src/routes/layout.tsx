import { $, component$, Slot, useContextProvider, useSignal } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { localizePath } from "qwik-speak";
import { ModalLetsWork } from "~/components/lets-work/LetsWork";
import { MobileMenuContext } from "~/components/mobile-menu/MobileMenu";
export const onRequest: RequestHandler = ({ locale, error, redirect }) => {
  // E.g. 404 error page
  // if (!locale()) throw error(404, "Page not found for requested locale");
  console.error(error);
  // E.g. Redirect
  if (!locale()) {
    const getPath = localizePath();
    throw redirect(302, getPath("/", "en-EU")); // Let the server know the language to use
  }
};
export default component$(() => {
  const isMenuOpen = useSignal<boolean>(false);
  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  useContextProvider(MobileMenuContext, { isOpen: isMenuOpen, toggleMenu });
  useContextProvider(ModalLetsWork, useSignal<boolean>(false));

  return <Slot />;
});
