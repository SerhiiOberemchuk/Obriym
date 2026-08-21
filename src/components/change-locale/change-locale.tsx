"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "~/i18n/navigation";
import { locales, type Locale } from "~/i18n/routing";
import styles from "./cl-styles.module.css";
import IconSelected from "~/assets/icons/icon_selected.svg";
import IconArrow from "~/assets/icons/icon_arrow_down.svg";

const LOCALE_LABEL: Record<Locale, string> = {
  "uk-UA": "Українська",
  "it-IT": "Italiano",
  "en-EU": "English",
};

const LOCALE_SHORT: Record<Locale, string> = {
  "uk-UA": "Ukr",
  "it-IT": "It",
  "en-EU": "Eng",
};

/** Localized language name, as qwik-speak's `useDisplayName()` rendered it. */
const displayName = (locale: Locale) => {
  const language = locale.slice(0, 2);
  try {
    return new Intl.DisplayNames([locale], { type: "language" }).of(language) ?? language;
  } catch {
    return language;
  }
};

export function ChangeLocale({ place }: { place: "mob-menu" | "header" }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale() as Locale;
  // Unprefixed path, so the same page can be rebuilt under any locale.
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.cl_popover}`)) setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  return (
    <div className={styles.cl_popover} data-place={place}>
      <button
        type="button"
        className={`btn_body ${styles.cl_btn}`}
        aria-label={t("app.header.buttonChLang")}
        onClick={() => setIsOpen(open => !open)}
        data-open={isOpen ? "true" : "false"}
        id="language-switcher"
        aria-haspopup="menu"
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="language-list"
      >
        <span className={styles.cl_btn_m}>{displayName(locale)}</span>
        <span className={styles.cl_btn_t}>{LOCALE_SHORT[locale]}</span>
        <IconArrow width={24} height={24} />
      </button>

      <ul
        className={`${styles.cl_list} ${styles.cl_panel}`}
        id="language-list"
        aria-labelledby="language-switcher"
        data-open={isOpen ? "true" : "false"}
        aria-label="Language selection"
        role="menu"
      >
        {locales.map(value => (
          <li className={styles.cl_item} key={value} role="none">
            {/* A plain anchor forces a full document load, so the server renders
                the new locale instead of the client swapping messages. */}
            <a
              data-active={value === locale ? "true" : "false"}
              className={styles.cl_link}
              href={getPathname({
                // @ts-expect-error -- TypeScript validates that only known `params`
                // are used with a given `pathname`. The two always match for the
                // current route, so the runtime check can be skipped.
                href: { pathname, params },
                locale: value,
              })}
              role="menuitem"
              aria-current={value === locale ? "true" : undefined}
            >
              <span>{LOCALE_LABEL[value]}</span>
              {value === locale && <IconSelected width={24} height={24} />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
