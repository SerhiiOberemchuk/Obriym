import { component$, useStylesScoped$, QRL } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import styles from "./styles_slide.css?inline";
import type { TeamMemberType } from "~/types/team-member.type";
import IconPlus from "~/assets/icons/icon_plus.svg?w=24&h=24&jsx";
import { imageMap } from "~/const/team";

export default component$(
  ({ item, onOpen$ }: { item: TeamMemberType; onOpen$: QRL<() => void> }) => {
    const t = inlineTranslate();
    useStylesScoped$(styles);

    const memberName = t(`team.member.${item.slug}.name@@${item.name}`);
    const plusLabel = t("team.aria.slider.plus_btn@@More about {{name}}", {
      name: memberName,
    });
    return (
      <div class="slide-component">
        <div class="slide-top">{imageMap[item.imageKey]()}</div>
        <div class="slide-bottom">
          <div class="slide-text-wrp">
            <p class="H6" id={`name-${item.id}`}>
              {t(`team.member.${item.slug}.name@@${item.name}`)}
            </p>
            <p class="btn_header grey" id={`role-${item.id}`}>
              {item.role}
            </p>
          </div>

          <button class="slide-btn-plus " onClick$={onOpen$} aria-label={plusLabel}>
            <IconPlus />
          </button>
        </div>
      </div>
    );
  },
);
