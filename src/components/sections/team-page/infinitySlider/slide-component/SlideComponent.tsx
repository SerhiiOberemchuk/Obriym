import { component$, useStylesScoped$ } from "@qwik.dev/core";

import styles from "./styles_slide.css?inline";
import type { TeamMemberType } from "~/types/team-member";

export default component$(({ item }: { item: TeamMemberType }) => {
  useStylesScoped$(styles);
  return (
    <div class="slide-component">
      <div class="slide-top"> </div>
      <div class="slide-bottom">{item.name}</div>
    </div>
  );
});
