"use client";

import { useTranslations } from "next-intl";
import styles from "./styles_slide.module.css";
import type { TeamMemberType } from "~/types/team-member.type";
import IconPlus from "~/assets/icons/icon_plus.svg";
import { imageMap } from "~/const/team";

type SlideComponentProps = {
  item: TeamMemberType;
  onOpen: () => void;
};

export default function SlideComponent({ item, onOpen }: SlideComponentProps) {
  const t = useTranslations();
  const MemberImage = imageMap[item.imageKey];

  const memberName = t(`team.member.${item.slug}.name`);
  const memberRole = t(`team.member.${item.slug}.role`);
  const plusLabel = t("team.aria.slider.plus_btn", {
    name: memberName,
  });

  return (
    <div className={styles["slide-component"]}>
      <div className={styles["slide-top"]}>
        <MemberImage className={styles["slide-image"]} />
      </div>
      <div className={styles["slide-bottom"]}>
        <div className={styles["slide-text-wrp"]}>
          <p className="H6" id={`name-${item.id}`}>
            {memberName}
          </p>
          <p className="btn_header grey" id={`role-${item.id}`}>
            {memberRole}
          </p>
        </div>

        <button className={styles["slide-btn-plus"]} onClick={onOpen} aria-label={plusLabel}>
          <IconPlus width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
