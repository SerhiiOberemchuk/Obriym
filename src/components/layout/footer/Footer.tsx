import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import Logo from "~/components/common/logo/logo";
import { inlineTranslate, localizePath, useSpeakLocale } from "qwik-speak";
import styles from "./styles_footer.css?inline";
import NavList from "~/components/common/nav-list/NavList";
import FollowUs from "./follow-us/FollowUs";
import IconCookies from "~/assets/icons/cookies-icon.svg?w=38&h=38&jsx";
import { CookiesBannerContext } from "~/components/cookies-banner/coocies-banner-context";
import AnimatedElement from "~/components/common/animated-ball/AnimatedElement";
import { LEGAL_ENTITY } from "~/types/legal.info";
import { getLegalDisplay } from "~/utils/legal";

export default component$(() => {
  const t = inlineTranslate();
  const { lang } = useSpeakLocale();
  const getPath = localizePath();
  useStylesScoped$(styles);
  const currentYear = new Date().getFullYear();
  const cookiesBanner = useContext(CookiesBannerContext);
  const privacyPath = getPath("/privacy-policy/", lang);
  const cookiesPath = getPath("/cookies-policy/", lang);
  const legalPath = getPath("/legal-information/", lang);
  const legal = getLegalDisplay(lang);

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
          <AnimatedElement class="footer_ball" width={48} height={48} preset="greenball" />
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
          <p class="btn_header grey f_copyright">Copyright {"\u00A9"}Obriym{currentYear}</p>
          <nav aria-label="Legal information">
            <ul class="privacy_list">
              <li class="btn_header">
                <a href={privacyPath}>Privacy policy</a>
              </li>
              <li class="divider"></li>
              <li class="btn_header">
                <a href={cookiesPath}>Cookie policy</a>
              </li>
              <li class="divider"></li>
              <li class="btn_header">
                <a href={legalPath}>Legal info</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="f_legal btn_header grey">
          <p>
            {LEGAL_ENTITY.name} — {LEGAL_ENTITY.nameEn}
          </p>
          <p>
            {t("legal.details.country@@Ukraine")}, {legal.address}
            {" · "}
            <a href={`tel:${LEGAL_ENTITY.phone}`}>{legal.phoneDisplay}</a>
            {" · "}
            <a href="mailto:info@obriym.com">info@obriym.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
});
