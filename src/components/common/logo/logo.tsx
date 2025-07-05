import { component$ } from "@qwik.dev/core";
import LogoSVG from "/public/logo.svg?jsx";
import { Link } from "@qwik.dev/router";
import "./style.css";
import clsx from "clsx";

type Props = {
  class?: string;
};

export default component$<Props>(props => {
  return (
    <Link href="/" class={clsx("logo", props.class)}>
      <LogoSVG />
    </Link>
  );
});
