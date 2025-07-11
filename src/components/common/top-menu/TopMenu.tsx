import { component$ } from "@qwik.dev/core";
import { ChangeLocale } from "./change-locale/change-locale";
import "./tm-styles.css";
import LetsWork from "./lets-work/LetsWork";

export default component$(() => {
  return (
    <div class="tm_container">
      <ChangeLocale />
      <LetsWork />
    </div>
  );
});
