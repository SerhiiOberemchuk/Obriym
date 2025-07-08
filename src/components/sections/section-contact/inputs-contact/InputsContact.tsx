import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./styles_inputs.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="">
      <p>Inputs Contact</p>
    </div>
  );
});
