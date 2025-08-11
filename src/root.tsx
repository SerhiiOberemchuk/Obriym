import { component$, isDev } from "@qwik.dev/core";
import { QwikRouterProvider, RouterOutlet } from "@qwik.dev/router";
import { RouterHead } from "./components/router-head/router-head";

import "./styles/global.css";
import { useQwikSpeak } from "qwik-speak";
import { config } from "./speak-config";
import { translationFn } from "./speak-functions";
import { QwikPartytown } from "./components/partytown/partytown";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useQwikSpeak({ config, translationFn });
  return (
    <QwikRouterProvider>
      <head>
        <meta charset="utf-8" />
        <QwikPartytown forward={["gtag", "dataLayer.push"]} />
        <script
          id="ga-script"
          async
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=G-VH4ZJDDVDG"
        />
        <script
          id="gtag-script"
          type="text/partytown"
          dangerouslySetInnerHTML={`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-VH4ZJDDVDG');
          `}
        />
        {!isDev && <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />}
        <RouterHead />
        {/* <ServiceWorkerRegister /> */}
      </head>
      <body>
        <RouterOutlet />
      </body>
    </QwikRouterProvider>
  );
});
