import { Popover } from "@qwik-ui/headless";
import { component$ } from "@qwik.dev/core";
import { useLocation } from "@qwik.dev/router";
import { useSpeakLocale, useSpeakConfig, useDisplayName, localizePath } from "qwik-speak";
import "./cl-styles.css";
import IconSelected from "~/assets/icons/icon_selected.svg?h=24&w=24&jsx";
import IconArrow from "~/assets/icons/icon_arrow_down.svg?h=24&w=24&jsx";

export const ChangeLocale = component$(() => {
  const pathname = useLocation().url.pathname;

  const locale = useSpeakLocale();
  const config = useSpeakConfig();
  const dn = useDisplayName();

  const getPath = localizePath();

  return (
    <Popover.Root
      floating="top"
      gutter={8}
      animationFrame={false}
      id="change-locale-popover"
      class="change_locale_popover"
    >
      <Popover.Trigger class="cl_btn btn_body cl_btn">
        <span>{dn(locale.lang.slice(0, 2), { type: "language" })}</span>
        <IconArrow />
      </Popover.Trigger>
      <Popover.Panel class="cl_popover_transition">
        <ul class="cl_list">
          {config.supportedLocales.map(value => (
            <li class="cl_item" key={value.lang}>
              <a
                data-active={value.lang === locale.lang ? "true" : "false"}
                class="cl_link"
                href={getPath(pathname, value.lang)}
              >
                <span>{dn(value.lang.slice(0, 2), { type: "language" })}</span>
                {value.lang === locale.lang && <IconSelected />}
              </a>
            </li>
          ))}
        </ul>
      </Popover.Panel>
    </Popover.Root>
  );
});
