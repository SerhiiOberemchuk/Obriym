import { component$, isDev } from "@qwik.dev/core";
import { QwikRouterProvider, RouterOutlet, ServiceWorkerRegister } from "@qwik.dev/router";
import { RouterHead } from "./components/router-head/router-head";

import "./styles/global.css";
import { useQwikSpeak } from "qwik-speak";
import { config } from "./speak-config";
import { translationFn } from "./speak-functions";

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
        {!isDev && <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />}
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body>
        <RouterOutlet />
      </body>
    </QwikRouterProvider>
  );
});
