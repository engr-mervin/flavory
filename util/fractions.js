import { round } from "./numbers";

export const numToFraction = function (val, tolerance = 0.001) {
  val = +val;
  if (isNaN(val)) return "";

  let whole = Math.floor(val);
  let dec = val - whole;

  let whole2 = Math.ceil(val);
  let dec2 = whole2 - val;

  if (dec < tolerance) {
    return whole.toFixed(0).toString();
  }

  if (dec2 < tolerance) {
    return whole2.toFixed(0).toString();
  }
  for (let i = 2; i < 17; i++) {
    if (i === 7 || i === 9 || i === 11 || i === 13 || i === 14 || i === 15)
      continue;
    const computed = dec * i;
    const actualTolerance = i * tolerance;

    if (computed - Math.floor(computed) <= actualTolerance) {
      return `${whole ? whole : ""} ${Math.floor(computed)}/${i}`;
    }
    if (Math.ceil(computed) - computed <= actualTolerance) {
      return `${whole ? whole : ""} ${Math.ceil(computed)}/${i}`;
    }
  }

  return val.toFixed(2).toString();
};
