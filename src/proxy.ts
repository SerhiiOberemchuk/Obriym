import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip Next internals, the API routes and anything with a file extension
  // (robots.txt, sitemap.xml, images, fonts...).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
