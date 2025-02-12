import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  amount: number,
  style?: "currency" | "decimal",
  currency?: string,
  currencyDisplay?: keyof Intl.NumberFormatOptionsCurrencyDisplayRegistry
) {
  return new Intl.NumberFormat("en-GH", {
    style,
    currency,
    currencyDisplay,
    localeMatcher: "best fit",
  }).format(amount);
}

export const constructQuery = (
  updates: Record<string, string>,
  params: URLSearchParams
) => {
  Object.entries(updates).forEach(([key, value]) => {
    params.set(key, value);
  });
  return `?${params.toString()}`;
};
