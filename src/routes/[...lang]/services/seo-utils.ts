export const SITE = "https://obriym.com";
export const OG_IMAGE = `${SITE}/og-image.jpg`;

export const stripLocalePrefix = (pathname: string) =>
  pathname.replace(/^\/(uk-UA|en-EU|it-IT)(?=\/|$)/, "");

export const ensureTrailingSlash = (path: string) => {
  if (path === "") return "/";
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
};

export const pathWithoutLocaleFromPathname = (pathname: string) => {
  const stripped = stripLocalePrefix(pathname);
  const withLeadingSlash = stripped.startsWith("/") ? stripped : `/${stripped}`;
  return ensureTrailingSlash(withLeadingSlash);
};

export const canonicalFromPathname = (pathname: string) =>
  `${SITE}${pathWithoutLocaleFromPathname(pathname)}`;

export const ogLocaleFromPathname = (pathname: string) => {
  if (pathname.startsWith("/uk-UA")) return "uk_UA";
  if (pathname.startsWith("/it-IT")) return "it_IT";
  return "en_GB";
};

export const hreflangLinksForPath = (pathWithoutLocale: string) => {
  const normalized = ensureTrailingSlash(pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`);

  return [
    { rel: "alternate", hreflang: "en-EU", href: `${SITE}${normalized}` },
    { rel: "alternate", hreflang: "uk-UA", href: `${SITE}/uk-UA${normalized}` },
    { rel: "alternate", hreflang: "it-IT", href: `${SITE}/it-IT${normalized}` },
    { rel: "alternate", hreflang: "x-default", href: `${SITE}${normalized}` },
  ];
};
