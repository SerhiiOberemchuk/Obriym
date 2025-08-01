import { $, useOnWindow, useSignal } from "@qwik.dev/core";

export const useResponsive = () => {
  const isMobile = useSignal(false);
  const isTablet = useSignal(false);
  const isDesctop = useSignal(false);
  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      // const width = window.innerWidth;
      isMobile.value = window.matchMedia("(max-width:768px)").matches;
      isDesctop.value = window.matchMedia("(min-width:1440px)").matches;
      isTablet.value = !isMobile.value && !isDesctop.value;
    }),
  );

  useOnWindow(
    "resize",
    $(() => {
      const matchMobile = window.matchMedia("(max-width:768px)");
      const matchDesctop = window.matchMedia("(min-width:1440px)");

      isMobile.value = matchMobile.matches;
      isDesctop.value = matchDesctop.matches;
      isTablet.value = !matchMobile.matches && !matchDesctop.matches;
    }),
  );
  return { isMobile: isMobile.value, isTablet: isTablet.value, isDesctop: isDesctop.value };
};
