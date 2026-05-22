import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./subt-styles.css?inline";
import AnimatedElement from "../animated-ball/AnimatedElement";

type Props = {
  section?: "services" | "projects" | "how-it-work";
  classes?: string;
  titleId?: string;
};

export default component$<Props>(({ section, classes, titleId }) => {
  useStylesScoped$(styles);

  return (
    <div class={["c_box_title", classes]}>
      {section === "services" && <AnimatedElement preset="torus" width={64} height={64} />}
      {section === "how-it-work" && <AnimatedElement preset="cube" width={64} height={64} />}
      {section === "projects" && <AnimatedElement preset="pipe" width={64} height={64} />}

      <h2 id={titleId} class="H3_uppercase grey_dark">
        <Slot />
      </h2>
    </div>
  );
});
