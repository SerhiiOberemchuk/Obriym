import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const SITE = "https://obriym.com";
const STATIC_BASE_ROUTES = ["/", "/team", "/faq", "/privacy-policy", "/cookies-policy", "/projects"];
const SEO_LOCALES = [
  { hreflang: "en", prefix: "" },
  { hreflang: "uk-UA", prefix: "/uk-UA" },
  { hreflang: "it-IT", prefix: "/it-IT" },
];

const ROUTE_PRIORITY = {
  "/": 1,
  "/team": 0.8,
  "/faq": 0.7,
  "/projects": 0.85,
  "/privacy-policy": 0.3,
  "/cookies-policy": 0.3,
};

const ROUTE_CHANGEFREQ = {
  "/": "weekly",
  "/team": "monthly",
  "/faq": "monthly",
  "/projects": "weekly",
  "/privacy-policy": "yearly",
  "/cookies-policy": "yearly",
};

const ROUTE_LASTMOD = {
  "/privacy-policy": "2025-07-21",
  "/cookies-policy": "2025-07-21",
};

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sitemapOutputPath = resolve(rootDir, "public", "sitemap.xml");
const envFiles = [resolve(rootDir, ".env.local"), resolve(rootDir, ".env")];

const normalizePath = pathname => (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));
const getCanonicalUrl = pathname => `${SITE}${normalizePath(pathname)}`;
const getLocalizedPath = (pathname, prefix) => {
  const normalizedPath = normalizePath(pathname);
  if (normalizedPath === "/") return prefix || "/";
  return `${prefix}${normalizedPath}`.replace(/\/{2,}/g, "/");
};

const createSitemap = entries => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    entry => `
  <url>
    <loc>${entry.loc}</loc>
    ${entry.alternates
      .map(
        alternate =>
          `<xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`,
      )
      .join("\n    ")}
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ""}
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`.trim();

const loadEnvFile = async filePath => {
  try {
    const content = await readFile(filePath, "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eqIndex = line.indexOf("=");
      if (eqIndex === -1) continue;
      const key = line.slice(0, eqIndex).trim();
      const value = line.slice(eqIndex + 1).trim().replace(/^['"]|['"]$/g, "");
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing env files.
  }
};

const buildAlternates = basePath => [
  ...SEO_LOCALES.map(locale => ({
    hreflang: locale.hreflang,
    href: getCanonicalUrl(getLocalizedPath(basePath, locale.prefix)),
  })),
  {
    hreflang: "x-default",
    href: getCanonicalUrl(getLocalizedPath(basePath, "")),
  },
];

const fetchProjects = async () => {
  const apiBase = process.env.PUBLIC_URL_PROJECTS;
  if (!apiBase) {
    console.warn("[sitemap:build] PUBLIC_URL_PROJECTS is not configured. Skipping dynamic project URLs.");
    return [];
  }

  const response = await fetch(`${apiBase}/api/projects`, {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Projects API request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload?.data) ? payload.data : [];
};

for (const envFile of envFiles) {
  await loadEnvFile(envFile);
}

const staticEntries = STATIC_BASE_ROUTES.flatMap(basePath =>
  SEO_LOCALES.map(({ prefix }) => ({
    loc: getCanonicalUrl(getLocalizedPath(basePath, prefix)),
    priority: ROUTE_PRIORITY[basePath] ?? 0.6,
    changefreq: ROUTE_CHANGEFREQ[basePath],
    lastmod: ROUTE_LASTMOD[basePath],
    alternates: buildAlternates(basePath),
  })),
);

let projectEntries = [];

try {
  const projects = await fetchProjects();
  console.info("[sitemap:build] Projects fetched", {
    count: projects.length,
    slugs: projects.slice(0, 20).map(project => project.slug),
  });

  projectEntries = projects.flatMap(project => {
    const basePath = `/projects/${project.slug}`;
    return SEO_LOCALES.map(({ prefix }) => ({
      loc: getCanonicalUrl(getLocalizedPath(basePath, prefix)),
      priority: 0.75,
      changefreq: "monthly",
      lastmod: project.updated_at ? new Date(project.updated_at).toISOString().split("T")[0] : undefined,
      alternates: buildAlternates(basePath),
    }));
  });
} catch (error) {
  console.error("[sitemap:build] Failed to fetch projects for sitemap generation", error);
}

const entries = [...staticEntries, ...projectEntries];

if (entries.length === 0) {
  console.error("[sitemap:build] Refusing to write an empty sitemap.");
} else {
  console.info("[sitemap:build] Final entries", {
    staticEntries: staticEntries.length,
    projectEntries: projectEntries.length,
    totalEntries: entries.length,
    output: sitemapOutputPath,
  });
}

const xml = createSitemap(entries);
await mkdir(dirname(sitemapOutputPath), { recursive: true });
await writeFile(sitemapOutputPath, xml, "utf8");
console.info("[sitemap:build] sitemap.xml written", {
  bytes: Buffer.byteLength(xml, "utf8"),
});
