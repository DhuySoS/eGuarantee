export const getAvatarText = (name?: string): string => {
  if (!name || typeof name !== "string") return "";

  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "";

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  const firstChar = words[0].charAt(0);
  const lastChar = words[words.length - 1].charAt(0);

  return `${firstChar}${lastChar}`.toUpperCase();
};

export const formatCurrency = (
  amount?: number | null,
  currency: string = "VND",
): string => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "-";
  }

  const formatted = new Intl.NumberFormat("vi-VN").format(amount);
  return `${formatted} ${currency}`.trim();
};
