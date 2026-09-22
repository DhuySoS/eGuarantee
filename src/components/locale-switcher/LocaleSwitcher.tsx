"use client";
import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locales, Locale } from "@/shared/i18n/config";
import { stripLocale, withLocale } from "@/shared/i18n/path";

import styles from "./LocaleSwitcher.module.css";

const LOCALE_LABELS: Record<Locale, string> = {
  vi: "VN",
  en: "EN",
};

const LocaleSwitcher = () => {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSwitch = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    const cleanPath = stripLocale(pathname);
    const query = searchParams?.toString();
    const targetUrl =
      withLocale(cleanPath, newLocale) + (query ? `?${query}` : "");

    router.push(targetUrl);
  };

  return (
    <div className={styles.switcher}>
      {locales.map((locale, index) => {
        const isActive = currentLocale === locale;

        return (
          <React.Fragment key={locale}>
            <button
              type="button"
              onClick={() => handleSwitch(locale)}
              className={`${styles.button} ${isActive ? styles.active : ""}`}
            >
              {LOCALE_LABELS[locale]}
            </button>

            {index < locales.length - 1 && (
              <span className={styles.divider}>/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LocaleSwitcher;
