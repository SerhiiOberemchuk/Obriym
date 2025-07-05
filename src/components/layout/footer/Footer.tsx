import { component$ } from "@qwik.dev/core";
import Logo from "~/components/common/logo/logo";
import "./styles_footer.css";
import { inlineTranslate } from "qwik-speak";
import NavList from "~/components/common/nav-list/NavList";
export default component$(() => {
  const t = inlineTranslate();
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div class="container f_container">
        <Logo />
        <NavList place="footer" />
        <h2 class="body_big">
          {t("footer.text.webuild1@@We build end-to-end")} <br />
          {t("footer.text.webuild2@@digital products")}
        </h2>
        <p class="btn_header f_copyright">Copyright ©Obriym{currentYear}</p>
      </div>
    </footer>
  );
});
