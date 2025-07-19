import { component$ } from "@qwik.dev/core";
import Logo from "~/components/common/logo/logo";
import { inlineTranslate } from "qwik-speak";
import Ball from "~/assets/images/green-ball.png?w=48&h48&jsx";
import "./styles_footer.css";
import NavList from "~/components/common/nav-list/NavList";
import FollowUs from "./follow-us/FollowUs";

export default component$(() => {
  const t = inlineTranslate();
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div class="container f_container" id="contact">
        <Logo place="footer" />
        <NavList place="footer" />
        <FollowUs />
        <div class="f_box_title">
          <h2 class="body_big grey">{t("footer.text.webuild1@@We build end-to-end")}</h2>
          <h2 class="body_big grey"> {t("footer.text.webuild2@@digital products")}</h2>
          <Ball />
        </div>
        <p class="btn_header grey f_copyright">Copyright ©Obriym{currentYear}</p>
      </div>
    </footer>
  );
});
