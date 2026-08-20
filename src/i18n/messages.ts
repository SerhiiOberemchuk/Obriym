import type { AbstractIntlMessages } from "next-intl";
import { defaultLocale, type Locale } from "./routing";

/**
 * The translation namespaces extracted by the previous qwik-speak setup. Each
 * file already nests its own namespace (e.g. `seo.json` -> `{ "seo": {...} }`),
 * so merging them yields a single dotted-key message tree.
 */
const NAMESPACES = [
  "alert",
  "app",
  "breadcrumb",
  "budget",
  "cookies",
  "errors",
  "faq",
  "footer",
  "home",
  "legal",
  "logo",
  "navigation",
  "privacy",
  "products",
  "projects",
  "seo",
  "services",
  "team",
] as const;

type MessageTree = Record<string, unknown>;

/**
 * Deep-merges `override` onto `base`. Used to fall back to the default locale
 * for keys a translation file has not caught up with yet — the behaviour
 * qwik-speak provided through its `key@@Default text` inline fallbacks.
 */
const deepMerge = (base: MessageTree, override: MessageTree): MessageTree => {
  const result: MessageTree = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const existing = result[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === "object" &&
      !Array.isArray(existing)
    ) {
      result[key] = deepMerge(existing as MessageTree, value as MessageTree);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
};

const loadNamespaces = async (locale: string): Promise<MessageTree> => {
  const files = await Promise.all(
    NAMESPACES.map(async namespace => {
      try {
        return (await import(`../../i18n/${locale}/${namespace}.json`)).default as MessageTree;
      } catch {
        return {} as MessageTree;
      }
    }),
  );

  return files.reduce<MessageTree>((acc, file) => deepMerge(acc, file), {});
};

export const getMessages = async (locale: Locale): Promise<AbstractIntlMessages> => {
  const fallback = await loadNamespaces(defaultLocale);

  if (locale === defaultLocale) {
    return fallback as AbstractIntlMessages;
  }

  return deepMerge(fallback, await loadNamespaces(locale)) as AbstractIntlMessages;
};
