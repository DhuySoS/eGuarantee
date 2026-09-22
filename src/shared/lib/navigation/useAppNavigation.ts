"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { withLocale } from "@/shared/i18n/path";

export const useAppNavigation = () => {
  const router = useRouter();
  const locale = useLocale();

  const navigate = (path: string) => {
    router.push(withLocale(path, locale));
  };
  const replace = (path: string) => {
    router.replace(withLocale(path, locale));
  };
  return {
    push: navigate,
    replace,
  };
};
