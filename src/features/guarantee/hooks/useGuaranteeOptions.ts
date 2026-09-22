import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  GUARANTEE_TYPE_OPTIONS,
  GUARANTEE_STATUS_OPTIONS,
} from "../constants/guarantee";
import type { GuaranteeType, GuaranteeStatus } from "../types/guarantee";

export interface GuaranteeOptionItem<T = string> {
  value: T;
  label: string;
}

export const useGuaranteeOptions = () => {
  const t = useTranslations("guarantees");

  const guaranteeTypeOptions = useMemo<GuaranteeOptionItem<GuaranteeType>[]>(
    () =>
      GUARANTEE_TYPE_OPTIONS.map((opt) => ({
        value: opt.value as GuaranteeType,
        label: t(`types.${opt.value}` as any, { defaultValue: opt.label }),
      })),
    [t],
  );

  const guaranteeStatusOptions = useMemo<GuaranteeOptionItem<GuaranteeStatus>[]>(
    () =>
      GUARANTEE_STATUS_OPTIONS.map((opt) => ({
        value: opt.value as GuaranteeStatus,
        label: t(`statuses.${opt.value}` as any, { defaultValue: opt.label }),
      })),
    [t],
  );

  return {
    guaranteeTypeOptions,
    guaranteeStatusOptions,
  };
};

export default useGuaranteeOptions;
