import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { inlineTranslate } from "qwik-speak";
import styles from "./card-tyles.css?inline";
import Img from "~/assets/images/foto.png?jsx";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  return (
    <div class="card">
      <h2 class="title body_big">{t("Launch & Optimization")} </h2>
      <p class="description btn_body">
        We ensure a smooth launch and support long-term growth through testing, analytics, and
        iteration.
      </p>
      <ol class="list btn_body">
        <li class="item">
          <p>QA Testing</p>
        </li>
      </ol>
      <Img class="image" />
    </div>
  );
});
