import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./styles_content.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <section class="">
      <p>Content Contact</p>
    </section>
  );
});
