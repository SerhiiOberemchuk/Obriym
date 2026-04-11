import { $, component$, Slot, useContextProvider, useSignal } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { ModalLetsWork } from "~/components/lets-work/LetsWork";
import { MobileMenuContext } from "~/components/mobile-menu/MobileMenu";

const DEFAULT_LOCALE_PREFIX_PATTERN = /^\/en-EU(?=\/|$)/;

export const onRequest: RequestHandler = ({ error, redirect, url }) => {
  // E.g. 404 error page
  // if (!locale()) throw error(404, "Page not found for requested locale");
  console.error(error);

  // Keep the default locale unprefixed to match qwik-speak routing.
  if (DEFAULT_LOCALE_PREFIX_PATTERN.test(url.pathname)) {
    const canonicalPath = url.pathname.replace(DEFAULT_LOCALE_PREFIX_PATTERN, "") || "/";
    const search = url.search || "";
    throw redirect(302, `${canonicalPath}${search}`);
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
