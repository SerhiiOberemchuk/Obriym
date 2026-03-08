export interface SitemapEntry {
  loc: string;
  priority: number;
  lastmod?: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export function createSitemap(entries: SitemapEntry[]) {
  return `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries
  .map(
    entry => `
    <url>
        <loc>${entry.loc}</loc>
        ${entry.alternates
          ?.map(
            alternate =>
              `<xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`,
          )
          .join("\n        ") ?? ""}
        ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
        ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ""}
        <priority>${entry.priority}</priority>
    </url>`,
  )
  .join(" ")}
</urlset>`.trim();
}
