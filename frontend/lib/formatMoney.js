export const formatMoney = (cents) => {
  const options = {
    currency: "BGN",
    minimumFractionDigits: 2,
    style: "currency",
  };

  if (cents % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const formatter = new Intl.NumberFormat("bg-BG", options);
  return formatter.format(cents / 100);
};
