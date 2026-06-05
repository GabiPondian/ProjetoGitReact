export const formatLargeNonMonetaryNumber = (
  value: number | undefined
) => {
  if (value === undefined || value === null) return "N/A";

  return value.toLocaleString("en-US");
};

export const formatRatio = (
  value: number | undefined
) => {
  if (value === undefined || value === null) return "N/A";

  return value.toFixed(2);
};