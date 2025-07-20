import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./lw-styles.css?inline";
import { inlineTranslate } from "qwik-speak";

export default component$(({ place }: { place: "mob-menu" | "header" }) => {
  const t = inlineTranslate();
  useStylesScoped$(styles);
  return (
    <button type="button" data-place={place} class="btn_body lw_button">
      {t("app.btnLetsWork@@Let’s work")}
    </button>
  );
});
