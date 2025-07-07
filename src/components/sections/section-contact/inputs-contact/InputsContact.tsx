import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./styles_inputs.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <section class="">
      <p>Inputs Contact</p>
    </section>
  );
});
