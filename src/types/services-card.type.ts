import type { ReactNode } from "react";

export type ServicesCardProps = {
  title: string;
  description: string;
  list: string[];
  srcImage?: string;
  image?: ReactNode;
};
