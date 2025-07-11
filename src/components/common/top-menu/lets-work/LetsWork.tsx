import { component$ } from "@qwik.dev/core";
import "./lw-styles.css";
import { inlineTranslate } from "qwik-speak";

export default component$(() => {
  const t = inlineTranslate();

  return (
    <button type="button" class="btn_body lw_button">
      {t("app.btnLetsWork@@Let’s work")}
    </button>
  );
});
