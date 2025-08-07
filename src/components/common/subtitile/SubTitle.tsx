import { component$, Slot, useStylesScoped$ } from "@qwik.dev/core";
import IconPink from "~/assets/images/pink_dark.png?w=64&h=64&jsx";
import IconShapeProjects from "~/assets/images/shape-project.png?w=64&h=64&jsx";
import IconShapeHIW from "~/assets/images/shape.png?w=64&h=64&jsx";
import styles from "./subt-styles.css?inline";

type Props = { section: "ourTeam" | "projects" | "how-it-work"; classes?: string };

const Image = ({ section, classes }: { section: Props["section"]; classes: string }) => {
  switch (section) {
    case "ourTeam":
      return <IconPink class={classes} aria-hidden="true" />;
    case "projects":
      return <IconShapeProjects class={classes} aria-hidden="true" />;
    case "how-it-work":
      return <IconShapeHIW class={classes} aria-hidden="true" />;
    default:
      return null;
  }
};

export default component$<Props>(({ section, classes }) => {
  useStylesScoped$(styles);

  return (
    <div class={["c_box_title", classes]}>
      <Image classes="c_title_icon" section={section} aria-hidden="true" />
      <h2 class="H3_uppercase grey_dark">
        <Slot />
      </h2>
    </div>
  );
});
