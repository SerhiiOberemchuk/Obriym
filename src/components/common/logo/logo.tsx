import { component$ } from "@qwik.dev/core";
import LogoSVG from "/public/logo.svg?jsx";
import { Link } from "@qwik.dev/router";
import clsx from "clsx";
import "./style.css";
import { inlineTranslate } from "qwik-speak";

type Props = {
  class?: string;
};

export default component$<Props>(props => {
  const t = inlineTranslate();
  return (
    <Link
      href="/"
      class={clsx("logo", props.class)}
      aria-label={t("logo.link@@Logo Obriym Agency link to homepage")}
    >
      <LogoSVG alt={t("logo.name@@Logo Obriym Agency")} />
    </Link>
  );
});
