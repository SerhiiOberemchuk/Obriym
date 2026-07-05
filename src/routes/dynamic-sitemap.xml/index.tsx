import type { RequestHandler } from "@builder.io/qwik-city";

// Legacy sitemap URL (was declared in robots.txt and may be registered in
// Search Console); the sitemap now lives at the conventional /sitemap.xml.
export const onGet: RequestHandler = ({ redirect }) => {
  throw redirect(301, "/sitemap.xml");
};
