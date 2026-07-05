import { vercelEdgeAdapter } from "@builder.io/qwik-city/adapters/vercel-edge/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.vercel-edge.tsx", "@qwik-city-plan"],
      },
      outDir: ".vercel/output/functions/_qwik-city.func",
    },
    // `sitemapOutFile: null` stops the adapter from emitting an empty static
    // sitemap.xml (nothing is SSG'd) that would shadow the app's routes.
    plugins: [vercelEdgeAdapter({ ssg: { include: [], sitemapOutFile: null } })],
  };
});
