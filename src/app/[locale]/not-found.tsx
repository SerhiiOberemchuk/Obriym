import type { Metadata } from "next";
import NotFoundPage from "~/components/pages/NotFoundPage";

/**
 * Rendered for any unmatched path inside a locale segment. Next serves it with
 * a real 404 status, which is what the old `plugin.ts` rewrite guaranteed.
 */
export const metadata: Metadata = {
  title: "Page not found | Obriym",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage />;
}
