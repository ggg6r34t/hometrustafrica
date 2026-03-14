import { format } from "date-fns";

export function formatSentenceCaseLabel(value?: string | null) {
  if (!value) {
    return "";
  }

  const normalized = value
    .replaceAll(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!normalized) {
    return "";
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateLabel(
  value?: string | null,
  fallback = "Not available",
) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return format(date, "MMM d, yyyy");
}
