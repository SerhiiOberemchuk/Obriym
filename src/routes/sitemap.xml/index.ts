import type { RequestHandler } from "@builder.io/qwik-city";
import { buildSitemapXml } from "~/utils/sitemap";

export const onGet: RequestHandler = async ({ cacheControl, headers, send }) => {
  cacheControl({
    public: true,
    maxAge: 60 * 60,
    sMaxAge: 60 * 60,
    staleWhileRevalidate: 60,
  });

  headers.set("Content-Type", "application/xml; charset=utf-8");
  send(200, await buildSitemapXml());
};
