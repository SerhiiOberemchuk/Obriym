export interface SitemapEntry {
  loc: string;
  priority: number;
  lastmod?: string;
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export function createSitemap(entries: SitemapEntry[]) {
  const baseUrl = "https://obriym.com";
  const today = new Date().toISOString().slice(0, 10);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.map(
  entry => `
    <url>
        <loc>${baseUrl}${entry.loc.startsWith("/") ? "" : "/"}${entry.loc}</loc>
        ${(entry.alternates ?? [])
          .map(
            alt =>
              `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${baseUrl}${alt.href.startsWith("/") ? "" : "/"}${alt.href}" />`,
          )
          .join("\n        ")}
        <lastmod>${entry.lastmod ?? today}</lastmod>
        <priority>${entry.priority}</priority>
    </url>`,
).join("")}
</urlset>`.trim();
}
