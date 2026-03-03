export interface SitemapEntry {
  loc: string;
  priority: number;
  lastmod?: string;
}

export function createSitemap(entries: SitemapEntry[]) {
  const baseUrl = "https://obriym.com";

  return `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries
  .map(
    entry => `
    <url>
        <loc>${baseUrl}${entry.loc}</loc>
        ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
        <priority>${entry.priority}</priority>
    </url>`,
  )
  .join(" ")}
</urlset>`.trim();
}
