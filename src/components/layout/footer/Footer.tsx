import { component$, useContext, useStylesScoped$ } from "@qwik.dev/core";
import Logo from "~/components/common/logo/logo";
import { inlineTranslate, localizePath } from "qwik-speak";
import styles from "./styles_footer.css?inline";
import NavList from "~/components/common/nav-list/NavList";
import FollowUs from "./follow-us/FollowUs";
import IconCookies from "~/assets/icons/cookies-icon.svg?w=38&h=38&jsx";
// import GreenBall from "~/assets/images/green-ball.png?h=48&w=48&quality=100&jsx";
import { Link } from "@qwik.dev/router";
import { CookiesBannerContext } from "~/components/cookies-banner/coocies-banner-context";

export default component$(() => {
  const t = inlineTranslate();
  useStylesScoped$(styles);
  const currentYear = new Date().getFullYear();
  const getPath = localizePath();
  const cookiesBanner = useContext(CookiesBannerContext);
  const [privacyPath] = getPath(["/privacy-policy/"]);
  const [cookiesPath] = getPath(["/cookies-policy/"]);
  return (
    <footer>
      <div class="container f_container" id="contact">
        <Logo place="footer" />
        <div>
          <NavList place="footer" />
        </div>
        <div>
          <FollowUs />
        </div>
        <h3 class="f_box_title" aria-label="Company motto">
          <span class="body_big grey">{t("footer.text.webuild1@@We build end-to-end")}</span>
          <span class="body_big grey"> {t("footer.text.webuild2@@digital products")}</span>
          {/* <GreenBall aria-hidden={true} /> */}
          <img src="/images/green-ball.png" width={48} height={48} alt="green ball" />
        </h3>
        <div class="nav_wrapper">
          <button
            type="button"
            class="btn_cookies"
            onClick$={cookiesBanner.openBanner}
            aria-label="Cookie preferences"
          >
            <IconCookies />
          </button>
          <p class="btn_header grey f_copyright">Copyright ©Obriym{currentYear}</p>
          <nav aria-label="Legal information">
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
