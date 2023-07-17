export const numToFraction = function (val, tolerance = 0.001) {
  val = +val;
  if (isNaN(val)) return "";

  //get whole number and decimal
  let whole = Math.floor(val);
  let dec = val - whole;

  if (dec === 0) {
    return whole.toString();
  }
  //supports only from 2-16 denominator
  for (let i = 2; i < 17; i++) {
    if (dec * i - Math.floor(dec * i) <= tolerance) {
      return `${whole ? whole : ""} ${Math.floor(dec * i)}/${i}`;
    }
  }

  return val.toFixed(2).toString();
};
