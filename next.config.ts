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
