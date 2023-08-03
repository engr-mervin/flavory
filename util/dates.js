export const dateToMMMMDDYYYYatHHMM = function (isoDate) {
  console.log(isoDate);
  const date = new Date(`${isoDate}`);
  console.log(date);
  const formatter = new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formatter.format(date);
};
