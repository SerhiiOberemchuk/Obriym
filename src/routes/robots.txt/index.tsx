import type { RequestHandler } from "@builder.io/qwik-city";

const ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: https://obriym.com/sitemap.xml`;

export const onGet: RequestHandler = ({ headers, send, cacheControl }) => {
  cacheControl({
    public: true,
    maxAge: 60 * 60 * 24,
    sMaxAge: 60 * 60 * 24,
    staleWhileRevalidate: 60 * 60,
  });

  headers.set("Content-Type", "text/plain; charset=utf-8");
  send(200, ROBOTS_TXT);
};
