import { component$ } from "@qwik.dev/core";
import LogoSVG from "/public/logo.svg?jsx";
import { Link } from "@qwik.dev/router";
import "./style.css";
import { inlineTranslate } from "qwik-speak";

type Props = {
  place: "footer" | "header";
  class?: string;
};

export default component$<Props>(props => {
  const t = inlineTranslate();
  return (
    <Link
      href="/"
      class="logo"
      data-place={props.place}
      aria-label={t("logo.link@@Logo Obriym Agency link to homepage")}
    >
      <LogoSVG alt={t("logo.name@@Logo Obriym Agency")} />
    </Link>
  );
});
