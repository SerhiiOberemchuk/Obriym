import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import NotFoundPage from "~/components/pages/NotFoundPage";
import { buildSeoMeta } from "~/utils/seo";

// Unknown URLs are rewritten here by src/routes/plugin.ts; direct visits get
// the same 404 status so this path never becomes an indexable duplicate.
export const onGet: RequestHandler = ({ status, cacheControl }) => {
  cacheControl({ noStore: true, noCache: true });
  status(404);
};

export default component$(() => {
  return <NotFoundPage />;
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.notFound.title@@Page not found | Obriym");
  const description = t(
    "app.head.notFound.description@@The page you are looking for doesn't exist or has been moved.",
  );

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname, noindex: true }),
  };
};
