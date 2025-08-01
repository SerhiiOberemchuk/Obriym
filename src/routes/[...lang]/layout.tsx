import {
  component$,
  Slot,
  useSignal,
  useContextProvider,
  type Signal,
  createContextId,
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
export const ViewportWidthContext = createContextId<Signal<number>>("viewport.width");

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
  const viewportWidth = useSignal(0);

  const updateViewport = $(() => {
    const width = window.innerWidth;
    viewportWidth.value = width;
    if (width >= 1440) viewportCategory.value = "desktop";
    else if (width >= 768) viewportCategory.value = "tablet";
    else viewportCategory.value = "mobile";
  });
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    updateViewport();
  });
  // useOnWindow("resize", updateViewport);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    updateViewport();
    window.addEventListener("resize", updateViewport);
    cleanup(() => window.removeEventListener("resize", updateViewport));
  });

  useContextProvider(ViewportContext, viewportCategory);
  useContextProvider(ViewportWidthContext, viewportWidth);
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
