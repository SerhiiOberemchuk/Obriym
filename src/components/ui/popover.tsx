"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type RefObject,
} from "react";

/**
 * Minimal replacement for the `@qwik-ui/headless` Popover, built on the native
 * Popover API so `.popover-transition:popover-open` and the `@starting-style`
 * rules in `custom.css` keep working untouched.
 */

const getPopover = (id: string) =>
  typeof document === "undefined" ? null : (document.getElementById(id) as HTMLElement | null);

export const usePopover = (id: string) => {
  const showPopover = useCallback(() => {
    const element = getPopover(id);
    if (element && !element.matches(":popover-open")) element.showPopover();
  }, [id]);

  const hidePopover = useCallback(() => {
    const element = getPopover(id);
    if (element && element.matches(":popover-open")) element.hidePopover();
  }, [id]);

  return { showPopover, hidePopover };
};

type PopoverPanelProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  /** Element the panel is positioned against, mirroring qwik-ui's `bind:anchor`. */
  anchorRef?: RefObject<HTMLElement | null>;
  /** Auto-hide delay in ms; the default `0` keeps the panel open until the caller hides it. */
  autoHideMs?: number;
};

export function PopoverPanel({
  id,
  anchorRef,
  autoHideMs = 0,
  children,
  ...rest
}: PopoverPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Position the panel under the anchor the way floating-ui did before.
    const position = () => {
      const anchor = anchorRef?.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      panel.style.position = "fixed";
      panel.style.margin = "0";
      panel.style.top = `${rect.bottom}px`;
      panel.style.left = "auto";
      panel.style.right = `${Math.max(0, window.innerWidth - rect.right)}px`;
    };

    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const onToggle = (event: Event) => {
      if ((event as ToggleEvent).newState !== "open") {
        if (hideTimer) clearTimeout(hideTimer);
        return;
      }
      position();
      if (autoHideMs > 0) {
        hideTimer = setTimeout(() => {
          if (panel.matches(":popover-open")) panel.hidePopover();
        }, autoHideMs);
      }
    };

    panel.addEventListener("toggle", onToggle);
    window.addEventListener("resize", position);

    return () => {
      panel.removeEventListener("toggle", onToggle);
      window.removeEventListener("resize", position);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [anchorRef, autoHideMs]);

  return (
    <div ref={panelRef} id={id} popover="manual" {...rest}>
      {children}
    </div>
  );
}
