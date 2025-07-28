import {
  component$,
  Slot,
  useSignal,
  useContextProvider,
  type Signal,
  createContextId,
  useOnWindow,
  useVisibleTask$,
  $,
} from "@qwik.dev/core";
import { routeLoader$ } from "@qwik.dev/router";
import NavList from "~/components/common/nav-list/NavList";
import Footer from "~/components/layout/footer/Footer";
import Header from "~/components/layout/header/Header";
import LetsWork from "~/components/lets-work/LetsWork";
import MobileMenu from "~/components/mobile-menu/MobileMenu";

export const ViewportContext =
  createContextId<Signal<"mobile" | "tablet" | "desktop">>("app.viewport");

export const useContactFormLoader = routeLoader$(() => ({
  services: [],
  budget: "",
  name: "",
  email: "",
  message: "",
}));
export default component$(() => {
  // const viewportCategory = useSignal<"mobile" | "tablet" | "desktop">("desktop");
  const viewportCategory = useSignal<"mobile" | "tablet" | "desktop" | null>(null);

  const updateViewport = $(() => {
    const width = window.innerWidth;
    if (width >= 1440) viewportCategory.value = "desktop";
    else if (width >= 768) viewportCategory.value = "tablet";
    else viewportCategory.value = "mobile";
  });
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    updateViewport();
  });
  useOnWindow("resize", updateViewport);
  useContextProvider(ViewportContext, viewportCategory);
  return (
    <>
      <Header />
      <LetsWork place="header" />
      <MobileMenu />
      <NavList place="header" />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
