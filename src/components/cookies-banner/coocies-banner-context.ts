import { createContextId, QRL, useSignal } from "@qwik.dev/core";

export type CookiesBannerContextType = {
  isVisible: ReturnType<typeof useSignal<boolean>>;
  openBanner: QRL<() => void>;
};

export const CookiesBannerContext = createContextId<CookiesBannerContextType>("cookies.context");
