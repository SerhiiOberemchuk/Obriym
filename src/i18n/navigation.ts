import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
import type { Locale } from "./routing";

/**
 * Locale-aware replacements for `next/link` and the router hooks. `Link` takes
 * the internal path (e.g. `/web-development/`) and renders the localized href
 * declared in `routing.pathnames`.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

/**
 * Href of a section on the home page, e.g. `/it-IT/#contact`. The navigation
 * APIs address routes rather than fragments, so anchors are composed from the
 * localized home path.
 */
export const homeSectionHref = (hash: string, locale: Locale) =>
  `${getPathname({ href: "/", locale })}#${hash}`;
