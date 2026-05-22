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
  const toAbsoluteUrl = (path: string) => `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  const escapeXml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.map(
  entry => `
    <url>
        <loc>${escapeXml(toAbsoluteUrl(entry.loc))}</loc>
        ${(entry.alternates ?? [])
          .map(
            alt =>
              `<xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(toAbsoluteUrl(alt.href))}" />`,
          )
          .join("\n        ")}
        ${entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ""}
        <priority>${entry.priority}</priority>
    </url>`,
).join("")}
</urlset>`.trim();
}
