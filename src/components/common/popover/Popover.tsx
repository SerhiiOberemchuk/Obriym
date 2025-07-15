import { component$, useStylesScoped$ } from "@qwik.dev/core";
import type { Signal } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import { Popover } from "@qwik-ui/headless";

import styles from "./popover_styles.css?inline";
import { ALERT_MESSAGE } from "~/const/form-const";

type PopoverProps = {
  popoverId: string;
  type: keyof typeof ALERT_MESSAGE;
  anchor?: Signal<HTMLElement | undefined>;
};
export default component$(({ popoverId, type, anchor }: PopoverProps) => {
  const t = inlineTranslate();
  useStylesScoped$(styles);
  const Icon = ALERT_MESSAGE[type].icon;
  const isError = type === "failed";
  const ariaLive = isError ? "assertive" : "polite";
  const role = isError ? "alert" : "status";
  return (
    // bind:anchor={anchor} gutter={40} floating="top"
    <Popover.Root id={popoverId} bind:anchor={anchor} floating="top" gutter={-40}>
      <Popover.Panel class="popover-transition  " data-type={type}>
        <div
          class="popover-content popover_text "
          data-type={type}
          role={role}
          aria-live={ariaLive}
        >
          <Icon />
          {/* <p>{ALERT_MESSAGE[type].title}</p>

          <p>{ALERT_MESSAGE[type].message}</p> */}

          <p>{t(`alert.${type}.title@@ALERT_MESSAGE[type].title`)}</p>
          <p>{t(`alert.${type}.message@@ALERT_MESSAGE[type].message`)}</p>
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});
