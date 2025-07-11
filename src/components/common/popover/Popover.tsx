import { component$, useStylesScoped$ } from "@qwik.dev/core";
import type { Signal } from "@qwik.dev/core";
import { Popover } from "@qwik-ui/headless";
import { ALERT_MESSAGE } from "~/const/form-const";
import styles from "./popover_styles.css?inline";

type PopoverProps = {
  popoverId: string;
  type: keyof typeof ALERT_MESSAGE;
  anchor: Signal<HTMLElement | undefined>;
};
export default component$(({ popoverId, type, anchor }: PopoverProps) => {
  useStylesScoped$(styles);
  const Icon = ALERT_MESSAGE[type].icon;
  return (
    <Popover.Root id={popoverId} bind:anchor={anchor}>
      <Popover.Panel class="popover-transition">
        <div class="popover-content" data-type={type}>
          <Icon />
          <p class="btn_body ">{ALERT_MESSAGE[type].title}</p>

          <p class="btn_body ">{ALERT_MESSAGE[type].message}</p>
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});
