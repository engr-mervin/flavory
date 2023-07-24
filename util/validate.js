export const validateText = function (text, maxLength) {
  if (typeof text !== "string") return;

  let trimmed = text.trim();

  if (trimmed.length < 6 || trimmed.length > maxLength) return false;

  const re = /^[a-zA-Z 0-9\-\_]*$/;

  return re.test(trimmed);
};
