import viCommon from "@/shared/i18n/messages/vi/common.json";
import viAuth from "@/shared/i18n/messages/vi/auth.json";
import viGuarantees from "@/shared/i18n/messages/vi/guarantees.json";
import viCustomers from "@/shared/i18n/messages/vi/customers.json";

import enCommon from "@/shared/i18n/messages/en/common.json";
import enAuth from "@/shared/i18n/messages/en/auth.json";
import enGuarantees from "@/shared/i18n/messages/en/guarantees.json";
import enCustomers from "@/shared/i18n/messages/en/customers.json";

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export type AppDictionary = {
  common: typeof viCommon;
  auth: typeof viAuth;
  guarantees: typeof viGuarantees;
  customers: typeof viCustomers;
};

export const dictionaries = {
  vi: {
    common: viCommon,
    auth: viAuth,
    guarantees: viGuarantees,
    customers: viCustomers,
  },
  en: {
    common: enCommon,
    auth: enAuth,
    guarantees: enGuarantees,
    customers: enCustomers,
  },
};
