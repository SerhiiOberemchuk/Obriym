import { component$, useStylesScoped$ } from "@qwik.dev/core";
import Logo from "~/components/common/logo/logo";
import { inlineTranslate, localizePath } from "qwik-speak";
import styles from "./styles_footer.css?inline";
import NavList from "~/components/common/nav-list/NavList";
import FollowUs from "./follow-us/FollowUs";
import IconCookies from "~/assets/icons/cookies-icon.svg?w=38&h=38&jsx";
import { QModel } from "~/integrations/react/model/ModelGLB";
import { Link } from "@qwik.dev/router";

export default component$(() => {
  const t = inlineTranslate();
  useStylesScoped$(styles);
  const currentYear = new Date().getFullYear();
  const getPath = localizePath();

  const [privacyPath] = getPath(["/privacy-policy/"]);
  const [cookiesPath] = getPath(["/cookies-policy/"]);
  return (
    <footer>
      <div class="container f_container" id="contact">
        <Logo place="footer" />
        <NavList place="footer" />
        <FollowUs />
        <h2 class="f_box_title" aria-label="Footer title">
          <span class="body_big grey">{t("footer.text.webuild1@@We build end-to-end")}</span>
          <span class="body_big grey"> {t("footer.text.webuild2@@digital products")}</span>
          <QModel model="organicball" width={48} height={48} />
        </h2>
        <div class="nav_wrapper">
          <button type="button" class="btn_cookies">
            <IconCookies />
          </button>
          <p class="btn_header grey f_copyright">Copyright ©Obriym{currentYear}</p>
          <nav>
            <ul class="privacy_list">
              <li class="btn_header">
                <Link href={privacyPath}>Privacy policy</Link>
              </li>
              <li class="divider"></li>
              <li class="btn_header">
                <Link href={cookiesPath}>Cookie policy</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
});
