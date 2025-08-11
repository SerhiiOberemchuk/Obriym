import { component$, createContextId, useContext, useStylesScoped$ } from "@qwik.dev/core";
import type { Signal } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import { Popover } from "@qwik-ui/headless";

import styles from "./popover_styles.css?inline";
import { ALERT_MESSAGE } from "~/const/form-const";

type PopoverProps = {
  popoverId: string;
  typePopover: keyof typeof ALERT_MESSAGE;
  anchor?: Signal<HTMLElement | undefined>;
};
export const PopoverContex = createContextId<{
  popoverId: Signal<string>;
  typePopover: Signal<PopoverProps["typePopover"]>;
  anchor: Signal<HTMLElement | undefined>;
}>("popover.anchor");

export default component$(() => {
  const t = inlineTranslate();
  const { popoverId, typePopover, anchor } = useContext(PopoverContex);
  useStylesScoped$(styles);

  const Icon = ALERT_MESSAGE[typePopover.value].icon;
  const isError = typePopover.value === "failed";
  const ariaLive = isError ? "assertive" : "polite";
  const role = isError ? "alert" : "status";
  return (
    // bind:anchor={anchor} gutter={40} floating="top"
    <Popover.Root
      id={popoverId.value}
      bind:anchor={anchor}
      manual
      floating="bottom-start"
      gutter={8}
      // floating="top"
      // gutter={-40}
    >
      <Popover.Panel class="popover-transition">
        <div
          role={role}
          aria-live={ariaLive}
          aria-atomic="true"
          data-type={typePopover.value}
          class="popover-content popover_text "
        >
          <Icon />
          {/* <p>{ALERT_MESSAGE[type].title}</p>

          <p>{ALERT_MESSAGE[type].message}</p> */}

          <p>{t(`alert.${typePopover.value}.title@@ALERT_MESSAGE[type].title`)}</p>
          <p>{t(`alert.${typePopover.value}.message@@ALERT_MESSAGE[type].message`)}</p>
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});
