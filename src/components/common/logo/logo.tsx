import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import LogoSVG from "/public/logo.svg?jsx";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import "./style.css";

type Props = {
  place: "footer" | "header";
  class?: string;
};

export default component$<Props>(props => {
  const t = inlineTranslate();
  const { lang } = useSpeakLocale();
  const getPath = localizePath();
  const homePath = getPath("/", lang);
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
