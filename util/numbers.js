export const convertToNumber = function (dec) {
  return (text) => {
    if (text === "") return null;
    //IF A NUMBER ALREADY
    if (!isNaN(Number(text))) return Number(text);

    //IF NOT A NUMBER AND DOEES NOT CONTAIN "/"
    if (!text.includes("/")) return null;

    //IF CONTAINS "/" BUT MULTIPLE
    if (text.split("/").length > 2) return null;

    //CONVERT TO NUMBER
    let a = text.split("/")[0];

    let b = text.split("/")[1];

    let c = Number((a / b).toFixed(dec));

    if (isNaN(c)) return null;

    return c;
  };
};

export const round = function (num, places) {
  let roundNum = num * 10 ** places;
  roundNum = Math.round(roundNum);

  return +(roundNum / 10 ** places).toFixed(places);
};
