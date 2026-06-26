import { component$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import PrivacyPage from "~/components/pages/PrivacyPage";
import { buildSeoMeta, getAlternateLinks, getCanonicalUrl } from "~/utils/seo";

const PRIVACY_OG_IMAGE = "https://obriym.com/images/privacy/og-image.png";

export default component$(() => {
  const loc = useLocation();
  const canonical = getCanonicalUrl(loc.url.pathname);

  return (
    <>
      <PrivacyPage />
      <script
        type="application/ld+json"
        id="obriym-policy-schema"
        dangerouslySetInnerHTML={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          description:
            "Privacy Policy of Obriym Web Agency. Learn how we collect, use, and protect your personal data.",
          dateModified: "2025-07-21",
          url: canonical,
          publisher: {
            "@type": "Organization",
            name: "Obriym Web Agency",
            url: "https://obriym.com",
            logo: "https://obriym.com/logo.svg",
          },
        })}
      ></script>
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const title = t("app.head.privacy.title@@Privacy Policy | Obriym");
  const description = t(
    "app.head.privacy.description@@Read the Privacy Policy of Obriym Web Agency. Learn how we collect, use, and protect your personal data.",
  );

  return {
    title,
    meta: buildSeoMeta({ title, description, pathname: url.pathname, image: PRIVACY_OG_IMAGE }),
    links: getAlternateLinks(url.pathname),
  };
};
