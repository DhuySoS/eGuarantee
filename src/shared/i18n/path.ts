import { defaultLocale, locales } from "./routing";

const normalizePathname = (pathname: string): string => {
  return pathname || "/";
};

export const getLocaleFromPath = (pathname: string) => {
  const normalizedPath = normalizePathname(pathname);
  const segment = normalizedPath.split("/")[1];
  return locales.includes(segment as (typeof locales)[number])
    ? (segment as (typeof locales)[number])
    : defaultLocale;
};

export const stripLocale = (pathname: string) => {
  const normalizedPath = normalizePathname(pathname);
  const locale = getLocaleFromPath(normalizedPath);
  if (normalizedPath === `/${locale}`) return "/";
  if (normalizedPath.startsWith(`/${locale}/`)) {
    return normalizedPath.replace(`/${locale}`, "") || "/";
  }
  return normalizedPath;
};

export const withLocale = (path: string, locale: string) => {
  if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
    return path;
  }
  return `/${locale}${path.startsWith("/") ? "" : "/"}${path}`;
};
