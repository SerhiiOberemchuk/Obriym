import type { Href } from "~/lib/seo";
import { Pages } from "./list-pages.type";

/**
 * A navigation entry is either an internal route, which goes through the
 * locale-aware `Link`, or a document anchor, which the navigation APIs do not
 * address and which stays a plain link.
 */
export type NavListItem = { link: Pages; label: string } & (
  | { kind: "route"; href: Href }
  | { kind: "anchor"; href: string }
);
