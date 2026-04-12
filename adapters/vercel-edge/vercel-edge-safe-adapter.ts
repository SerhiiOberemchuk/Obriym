import fs from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const sharedAdapterUrl = pathToFileURL(
  fileURLToPath(
    new URL("../../node_modules/@builder.io/qwik-city/lib/adapters/shared/vite/index.mjs", import.meta.url),
  ),
).href;
const { getParentDir, viteAdapter } = await import(sharedAdapterUrl);

type VercelEdgeAdapterOptions = {
  origin?: string;
  ssg?: boolean;
  staticPaths?: string[];
  target?: "node" | "edge";
  outputConfig?: boolean;
  vcConfigEntryPoint?: string;
  vcConfigEnvVarsInUse?: string[];
};

async function moveDirWithWindowsFallback(fromDir: string, toDir: string) {
  try {
    await fs.promises.rename(fromDir, toDir);
  } catch (error) {
    const renameError = error as NodeJS.ErrnoException;
    if (renameError.code !== "EPERM" && renameError.code !== "EXDEV") {
      throw error;
    }

    await fs.promises.cp(fromDir, toDir, { recursive: true, force: true });
    await fs.promises.rm(fromDir, { recursive: true, force: true });
  }
}

export function vercelEdgeSafeAdapter(opts: VercelEdgeAdapterOptions = {}) {
  return viteAdapter({
    name: "vercel-edge-safe",
    origin: process.env.VERCEL_URL || "https://yoursitename.vercel.app",
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      const outDir =
        config.build?.outDir || join(".vercel", "output", "functions", "_qwik-city.func");

      return {
        resolve: {
          conditions:
            opts.target === "node"
              ? ["node", "import", "module", "browser", "default"]
              : ["edge-light", "webworker", "worker", "browser", "module", "main"],
        },
        ssr: {
          target: opts.target === "node" ? "node" : "webworker",
          noExternal: true,
        },
        build: {
          ssr: true,
          outDir,
          rollupOptions: {
            output: {
              format: "es",
              hoistTransitiveImports: false,
            },
          },
        },
        publicDir: false,
      };
    },
    async generate({ clientPublicOutDir, serverOutDir, basePathname, outputEntries }) {
      const vercelOutputDir = getParentDir(serverOutDir, "output");

      if (opts.outputConfig !== false) {
        const vercelOutputConfig = {
          routes: [
            { handle: "filesystem" },
            {
              src: `${basePathname}.*`,
              dest: "/_qwik-city",
            },
          ],
          version: 3,
        };

        await fs.promises.writeFile(
          join(vercelOutputDir, "config.json"),
          JSON.stringify(vercelOutputConfig, null, 2),
        );
      }

      let entrypoint = opts.vcConfigEntryPoint;
      if (!entrypoint) {
        entrypoint = outputEntries.some((entry) => entry === "entry.vercel-edge.mjs")
          ? "entry.vercel-edge.mjs"
          : "entry.vercel-edge.js";
      }

      const vcConfig = {
        runtime: "edge",
        entrypoint,
        envVarsInUse: opts.vcConfigEnvVarsInUse,
      };
      await fs.promises.writeFile(
        join(serverOutDir, ".vc-config.json"),
        JSON.stringify(vcConfig, null, 2),
      );

      let vercelStaticDir = join(vercelOutputDir, "static");
      const basePathnameParts = basePathname.split("/").filter((part) => part.length > 0);
      if (basePathnameParts.length > 0) {
        vercelStaticDir = join(vercelStaticDir, ...basePathnameParts);
      }

      await fs.promises.rm(vercelStaticDir, { recursive: true, force: true });
      await fs.promises.mkdir(dirname(vercelStaticDir), { recursive: true });
      await moveDirWithWindowsFallback(clientPublicOutDir, vercelStaticDir);
    },
  });
}
