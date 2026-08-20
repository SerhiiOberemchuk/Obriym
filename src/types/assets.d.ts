/**
 * SVGs are compiled to React components by SVGR (see `next.config.ts`), so a
 * default import is a component rather than a URL string.
 */
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent;
}
