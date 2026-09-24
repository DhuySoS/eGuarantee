"use client";

import { useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { FilterValues } from "../components/list/Filter";
import type {
  GuaranteeQueryParams,
  GuaranteeStatus,
  GuaranteeType,
  GuaranteeTabKey,
} from "../types/guarantee";

export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 5;

export const useGuaranteeQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse queryParams trực tiếp từ URL Search Params (Single Source of Truth)
  const queryParams = useMemo<GuaranteeQueryParams>(() => {
    const pageParam = searchParams.get("page");
    const sizeParam = searchParams.get("size");
    const statusParam = searchParams.get("status") as GuaranteeStatus | null;
    const keyword = searchParams.get("keyword") || undefined;
    const guaranteeType =
      (searchParams.get("guaranteeType") as GuaranteeType) || undefined;
    const createdFrom = searchParams.get("createdFrom") || undefined;
    const createdTo = searchParams.get("createdTo") || undefined;
    const sortBy =
      (searchParams.get("sortBy") as
        "createdDate" | "guaranteeAmount" | "customerName") || "createdDate";
    const sortDirection =
      (searchParams.get("sortDirection") as "asc" | "desc") || "desc";

    return {
      page: pageParam ? Math.max(0, parseInt(pageParam, 10) - 1) : DEFAULT_PAGE,
      size: sizeParam ? parseInt(sizeParam, 10) : DEFAULT_PAGE_SIZE,
      status: statusParam || undefined,
      keyword,
      guaranteeType,
      createdFrom,
      createdTo,
      sortBy,
      sortDirection,
    };
  }, [searchParams]);

  // Hàm cập nhật URL Search Params - chỉ lưu những gì khác giá trị mặc định
  const updateUrl = useCallback(
    (newParams: Partial<GuaranteeQueryParams>) => {
      const merged = { ...queryParams, ...newParams };
      const params = new URLSearchParams();
      // keyword
      if (merged.keyword?.trim()) {
        params.set("keyword", merged.keyword.trim());
      }
      // status: khác ALL
      if (merged.status) {
        params.set("status", merged.status);
      }
      // guaranteeType
      if (merged.guaranteeType) {
        params.set("guaranteeType", merged.guaranteeType);
      }
      // createdFrom
      if (merged.createdFrom) {
        params.set("createdFrom", merged.createdFrom);
      }
      // createdTo
      if (merged.createdTo) {
        params.set("createdTo", merged.createdTo);
      }
      // page: trang 2 trở lên mới ghi (?page=2)
      if (typeof merged.page === "number" && merged.page > 0) {
        params.set("page", String(merged.page + 1));
      }
      // size: nếu khác 5 mới ghi
      if (merged.size && merged.size !== DEFAULT_PAGE_SIZE) {
        params.set("size", String(merged.size));
      }
      // sortBy & sortDirection
      if (merged.sortBy && merged.sortBy !== "createdDate") {
        params.set("sortBy", merged.sortBy);
      }
      if (
        merged.sortDirection &&
        (merged.sortBy !== "createdDate" || merged.sortDirection !== "desc")
      ) {
        params.set("sortDirection", merged.sortDirection);
      }

      const queryString = params.toString();
      const target = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(target, { scroll: false });
    },
    [pathname, queryParams, router],
  );

  const handlePageChange = useCallback(
    (uiPage: number, size: number) => {
      updateUrl({
        page: Math.max(0, uiPage - 1),
        size,
      });
    },
    [updateUrl],
  );

  const handleFilterSubmit = useCallback(
    (filters: FilterValues) => {
      updateUrl({
        ...filters,
        page: DEFAULT_PAGE,
      });
    },
    [updateUrl],
  );

  const handleFilterReset = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const handleSortChange = useCallback(
    (
      sortBy: "createdDate" | "guaranteeAmount" | "customerName",
      sortDirection: "asc" | "desc",
    ) => {
      updateUrl({
        sortBy,
        sortDirection,
        page: DEFAULT_PAGE,
      });
    },
    [updateUrl],
  );

  const handleTabChange = useCallback(
    (tab: GuaranteeTabKey) => {
      const status = tab === "ALL" ? undefined : (tab as GuaranteeStatus);
      updateUrl({
        status,
        page: DEFAULT_PAGE,
      });
    },
    [updateUrl],
  );

  const activeTab: GuaranteeTabKey = queryParams.status ?? "ALL";

  return {
    queryParams,
    activeTab,
    updateUrl,
    handlePageChange,
    handleFilterSubmit,
    handleFilterReset,
    handleSortChange,
    handleTabChange,
  };
};

export default useGuaranteeQueryParams;
