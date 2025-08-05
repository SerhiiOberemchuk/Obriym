import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useStore,
  useStylesScoped$,
} from "@qwik.dev/core";
import styles from "./styles.css?inline";
import { COOKIES_LOCAL_STORAGE, CookiesTypes } from "~/types/cookies.type";
import { loadAnalytics } from "~/utils/loadGoogleAnalitics";

export default component$(() => {
  useStylesScoped$(styles);

  const typeCookiesBanner = useSignal<"info" | "settings">("info");
  const cookiesData = useStore<CookiesTypes>({
    cookiesAccepted: false,
    requiredCookies: true,
    analyticsCookies: false,
  });

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
        document.querySelector(".cookies_banner")?.classList.add("cookies_visible");
      }
    }),
  );

  const handleAcceptAllCookies = $(() => {
    cookiesData.cookiesAccepted = true;
    cookiesData.analyticsCookies = true;
    localStorage.setItem(COOKIES_LOCAL_STORAGE, JSON.stringify(cookiesData));
    loadAnalytics();
    console.log("All cookies accepted");
  });

  const handleSettings = $(() => {
    if (typeCookiesBanner.value === "info") {
      typeCookiesBanner.value = "settings";
      console.log("open settings");
    } else {
      cookiesData.cookiesAccepted = true;
      localStorage.setItem(COOKIES_LOCAL_STORAGE, JSON.stringify(cookiesData));
      console.log("Accepted selected cookies");
      if (cookiesData.analyticsCookies) {
        loadAnalytics();
      }
    }
  });

  return (
    <>
      {!cookiesData.cookiesAccepted && (
        <div class="btn_body black cookies_banner">
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
                    <input
                      disabled
                      type="checkbox"
                      checked
                      aria-label="Required cookies"
                      class="checkbox_cookies"
                    />
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
                      id="analyticsCookies"
                      name="analyticsCookies"
                      checked={cookiesData.analyticsCookies}
                      aria-label="Analytics cookies"
                      onChange$={() => {
                        cookiesData.analyticsCookies = !cookiesData.analyticsCookies;
                      }}
                      class="checkbox_cookies"
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
