import { component$, useSignal } from "@qwik.dev/core";
import { useLocation } from "@qwik.dev/router";
import {
  useSpeakLocale,
  useSpeakConfig,
  useDisplayName,
  localizePath,
  inlineTranslate,
} from "qwik-speak";
import "./cl-styles.css";
import IconSelected from "~/assets/icons/icon_selected.svg?h=24&w=24&jsx";
import IconArrow from "~/assets/icons/icon_arrow_down.svg?h=24&w=24&jsx";
import { Popover } from "@qwik-ui/headless";

export const ChangeLocale = component$(() => {
  const isOpen = useSignal<boolean>(false);
  const t = inlineTranslate();
  const pathname = useLocation().url.pathname;
  const locale = useSpeakLocale();
  const config = useSpeakConfig();
  const dn = useDisplayName();
  const getPath = localizePath();

  return (
    <Popover.Root class="cl_popover" gutter={8}>
      <Popover.Trigger
        type="button"
        class="btn_body cl_btn"
        aria-label={t("app.header.buttonChLang@@Button to change locale")}
        onClick$={() => (isOpen.value = !isOpen.value)}
        data-open={isOpen.value ? "true" : "false"}
        id="language-switcher"
        aria-haspopup="listbox"
        aria-expanded={isOpen.value ? "true" : "false"}
        aria-controls="language-list"
      >
        <span class="cl_btn_m">{dn(locale.lang.slice(0, 2), { type: "language" })}</span>
        <span class="cl_btn_t">
          {dn(locale.lang.slice(0, 2), { type: "language" }).slice(0, 3)}
        </span>
        <IconArrow />
      </Popover.Trigger>
      <Popover.Panel class="cl_panel" role="listbox">
        <ul
          class="cl_list "
          id="language-list"
          role="listbox"
          aria-labelledby="language-switcher"
          hidden={!isOpen.value}
          // popover="auto"
          popover-open={isOpen.value}
          aria-label="Language selection"
        >
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
