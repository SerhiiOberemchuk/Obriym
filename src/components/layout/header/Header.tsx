import { component$ } from "@qwik.dev/core";
import Logo from "~/components/common/logo/logo";
import "./h-styles.css";
import { ChangeLocale } from "~/components/change-locale/change-locale";

export default component$(() => {
  return (
    <header class="header">
      <div class="container">
        <Logo place="header" />
        <ChangeLocale place="header" />
      </div>
    </header>
  );
});
