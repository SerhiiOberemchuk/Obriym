import { component$, Slot, useStylesScoped$ } from "@qwik.dev/core";
import PinkDark from "~/assets/images/pink_dark.png?w=100&h=100&quality=100&jsx";
import Pink from "~/assets/images/pink.png?w=100&h=100&quality=100&jsx";
import Shape from "~/assets/images/shape.png?w=100&h=100&quality=100&jsx";
import styles from "./subt-styles.css?inline";

type Props = { section?: "services" | "projects" | "how-it-work"; classes?: string };

export default component$<Props>(({ section, classes }) => {
  useStylesScoped$(styles);

  return (
    <div class={["c_box_title", classes]}>
      {section === "services" && <PinkDark />}
      {section === "how-it-work" && <Pink />}
      {section === "projects" && <Shape />}
      {/* <QModel
        key={section}
        // client:signal={hydrateReact}
        // client:idle
        model={model}
        width={sizes.sizeCanvas.width}
        height={sizes.sizeCanvas.height}
      /> */}

      <h2 class="H3_uppercase grey_dark">
        <Slot />
      </h2>
    </div>
  );
});
