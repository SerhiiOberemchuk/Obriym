import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { useSpeakContext } from "qwik-speak";
import { Popover } from "@qwik-ui/headless";

import styles from "./popover_styles.css?inline";
import { ALERT_MESSAGE } from "~/const/form-const";

export enum PopoverId {
  contactFormSuccess = "contact-form-success",
  contactFormError = "contact-form-error",
}

export default component$(() => {
  const { translation } = useSpeakContext();
  useStylesScoped$(styles);
  const anchor = useSignal<HTMLElement | undefined>(undefined);
  const IconSuccess = ALERT_MESSAGE["success"].icon;
  const IconError = ALERT_MESSAGE["failed"].icon;
  const alert = translation?.alert ?? ALERT_MESSAGE;

  return (
    <div ref={anchor} aria-hidden="true" class="popover_anchor">
      <Popover.Root id={PopoverId.contactFormSuccess} bind:anchor={anchor} floating="bottom-start">
        <Popover.Panel class="popover-transition">
          <div
            role={"status"}
            aria-live={"polite"}
            aria-atomic="true"
            data-type={"success"}
            class="popover-content popover_text "
          >
            <IconSuccess />

            <p>{alert.success.title}</p>

            <p>{alert.success.message}</p>
          </div>
        </Popover.Panel>
      </Popover.Root>
      <Popover.Root id={PopoverId.contactFormError} bind:anchor={anchor} floating="bottom-start">
        <Popover.Panel class="popover-transition">
          <div
            role={"alert"}
            aria-live={"assertive"}
            aria-atomic="true"
            data-type={"failed"}
            class="popover-content popover_text "
          >
            <IconError />

            <p>{alert.failed.title}</p>

            <p>{alert.failed.message}</p>
          </div>
        </Popover.Panel>
      </Popover.Root>
    </div>
  );
});
