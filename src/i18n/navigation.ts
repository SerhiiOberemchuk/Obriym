import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for `next/link` and the router hooks. `Link`
 * takes the unprefixed path (e.g. `/team/`) and renders the localized href,
 * which is what `localizePath()` did under qwik-speak.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
