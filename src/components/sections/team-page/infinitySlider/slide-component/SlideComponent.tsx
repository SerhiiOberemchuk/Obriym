import { component$, useStylesScoped$, QRL } from "@qwik.dev/core";
import type { JSX } from "@qwik.dev/core";

import styles from "./styles_slide.css?inline";
import type { TeamMemberType } from "~/types/team-member";
import IconPlus from "~/assets/icons/icon_plus.svg?w=24&h=24&jsx";
import Person1 from "~/assets/images/oberemchuk.png?w=880&h=1192&jsx";
import Person2 from "~/assets/images/person2.png?w=880&h=1192&jsx";
import Person3 from "~/assets/images/person3.png?w=880&h=1192&jsx";

type ImageKey = "person1" | "person2" | "person3";
const imageMap: Record<ImageKey, () => JSX.Element> = {
  person1: () => <Person1 class="slide-image" draggable={false} />,
  person2: () => <Person2 class="slide-image" draggable={false} />,
  person3: () => <Person3 class="slide-image" draggable={false} />,
};

export default component$(
  ({ item, onOpen$ }: { item: TeamMemberType; onOpen$: QRL<() => void> }) => {
    useStylesScoped$(styles);

    return (
      <div class="slide-component">
        <div class="slide-top">{imageMap[item.imageKey]()}</div>
        <div class="slide-bottom">
          <div class="slide-text-wrp">
            <p class="H6"> {item.name}</p>
            <p class="btn_header grey">{item.role}</p>
          </div>

          <button class="slide-btn-plus " onClick$={onOpen$}>
            <IconPlus />
          </button>
        </div>
      </div>
    );
  },
);
