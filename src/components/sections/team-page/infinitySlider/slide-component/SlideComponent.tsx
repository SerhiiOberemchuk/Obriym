import { component$, useStylesScoped$ } from "@qwik.dev/core";

import styles from "./styles_slide.css?inline";
import type { TeamMemberType } from "~/types/team-member";
import ItemBtnPlus from "~/assets/icons/icon_btn_plus.svg?w=56&h=56&jsx";

export default component$(({ item }: { item: TeamMemberType }) => {
  useStylesScoped$(styles);

  return (
    <div class="slide-component">
      <div class="slide-top">
        <item.image class="slide-image" />
      </div>
      <div class="slide-bottom">
        <div class="slide-text-wrp">
          <p class="H6"> {item.name}</p>
          <p class="btn_header grey">{item.role}</p>
        </div>

        <button class="slide-btn-plus">
          <ItemBtnPlus />
        </button>
      </div>
    </div>
  );
});
