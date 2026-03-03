import { JSXChildren } from "@builder.io/qwik";

export type ServicesCardProps = {
  title: string;
  description: string;
  list: string[];
  srcImage?: string;
  image?: JSXChildren;
  href?: string;
  linkLabel?: string;
};

