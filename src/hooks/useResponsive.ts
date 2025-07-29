import { $, useOnDocument, useSignal } from "@qwik.dev/core";

export const useResponsive = () => {
  const isMobile = useSignal(false);
  const isTablet = useSignal(false);
  const isDesctop = useSignal(false);
  const update = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      isMobile.value = width <= 768;
      isDesctop.value = width >= 1440;
      isTablet.value = !isMobile.value && !isDesctop.value;
    }
  };

  update();
  useOnDocument(
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
  return { isMobile: isMobile.value, isTablet: isTablet.value, isDesctop: isDesctop.value };
};
