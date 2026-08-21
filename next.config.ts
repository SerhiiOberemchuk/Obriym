import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // The Qwik site was served with trailing slashes; keeping them means every
  // indexed URL stays byte-identical after the migration.
  trailingSlash: true,
  reactStrictMode: true,
  // Next generates AGENTS.md/CLAUDE.md by default; this repo keeps its own docs.
  agentRules: false,

  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              // SVGO drops `viewBox` by default, which stops the icon from
              // scaling and crops it as soon as CSS sets a different size.
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: { overrides: { removeViewBox: false } },
                  },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },

  async redirects() {
    return [
      {
        // The default locale is served without a prefix.
        source: "/en-EU/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        // Legacy sitemap URL registered in Search Console.
        source: "/dynamic-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },

      // The SEO service was retired. Its closest equivalent is web development,
      // which still covers the technical side that page described.
      { source: "/seo-optimization", destination: "/web-development/", permanent: true },
      {
        source: "/it-IT/seo-optimization",
        destination: "/it-IT/sviluppo-siti-web/",
        permanent: true,
      },
      {
        source: "/uk-UA/seo-optimization",
        destination: "/uk-UA/rozrobka-saitiv/",
        permanent: true,
      },

      // Service slugs are localized now; the previous English-slug URLs were
      // indexed under the locale prefixes and must keep resolving.
      {
        source: "/it-IT/web-development",
        destination: "/it-IT/sviluppo-siti-web/",
        permanent: true,
      },
      {
        source: "/it-IT/ecommerce-development",
        destination: "/it-IT/sviluppo-ecommerce/",
        permanent: true,
      },
      {
        source: "/uk-UA/web-development",
        destination: "/uk-UA/rozrobka-saitiv/",
        permanent: true,
      },
      {
        source: "/uk-UA/ecommerce-development",
        destination: "/uk-UA/rozrobka-internet-magazyniv/",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*service-worker.js",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
