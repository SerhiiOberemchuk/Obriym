import { createQwikRouter } from "@qwik.dev/router/middleware/vercel-edge";
import qwikRouterConfig from "@qwik-router-config";
import render from "./entry.ssr";

export default createQwikRouter({ render, qwikRouterConfig });
