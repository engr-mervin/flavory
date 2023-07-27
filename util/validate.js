export const validateText = function (text, maxLength) {
  if (typeof text !== "string") return;

  let trimmed = text.trim();

  if (trimmed.length < 6 || trimmed.length > maxLength) return false;

  const re = /^[a-zA-Z 0-9\-\_]*$/;

  return re.test(trimmed);
};
export const validateTitle = function (text) {
  if (typeof text !== "string") return;

  let trimmed = text.trim();

  if (trimmed.length < 3 || trimmed.length > 48) return false;

  const re = /^[a-zA-Z 0-9\-\'\"]*$/;

  return re.test(trimmed) && trimmed.length > 0;
};
export const validateDescription = function (text) {
  if (typeof text !== "string") return;

  let trimmed = text.trim();

  if (trimmed.length < 3 || trimmed.length > 64) return false;

  const re = /^[a-zA-Z 0-9\-\'\"\,\.]*$/;

  return re.test(trimmed);
};
export const validateQuantity = function (text) {
  if (typeof text !== "string") return;

  let trimmed = text.trim();

  if (trimmed.length < 0 || trimmed.length > 8) return false;

  const re = /^[0-9\/\.]*$/;

  const firstCheck = re.test(trimmed);

  console.log(trimmed.split(".").length);
  const secondCheck =
    trimmed.split(".").length < 3 && trimmed.split("/").length < 3;

  return firstCheck && secondCheck;
};

export const validateUnit = function (text) {
  if (typeof text !== "string") return;

  let trimmed = text.trim();

  if (trimmed.length > 16) return false;

  const re = /^[a-zA-Z\-\'\"]*$/;

  return re.test(trimmed) || trimmed === "";
};

export const validateWholeNumber = function (text) {
  if (typeof text !== "string") return;
  let trimmed = text.trim();

  if (trimmed.length < 0 || trimmed.length > 3) return false;
  const re = /^[0-9]*$/;

  const num = Number(trimmed);

  if (re.test(trimmed) && !isNaN(num)) return true && num < 1000;
  else {
    return false;
  }
};

export const validateURL = function (text) {
  if (typeof text !== "string") return;

  let trimmed = text.trim();

  return (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("www.") ||
    trimmed === ""
  );
};
