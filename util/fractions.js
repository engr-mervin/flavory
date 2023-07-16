export const numToFraction = function (val, tolerance) {
  val = +val;
  if (isNaN(val)) return "";

  //get decimal
  let whole = Math.floor(val);
  let dec = val - whole;
  console.log(whole, dec, val);

  if (dec === 0) {
    return whole.toString();
  }
  console.log("try");
  //try
  for (let i = 2; i < 17; i++) {
    if (dec * i - Math.floor(dec * i) <= tolerance) {
      return `${whole ? whole : ""} ${dec * i}/${i}`;
    }
  }

  return val.toString();
};
