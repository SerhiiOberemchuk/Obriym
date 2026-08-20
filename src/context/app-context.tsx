"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ViewportCategory = "mobile" | "tablet" | "desktop" | null;

type AppContextValue = {
  /** null until the first client measurement, matching the Qwik signal's initial state. */
  viewport: ViewportCategory;
  viewportWidth: number;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isLetsWorkOpen: boolean;
  setLetsWorkOpen: (value: boolean) => void;
  isCookiesBannerVisible: boolean;
  openCookiesBanner: () => void;
  setCookiesBannerVisible: (value: boolean) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside <AppProvider>");
  }
  return context;
};

/** Convenience hooks that mirror the old context ids one-to-one. */
export const useViewport = () => useAppContext().viewport;
export const useViewportWidth = () => useAppContext().viewportWidth;
export const useMobileMenu = () => {
  const { isMenuOpen, toggleMenu } = useAppContext();
  return { isMenuOpen, toggleMenu };
};
export const useLetsWorkModal = () => {
  const { isLetsWorkOpen, setLetsWorkOpen } = useAppContext();
  return { isLetsWorkOpen, setLetsWorkOpen };
};
export const useCookiesBanner = () => {
  const { isCookiesBannerVisible, openCookiesBanner, setCookiesBannerVisible } = useAppContext();
  return { isCookiesBannerVisible, openCookiesBanner, setCookiesBannerVisible };
};

const categorize = (width: number): Exclude<ViewportCategory, null> => {
  if (width >= 1440) return "desktop";
  if (width >= 768) return "tablet";
  return "mobile";
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [viewport, setViewport] = useState<ViewportCategory>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLetsWorkOpen, setLetsWorkOpen] = useState(false);
  const [isCookiesBannerVisible, setCookiesBannerVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setViewport(categorize(width));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen(open => !open), []);
  const openCookiesBanner = useCallback(() => setCookiesBannerVisible(true), []);

  const value = useMemo<AppContextValue>(
    () => ({
      viewport,
      viewportWidth,
      isMenuOpen,
      toggleMenu,
      isLetsWorkOpen,
      setLetsWorkOpen,
      isCookiesBannerVisible,
      openCookiesBanner,
      setCookiesBannerVisible,
    }),
    [
      viewport,
      viewportWidth,
      isMenuOpen,
      toggleMenu,
      isLetsWorkOpen,
      isCookiesBannerVisible,
      openCookiesBanner,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
