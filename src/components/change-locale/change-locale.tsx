import { $, component$, useOnDocument, useSignal } from "@qwik.dev/core";
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

export const ChangeLocale = component$(({ place }: { place: "mob-menu" | "header" }) => {
  const isOpen = useSignal<boolean>(false);
  const t = inlineTranslate();
  const pathname = useLocation().url.pathname;
  const locale = useSpeakLocale();
  const config = useSpeakConfig();
  const dn = useDisplayName();
  const getPath = localizePath();

  useOnDocument(
    "keydown",
    $((e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen.value) {
        isOpen.value = false;
      }
    }),
  );

  useOnDocument(
    "click",
    $((e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen.value && !target.closest(".cl_popover")) {
        isOpen.value = false;
      }
    }),
  );
  return (
    <div class="cl_popover" data-place={place}>
      <button
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
      </button>

      <ul
        class="cl_list cl_panel"
        id="language-list"
        aria-labelledby="language-switcher"
        data-open={isOpen.value ? "true" : "false"}
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
    </div>
  );
});
