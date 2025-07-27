import { $, useOnWindow, useSignal } from "@qwik.dev/core";

export const useResponsive = () => {
  const isMobile = useSignal(false);
  const isTablet = useSignal(false);
  const isDesctop = useSignal(false);
  useOnWindow(
    "load",
    $(() => {
      const matchMobile = window.matchMedia("(max-width:768px)");
      const matchDesctop = window.matchMedia("(min-width:1440px)");

      const handleResize = () => {
        isMobile.value = matchMobile.matches;
        isDesctop.value = matchDesctop.matches;
        isTablet.value = !matchMobile.matches && !matchDesctop.matches;
      };
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }),
  );
  return { isMobile, isTablet, isDesctop };
};
