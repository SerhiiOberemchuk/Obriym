import { component$ } from "@builder.io/qwik";
import LogoSVG from "/public/logo.svg?jsx";
import "./style.css";
import { inlineTranslate, localizePath } from "qwik-speak";
import { Link } from "@builder.io/qwik-city";

type Props = {
  place: "footer" | "header";
  class?: string;
};

export default component$<Props>(props => {
  const t = inlineTranslate();
  const getPath = localizePath();
  const [homePath] = getPath(["/"]);
  return (
    <Link
      href={homePath}
      class="logo"
      data-place={props.place}
      aria-label={t("logo.link@@Logo Obriym Agency link to homepage")}
    >
      <LogoSVG aria-hidden="true" focusable="false" />
    </Link>
  );
});
