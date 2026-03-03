import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from "@qwik.dev/core";
import styles from "./styles.css?inline";
import { COOKIES_LOCAL_STORAGE, CookiesTypes } from "~/types/cookies.type";
import { disableAnalitics, loadAnalytics } from "~/utils/loadGoogleAnalitics";
import { CookiesBannerContext } from "./coocies-banner-context";
import { inlineTranslate, localizePath } from "qwik-speak";
import { Link } from "@qwik.dev/router";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const typeCookiesBanner = useSignal<"info" | "settings">("info");
  const cookiesData = useStore<CookiesTypes>({
    cookiesAccepted: false,
    requiredCookies: true,
    analyticsCookies: false,
  });
  const getPath = localizePath();
  const [cookiesPath] = getPath(["/cookies-policy/"]);
  const { isVisible } = useContext(CookiesBannerContext);

  useVisibleTask$(() => {
    const isLocalCookies = localStorage.getItem(COOKIES_LOCAL_STORAGE);
    if (isLocalCookies) {
      const cookiesLocal: CookiesTypes = JSON.parse(isLocalCookies);
      cookiesData.cookiesAccepted = cookiesLocal.cookiesAccepted;
      cookiesData.requiredCookies = cookiesLocal.requiredCookies;
      cookiesData.analyticsCookies = cookiesLocal.analyticsCookies;
      if (cookiesLocal.analyticsCookies) {
        loadAnalytics();
      }
    } else {
      isVisible.value = true;
    }
  });

  const handleAcceptAllCookies = $(() => {
    cookiesData.cookiesAccepted = true;
    cookiesData.analyticsCookies = true;
    localStorage.setItem(COOKIES_LOCAL_STORAGE, JSON.stringify(cookiesData));
    loadAnalytics();
    isVisible.value = false;
  });

  const handleSettings = $(() => {
    if (typeCookiesBanner.value === "info") {
      typeCookiesBanner.value = "settings";
    } else {
      cookiesData.cookiesAccepted = true;
      localStorage.setItem(COOKIES_LOCAL_STORAGE, JSON.stringify(cookiesData));
      if (!cookiesData.analyticsCookies) {
        disableAnalitics();
      } else {
        loadAnalytics();
      }
      isVisible.value = false;
    }
  });

  return (
    <>
      {isVisible.value && (
        <div class="btn_body black cookies_banner">
          <h3 class="H4 black">
            {typeCookiesBanner.value === "info"
              ? t("cookies.banner.title.general@@We use cookies")
              : t("cookies.banner.title.settings@@Choose which cookies you want to accept:")}
          </h3>
          <p>
            {t(
              "cookies.banner.description1@@This site uses cookies. By continuing to browse the site, you are agreeing to our use of cookies.",
            )}
            <br />
            {t("cookies.banner.description2@@Read more on")}{" "}
            <Link href={cookiesPath} target="_blank" rel="noopener noreferrer">
              https://obriym.com/cookie-policy
            </Link>
          </p>

          {typeCookiesBanner.value === "settings" && (
            <ul class="settings_list">
              <li>
                <div class="check_wrapper">
                  <p class="H6">{t("cookies.banner.required.title@@Required cookies:")}</p>
                  <label class="switch">
                    <input disabled type="checkbox" checked aria-label="Required cookies" />
                    <span class="slider"></span>
                  </label>
                </div>
                <p>
                  {t(
                    "cookies.banner.required.description@@These cookies are essential for the basic functioning of the website.",
                  )}
                </p>
              </li>

              <li>
                <div class="check_wrapper">
                  <p class="H6">{t("cookies.banner.analitics.title@@Analytics cookies:")}</p>
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={cookiesData.analyticsCookies}
                      aria-label="Analytics cookies"
                      onChange$={() => {
                        cookiesData.analyticsCookies = !cookiesData.analyticsCookies;
                      }}
                    />
                    <span class="slider"></span>
                  </label>
                </div>
                <p>
                  {t(
                    "cookies.banner.analitics.description@@These cookies collect information about how visitors use our site.",
                  )}
                </p>
              </li>
            </ul>
          )}

          <div class="buttons_wrapper">
            <button type="button" class="grey_dark btn_set" onClick$={handleSettings}>
              {typeCookiesBanner.value === "info"
                ? t("cookies.banner.button.setCookies@@Set cookies")
                : t("cookies.banner.button.acceptSelected@@Accept selected")}
            </button>
            <button type="button" class="btn_accept" onClick$={handleAcceptAllCookies}>
              {t("cookies.banner.button.acceptAll@@Accept all")}
            </button>
          </div>
        </div>
      )}
    </>
  );
});
