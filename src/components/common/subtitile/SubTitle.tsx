import type { ReactNode } from "react";
import styles from "./subt-styles.module.css";
import AnimatedElement from "../animated-ball/AnimatedElement";

type Props = {
  section?: "services" | "projects" | "how-it-work";
  classes?: string;
  titleId?: string;
  children: ReactNode;
};

export default function SubTitle({ section, classes, titleId, children }: Props) {
  return (
    <div className={`${styles.c_box_title} ${classes ?? ""}`}>
      {section === "services" && <AnimatedElement preset="torus" width={64} height={64} />}
      {section === "how-it-work" && <AnimatedElement preset="cube" width={64} height={64} />}
      {section === "projects" && <AnimatedElement preset="pipe" width={64} height={64} />}

      <h2 id={titleId} className="H3_uppercase grey_dark">
        {children}
      </h2>
    </div>
  );
}
