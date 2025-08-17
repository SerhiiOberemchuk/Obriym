import {
  $,
  component$,
  Slot,
  useContext,
  useOnWindow,
  useSignal,
  useStore,
  useStylesScoped$,
  useTask$,
} from "@qwik.dev/core";

import styles from "./subt-styles.css?inline";
import { Model, QModel } from "~/integrations/react/model/ModelGLB";
import { ViewportContext } from "~/routes/[...lang]/layout";

type Props = { section: "services" | "projects" | "how-it-work"; classes?: string };

export default component$<Props>(({ section, classes }) => {
  const isModel = useSignal<boolean>(false);
  useStylesScoped$(styles);
  const viePort = useContext(ViewportContext);
  const { sizeCanvas } = useStore<{ sizeCanvas: { width: number; height: number } }>({
    sizeCanvas: { width: 32, height: 32 },
  });
  const model: Model["model"] =
    section === "services" ? "torus" : section === "projects" ? "pipe" : "cube";
  useTask$(({ track }) => {
    track(() => viePort.value);
    switch (viePort.value) {
      case "tablet":
        sizeCanvas.width = 64;
        sizeCanvas.height = 64;
        break;
      case "desktop":
        sizeCanvas.width = 100;
        sizeCanvas.height = 100;
        break;
      default:
        sizeCanvas.width = 32;
        sizeCanvas.height = 32;
        break;
    }
  });
  useOnWindow(
    "DOMContentLoaded",
    $(() => (isModel.value = true)),
  );
  return (
    <div class={["c_box_title", classes]}>
      {/* <Image width={sizeCanvas.width} height={sizeCanvas.height} section={section} /> */}
      {isModel.value ? (
        <QModel model={model} width={sizeCanvas.width} height={sizeCanvas.height} />
      ) : (
        <div
          style={{ height: sizeCanvas.height, width: sizeCanvas.width, background: "red" }}
        ></div>
      )}
      <h2 class="H3_uppercase grey_dark">
        <Slot />
      </h2>
    </div>
  );
});
