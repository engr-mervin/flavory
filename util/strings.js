export const capitalizeFirstLetter = function (str) {
  return str[0].toUpperCase() + str.slice(1);
};

export const parseNested = function (str) {
  try {
    return JSON.parse(str, (_, val) => {
      if (typeof val === "string") return parseNested(val);
      return val;
    });
  } catch (exc) {
    return str;
  }
};
