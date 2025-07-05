import { component$ } from "@qwik.dev/core";
import Logo from "~/components/common/logo/logo";
import "./styles_footer.css";
import { inlineTranslate } from "qwik-speak";
export default component$(() => {
  const t = inlineTranslate();
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div class="container f_container">
        <Logo />

        <h2 class="body_big">
          We build end-to-end <br /> digital products
        </h2>
        <p class="btn_header f_copyright">
          {t("footer.copyright@@Copyright")} ©Obriym{currentYear}
        </p>
      </div>
    </footer>
  );
});
