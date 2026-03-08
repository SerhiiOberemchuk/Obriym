import { createContextId, QRL, useSignal } from "@builder.io/qwik";

export type CookiesBannerContextType = {
  isVisible: ReturnType<typeof useSignal<boolean>>;
  openBanner: QRL<() => void>;
};

export const CookiesBannerContext = createContextId<CookiesBannerContextType>("cookies.context");
