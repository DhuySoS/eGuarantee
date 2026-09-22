import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/shared/i18n/config";

export default createMiddleware({
  // Danh sách các locale được hỗ trợ ("vi", "en")
  locales,

  // Locale mặc định khi không có locale trên URL
  defaultLocale: "vi",
  localeDetection: false,
  // Mặc định luôn đính kèm prefix locale trên đường dẫn URL (/vi/..., /en/...)
  localePrefix: "always",
});

export const config = {
  // Bỏ qua file tĩnh và api, bắt toàn bộ các trang còn lại
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
