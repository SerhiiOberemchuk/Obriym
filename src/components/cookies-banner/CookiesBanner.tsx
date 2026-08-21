"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import styles from "./styles.module.css";
import { COOKIES_LOCAL_STORAGE, CookiesTypes } from "~/types/cookies.type";
import { disableAnalitics, loadAnalytics } from "~/lib/loadGoogleAnalitics";
import { useCookiesBanner } from "~/context/app-context";
import { type Locale } from "~/i18n/routing";
import { getPathname } from "~/i18n/navigation";
import { SITE } from "~/lib/seo";

export default function CookiesBanner() {
  const t = useTranslations();
  const [typeCookiesBanner, setTypeCookiesBanner] = useState<"info" | "settings">("info");
  const [cookiesData, setCookiesData] = useState<CookiesTypes>({
    cookiesAccepted: false,
    requiredCookies: true,
    analyticsCookies: false,
  });
  const locale = useLocale() as Locale;
  const cookiesPath = getPathname({ href: "/cookies-policy/", locale });
  const { isCookiesBannerVisible, setCookiesBannerVisible } = useCookiesBanner();

  // Consent lives in localStorage, which only exists on the client, so the
  // stored state has to be adopted after mount — initialising it during render
  // would break hydration.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const isLocalCookies = localStorage.getItem(COOKIES_LOCAL_STORAGE);
    if (!isLocalCookies) {
      setCookiesBannerVisible(true);
      return;
    }

    try {
      const cookiesLocal: CookiesTypes = JSON.parse(isLocalCookies);
      setCookiesData({
        cookiesAccepted: cookiesLocal.cookiesAccepted,
        requiredCookies: cookiesLocal.requiredCookies,
        analyticsCookies: cookiesLocal.analyticsCookies,
      });
      if (cookiesLocal.analyticsCookies) {
        loadAnalytics();
      }
    } catch (error) {
      console.error("Failed to parse saved cookie settings", error);
      localStorage.removeItem(COOKIES_LOCAL_STORAGE);
      setCookiesBannerVisible(true);
    }
  }, [setCookiesBannerVisible]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleAcceptAllCookies = () => {
    const accepted: CookiesTypes = {
      ...cookiesData,
      cookiesAccepted: true,
      analyticsCookies: true,
    };
    setCookiesData(accepted);
    localStorage.setItem(COOKIES_LOCAL_STORAGE, JSON.stringify(accepted));
    loadAnalytics();
    setCookiesBannerVisible(false);
  };

  const handleSettings = () => {
    if (typeCookiesBanner === "info") {
      setTypeCookiesBanner("settings");
    } else {
      const accepted: CookiesTypes = { ...cookiesData, cookiesAccepted: true };
      setCookiesData(accepted);
      localStorage.setItem(COOKIES_LOCAL_STORAGE, JSON.stringify(accepted));
      if (!accepted.analyticsCookies) {
        disableAnalitics();
      } else {
        loadAnalytics();
      }
      setCookiesBannerVisible(false);
    }
  };

  return (
    <>
      {isCookiesBannerVisible && (
        <div className={`btn_body black ${styles.cookies_banner}`}>
          <h3 className="H4 black">
            {typeCookiesBanner === "info"
              ? t("cookies.banner.title.general")
              : t("cookies.banner.title.settings")}
          </h3>
          <p>
            {t("cookies.banner.description1")}
            <br />
            {t("cookies.banner.description2")}{" "}
            <a href={cookiesPath} target="_blank" rel="noopener noreferrer">
              {`${SITE}${cookiesPath}`}
            </a>
          </p>

          {typeCookiesBanner === "settings" && (
            <ul className={styles.settings_list}>
              <li>
                <div className={styles.check_wrapper}>
                  <p className="H6">{t("cookies.banner.required.title")}</p>
                  <label className={styles.switch}>
                    <input disabled type="checkbox" checked aria-label="Required cookies" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p>{t("cookies.banner.required.description")}</p>
              </li>

              <li>
                <div className={styles.check_wrapper}>
                  <p className="H6">{t("cookies.banner.analitics.title")}</p>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={cookiesData.analyticsCookies}
                      aria-label="Analytics cookies"
                      onChange={() =>
                        setCookiesData(data => ({
                          ...data,
                          analyticsCookies: !data.analyticsCookies,
                        }))
                      }
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p>{t("cookies.banner.analitics.description")}</p>
              </li>
            </ul>
          )}

          <div className={styles.buttons_wrapper}>
            <button
              type="button"
              className={`grey_dark ${styles.btn_set}`}
              onClick={handleSettings}
            >
              {typeCookiesBanner === "info"
                ? t("cookies.banner.button.setCookies")
                : t("cookies.banner.button.acceptSelected")}
            </button>
            <button type="button" className={styles.btn_accept} onClick={handleAcceptAllCookies}>
              {t("cookies.banner.button.acceptAll")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
