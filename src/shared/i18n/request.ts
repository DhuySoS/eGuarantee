import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, Locale, dictionaries } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let resolvedLocale = await requestLocale;
  if (!resolvedLocale || !locales.includes(resolvedLocale as Locale)) {
    resolvedLocale = defaultLocale;
  }

  return {
    locale: resolvedLocale,
    messages: dictionaries[resolvedLocale as Locale],
  };
});
