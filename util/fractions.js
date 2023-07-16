export const numToFraction = function (val, tolerance) {
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
      return `${whole ? whole : ""} ${dec * i}/${i}`;
    }
  }

  return val.toString();
};
