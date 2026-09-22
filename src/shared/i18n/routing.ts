export const locales = ["vi", "en"] as const;
export const defaultLocale = "vi";

export type AppLocale = (typeof locales)[number];
