import { JSXChildren } from "@qwik.dev/core";

export type ServicesCardProps = {
  title: string;
  description: string;
  list: string[];
  srcImage?: string;
  image?: JSXChildren;
};
