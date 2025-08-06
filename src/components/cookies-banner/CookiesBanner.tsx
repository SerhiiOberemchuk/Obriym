import {
  $,
  component$,
  useContext,
  useOnDocument,
  useSignal,
  useStore,
  useStylesScoped$,
} from "@qwik.dev/core";
import styles from "./styles.css?inline";
import { COOKIES_LOCAL_STORAGE, CookiesTypes } from "~/types/cookies.type";
import { loadAnalytics } from "~/utils/loadGoogleAnalitics";
import { CookiesBannerContext } from "./coocies-banner-context";

export default component$(() => {
  useStylesScoped$(styles);

  const typeCookiesBanner = useSignal<"info" | "settings">("info");
  const cookiesData = useStore<CookiesTypes>({
    cookiesAccepted: false,
    requiredCookies: true,
    analyticsCookies: false,
  });

  const { isVisible } = useContext(CookiesBannerContext);

  useOnDocument(
    "DOMContentLoaded",
    $(() => {
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
    }),
  );

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
      if (cookiesData.analyticsCookies) {
        loadAnalytics();
      }
      isVisible.value = false;
    }
  });

  return (
    <>
      {isVisible.value && (
        <div class="btn_body black cookies_banner cookies_visible">
          <h5 class="H4 black">
            {typeCookiesBanner.value === "info"
              ? "We use cookies"
              : "Choose which cookies you want to accept:"}
          </h5>
          <p>
            This site uses cookies. By continuing to browse the site, you are agreeing to our use of
            cookies.
            <br />
            Read more on{" "}
            <a href="https://obriym.com/cookie-policy" target="_blank" rel="noopener noreferrer">
              https://obriym.com/cookie-policy
            </a>
          </p>

          {typeCookiesBanner.value === "settings" && (
            <ul class="settings_list">
              <li>
                <div class="check_wrapper">
                  <p class="H6">Required cookies:</p>
                  <label class="switch">
                    <input disabled type="checkbox" checked aria-label="Required cookies" />
                    <span class="slider"></span>
                  </label>
                </div>
                <p>These cookies are essential for the basic functioning of the website.</p>
              </li>

              <li>
                <div class="check_wrapper">
                  <p class="H6">Analytics cookies:</p>
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
                <p>These cookies collect information about how visitors use our site.</p>
              </li>
            </ul>
          )}

          <div class="buttons_wrapper">
            <button type="button" class="grey_dark btn_set" onClick$={handleSettings}>
              {typeCookiesBanner.value === "info" ? "Set cookies" : "Accept selected"}
            </button>
            <button type="button" class="btn_accept" onClick$={handleAcceptAllCookies}>
              Accept all
            </button>
          </div>
        </div>
      )}
    </>
  );
});
